import { LANGUAGE_MAP } from '../constants/languages';
import { runPythonInPyodide } from './pyodideRunner';

/**
 * High-Performance In-Memory Execution Cache
 * Delivers industry-standard instant response (0.001s) when running existing code.
 */
const executionCache = new Map();
const MAX_CACHE_ENTRIES = 120;

function getCacheKey(language, code, stdin) {
  const normCode = (code || '').replace(/\r\n/g, '\n').trim();
  const normStdin = (stdin || '').replace(/\r\n/g, '\n').trim();
  return `${language}:::${normCode}:::${normStdin}`;
}

export function clearExecutionCache() {
  executionCache.clear();
}

/**
 * Normalizes compilation output from Judge0
 */
function normalizeJudge0Response(data) {
  const statusId = data?.status?.id || 0;
  const statusDescription = data?.status?.description || 'Completed';

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
    provider: 'Judge0 Cloud'
  };
}

/**
 * Normalizes compilation output from Wandbox
 */
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Judge0 API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return normalizeJudge0Response(data);
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Execute code via Wandbox public endpoint (High-speed GCC / Clang execution)
 */
async function executeViaWandbox(languageId, code, stdin = '') {
  const lang = LANGUAGE_MAP[languageId];
  if (!lang || !lang.wandboxCompiler) {
    throw new Error(`Unsupported language for Wandbox: ${languageId}`);
  }

  let processedCode = code;
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Wandbox API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return normalizeWandboxResponse(data);
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Main execution function with intelligent instant caching and multi-tier routing
 */
export async function runCode({ language, code, stdin }) {
  // 1. INSTANT CACHE CHECK: If running already compiled code with identical input, return immediately
  const cacheKey = getCacheKey(language, code, stdin);
  if (executionCache.has(cacheKey)) {
    const cached = executionCache.get(cacheKey);
    return {
      ...cached,
      time: '0.001s (Instant Cache ⚡)',
      cached: true
    };
  }

  const startTime = performance.now();

  // Helper to store in cache before returning
  const cacheAndReturn = (result) => {
    if (result && result.statusType !== 'error' && !result.message?.includes('Offline')) {
      if (executionCache.size >= MAX_CACHE_ENTRIES) {
        const oldestKey = executionCache.keys().next().value;
        executionCache.delete(oldestKey);
      }
      executionCache.set(cacheKey, result);
    }
    return result;
  };

  // 2. Python: Run directly in client-side WebAssembly via Pyodide (5ms - 30ms latency)
  if (language === 'python' && typeof window !== 'undefined') {
    try {
      const pyResult = await runPythonInPyodide(code, stdin);
      return cacheAndReturn(pyResult);
    } catch (pyErr) {
      console.warn('Pyodide engine unavailable, falling back to cloud compiler:', pyErr.message);
    }
  }

  // 3. C & C++: Wandbox delivers sub-second GCC/Clang speeds (often 3x faster than Judge0 queue)
  if (language === 'c' || language === 'cpp') {
    try {
      const res = await executeViaWandbox(language, code, stdin);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      res.time = `${elapsed}s`;
      return cacheAndReturn(res);
    } catch (wbErr) {
      console.warn('Wandbox failed, attempting Judge0 fallback:', wbErr.message);
      try {
        const res = await executeViaJudge0(language, code, stdin);
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
        if (!res.time) res.time = `${elapsed}s`;
        return cacheAndReturn(res);
      } catch (j0Err) {
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
        return {
          success: false,
          statusType: 'error',
          statusText: 'Execution Service Unavailable',
          stdout: '',
          stderr: `Failed to compile:\n1. Wandbox: ${wbErr.message}\n2. Judge0: ${j0Err.message}`,
          compileOutput: '',
          time: `${elapsed}s`,
          exitCode: 1,
          provider: 'Offline / Network Error'
        };
      }
    }
  }

  // 4. Java & other languages: Try Judge0 first, fallback to Wandbox
  try {
    const res = await executeViaJudge0(language, code, stdin);
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
    if (!res.time) res.time = `${elapsed}s`;
    return cacheAndReturn(res);
  } catch (j0Err) {
    console.warn('Judge0 failed, attempting Wandbox fallback:', j0Err.message);
    try {
      const res = await executeViaWandbox(language, code, stdin);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      res.time = `${elapsed}s`;
      return cacheAndReturn(res);
    } catch (wbErr) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);
      return {
        success: false,
        statusType: 'error',
        statusText: 'Execution Service Unavailable',
        stdout: '',
        stderr: `Failed to reach execution endpoints:\n1. Judge0: ${j0Err.message}\n2. Wandbox: ${wbErr.message}`,
        compileOutput: '',
        time: `${elapsed}s`,
        exitCode: 1,
        provider: 'Offline / Network Error'
      };
    }
  }
}
