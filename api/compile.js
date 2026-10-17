// Vercel Serverless Function: /api/compile
// Optimized high-speed execution proxy with dual sandbox fallback

const LANGUAGE_CONFIG = {
  python: {
    judge0Id: 100,
    wandboxCompiler: 'cpython-3.12.7'
  },
  c: {
    judge0Id: 103,
    wandboxCompiler: 'gcc-13.2.0-c'
  },
  cpp: {
    judge0Id: 105,
    wandboxCompiler: 'gcc-13.2.0'
  },
  java: {
    judge0Id: 91,
    wandboxCompiler: 'openjdk-jdk-21+35'
  }
};

export default async function handler(req, res) {
  // Ultra-permissive CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { language, code, stdin = '' } = req.body || {};

  if (!language || !code) {
    return res.status(400).json({ error: 'Missing language or code in request body.' });
  }

  const langConfig = LANGUAGE_CONFIG[language.toLowerCase()];
  if (!langConfig) {
    return res.status(400).json({ error: `Unsupported language: ${language}. Valid: python, java, c, cpp` });
  }

  const startTime = Date.now();

  // Try Judge0 with 8s fast timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const judge0Url = process.env.JUDGE0_API_URL || 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (process.env.JUDGE0_API_KEY) {
      headers['X-RapidAPI-Key'] = process.env.JUDGE0_API_KEY;
      if (process.env.JUDGE0_API_HOST) {
        headers['X-RapidAPI-Host'] = process.env.JUDGE0_API_HOST;
      }
    }

    const judge0Response = await fetch(judge0Url, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        source_code: code,
        language_id: langConfig.judge0Id,
        stdin: stdin || ''
      })
    });

    clearTimeout(timeout);

    if (judge0Response.ok) {
      const data = await judge0Response.json();
      const statusId = data?.status?.id || 0;
      const statusDescription = data?.status?.description || 'Completed';

      let statusType = 'success';
      if (statusId === 3) statusType = 'success';
      else if (statusId === 6) statusType = 'compilation_error';
      else if (statusId === 5) statusType = 'time_limit';
      else if (statusId >= 7 && statusId <= 12) statusType = 'runtime_error';
      else if (statusId !== 3) statusType = 'error';

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(3);

      return res.status(200).json({
        success: statusId === 3,
        statusType,
        statusText: statusDescription,
        stdout: data.stdout || '',
        stderr: data.stderr || '',
        compileOutput: data.compile_output || '',
        message: data.message || '',
        time: data.time ? `${parseFloat(data.time).toFixed(3)}s` : `${elapsed}s`,
        memory: data.memory ? `${(data.memory / 1024).toFixed(2)} MB` : null,
        exitCode: data.exit_code ?? (statusId === 3 ? 0 : 1),
        provider: 'Judge0 Sandbox'
      });
    }
  } catch (j0Err) {
    console.warn('Judge0 fast path error, attempting Wandbox:', j0Err.message);
  }

  // Fast Fallback: Wandbox
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let processedCode = code;
    if (language.toLowerCase() === 'java') {
      processedCode = processedCode.replace(/\bpublic\s+class\s+([A-Za-z0-9_]+)/g, 'class $1');
    }

    const wandboxResponse = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        compiler: langConfig.wandboxCompiler,
        code: processedCode,
        stdin: stdin || ''
      })
    });

    clearTimeout(timeout);

    if (wandboxResponse.ok) {
      const data = await wandboxResponse.json();
      const exitCode = parseInt(data.status ?? '0', 10);
      const compilerError = data.compiler_error || data.compiler_message || '';
      const programError = data.program_error || '';
      const programOutput = data.program_output || '';
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(3);

      let statusType = 'success';
      let statusText = 'Success (0)';

      if (compilerError && !programOutput) {
        statusType = 'compilation_error';
        statusText = 'Compilation Error';
      } else if (exitCode !== 0 || programError) {
        statusType = 'runtime_error';
        statusText = `Exited with status ${exitCode}`;
      }

      return res.status(200).json({
        success: exitCode === 0 && !compilerError,
        statusType,
        statusText,
        stdout: programOutput,
        stderr: programError,
        compileOutput: compilerError,
        message: '',
        time: `${elapsed}s`,
        memory: null,
        exitCode,
        provider: 'Wandbox Sandbox'
      });
    }
  } catch (wbErr) {
    console.error('Wandbox fallback failed:', wbErr.message);
  }

  return res.status(502).json({
    success: false,
    statusType: 'error',
    statusText: 'Execution Service Timeout',
    stdout: '',
    stderr: 'Compilation services were momentarily busy. Please try again.',
    compileOutput: '',
    time: null,
    memory: null,
    exitCode: 1,
    provider: 'None'
  });
}
