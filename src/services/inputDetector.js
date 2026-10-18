/**
 * Input Detection Engine for Interactive Terminal
 * Detects whether code in C, C++, Python, or Java requires user input.
 * Extracts any prompt string printed before the input call to present an authentic interactive console.
 */

export function detectInputRequirements(code, language) {
  if (!code || typeof code !== 'string') {
    return { requiresInput: false, promptText: '' };
  }

  let requiresInput = false;
  let promptText = '';

  const clean = code;

  if (language === 'c') {
    // Detect scanf, getchar, gets, fgets, read
    if (/\b(scanf|getchar|gets|fgets)\s*\(/.test(clean)) {
      requiresInput = true;
      // Look for printf prompt immediately before scanf
      const printfMatch = clean.match(/printf\s*\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*\)\s*;\s*[\s\S]*?\bscanf\s*\(/);
      if (printfMatch) {
        promptText = printfMatch[1].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      }
    }
  } else if (language === 'cpp') {
    // Detect cin >>, getline
    if (/\b(cin\s*>>|getline\s*\()/.test(clean)) {
      requiresInput = true;
      // Look for cout prompt immediately before cin
      const coutMatch = clean.match(/(?:std::)?cout\s*<<\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*;\s*[\s\S]*?\bcin\b/);
      if (coutMatch) {
        promptText = coutMatch[1].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      }
    }
  } else if (language === 'python') {
    // Detect input() or sys.stdin
    if (/\b(input\s*\(|sys\.stdin)/.test(clean)) {
      requiresInput = true;
      // Look for prompt inside input("...")
      const inputPrompt = clean.match(/input\s*\(\s*["']([^"']+)["']\s*\)/);
      if (inputPrompt) {
        promptText = inputPrompt[1];
      } else {
        const printPrompt = clean.match(/print\s*\(\s*["']([^"']+)["']\s*\)\s*[\s\S]*?\binput\b/);
        if (printPrompt) {
          promptText = printPrompt[1] + '\n';
        }
      }
    }
  } else if (language === 'java') {
    // Detect Scanner or BufferedReader
    if (/\b(Scanner|readLine|System\.in)\b/.test(clean)) {
      requiresInput = true;
      const printMatch = clean.match(/System\.out\.print(?:ln)?\s*\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*\)\s*;\s*[\s\S]*?(?:Scanner|\.next|\.readLine)/);
      if (printMatch) {
        promptText = printMatch[1].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      }
    }
  }

  // Fallback prompt if input is expected but no prompt string was hardcoded
  if (requiresInput && !promptText) {
    promptText = 'Enter input: ';
  }

  return { requiresInput, promptText };
}
