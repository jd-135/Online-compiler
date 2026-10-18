/**
 * Ultra-fast, lightweight syntax highlighter for JD COMPILER.
 * Produces themed HTML markup in < 1ms without external dependencies.
 * Specially highlights functions (like print, scanf, printf) in distinct Programiz-style colors.
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const KEYWORDS_BY_LANG = {
  python: new Set([
    'def', 'class', 'return', 'if', 'elif', 'else', 'while', 'for', 'in',
    'try', 'except', 'finally', 'with', 'as', 'import', 'from', 'lambda',
    'pass', 'break', 'continue', 'raise', 'global', 'nonlocal', 'assert',
    'async', 'await', 'yield', 'del', 'is', 'not', 'and', 'or', 'True',
    'False', 'None'
  ]),
  c: new Set([
    'return', 'if', 'else', 'switch', 'case', 'default', 'while', 'do',
    'for', 'break', 'continue', 'goto', 'sizeof', 'struct', 'union',
    'enum', 'typedef', 'const', 'static', 'extern', 'auto', 'register',
    'volatile', 'inline'
  ]),
  cpp: new Set([
    'return', 'if', 'else', 'switch', 'case', 'default', 'while', 'do',
    'for', 'break', 'continue', 'goto', 'sizeof', 'class', 'struct',
    'union', 'enum', 'typedef', 'const', 'static', 'extern', 'auto',
    'register', 'volatile', 'public', 'private', 'protected', 'virtual',
    'override', 'friend', 'template', 'typename', 'namespace', 'using',
    'new', 'delete', 'try', 'catch', 'throw', 'this', 'nullptr', 'true',
    'false', 'inline', 'constexpr'
  ]),
  java: new Set([
    'public', 'private', 'protected', 'static', 'final', 'abstract',
    'synchronized', 'volatile', 'transient', 'native', 'class', 'interface',
    'enum', 'extends', 'implements', 'package', 'import', 'return', 'if',
    'else', 'switch', 'case', 'default', 'while', 'do', 'for', 'break',
    'continue', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this',
    'super', 'instanceof', 'null', 'true', 'false'
  ])
};

const TYPES_BY_LANG = {
  c: new Set([
    'int', 'float', 'double', 'char', 'void', 'bool', 'long', 'short',
    'unsigned', 'signed', 'size_t', 'uint8_t', 'uint16_t', 'uint32_t',
    'uint64_t', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'FILE'
  ]),
  cpp: new Set([
    'int', 'float', 'double', 'char', 'void', 'bool', 'long', 'short',
    'unsigned', 'signed', 'size_t', 'string', 'vector', 'map', 'set',
    'pair', 'queue', 'stack', 'deque', 'unordered_map', 'unordered_set'
  ]),
  java: new Set([
    'void', 'int', 'float', 'double', 'char', 'boolean', 'byte', 'short',
    'long', 'String', 'Integer', 'Double', 'Float', 'Boolean', 'List',
    'Map', 'Set', 'ArrayList', 'HashMap', 'Scanner', 'Math', 'System',
    'StringBuilder', 'Arrays', 'Collections'
  ]),
  python: new Set([
    'int', 'float', 'str', 'bool', 'list', 'dict', 'set', 'tuple', 'bytes',
    'object', 'NoneType'
  ])
};

const BUILTIN_FUNCTIONS = new Set([
  // Python built-ins
  'print', 'input', 'len', 'range', 'enumerate', 'zip', 'map', 'filter',
  'sum', 'min', 'max', 'abs', 'round', 'sorted', 'open', 'isinstance',
  'issubclass', 'type', 'id', 'all', 'any', 'bin', 'hex', 'oct', 'chr',
  'ord', 'format', 'dir', 'vars', 'help',
  // C / C++ functions
  'printf', 'scanf', 'puts', 'gets', 'getchar', 'putchar', 'malloc',
  'calloc', 'realloc', 'free', 'exit', 'strlen', 'strcpy', 'strcmp',
  'strcat', 'sqrt', 'pow', 'sin', 'cos', 'tan', 'floor', 'ceil', 'rand',
  'srand', 'time', 'cin', 'cout', 'endl', 'main',
  // Java methods
  'println', 'nextInt', 'nextLine', 'nextDouble', 'next', 'charAt',
  'substring', 'equals', 'size', 'add', 'get', 'remove', 'contains',
  'toString', 'valueOf', 'parseDouble', 'parseInt'
]);

export function highlightCode(code, langId) {
  if (!code) return ' ';

  const keywords = KEYWORDS_BY_LANG[langId] || KEYWORDS_BY_LANG.c;
  const types = TYPES_BY_LANG[langId] || TYPES_BY_LANG.c;

  // Single regex capturing strings, comments, directives, numbers, identifiers, operators, and whitespace
  // Order is crucial: strings and comments must match before identifiers to avoid keyword collision.
  let regex;
  if (langId === 'python') {
    regex = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*)|(\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|([a-zA-Z_]\w*)(\s*\()?|([=+\-*/%<>!&|^~:]+)|(\n|[^\S\r\n]+)|([^\s\w]+)/g;
  } else {
    regex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*)|(\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|([a-zA-Z_]\w*)(\s*\()?|([=+\-*/%<>!&|^~]+)|(\n|[^\S\r\n]+)|([^\s\w]+)/g;
  }

  let result = '';
  let match;

  while ((match = regex.exec(code)) !== null) {
    const [full, commentOrStr, num, word, openParen, op, ws, punct] = match;

    if (commentOrStr) {
      if (commentOrStr.startsWith('//') || commentOrStr.startsWith('/*') || (langId === 'python' && commentOrStr.startsWith('#'))) {
        result += `<span class="hl-comment">${escapeHtml(commentOrStr)}</span>`;
      } else if (commentOrStr.startsWith('#')) {
        // C/C++ preprocessor like #include <stdio.h>
        result += `<span class="hl-preprocessor">${escapeHtml(commentOrStr)}</span>`;
      } else {
        // Strings
        result += `<span class="hl-string">${escapeHtml(commentOrStr)}</span>`;
      }
    } else if (num) {
      result += `<span class="hl-number">${num}</span>`;
    } else if (word) {
      const paren = openParen ? escapeHtml(openParen) : '';
      if (keywords.has(word)) {
        result += `<span class="hl-keyword">${word}</span>${paren}`;
      } else if (types.has(word)) {
        result += `<span class="hl-type">${word}</span>${paren}`;
      } else if (BUILTIN_FUNCTIONS.has(word) || openParen) {
        // Special distinct styling for functions like print, scanf, custom functions
        result += `<span class="hl-function">${word}</span>${paren}`;
      } else {
        result += escapeHtml(word) + paren;
      }
    } else if (op) {
      result += `<span class="hl-operator">${escapeHtml(op)}</span>`;
    } else if (ws) {
      result += ws;
    } else if (punct) {
      result += escapeHtml(punct);
    }
  }

  // Ensure trailing newline renders properly in <pre>
  if (code.endsWith('\n')) {
    result += ' ';
  }

  return result;
}
