/**
 * High-Performance Client-Side AI Error Explainer & Debugger
 * Zero API Keys required • Zero Cost • 100% Offline Capable • Sub-millisecond Execution
 * Analyzes Python, C, C++, and Java syntax & runtime errors and provides 1-click code fixes.
 */

export function analyzeError({ language, errorText, code }) {
  if (!errorText && errorText !== '') return null;

  const rawErr = String(errorText || '');
  const lines = (code || '').split('\n');

  // Helper to extract line number from error text
  const extractLineNumber = () => {
    // Python: File "...", line 4, in ...
    const pyMatch = rawErr.match(/line (\d+)/i);
    if (pyMatch) return parseInt(pyMatch[1], 10);

    // C/C++ (GCC/Clang): prog.c:4:5: error: ...
    const cMatch = rawErr.match(/:(\d+):(?:\d+:)?\s*(?:error|warning|fatal error):/i);
    if (cMatch) return parseInt(cMatch[1], 10);

    // Java: Main.java:4: error: ...
    const javaMatch = rawErr.match(/:(\d+):\s*error:/i);
    if (javaMatch) return parseInt(javaMatch[1], 10);

    // Generic fallback for any ":line 4:" or "(4)"
    const genMatch = rawErr.match(/(?:line|:)\s*(\d+)/i);
    return genMatch ? parseInt(genMatch[1], 10) : null;
  };

  const lineNum = extractLineNumber();
  const faultyLine = (lineNum && lineNum <= lines.length) ? lines[lineNum - 1] : '';

  // -------------------------------------------------------------
  // 1. PYTHON DIAGNOSTICS & SMART REPAIR
  // -------------------------------------------------------------
  if (language === 'python') {
    // Missing colon ':' at end of header
    if (rawErr.includes('SyntaxError') && (rawErr.includes('expected \':\'') || (faultyLine && /^\s*(if|elif|else|for|while|def|class|with|try|except|finally)\b/.test(faultyLine) && !faultyLine.trim().endsWith(':')))) {
      const fixedLine = faultyLine.trimEnd() + ':';
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'SyntaxError: Missing Colon',
        line: lineNum,
        explanation: 'In Python, control flow statements (like if, for, while, def, class) must end with a colon (:).',
        cause: 'The Python grammar requires a colon to denote the beginning of an indented block.',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always put a colon ":" at the end of if, else, for, while, def, and class headers.'
      };
    }

    // Assignment inside condition: if x = 5:
    if (rawErr.includes('SyntaxError') && (rawErr.includes('cannot assign') || (faultyLine && /^\s*(if|elif|while)\b.*[^=!<>]=[^=]/.test(faultyLine)))) {
      const fixedLine = faultyLine.replace(/([^=!<>\s]+)\s*=\s*([^=]+)/, '$1 == $2');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'SyntaxError: Assignment in Condition',
        line: lineNum,
        explanation: 'You used a single equals sign (=) instead of a comparison operator (==) in your condition.',
        cause: 'In Python, "=" is used to assign values to variables, whereas "==" is used for equality checks.',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Use "==" when comparing two values for equality in if/while conditions.'
      };
    }

    // IndentationError
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
        tip: 'Always use 4 spaces to indent lines under if, for, while, or def statements.'
      };
    }

    // NameError: name is not defined
    const nameMatch = rawErr.match(/name '(\w+)' is not defined/);
    if (nameMatch) {
      const varName = nameMatch[1];
      const commonModules = {
        np: 'import numpy as np\n',
        numpy: 'import numpy as np\n',
        pd: 'import pandas as pd\n',
        pandas: 'import pandas as pd\n',
        math: 'import math\n',
        random: 'import random\n',
        sys: 'import sys\n',
        os: 'import os\n',
        time: 'import time\n',
        json: 'import json\n',
        sqrt: 'from math import sqrt\n',
        randint: 'from random import randint\n'
      };

      if (commonModules[varName]) {
        const fixCode = commonModules[varName] + code;
        return {
          type: `NameError: Missing Module '${varName}'`,
          line: lineNum,
          explanation: `The identifier "${varName}" is part of a library that has not been imported yet.`,
          cause: `Python does not know what "${varName}" refers to until you import it.`,
          originalLine: faultyLine,
          suggestedLine: commonModules[varName].trim(),
          fixCode: fixCode,
          tip: `Add "${commonModules[varName].trim()}" at the top of your script.`
        };
      }

      return {
        type: `NameError: Undefined Variable '${varName}'`,
        line: lineNum,
        explanation: `Variable or function "${varName}" is referenced before being assigned or created.`,
        cause: `Check for spelling mistakes, or ensure "${varName} = ..." is executed before line ${lineNum || 'this line'}.`,
        originalLine: faultyLine,
        suggestedLine: `${varName} = 0  # Initialized\n${faultyLine}`,
        fixCode: null,
        tip: `Initialize "${varName}" with a value before reading from it.`
      };
    }

    // ZeroDivisionError
    if (rawErr.includes('ZeroDivisionError')) {
      return {
        type: 'ZeroDivisionError: Division by Zero',
        line: lineNum,
        explanation: 'The code attempted to divide a number by 0, which is mathematically undefined.',
        cause: 'A denominator evaluated to zero during runtime.',
        originalLine: faultyLine,
        suggestedLine: `if divisor != 0:\n    ${faultyLine.trim()}`,
        fixCode: null,
        tip: 'Add an "if" check to verify the divisor is not zero before dividing.'
      };
    }

    // IndexError
    if (rawErr.includes('IndexError')) {
      return {
        type: 'IndexError: List Index Out of Range',
        line: lineNum,
        explanation: 'You tried to access an item in a list using an index that does not exist.',
        cause: 'Python uses 0-based indexing. For a list with N items, valid indices are from 0 to N-1.',
        originalLine: faultyLine,
        suggestedLine: faultyLine,
        fixCode: null,
        tip: 'Check "len(my_list)" or use a for-in loop "for item in my_list:" instead of manual indexing.'
      };
    }
  }

  // -------------------------------------------------------------
  // 2. C & C++ DIAGNOSTICS & SMART REPAIR
  // -------------------------------------------------------------
  if (language === 'c' || language === 'cpp') {
    // Missing semicolon ';'
    if (rawErr.includes("expected ';'") || rawErr.includes("expected ';' before") || rawErr.includes("expected ';' after")) {
      // Find the line that actually needs the semicolon (could be lineNum or lineNum - 1)
      let targetIdx = (lineNum && lineNum > 0) ? lineNum - 1 : 0;
      let targetLine = lines[targetIdx] || '';

      if (targetIdx > 0 && (!targetLine.trim() || targetLine.trim().startsWith('return') || targetLine.trim().startsWith('}'))) {
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
        cause: "The compiler reached the next statement or closing bracket while expecting the current statement to end.",
        originalLine: targetLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: "Remember to put a semicolon ';' at the end of variable declarations, assignments, and function calls."
      };
    }

    // scanf without & ampersand (classic memory crash / segfault)
    if (faultyLine && /scanf\s*\(\s*"%[dulfc]"\s*,\s*([a-zA-Z_]\w*)\s*\)/.test(faultyLine)) {
      const fixedLine = faultyLine.replace(/scanf\s*\(\s*("%[dulfc]")\s*,\s*([a-zA-Z_]\w*)\s*\)/, 'scanf($1, &$2)');
      const updatedLines = [...lines];
      if (lineNum) updatedLines[lineNum - 1] = fixedLine;

      return {
        type: 'Memory Bug: Missing Ampersand (&) in scanf',
        line: lineNum,
        explanation: 'scanf() requires the memory address of the variable (&var) to store the entered value.',
        cause: 'Passing a variable by value to scanf causes an invalid memory write, leading to a Segmentation Fault or garbage value.',
        originalLine: faultyLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: 'Always pass "&variable" to scanf for primitive types (int, float, char).'
      };
    }

    // Missing #include <stdio.h> / <iostream>
    if (rawErr.includes("'printf' undeclared") || rawErr.includes("'scanf' undeclared")) {
      const fixCode = '#include <stdio.h>\n' + code;
      return {
        type: 'Missing Header: <stdio.h>',
        line: lineNum || 1,
        explanation: 'The printf() and scanf() standard I/O functions require the <stdio.h> header.',
        cause: 'C functions must be declared before they can be called.',
        originalLine: faultyLine,
        suggestedLine: '#include <stdio.h>',
        fixCode: fixCode,
        tip: 'Include <stdio.h> at the very top of your C file.'
      };
    }

    if (rawErr.includes("'cout' was not declared") || rawErr.includes("'cin' was not declared")) {
      const fixCode = '#include <iostream>\nusing namespace std;\n\n' + code;
      return {
        type: 'Missing Header or Namespace: <iostream>',
        line: lineNum || 1,
        explanation: 'cout and cin are defined in <iostream> under the "std" namespace.',
        cause: 'The C++ compiler could not find "cout" or "cin" in the global namespace.',
        originalLine: faultyLine,
        suggestedLine: '#include <iostream>\nusing namespace std;',
        fixCode: fixCode,
        tip: 'Add "#include <iostream>" and "using namespace std;" at the top of C++ programs.'
      };
    }

    // Segmentation fault
    if (rawErr.includes('Segmentation fault') || rawErr.includes('SIGSEGV')) {
      return {
        type: 'Runtime Error: Segmentation Fault (SIGSEGV)',
        line: lineNum,
        explanation: 'The program crashed because it attempted to read or write to an invalid memory location.',
        cause: 'Common causes: accessing an array out of bounds, dereferencing a NULL pointer, or missing "&" in scanf.',
        originalLine: faultyLine,
        suggestedLine: faultyLine,
        fixCode: null,
        tip: 'Verify array indices are within bounds (0 to size-1) and check all pointers before accessing them.'
      };
    }

    // Undefined reference to main
    if (rawErr.includes('undefined reference to `main\'') || rawErr.includes('undefined reference to `WinMain\'')) {
      const fixCode = (language === 'c')
        ? code + '\n\nint main(void) {\n    return 0;\n}\n'
        : code + '\n\nint main() {\n    return 0;\n}\n';

      return {
        type: 'Linker Error: Missing main() Function',
        line: null,
        explanation: 'Every executable C/C++ program must have a main() function as its entry point.',
        cause: 'The compiler and linker could not find the main() function to start program execution.',
        originalLine: '',
        suggestedLine: 'int main() { return 0; }',
        fixCode: fixCode,
        tip: 'Define "int main(void)" in C or "int main()" in C++.'
      };
    }
  }

  // -------------------------------------------------------------
  // 3. JAVA DIAGNOSTICS & SMART REPAIR
  // -------------------------------------------------------------
  if (language === 'java') {
    // Missing semicolon in Java
    if (rawErr.includes("';' expected")) {
      const targetIdx = (lineNum && lineNum > 0) ? lineNum - 1 : 0;
      const targetLine = lines[targetIdx] || '';
      const fixedLine = targetLine.trimEnd() + ';';
      const updatedLines = [...lines];
      updatedLines[targetIdx] = fixedLine;

      return {
        type: "SyntaxError: Missing Semicolon ';'",
        line: targetIdx + 1,
        explanation: "Java requires every statement to end with a semicolon (;).",
        cause: "The Java compiler reached the next token while waiting for ';' to terminate the statement.",
        originalLine: targetLine,
        suggestedLine: fixedLine,
        fixCode: updatedLines.join('\n'),
        tip: "Add a semicolon ';' to the end of Java statements."
      };
    }

    // cannot find symbol (Scanner)
    if (rawErr.includes("cannot find symbol") && rawErr.includes("class Scanner")) {
      const fixCode = "import java.util.Scanner;\n\n" + code;
      return {
        type: "Missing Import: java.util.Scanner",
        line: lineNum || 1,
        explanation: "The Scanner class is part of the java.util package and must be imported.",
        cause: "Java does not automatically import classes outside java.lang.",
        originalLine: faultyLine,
        suggestedLine: "import java.util.Scanner;",
        fixCode: fixCode,
        tip: "Add 'import java.util.Scanner;' at line 1 of your Java file."
      };
    }

    // NullPointerException
    if (rawErr.includes("NullPointerException")) {
      return {
        type: "Runtime Error: NullPointerException",
        line: lineNum,
        explanation: "Your code attempted to invoke a method or access a field on an object reference that is null.",
        cause: "An object was declared but not initialized (e.g. 'String s = null; s.length();').",
        originalLine: faultyLine,
        suggestedLine: `if (obj != null) { ... }`,
        fixCode: null,
        tip: "Ensure objects are initialized with 'new' or check != null before calling methods."
      };
    }
  }

  // -------------------------------------------------------------
  // 4. GENERIC INTELLIGENT FALLBACK
  // -------------------------------------------------------------
  // Clean up error message for display
  const cleanErrMsg = rawErr.split('\n').filter(l => l.trim() && !l.includes('internal error')).slice(0, 3).join('\n');

  return {
    type: `${language.toUpperCase()} Execution / Compiler Notice`,
    line: lineNum,
    explanation: cleanErrMsg || 'An error was encountered during execution.',
    cause: 'Review the line indicated below and verify syntax, variable declarations, and brackets.',
    originalLine: faultyLine,
    suggestedLine: faultyLine,
    fixCode: null,
    tip: 'Make sure brackets, parentheses, and quotes are properly paired and statements are complete.'
  };
}
