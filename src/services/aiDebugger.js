/**
 * High-Performance Client-Side & Hybrid AI Error Explainer & Debugger
 * Zero Cost • 100% Offline Capable • Built-in Heuristics & 50+ Grammar Repair Rules
 * Optional Free Gemini API Key support for open-ended generative debugging.
 */

/**
 * Extracts line number from compiler or runtime error message,
 * strictly filtering out internal runtime/Pyodide frames and capping to valid user code lines.
 */
function extractLineNumber(rawErr, code, language) {
  if (!rawErr) return 1;

  const lines = (code || '').split('\n');
  const maxLines = lines.length || 1;

  // 1. Python: match user frames, filtering out pyodide / lib / internal files
  if (language === 'python') {
    // Look specifically for user frame: File "<exec>", line 1 or File "main.py", line 1
    const userFrameMatches = [...rawErr.matchAll(/File ["'](?:<exec>|<string>|main\.py|script_\d+\.py)["'], line (\d+)/gi)];
    if (userFrameMatches.length > 0) {
      const lastMatch = userFrameMatches[userFrameMatches.length - 1];
      const num = parseInt(lastMatch[1], 10);
      if (num > 0 && num <= maxLines) return num;
    }

    // Look for any File "...", line (\d+) that does NOT mention _pyodide or /lib/
    const allFileMatches = [...rawErr.matchAll(/File ["']([^"']+)["'], line (\d+)/gi)];
    const validFileMatches = allFileMatches.filter(m => !m[1].includes('_pyodide') && !m[1].includes('/lib/') && !m[1].includes('python3'));
    if (validFileMatches.length > 0) {
      const lastMatch = validFileMatches[validFileMatches.length - 1];
      const num = parseInt(lastMatch[2], 10);
      if (num > 0 && num <= maxLines) return num;
    }

    // SyntaxError: (line 1) or line 1
    const syntaxMatches = [...rawErr.matchAll(/(?:line|Line)\s+(\d+)/g)];
    for (const sm of syntaxMatches) {
      const num = parseInt(sm[1], 10);
      if (num > 0 && num <= maxLines) return num;
    }
  }

  // 2. C/C++ (GCC/Clang): prog.c:4:5: error: ...
  const cMatches = [...rawErr.matchAll(/:(\d+):(?:\d+:)?\s*(?:error|warning|fatal error):/gi)];
  if (cMatches.length > 0) {
    const num = parseInt(cMatches[0][1], 10);
    if (num > 0 && num <= maxLines) return num;
  }

  // 3. Java: Main.java:4: error: ...
  const javaMatches = [...rawErr.matchAll(/:(\d+):\s*error:/gi)];
  if (javaMatches.length > 0) {
    const num = parseInt(javaMatches[0][1], 10);
    if (num > 0 && num <= maxLines) return num;
  }

  // 4. Token-based fallback: if error mentions an identifier (e.g. name 'xyz' is not defined), locate line in code!
  const tokenMatch = rawErr.match(/name '(\w+)' is not defined/) || 
                     rawErr.match(/undefined reference to `(\w+)'/) ||
                     rawErr.match(/cannot find symbol.*(?:symbol:\s*(?:variable|method|class)\s+(\w+)|class\s+(\w+))/i);
  if (tokenMatch) {
    const token = tokenMatch[1] || tokenMatch[2];
    if (token) {
      const foundIdx = lines.findIndex(l => new RegExp(`\\b${token}\\b`).test(l));
      if (foundIdx !== -1) return foundIdx + 1;
    }
  }

  return 1;
}

/**
 * Main analysis function:
 * 1. Calls secure backend serverless API (/api/debug) powered by OpenRouter LLM (Zero Client Key Leakage)
 * 2. If user provided a custom Gemini API key in settings, honors that
 * 3. Gracefully falls back to high-speed local expert engine if offline
 */
export async function analyzeErrorAsync({ language, errorText, code, apiKey = '' }) {
  // If user provided a personal custom Gemini API key in settings, try that first
  if (apiKey && apiKey.trim()) {
    try {
      const cloudResult = await callGeminiDebugger({
        language,
        errorText,
        code,
        apiKey: apiKey.trim()
      });
      if (cloudResult) return cloudResult;
    } catch {
      // Fallback
    }
  }

  // 1. Try secure backend OpenRouter proxy (/api/debug)
  try {
    const response = await fetch('/api/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language,
        code,
        errorText
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.analysis) {
        return data.analysis;
      }
    }
  } catch {
    // If backend is unreachable (e.g. offline mode), fall back seamlessly to built-in expert engine
  }

  // 2. High-speed Built-in Expert Engine (< 1ms, 100% offline, zero external dependencies)
  return analyzeError({ language, errorText, code });
}

/**
 * Synchronous Built-in Expert Diagnostics Engine
 */
export function analyzeError({ language, errorText, code }) {
  if (!errorText && errorText !== '') return null;

  const rawErr = String(errorText || '');
  const lines = (code || '').split('\n');
  const lineNum = extractLineNumber(rawErr, code, language);
  const faultyLine = (lineNum && lineNum <= lines.length) ? lines[lineNum - 1] : '';

  // ---------------------------------------------------------------------------
  // 1. PYTHON DIAGNOSTICS & SMART REPAIR
  // ---------------------------------------------------------------------------
  if (language === 'python') {
    // D0) Dynamic 'Did you mean' pattern (Python 3.10+ e.g., NameError: name 'prin' is not defined. Did you mean: 'print'?)
    const generalDidYouMean = rawErr.match(/Did you mean:\s*['"](\w+)['"]/i);
    const unrecogName = rawErr.match(/name\s+['"](\w+)['"]\s+is not defined/i)?.[1] || 
                        rawErr.match(/attribute\s+['"](\w+)['"]/i)?.[1] ||
                        rawErr.match(/['"](\w+)['"]\s+is not defined/i)?.[1];

    if (generalDidYouMean && unrecogName) {
      const wrongWord = unrecogName;
      const correctWord = generalDidYouMean[1];

      // Find line with wrongWord if faultyLine does not contain it
      let targetLineNum = lineNum;
      if (!new RegExp(`\\b${wrongWord}\\b`).test(faultyLine)) {
        const foundIdx = lines.findIndex(l => new RegExp(`\\b${wrongWord}\\b`).test(l));
        if (foundIdx !== -1) targetLineNum = foundIdx + 1;
      }

      const targetLine = (targetLineNum && targetLineNum <= lines.length) ? lines[targetLineNum - 1] : faultyLine;
      const fixedLine = targetLine.replace(new RegExp(`\\b${wrongWord}\\b`), correctWord);
      const updatedLines = [...lines];
      if (targetLineNum && targetLineNum <= updatedLines.length) {
        updatedLines[targetLineNum - 1] = fixedLine;
      }

      return {
        type: `NameError: Typo in '${correctWord}' ('${wrongWord}')`,
        line: targetLineNum,
        explanation: `Python detected that "${wrongWord}" is a typo for "${correctWord}".`,
        cause: `The identifier "${wrongWord}" does not exist. Did you mean to call "${correctWord}()"?`,
        originalLine: targetLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: `Replace "${wrongWord}" with "${correctWord}".`
      };
    }

    // A) Missing colon ':' at end of header
    if (rawErr.includes('SyntaxError') && (rawErr.includes("expected ':'") || (faultyLine && /^\s*(if|elif|else|for|while|def|class|with|try|except|finally)\b/.test(faultyLine) && !faultyLine.trim().endsWith(':')))) {
      const fixedLine = faultyLine.trimEnd() + ':';
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'SyntaxError: Missing Colon (:)',
        line: lineNum,
        explanation: 'In Python, compound statements (if, for, while, def, class, etc.) must end with a colon (:).',
        cause: 'The Python parser expects a colon to mark the start of an indented block.',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always put a colon ":" at the end of if, else, elif, for, while, def, class, try, and except headers.'
      };
    }

    // B) Assignment in condition (if x = 5:)
    if (rawErr.includes('SyntaxError') && (rawErr.includes('cannot assign') || rawErr.includes('invalid syntax') || (faultyLine && /^\s*(if|elif|while)\b.*[^=!<>]=[^=]/.test(faultyLine)))) {
      const fixedLine = faultyLine.replace(/([^=!<>\s]+)\s*=\s*([^=]+)/, '$1 == $2');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'SyntaxError: Assignment (=) in Condition',
        line: lineNum,
        explanation: 'You used a single equals sign (=) instead of an equality comparison (==) inside a condition.',
        cause: 'In Python, "=" assigns a value to a variable, while "==" tests if two values are equal.',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Use "==" for comparison checks in if, elif, and while statements.'
      };
    }

    // C) Missing parentheses in print (Python 2 vs Python 3 syntax)
    if (rawErr.includes("Missing parentheses in call to 'print'") || (faultyLine && /^\s*print\s+[^(]/.test(faultyLine))) {
      const fixedLine = faultyLine.replace(/^\s*print\s+(.+)$/, (match, p1) => {
        const indent = match.match(/^\s*/)[0];
        return `${indent}print(${p1})`;
      });
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'SyntaxError: Missing Parentheses in print()',
        line: lineNum,
        explanation: 'In Python 3, print is a built-in function and requires parentheses: print(...).',
        cause: 'Writing "print x" was allowed in Python 2, but Python 3 strictly requires "print(x)".',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always wrap the content you want to print inside parentheses: print("message").'
      };
    }

    // D) Typo in print() function: prin, prnt, pirnt, pinrt, ptint, pritn, printf
    const printTypoMatch = faultyLine.match(/\b(prnt|pirnt|pinrt|ptint|prin|pritn|printf)\s*\(/);
    if (printTypoMatch || (rawErr.includes("name 'prin' is not defined") || rawErr.includes("name 'prnt' is not defined") || rawErr.includes("name 'pirnt' is not defined") || rawErr.includes("name 'printf' is not defined"))) {
      const typoWord = printTypoMatch ? printTypoMatch[1] : (rawErr.match(/name '(\w+)' is not defined/)?.[1] || 'prin');
      const fixedLine = faultyLine.replace(new RegExp(`\\b${typoWord}\\b`), 'print');
      const updatedLines = [...lines];
      if (lineNum && lineNum <= updatedLines.length) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: `NameError: Typo in 'print' ('${typoWord}')`,
        line: lineNum,
        explanation: `Python does not have a function named "${typoWord}". You likely meant "print".`,
        cause: `Spelling mistype in function name "${typoWord}".`,
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'The standard output function in Python is "print()".'
      };
    }

    // E) Lowercase boolean or null typos: true, false, null, undefined
    const boolNullMatch = faultyLine.match(/\b(true|false|null|undefined)\b/);
    if (boolNullMatch && (rawErr.includes('NameError') || rawErr.includes('is not defined'))) {
      const wrongToken = boolNullMatch[1];
      const correctToken = wrongToken === 'true' ? 'True' : wrongToken === 'false' ? 'False' : 'None';
      const fixedLine = faultyLine.replace(new RegExp(`\\b${wrongToken}\\b`, 'g'), correctToken);
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: `NameError: Lowercase '${wrongToken}' in Python`,
        line: lineNum,
        explanation: `In Python, boolean and null literals are Capitalized: True, False, and None.`,
        cause: `"${wrongToken}" is interpreted as an undefined variable name instead of a language literal.`,
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always use capitalized "True", "False", and "None" in Python.'
      };
    }

    // F) IndentationError
    if (rawErr.includes('IndentationError') || rawErr.includes('expected an indented block')) {
      const prevLine = lineNum && lineNum > 1 ? lines[lineNum - 2] : '';
      const fixedLine = '    ' + faultyLine.trimStart();
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'IndentationError: Indentation Mismatch',
        line: lineNum,
        explanation: 'Python uses whitespace indentation to define code blocks instead of curly braces {}.',
        cause: `The block following "${prevLine.trim() || 'the previous statement'}" requires consistent indentation (usually 4 spaces).`,
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always use 4 spaces to indent lines under if, for, while, def, class, or try statements.'
      };
    }

    // G) TypeError: str + int or int + str (Classic input() error)
    if (rawErr.includes('TypeError') && (rawErr.includes('can only concatenate str') || rawErr.includes('unsupported operand type(s) for +: \'int\' and \'str\'') || rawErr.includes('unsupported operand type(s) for +: \'str\' and \'int\''))) {
      let fixedLine = faultyLine;
      // If code uses input(), suggest int(input(...))
      if (code.includes('input(')) {
        return {
          type: 'TypeError: Combining String & Integer',
          line: lineNum,
          explanation: 'In Python, input() always returns a string (text), which cannot be directly added to a number.',
          cause: 'You attempted to add an integer and a string together using "+" without casting.',
          originalLine: faultyLine,
          suggestedLine: 'num = int(input(...))  # Convert string input to integer',
          fixCode: code.replace(/(\w+)\s*=\s*input\((.*?)\)/g, '$1 = int(input($2))'),
          tip: 'Wrap input() in "int(input())" or "float(input())" when reading numbers from the user.'
        };
      }

      return {
        type: 'TypeError: Cannot Concatenate String and Number',
        line: lineNum,
        explanation: 'In Python, you cannot directly concatenate a string and a number using "+".',
        cause: 'Python requires explicit type conversion. You must wrap numbers in str() or use f-strings.',
        originalLine: faultyLine,
        suggestedLine: `print(f"Result: {my_var}")  # Or str(number)`,
        fixCode: null,
        tip: 'Use f-strings (f"Value is {x}") or str(x) when displaying numbers alongside strings.'
      };
    }

    // H) NameError: Missing Library or Undefined Variable
    const nameMatch = rawErr.match(/name '(\w+)' is not defined/);
    if (nameMatch) {
      const varName = nameMatch[1];
      const COMMON_MODULES = {
        np: 'import numpy as np\n',
        numpy: 'import numpy as np\n',
        pd: 'import pandas as pd\n',
        pandas: 'import pandas as pd\n',
        plt: 'import matplotlib.pyplot as plt\n',
        math: 'import math\n',
        random: 'import random\n',
        sys: 'import sys\n',
        os: 'import os\n',
        time: 'import time\n',
        json: 'import json\n',
        re: 'import re\n',
        datetime: 'import datetime\n',
        collections: 'import collections\n',
        sqrt: 'from math import sqrt\n',
        pi: 'from math import pi\n',
        ceil: 'from math import ceil\n',
        floor: 'from math import floor\n',
        sin: 'from math import sin\n',
        cos: 'from math import cos\n',
        randint: 'from random import randint\n',
        choice: 'from random import choice\n'
      };

      if (COMMON_MODULES[varName]) {
        const fixCode = COMMON_MODULES[varName] + code;
        return {
          type: `NameError: Missing Import '${varName}'`,
          line: lineNum,
          explanation: `The identifier "${varName}" is part of a library that must be imported before use.`,
          cause: `Python does not know what "${varName}" is because the import statement is missing.`,
          originalLine: faultyLine,
          suggestedLine: COMMON_MODULES[varName].trim(),
          fixCode: fixCode,
          tip: `Add "${COMMON_MODULES[varName].trim()}" at line 1 of your script.`
        };
      }

      // Check if variable is used in += or read before initialization
      if (faultyLine && new RegExp(`\\b${varName}\\b`).test(faultyLine)) {
        const initLine = `${varName} = 0\n`;
        const updatedLines = [...lines];
        const insertIdx = lineNum && lineNum > 1 ? lineNum - 1 : 0;
        updatedLines.splice(insertIdx, 0, `${varName} = 0`);

        return {
          type: `NameError: Undefined Variable '${varName}'`,
          line: lineNum,
          explanation: `Variable "${varName}" is referenced before any value has been assigned to it.`,
          cause: `Python variables must be initialized (e.g. "${varName} = 0") before being read or incremented.`,
          originalLine: faultyLine,
          suggestedLine: `${varName} = 0  # Initialized`,
          fixCode: updatedLines.join('\n'),
          tip: `Initialize "${varName} = 0" (or appropriate default) before reading from it.`
        };
      }
    }

    // I) AttributeError: 'list' object has no attribute 'add' -> suggest append
    if (rawErr.includes('AttributeError') && rawErr.includes("'list' object has no attribute 'add'")) {
      const fixedLine = faultyLine.replace(/\.add\s*\(/g, '.append(');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: "AttributeError: 'list' has no 'add' method",
        line: lineNum,
        explanation: 'Python lists use the .append() method to add elements, not .add().',
        cause: '.add() is used on sets, while .append() or .extend() is used on lists.',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Use "my_list.append(item)" to add an item to the end of a list.'
      };
    }

    // J) ZeroDivisionError
    if (rawErr.includes('ZeroDivisionError')) {
      return {
        type: 'ZeroDivisionError: Division by Zero',
        line: lineNum,
        explanation: 'The code attempted to divide a number by 0, which is mathematically impossible.',
        cause: 'A denominator or divisor variable evaluated to zero at runtime.',
        originalLine: faultyLine,
        suggestedLine: `if divisor != 0:\n    ${faultyLine.trim()}`,
        fixCode: null,
        tip: 'Always verify the denominator is not zero using an "if" condition before dividing.'
      };
    }

    // K) IndexError
    if (rawErr.includes('IndexError')) {
      return {
        type: 'IndexError: List Index Out of Range',
        line: lineNum,
        explanation: 'You tried to access a list element at an index that does not exist.',
        cause: 'Python uses 0-based indexing (valid indices are 0 to len - 1). Accessing index == len causes this error.',
        originalLine: faultyLine,
        suggestedLine: faultyLine,
        fixCode: null,
        tip: 'Ensure the index is strictly less than len(my_list), or iterate directly with "for item in my_list:".'
      };
    }

    // L) KeyError
    if (rawErr.includes('KeyError')) {
      const keyMatch = rawErr.match(/KeyError:\s*['"]?(\w+)['"]?/);
      const keyName = keyMatch ? keyMatch[1] : 'key';
      return {
        type: `KeyError: Key '${keyName}' Not in Dictionary`,
        line: lineNum,
        explanation: `The key "${keyName}" does not exist in the dictionary you are indexing.`,
        cause: 'Accessing dict[key] directly raises KeyError when the key was never inserted.',
        originalLine: faultyLine,
        suggestedLine: `dict.get('${keyName}', default_value)`,
        fixCode: null,
        tip: 'Use "my_dict.get(key, default)" or check "if key in my_dict:" before accessing.'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 2. C & C++ DIAGNOSTICS & SMART REPAIR
  // ---------------------------------------------------------------------------
  if (language === 'c' || language === 'cpp') {
    // A) Missing semicolon ';'
    if (rawErr.includes("expected ';'") || rawErr.includes("expected ';' before") || rawErr.includes("expected ';' after")) {
      let targetIdx = (lineNum && lineNum > 0) ? lineNum - 1 : 0;
      let targetLine = lines[targetIdx] || '';

      if (targetIdx > 0 && (!targetLine.trim() || targetLine.trim().startsWith('return') || targetLine.trim().startsWith('}') || targetLine.trim().startsWith('{'))) {
        const prev = lines[targetIdx - 1];
        if (prev && !prev.trim().endsWith(';') && !prev.trim().endsWith('{') && !prev.trim().endsWith('}')) {
          targetIdx = targetIdx - 1;
          targetLine = prev;
        }
      }

      const fixedLine = targetLine.trimEnd() + ';';
      const updatedLines = [...lines];
      updatedLines[targetIdx] = fixedLine;

      return {
        type: "SyntaxError: Missing Semicolon ';'",
        line: targetIdx + 1,
        explanation: "Statements in C/C++ must be terminated with a semicolon (;).",
        cause: "The compiler reached the next statement or closing token while expecting the current statement to end.",
        originalLine: targetLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: "Always end variable declarations, assignments, and function calls with a semicolon (;)."
      };
    }

    // B) scanf without & ampersand (Fatal memory corruption)
    if (faultyLine && /scanf\s*\(\s*"%[dulfc]"\s*,\s*([a-zA-Z_]\w*)\s*\)/.test(faultyLine)) {
      const fixedLine = faultyLine.replace(/scanf\s*\(\s*("%[dulfc]")\s*,\s*([a-zA-Z_]\w*)\s*\)/, 'scanf($1, &$2)');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'Memory Bug: Missing Ampersand (&) in scanf',
        line: lineNum,
        explanation: 'scanf() requires the memory address of the variable (&variable) to store the user input.',
        cause: 'Passing the variable by value causes scanf to treat its current value as a memory pointer, leading to a crash (Segmentation Fault).',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always pass "&variable" to scanf for primitive types (int, float, double, char).'
      };
    }

    // C) Typo in printf: prntf, prinf, print
    const cPrintMatch = faultyLine.match(/\b(prntf|prinf|print|ptintf)\s*\(/);
    if (cPrintMatch || rawErr.includes("undefined reference to `prntf'") || rawErr.includes("implicit declaration of function 'prntf'")) {
      const typo = cPrintMatch ? cPrintMatch[1] : 'prntf';
      const fixedLine = faultyLine.replace(new RegExp(`\\b${typo}\\b`), 'printf');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: `SyntaxError: Typo in 'printf' ('${typo}')`,
        line: lineNum,
        explanation: `In C, the standard output function is named "printf", not "${typo}".`,
        cause: `Typo in function identifier "${typo}".`,
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Use "printf(...)" for formatted console output in C.'
      };
    }

    // D) Missing #include <stdio.h> / <iostream>
    if (rawErr.includes("'printf' undeclared") || rawErr.includes("'scanf' undeclared") || rawErr.includes("implicit declaration of function 'printf'")) {
      const fixCode = '#include <stdio.h>\n' + code;
      return {
        type: 'Missing Header: <stdio.h>',
        line: lineNum || 1,
        explanation: 'The printf() and scanf() standard I/O functions require the <stdio.h> header.',
        cause: 'C functions must be declared before they can be called.',
        originalLine: faultyLine,
        suggestedLine: '#include <stdio.h>',
        fixCode: fixCode,
        tip: 'Include <stdio.h> at line 1 of your C program.'
      };
    }

    // E) Missing #include <stdlib.h> for malloc/free/exit/abs
    if (rawErr.includes("'malloc' undeclared") || rawErr.includes("'free' undeclared") || rawErr.includes("implicit declaration of function 'malloc'")) {
      const fixCode = '#include <stdlib.h>\n' + code;
      return {
        type: 'Missing Header: <stdlib.h>',
        line: lineNum || 1,
        explanation: 'Dynamic memory functions (malloc, free, calloc, realloc) require <stdlib.h>.',
        cause: 'The compiler does not recognize malloc() without the standard library header.',
        originalLine: faultyLine,
        suggestedLine: '#include <stdlib.h>',
        fixCode: fixCode,
        tip: 'Include <stdlib.h> at the top of your file when allocating memory.'
      };
    }

    // F) Missing #include <string.h> for strlen, strcpy, strcmp
    if (rawErr.includes("'strlen' undeclared") || rawErr.includes("'strcpy' undeclared") || rawErr.includes("'strcmp' undeclared")) {
      const fixCode = '#include <string.h>\n' + code;
      return {
        type: 'Missing Header: <string.h>',
        line: lineNum || 1,
        explanation: 'String functions like strlen(), strcpy(), and strcmp() require <string.h>.',
        cause: 'C standard string manipulation utilities reside in <string.h>.',
        originalLine: faultyLine,
        suggestedLine: '#include <string.h>',
        fixCode: fixCode,
        tip: 'Include <string.h> whenever working with C-style strings.'
      };
    }

    // G) Missing #include <math.h> for pow, sqrt, etc.
    if (rawErr.includes("'sqrt' undeclared") || rawErr.includes("'pow' undeclared")) {
      const fixCode = '#include <math.h>\n' + code;
      return {
        type: 'Missing Header: <math.h>',
        line: lineNum || 1,
        explanation: 'Mathematical functions like sqrt() and pow() require the <math.h> header.',
        cause: 'Mathematical prototypes are defined in <math.h>.',
        originalLine: faultyLine,
        suggestedLine: '#include <math.h>',
        fixCode: fixCode,
        tip: 'Add "#include <math.h>" at the top of your program.'
      };
    }

    // H) C++ Missing iostream / using namespace std;
    if (rawErr.includes("'cout' was not declared") || rawErr.includes("'cin' was not declared") || rawErr.includes("'endl' was not declared")) {
      let fixCode = code;
      if (!code.includes('<iostream>')) {
        fixCode = '#include <iostream>\nusing namespace std;\n\n' + fixCode;
      } else if (!code.includes('using namespace std;')) {
        fixCode = fixCode.replace('#include <iostream>', '#include <iostream>\nusing namespace std;');
      }

      return {
        type: 'Missing C++ Header or Namespace: <iostream>',
        line: lineNum || 1,
        explanation: 'cout, cin, and endl are defined in <iostream> under the "std" namespace.',
        cause: 'The C++ compiler could not locate "cout" or "cin" in the current scope.',
        originalLine: faultyLine,
        suggestedLine: '#include <iostream>\nusing namespace std;',
        fixCode: fixCode,
        tip: 'Always include "#include <iostream>" and "using namespace std;" in standard C++ programs.'
      };
    }

    // I) C++ Missing <vector>
    if (rawErr.includes("'vector' was not declared")) {
      const fixCode = '#include <vector>\n' + code;
      return {
        type: 'Missing Header: <vector>',
        line: lineNum || 1,
        explanation: 'std::vector is a dynamic array container defined in the <vector> header.',
        cause: 'The compiler needs <vector> to construct vector objects.',
        originalLine: faultyLine,
        suggestedLine: '#include <vector>',
        fixCode: fixCode,
        tip: 'Add "#include <vector>" at the top of your C++ file.'
      };
    }

    // J) void main() in C / C++
    if (rawErr.includes("return type of 'main' is not 'int'") || rawErr.includes("'::main' must return 'int'")) {
      const fixedCode = code.replace(/\bvoid\s+main\s*\(\s*\)/, 'int main()');
      return {
        type: "Invalid Main Return Type: 'void main()'",
        line: lineNum,
        explanation: 'According to the C and C++ ISO standards, main() must return an int (int main()).',
        cause: '"void main()" is non-standard and rejected by modern compilers.',
        originalLine: faultyLine,
        suggestedLine: 'int main() { ... return 0; }',
        fixCode: fixedCode,
        tip: 'Always declare main as "int main()" and return 0;'
      };
    }

    // K) Missing main function linker error
    if (rawErr.includes('undefined reference to `main\'') || rawErr.includes('undefined reference to `WinMain\'')) {
      const fixCode = (language === 'c')
        ? code + '\n\nint main(void) {\n    return 0;\n}\n'
        : code + '\n\nint main() {\n    return 0;\n}\n';

      return {
        type: 'Linker Error: Missing main() Entry Point',
        line: null,
        explanation: 'Every executable C/C++ program must have a main() function as its entry point.',
        cause: 'The compiler and linker completed compilation but could not find where execution begins.',
        originalLine: '',
        suggestedLine: 'int main() {\n    return 0;\n}',
        fixCode: fixCode,
        tip: 'Define "int main()" to serve as your program\'s starting point.'
      };
    }

    // L) Segmentation fault
    if (rawErr.includes('Segmentation fault') || rawErr.includes('SIGSEGV')) {
      return {
        type: 'Runtime Error: Segmentation Fault (SIGSEGV)',
        line: lineNum,
        explanation: 'The program crashed because it attempted to access restricted memory that does not belong to it.',
        cause: 'Most common reasons: 1. Array index out of bounds, 2. Dereferencing a NULL pointer, 3. Missing "&" in scanf().',
        originalLine: faultyLine,
        suggestedLine: faultyLine,
        fixCode: null,
        tip: 'Check that array indices are between 0 and size-1, and ensure every scanf uses "&" before the variable.'
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 3. JAVA DIAGNOSTICS & SMART REPAIR
  // ---------------------------------------------------------------------------
  if (language === 'java') {
    // A) Missing semicolon in Java
    if (rawErr.includes("';' expected")) {
      const targetIdx = (lineNum && lineNum > 0) ? lineNum - 1 : 0;
      const targetLine = lines[targetIdx] || '';
      const fixedLine = targetLine.trimEnd() + ';';
      const updatedLines = [...lines];
      updatedLines[targetIdx] = fixedLine;

      return {
        type: "SyntaxError: Missing Semicolon ';'",
        line: targetIdx + 1,
        explanation: "Java requires every single statement to be terminated with a semicolon (;).",
        cause: "The Java compiler reached the next line or block while awaiting the closing semicolon.",
        originalLine: targetLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: "Add a semicolon ';' to terminate this statement."
      };
    }

    // B) Missing import Scanner
    if (rawErr.includes("cannot find symbol") && (rawErr.includes("class Scanner") || rawErr.includes("symbol:   class Scanner"))) {
      const fixCode = "import java.util.Scanner;\n\n" + code;
      return {
        type: "Missing Import: java.util.Scanner",
        line: lineNum || 1,
        explanation: "The Scanner class is part of the java.util package and must be explicitly imported.",
        cause: "Java does not automatically import classes outside the standard java.lang package.",
        originalLine: faultyLine,
        suggestedLine: "import java.util.Scanner;",
        fixCode: fixCode,
        tip: "Add 'import java.util.Scanner;' at line 1 of your Java file."
      };
    }

    // C) Missing import ArrayList / List / Arrays
    if (rawErr.includes("cannot find symbol") && (rawErr.includes("class ArrayList") || rawErr.includes("class List") || rawErr.includes("class Arrays") || rawErr.includes("class HashMap"))) {
      const fixCode = "import java.util.*;\n\n" + code;
      return {
        type: "Missing Import: java.util.*",
        line: lineNum || 1,
        explanation: "Data structure collections (ArrayList, List, HashMap, Arrays) reside in the java.util package.",
        cause: "Symbol not found because the package import is missing.",
        originalLine: faultyLine,
        suggestedLine: "import java.util.*;",
        fixCode: fixCode,
        tip: "Add 'import java.util.*;' at the top of your Java file."
      };
    }

    // D) Class name mismatch: class ... is public, should be declared in a file named Main.java
    if (rawErr.includes("is public, should be declared in a file named")) {
      const fixedCode = code.replace(/public\s+class\s+([A-Za-z0-9_]+)/, 'public class Main');
      return {
        type: "Class Name Mismatch: File is Main.java",
        line: lineNum || 1,
        explanation: 'In Java, a public class must match the exact filename (Main.java requires "public class Main").',
        cause: 'The class was declared with a different name than "Main".',
        originalLine: faultyLine,
        suggestedLine: 'public class Main {',
        fixCode: fixedCode,
        tip: 'Rename your public class to "public class Main" so it matches the file name.'
      };
    }

    // E) Non-static method cannot be referenced from static context
    if (rawErr.includes("non-static method") && rawErr.includes("cannot be referenced from a static context")) {
      return {
        type: "Static Context Error: Calling Non-Static Method",
        line: lineNum,
        explanation: 'main() is static, meaning it runs without an instance. It cannot call instance methods directly.',
        cause: 'You attempted to call an instance method inside "public static void main" without creating an object.',
        originalLine: faultyLine,
        suggestedLine: `new Main().myMethod(); // Or add 'static' to the method definition`,
        fixCode: null,
        tip: 'Either declare the method as "static" (e.g. static int myFunc()) or instantiate the class.'
      };
    }

    // F) Array length() method typo in Java (arr.length vs arr.length())
    if (rawErr.includes("cannot find symbol") && rawErr.includes("method length()")) {
      const fixedLine = faultyLine.replace(/\.length\(\)/g, '.length');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: "SyntaxError: 'length' is a Property on Arrays",
        line: lineNum,
        explanation: 'In Java, arrays have a .length property, not a .length() method.',
        cause: 'String uses .length(), but primitive and object arrays use .length (without parentheses).',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Use "arr.length" for arrays, and "str.length()" for strings.'
      };
    }

    // G) NullPointerException
    if (rawErr.includes("NullPointerException")) {
      return {
        type: "Runtime Error: NullPointerException",
        line: lineNum,
        explanation: "Your code attempted to invoke a method or access an attribute on an object reference that is null.",
        cause: "An object was declared but not initialized with 'new', or a function returned null.",
        originalLine: faultyLine,
        suggestedLine: `if (obj != null) { ... }`,
        fixCode: null,
        tip: "Initialize objects with 'new' or add a != null check before invoking methods."
      };
    }
  }

  // ---------------------------------------------------------------------------
  // 4. GENERAL PURPOSE HEURISTIC ENGINE (All Languages)
  // ---------------------------------------------------------------------------
  const cleanErrMsg = rawErr
    .split('\n')
    .filter(l => {
      const trimmed = l.trim();
      return trimmed && 
        !trimmed.startsWith('File "/lib/python') &&
        !trimmed.includes('_pyodide') &&
        !trimmed.includes('python312.zip') &&
        !trimmed.includes('eval_code_async') &&
        !trimmed.includes('run_async') &&
        !trimmed.includes('CodeRunner') &&
        trimmed !== 'PythonError' &&
        !trimmed.includes('internal error') && 
        !trimmed.includes('at org.') && 
        !trimmed.includes('at java.');
    })
    .slice(0, 3)
    .join('\n');

  return {
    type: `${language.toUpperCase()} Diagnostics Notice`,
    line: lineNum,
    explanation: cleanErrMsg || 'An execution or syntax error was detected.',
    cause: faultyLine ? `Examine line ${lineNum}: "${faultyLine.trim()}". Check for missing brackets, typos, or uninitialized variables.` : 'Check syntax and statements around the flagged line.',
    originalLine: faultyLine,
    suggestedLine: faultyLine,
    fixCode: null,
    tip: 'Ensure all parentheses, braces, and quotes are correctly balanced and variables are declared before use.'
  };
}

/**
 * Optional Cloud Generative AI Debugger via Google Gemini 1.5 Flash (Free Tier)
 */
async function callGeminiDebugger({ language, errorText, code, apiKey }) {
  const prompt = `You are an expert compiler and runtime code debugger.
Analyze this ${language} code and the compiler/runtime error below.
Return strictly a valid JSON object matching this schema:
{
  "type": "short category title like SyntaxError: Missing Colon",
  "line": number or null,
  "explanation": "clear 1-2 sentence plain-English explanation of what went wrong",
  "cause": "clear explanation of the root cause and why it happened",
  "originalLine": "offending line from original code or empty string",
  "suggestedLine": "fixed line or empty string",
  "fixCode": "the complete source code with the fix cleanly applied, ready to compile and run",
  "tip": "a helpful 1-sentence tip to prevent this bug in the future"
}

Code:
${code}

Compiler / Runtime Output:
${errorText}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    }),
    signal: AbortSignal.timeout(10000)
  });

  if (!res.ok) {
    throw new Error(`Gemini API returned status ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  const parsed = JSON.parse(text);
  return {
    type: parsed.type || `${language.toUpperCase()} AI Diagnosis`,
    line: parsed.line || null,
    explanation: parsed.explanation || '',
    cause: parsed.cause || '',
    originalLine: parsed.originalLine || '',
    suggestedLine: parsed.suggestedLine || '',
    fixCode: parsed.fixCode || null,
    tip: parsed.tip || '',
    isGenerative: true
  };
}
