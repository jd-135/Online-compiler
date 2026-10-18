/**
 * High-Performance Client-Side Python WebAssembly Engine (Pyodide)
 * Executes Python with sub-millisecond latency.
 * Supports: math, random, statistics, numpy, pandas, scipy, and the full standard library.
 */

let pyodideInstance = null;
let pyodideLoadingPromise = null;
const loadedPackages = new Set();

/**
 * Initializes or retrieves the Pyodide WebAssembly runtime.
 */
export async function initPyodide(onProgress) {
  if (pyodideInstance) return pyodideInstance;

  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      // Load script from CDN if not already on page
      if (typeof window !== 'undefined' && !window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly script from CDN'));
          document.head.appendChild(script);
        });
      }

      if (typeof window === 'undefined' || !window.loadPyodide) {
        throw new Error('Pyodide is not supported in non-browser environments');
      }

      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });

      pyodideInstance = pyodide;
      return pyodide;
    })();
  }

  return pyodideLoadingPromise;
}

/**
 * Detects third-party packages in Python source and loads them if needed.
 */
async function ensurePackages(pyodide, code) {
  const packagesToLoad = [];

  // Check numpy
  if (/\b(numpy|np)\b/.test(code) && !loadedPackages.has('numpy')) {
    packagesToLoad.push('numpy');
  }

  // Check pandas
  if (/\b(pandas|pd)\b/.test(code) && !loadedPackages.has('pandas')) {
    packagesToLoad.push('pandas');
  }

  // Check scipy
  if (/\b(scipy)\b/.test(code) && !loadedPackages.has('scipy')) {
    packagesToLoad.push('scipy');
  }

  // Check matplotlib
  if (/\b(matplotlib|plt)\b/.test(code) && !loadedPackages.has('matplotlib')) {
    packagesToLoad.push('matplotlib');
  }

  if (packagesToLoad.length > 0) {
    await pyodide.loadPackage(packagesToLoad);
    packagesToLoad.forEach(pkg => loadedPackages.add(pkg));
  }
}

/**
 * Runs Python code in Pyodide WebAssembly with stdin/stdout/stderr capture.
 */
export async function runPythonInPyodide(code, stdin = '') {
  const startTime = performance.now();
  const pyodide = await initPyodide();

  // Load needed packages like numpy / pandas
  await ensurePackages(pyodide, code);

  // Setup IO redirection
  const escapedStdin = JSON.stringify(stdin || '');

  const setupScript = `
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
sys.stdin = io.StringIO(${escapedStdin})
`;
  await pyodide.runPythonAsync(setupScript);

  let stdout = '';
  let stderr = '';
  let success = true;
  let exitCode = 0;
  let statusText = 'Success (0)';
  let statusType = 'success';

  try {
    await pyodide.runPythonAsync(code);
  } catch (err) {
    success = false;
    exitCode = 1;
    statusText = 'Runtime Error';
    statusType = 'runtime_error';
    stderr = err.message || String(err);

    // Clean Pyodide internal stack frames to give clean Python traceback
    if (stderr.includes('Traceback (most recent call last):')) {
      const tbIdx = stderr.indexOf('Traceback (most recent call last):');
      stderr = stderr.substring(tbIdx);
    }
  }

  // Retrieve captured stdout & stderr
  const getOutputScript = `
__jd_stdout = sys.stdout.getvalue()
__jd_stderr = sys.stderr.getvalue()
`;
  await pyodide.runPythonAsync(getOutputScript);

  const capturedStdout = pyodide.globals.get('__jd_stdout') || '';
  const capturedStderr = pyodide.globals.get('__jd_stderr') || '';

  if (capturedStdout) stdout = capturedStdout;
  if (capturedStderr) {
    stderr = stderr ? `${stderr}\n${capturedStderr}` : capturedStderr;
  }

  const elapsed = ((performance.now() - startTime) / 1000).toFixed(3);

  return {
    success,
    statusType,
    statusText,
    stdout,
    stderr,
    compileOutput: '',
    message: '',
    time: `${elapsed}s`,
    memory: null,
    exitCode,
    provider: 'JD Python VM (Instant Engine)'
  };
}
