import { LANGUAGE_MAP } from '../constants/languages';

/**
 * Normalizes compilation output from Judge0 or Wandbox
 */
function normalizeJudge0Response(data) {
  const statusId = data?.status?.id || 0;
  const statusDescription = data?.status?.description || 'Completed';

  // Status IDs in Judge0:
  // 3: Accepted
  // 4: Wrong Answer
  // 5: Time Limit Exceeded
  // 6: Compilation Error
  // 7-12: Runtime Errors
  // 13: Internal Error
  let statusType = 'success';
  if (statusId === 3) {
    statusType = 'success';
  } else if (statusId === 6) {
    statusType = 'compilation_error';
  } else if (statusId === 5) {
    statusType = 'time_limit';
  } else if (statusId >= 7 && statusId <= 12) {
    statusType = 'runtime_error';
  } else if (statusId !== 3) {
    statusType = 'error';
  }

  return {
    success: statusId === 3,
    statusType,
    statusText: statusDescription,
    stdout: data.stdout || '',
    stderr: data.stderr || '',
    compileOutput: data.compile_output || '',
    message: data.message || '',
    time: data.time ? `${parseFloat(data.time).toFixed(3)}s` : null,
    memory: data.memory ? `${(data.memory / 1024).toFixed(2)} MB` : null,
    exitCode: data.exit_code ?? (statusId === 3 ? 0 : 1),
    provider: 'Judge0 CE'
  };
}

function normalizeWandboxResponse(data) {
  const exitCode = parseInt(data.status ?? '0', 10);
  const compilerError = data.compiler_error || data.compiler_message || '';
  const programError = data.program_error || '';
  const programOutput = data.program_output || '';

  let statusType = 'success';
  let statusText = 'Success (0)';

  if (compilerError && !programOutput) {
    statusType = 'compilation_error';
    statusText = 'Compilation Error';
  } else if (exitCode !== 0 || programError) {
    statusType = 'runtime_error';
    statusText = `Exited with status ${exitCode}`;
  }

  return {
    success: exitCode === 0 && !compilerError,
    statusType,
    statusText,
    stdout: programOutput,
    stderr: programError,
    compileOutput: compilerError,
    message: '',
    time: null,
    memory: null,
    exitCode: exitCode,
    provider: 'Wandbox Cloud'
  };
}

/**
 * Execute code via Judge0 CE public endpoint
 */
async function executeViaJudge0(languageId, code, stdin = '') {
  const lang = LANGUAGE_MAP[languageId];
  if (!lang || !lang.judge0Id) {
    throw new Error(`Unsupported language for Judge0: ${languageId}`);
  }

  const endpoint = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
  const payload = {
    source_code: code,
    language_id: lang.judge0Id,
    stdin: stdin || ''
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Judge0 API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return normalizeJudge0Response(data);
}

/**
 * Execute code via Wandbox public endpoint (Fallback)
 */
async function executeViaWandbox(languageId, code, stdin = '') {
  const lang = LANGUAGE_MAP[languageId];
  if (!lang || !lang.wandboxCompiler) {
    throw new Error(`Unsupported language for Wandbox: ${languageId}`);
  }

  let processedCode = code;
  // Wandbox names Java files 'prog.java' by default; if class is declared public class Main,
  // javac will complain. Transforming 'public class' to 'class' preserves all logic & compiles cleanly.
  if (languageId === 'java') {
    processedCode = processedCode.replace(/\bpublic\s+class\s+([A-Za-z0-9_]+)/g, 'class $1');
  }

  const endpoint = 'https://wandbox.org/api/compile.json';
  const payload = {
    compiler: lang.wandboxCompiler,
    code: processedCode,
    stdin: stdin || '',
    'compiler-option-raw': ''
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Wandbox API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return normalizeWandboxResponse(data);
}

/**
 * Main execution function with intelligent fallbacks
 */
export async function runCode({ language, code, stdin }) {
  const startTime = performance.now();

  // First, if hosted on Vercel or dev server with /api proxy, try our internal endpoint
  try {
    const internalResponse = await fetch('/api/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language, code, stdin })
    });

    if (internalResponse.ok) {
      const data = await internalResponse.json();
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      if (!data.time) data.time = `${elapsed}s`;
      return data;
    }
  } catch {
    // If /api/compile is unreachable (e.g., direct client-side Vite dev), proceed to direct execution
  }

  // Fallback 1: Direct Judge0 CE
  try {
    const res = await executeViaJudge0(language, code, stdin);
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
    if (!res.time) res.time = `${elapsed}s`;
    return res;
  } catch (j0Err) {
    console.warn('Judge0 direct call failed, falling back to Wandbox:', j0Err.message);

    // Fallback 2: Wandbox
    try {
      const res = await executeViaWandbox(language, code, stdin);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      res.time = `${elapsed}s`;
      return res;
    } catch (wbErr) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      return {
        success: false,
        statusType: 'error',
        statusText: 'Network / Execution Service Unavailable',
        stdout: '',
        stderr: `Failed to reach execution endpoints:\n1. Judge0: ${j0Err.message}\n2. Wandbox: ${wbErr.message}\n\nPlease check your internet connection.`,
        compileOutput: '',
        message: 'Both Judge0 and Wandbox public endpoints were unreachable.',
        time: `${elapsed}s`,
        memory: null,
        exitCode: 1,
        provider: 'Offline / Network Error'
      };
    }
  }
}
