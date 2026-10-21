import React, { useRef, useState, useMemo, useEffect } from 'react';
import { 
  FileCode, 
  X, 
  Plus, 
  Check, 
  FolderTree,
  Sparkles,
  Package,
  Braces,
  Terminal
} from 'lucide-react';
import { COMPLETIONS_BY_LANG } from '../constants/completions';
import { highlightCode } from '../utils/syntaxHighlighter';

export function EditorPanel({
  selectedLanguage,
  files,
  activeFileId,
  onSelectFile,
  onCloseFile,
  onAddFile,
  code,
  onChangeCode,
  settings,
  onUpdateCursor,
  onRunCode,
  isExplorerOpen,
  onToggleExplorer
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const preRef = useRef(null);

  const [activeLine, setActiveLine] = useState(1);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // Active working file
  const activeFile = useMemo(() => {
    return (files || []).find((f) => f.id === activeFileId) || files?.[0];
  }, [files, activeFileId]);

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState(0);
  const [hasNavigatedSuggestions, setHasNavigatedSuggestions] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 40, left: 16 });
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Close autocomplete on language switch
  useEffect(() => {
    setShowAutocomplete(false);
  }, [selectedLanguage.id]);

  // Syntax highlighting markup
  const highlightedCodeHtml = useMemo(() => {
    return highlightCode(code, selectedLanguage.id);
  }, [code, selectedLanguage.id]);

  // Calculate line numbers
  const lines = useMemo(() => {
    return (code || '').split('\n');
  }, [code]);

  const totalLines = lines.length;

  // Sync scroll between textarea, syntax highlighting layer, and line numbers gutter
  const handleScroll = () => {
    if (textareaRef.current) {
      const top = textareaRef.current.scrollTop;
      const left = textareaRef.current.scrollLeft;

      if (gutterRef.current) {
        gutterRef.current.scrollTop = top;
      }
      if (preRef.current) {
        preRef.current.scrollTop = top;
        preRef.current.scrollLeft = left;
      }
    }
    // Dismiss suggestions on scrolling
    if (showAutocomplete) {
      setShowAutocomplete(false);
    }
  };

  // Automatically keep cursor and active line comfortably visible in the viewport
  const ensureCursorVisible = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const pos = textarea.selectionStart;
    const textBefore = (textarea.value || '').substring(0, pos);
    const lineCount = textBefore.split('\n').length;
    const lineHeightPx = 25.6; // 1.6rem * 16px
    const cursorY = lineCount * lineHeightPx;
    const visibleTop = textarea.scrollTop;
    const visibleBottom = textarea.scrollTop + textarea.clientHeight;

    // Scroll down if near or below viewport bottom
    if (cursorY + lineHeightPx * 2 > visibleBottom) {
      textarea.scrollTop = Math.max(0, cursorY - textarea.clientHeight + (lineHeightPx * 3));
    } else if (cursorY - lineHeightPx < visibleTop) {
      textarea.scrollTop = Math.max(0, cursorY - (lineHeightPx * 2));
    }

    if (gutterRef.current) {
      gutterRef.current.scrollTop = textarea.scrollTop;
    }
    if (preRef.current) {
      preRef.current.scrollTop = textarea.scrollTop;
      preRef.current.scrollLeft = textarea.scrollLeft;
    }
  };

  // Track cursor position
  const updateCursorPosition = (shouldScroll = false) => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart;
    const textBefore = (code || '').substring(0, pos);
    const lineArr = textBefore.split('\n');
    const lineNum = lineArr.length;
    const colNum = lineArr[lineArr.length - 1].length + 1;

    setActiveLine(lineNum);
    if (onUpdateCursor) {
      onUpdateCursor({ line: lineNum, col: colNum });
    }
    if (shouldScroll) {
      ensureCursorVisible();
    }
  };

  // Helper to detect if cursor is currently inside a string literal or comment
  const isInsideStringOrComment = (textBefore, currentLine, langId) => {
    // Check single-line comments
    if (langId === 'python') {
      const hashIdx = currentLine.indexOf('#');
      if (hashIdx !== -1) return true;
    } else {
      const slashIdx = currentLine.indexOf('//');
      if (slashIdx !== -1) return true;
    }

    // Check quotes: count unescaped quotes on current line up to cursor
    let inDouble = false;
    let inSingle = false;
    for (let i = 0; i < currentLine.length; i++) {
      const ch = currentLine[i];
      const prev = i > 0 ? currentLine[i - 1] : '';
      if (ch === '"' && prev !== '\\') {
        if (!inSingle) inDouble = !inDouble;
      } else if (ch === "'" && prev !== '\\') {
        if (!inDouble) inSingle = !inSingle;
      }
    }
    if (inDouble || inSingle) return true;

    // Check Python triple-quote docstrings
    if (langId === 'python') {
      const tripleDoubleCount = textBefore.split('"""').length - 1;
      const tripleSingleCount = textBefore.split("'''").length - 1;
      if (tripleDoubleCount % 2 === 1 || tripleSingleCount % 2 === 1) {
        return true;
      }
    }

    // Check multi-line /* ... */ comment block
    const lastBlockOpen = textBefore.lastIndexOf('/*');
    const lastBlockClose = textBefore.lastIndexOf('*/');
    if (lastBlockOpen !== -1 && lastBlockOpen > lastBlockClose) {
      return true;
    }

    return false;
  };

  // Intelligent Autocomplete Trigger & Position Calculator
  const checkSuggestions = (newCode, cursorPos) => {
    // If autocomplete is toggled off in settings, don't show
    if (settings?.autocomplete === false) {
      setShowAutocomplete(false);
      return;
    }

    const textBefore = (newCode || '').substring(0, cursorPos);
    const lastNewlineIdx = textBefore.lastIndexOf('\n');
    const currentLine = lastNewlineIdx === -1 ? textBefore : textBefore.substring(lastNewlineIdx + 1);

    // 1. SUPPRESS AUTOCOMPLETE COMPLETELY INSIDE STRING QUOTES OR COMMENTS!
    if (isInsideStringOrComment(textBefore, currentLine, selectedLanguage.id)) {
      setShowAutocomplete(false);
      return;
    }

    // Extract current token: ONLY letters, numbers, underscore, or '#' at start.
    // Explicitly avoids symbols like '==', '=', '(', ')', etc.
    const match = currentLine.match(/([a-zA-Z_][a-zA-Z0-9_]*|#[a-zA-Z0-9_]*)$/);
    const currentToken = match ? match[1] : '';
    const trimmedLine = currentLine.trim();

    // Do not trigger on empty string, punctuation, or single non-# characters
    if (!currentToken || (currentToken.length < 2 && !currentToken.startsWith('#'))) {
      setShowAutocomplete(false);
      return;
    }

    const langList = COMPLETIONS_BY_LANG[selectedLanguage.id] || [];
    const tokenLower = currentToken.toLowerCase();
    const lineLower = trimmedLine.toLowerCase();

    // Context filter: are we typing an import statement at the beginning of a line?
    const isTypingImport = 
      lineLower.startsWith('import') || 
      lineLower.startsWith('from') || 
      lineLower.startsWith('#include') ||
      lineLower === 'im' || 
      lineLower === 'imp' ||
      lineLower === '#inc' ||
      lineLower === '#';

    const matches = langList.filter((item) => {
      // Do not suggest imports unless user is actually at the start of an import statement
      if (item.kind === 'module' && !isTypingImport) {
        return false;
      }

      // If user is typing an import, prioritize modules
      if (isTypingImport && item.kind !== 'module') {
        return false;
      }

      // 1. Trigger array match
      if (item.trigger && item.trigger.some(trig => trig.startsWith(tokenLower))) {
        return true;
      }
      // 2. Starts with current token
      if (item.label.toLowerCase().startsWith(tokenLower)) return true;
      if (item.insertText.toLowerCase().startsWith(tokenLower)) return true;

      // 3. Match word prefix in multi-word labels (e.g. 'randint' in 'random.randint')
      const words = item.label.toLowerCase().split(/[\s\._\(\)]+/);
      if (words.some(w => w.startsWith(tokenLower))) return true;

      return false;
    });

    if (matches.length > 0) {
      setSuggestions(matches.slice(0, 7));
      setSelectedSuggestionIdx(0);
      setHasNavigatedSuggestions(false); // Reset arrow navigation flag on each new suggestion list

      // Compute visual cursor offset anchored cleanly to code margin
      const lineArr = textBefore.split('\n');
      const lineNum = lineArr.length;
      const editorHeight = textareaRef.current?.clientHeight || 400;
      const scrollTop = textareaRef.current?.scrollTop || 0;
      const lineY = (lineNum * 25.6) - scrollTop;

      // Position right below the active line, or above if near bottom
      let topOffset = lineY + 28;
      if (topOffset + 220 > editorHeight) {
        topOffset = Math.max(12, lineY - 210);
      }

      setDropdownPos({
        top: Math.max(12, Math.min(topOffset, editorHeight - 220)),
        left: 16 // Stably anchored to left code margin
      });
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  // Apply suggestion at cursor position
  const applySuggestion = (item) => {
    if (!item || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const pos = textarea.selectionStart;
    const textBefore = code.substring(0, pos);
    const textAfter = code.substring(pos);

    const lastNewlineIdx = textBefore.lastIndexOf('\n');
    const currentLine = lastNewlineIdx === -1 ? textBefore : textBefore.substring(lastNewlineIdx + 1);
    const match = currentLine.match(/([a-zA-Z_][a-zA-Z0-9_]*|#[a-zA-Z0-9_]*)$/);
    const currentToken = match ? match[1] : '';

    // If item is full-line import or module, replace cleanly from after line indentation
    let prefix = textBefore.substring(0, textBefore.length - currentToken.length);
    if (item.kind === 'module') {
      const matchIndent = currentLine.match(/^(\s*)/);
      const indent = matchIndent ? matchIndent[1] : '';
      prefix = (lastNewlineIdx === -1 ? '' : textBefore.substring(0, lastNewlineIdx + 1)) + indent;
    }
    const newFullCode = prefix + item.insertText + textAfter;

    onChangeCode(newFullCode);
    setShowAutocomplete(false);
    setHasNavigatedSuggestions(false);

    requestAnimationFrame(() => {
      const newPos = prefix.length + (item.cursorOffset ?? item.insertText.length);
      textarea.selectionStart = textarea.selectionEnd = newPos;
      textarea.focus();
      updateCursorPosition(true);
    });
  };

  // Handle creating a new file for the current language
  const handleCreateSubmit = (e) => {
    e?.preventDefault();
    let name = newFileName.trim();
    if (!name) {
      setIsCreatingFile(false);
      return;
    }

    // Enforce proper extension for the current language
    const ext = selectedLanguage.extension;
    if (!name.endsWith(ext)) {
      name = `${name}${ext}`;
    }

    onAddFile(name);
    setNewFileName('');
    setIsCreatingFile(false);
  };

  // Keystroke handler (Tab indent, Auto-close, Enter indent, CTRL+/, and CTRL+ENTER TO RUN)
  const handleKeyDown = (e) => {
    // Priority: Ctrl + Enter or Cmd + Enter to Compile & Run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      setShowAutocomplete(false);
      if (onRunCode) {
        onRunCode();
      }
      return;
    }

    // Ctrl + / (or Cmd + /) to toggle comment on current line or selection
    if ((e.ctrlKey || e.metaKey) && (e.key === '/' || e.code === 'Slash')) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart, selectionEnd, value } = textarea;
      const isPython = selectedLanguage.id === 'python';
      const commentPrefix = isPython ? '# ' : '// ';
      const commentRegex = isPython ? /^(\s*)#\s?(.*)$/ : /^(\s*)\/\/\s?(.*)$/;

      const firstLineStart = value.substring(0, selectionStart).lastIndexOf('\n') + 1;
      let lastLineEnd = value.indexOf('\n', selectionEnd);
      if (lastLineEnd === -1) lastLineEnd = value.length;

      const targetText = value.substring(firstLineStart, lastLineEnd);
      const targetLines = targetText.split('\n');

      // Check if all non-empty lines are commented
      const nonEmptyLines = targetLines.filter((l) => l.trim().length > 0);
      const allCommented =
        nonEmptyLines.length > 0 &&
        nonEmptyLines.every((l) => {
          const t = l.trim();
          return isPython ? t.startsWith('#') : t.startsWith('//');
        });

      let newLines;
      if (allCommented) {
        // Uncomment all
        newLines = targetLines.map((line) => {
          const m = line.match(commentRegex);
          return m ? m[1] + m[2] : line;
        });
      } else {
        // Comment all non-empty lines
        newLines = targetLines.map((line) => {
          if (targetLines.length > 1 && line.trim().length === 0) return line;
          const m = line.match(/^(\s*)(.*)$/);
          return m ? m[1] + commentPrefix + m[2] : commentPrefix + line;
        });
      }

      const replacement = newLines.join('\n');
      const newCode = value.substring(0, firstLineStart) + replacement + value.substring(lastLineEnd);
      onChangeCode(newCode);

      requestAnimationFrame(() => {
        textarea.selectionStart = firstLineStart;
        textarea.selectionEnd = firstLineStart + replacement.length;
        updateCursorPosition(true);
      });
      return;
    }

    // Ctrl + B to toggle explorer
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      if (onToggleExplorer) {
        onToggleExplorer();
      }
      return;
    }

    // Autocomplete dropdown navigation & selection
    if (showAutocomplete && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHasNavigatedSuggestions(true);
        setSelectedSuggestionIdx((prev) => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHasNavigatedSuggestions(true);
        setSelectedSuggestionIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        applySuggestion(suggestions[selectedSuggestionIdx]);
        return;
      }
      if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
        if (hasNavigatedSuggestions) {
          e.preventDefault();
          applySuggestion(suggestions[selectedSuggestionIdx]);
          return;
        } else {
          // User pressed Enter to go to the next line: dismiss dropdown and do NOT hijack Enter!
          setShowAutocomplete(false);
          // Fall through to standard Enter key indentation below
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowAutocomplete(false);
        return;
      }
    }

    // Auto-dismiss autocomplete on navigation keys or operators/punctuation
    if (showAutocomplete) {
      if ([' ', '=', ';', '(', ')', '{', '}', '[', ']', ',', ':', '+', '-', '*', '/', '%', '!', '<', '>', '&', '|'].includes(e.key)) {
        setShowAutocomplete(false);
      }
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
        setShowAutocomplete(false);
      }
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;

    // Tab key handling (4 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const tabStr = ' '.repeat(settings.tabSize || 4);

      if (!e.shiftKey) {
        if (selectionStart === selectionEnd) {
          const newCode = value.substring(0, selectionStart) + tabStr + value.substring(selectionEnd);
          onChangeCode(newCode);
          requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + tabStr.length;
            updateCursorPosition();
          });
        } else {
          const startLine = value.substring(0, selectionStart).lastIndexOf('\n') + 1;
          const endLine = value.indexOf('\n', selectionEnd);
          const block = value.substring(startLine, endLine === -1 ? value.length : endLine);
          const indentedBlock = block.split('\n').map(line => tabStr + line).join('\n');
          const newCode = value.substring(0, startLine) + indentedBlock + (endLine === -1 ? '' : value.substring(endLine));
          onChangeCode(newCode);
          requestAnimationFrame(() => {
            textarea.selectionStart = selectionStart + tabStr.length;
            textarea.selectionEnd = selectionEnd + (tabStr.length * (block.split('\n').length));
            updateCursorPosition();
          });
        }
      } else {
        const tabSize = settings.tabSize || 4;
        const startLine = value.substring(0, selectionStart).lastIndexOf('\n') + 1;
        const endLine = value.indexOf('\n', selectionEnd);
        const block = value.substring(startLine, endLine === -1 ? value.length : endLine);
        const unindentedBlock = block.split('\n').map(line => {
          if (line.startsWith(' '.repeat(tabSize))) return line.substring(tabSize);
          if (line.startsWith('\t')) return line.substring(1);
          return line;
        }).join('\n');
        const newCode = value.substring(0, startLine) + unindentedBlock + (endLine === -1 ? '' : value.substring(endLine));
        onChangeCode(newCode);
        requestAnimationFrame(() => {
          textarea.selectionStart = Math.max(startLine, selectionStart - tabSize);
          textarea.selectionEnd = Math.max(startLine, selectionEnd - tabSize);
          updateCursorPosition();
        });
      }
      return;
    }

    // Auto-close brackets & quotes
    if (settings.autoCloseBrackets) {
      const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
      if (pairs[e.key]) {
        e.preventDefault();
        const closeChar = pairs[e.key];
        const selected = value.substring(selectionStart, selectionEnd);
        const newCode = value.substring(0, selectionStart) + e.key + selected + closeChar + value.substring(selectionEnd);
        onChangeCode(newCode);
        requestAnimationFrame(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionEnd + 1;
          updateCursorPosition();
        });
        return;
      }

      if (['}', ')', ']', '"', "'"].includes(e.key) && value[selectionStart] === e.key) {
        e.preventDefault();
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        updateCursorPosition();
        return;
      }
    }

    // Enter key: maintain existing indentation and auto-scroll viewport
    if (e.key === 'Enter') {
      const curLineStart = value.substring(0, selectionStart).lastIndexOf('\n') + 1;
      const curLine = value.substring(curLineStart, selectionStart);
      const match = curLine.match(/^(\s+)/);
      const indent = match ? match[1] : '';

      const trimmed = curLine.trim();
      const extraIndent = (trimmed.endsWith('{') || (trimmed.endsWith(':') && selectedLanguage.id === 'python'))
        ? ' '.repeat(settings.tabSize || 4)
        : '';

      e.preventDefault();
      const insert = '\n' + indent + extraIndent;
      const newCode = value.substring(0, selectionStart) + insert + value.substring(selectionEnd);
      onChangeCode(newCode);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + insert.length;
        updateCursorPosition(true);
      });
      return;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0f1117] overflow-hidden select-text border-r border-[#30363d]" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      {/* LANGUAGE-SPECIFIC FILE TABS STRIP */}
      <div className="h-10 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between overflow-x-auto select-none px-2 shrink-0" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-1.5 h-full">
          {/* Quick Show Workspace button when sidebar is collapsed */}
          {!isExplorerOpen && (
            <button
              onClick={onToggleExplorer}
              title="Open Workspace / File Explorer (Ctrl+B)"
              className="h-7 px-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] hover:text-[#58a6ff] border border-[#30363d] flex items-center gap-1.5 text-xs transition-all mr-1 animate-in fade-in duration-150"
              style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <FolderTree size={13} className="text-[#58a6ff]" style={{ color: 'var(--accent-primary)' }} />
              <span className="font-medium text-[11px]">Workspace</span>
            </button>
          )}

          {/* Only the active working file is shown for a clean, distraction-free header */}
          <div
            className="h-7 px-3 rounded-lg flex items-center gap-2 text-xs font-semibold bg-[#21262d] text-[#58a6ff] border border-[#58a6ff]/40 shadow-xs select-none"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: selectedLanguage.dotColor }}
            />
            <span>{activeFile ? activeFile.name : `main${selectedLanguage.extension}`}</span>
          </div>
        </div>

        {/* Language Badge on right */}
        <div className="hidden sm:flex items-center gap-2 text-[#8b949e] text-xs pr-2">
          <span className="text-[11px] font-mono bg-[#21262d] border border-[#30363d] text-[#8b949e] px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            {selectedLanguage.name} Workspace
          </span>
        </div>
      </div>

      {/* Editor Body */}
      <div 
        className="flex-1 relative flex overflow-hidden font-mono" 
        style={{ fontSize: `${settings.fontSize || 14}px` }}
      >
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 bg-[#161b22] text-[#8b949e] text-right pr-3 select-none py-3 overflow-hidden border-r border-[#30363d] shrink-0 font-mono"
          style={{ 
            lineHeight: '1.6rem',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)'
          }}
        >
          {Array.from({ length: Math.max(totalLines, 20) }).map((_, idx) => {
            const lineNum = idx + 1;
            const isCurrent = lineNum === activeLine;
            return (
              <div
                key={lineNum}
                className={`h-[1.6rem] transition-colors ${
                  isCurrent ? 'text-[#58a6ff] font-bold bg-[#58a6ff]/10' : ''
                }`}
                style={isCurrent ? { color: 'var(--accent-primary)' } : {}}
              >
                {lineNum <= totalLines ? lineNum : ''}
              </div>
            );
          })}
        </div>

        {/* Textarea Code Editor with Real-Time Syntax Highlighting Underlay */}
        <div className="flex-1 relative h-full overflow-hidden bg-[#0f1117]" style={{ backgroundColor: 'var(--bg-primary)' }}>
          {/* Syntax Highlight Preview Layer */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 m-0 p-3 pl-3 pointer-events-none font-mono code-font overflow-hidden whitespace-pre select-none"
            style={{
              fontSize: `${settings.fontSize || 14}px`,
              lineHeight: '1.6rem',
              tabSize: settings.tabSize || 4,
              whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
              wordBreak: 'break-word',
              color: 'var(--text-primary)'
            }}
            dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }}
          />

          {/* Interactive Textarea Layer */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              const newCode = e.target.value;
              onChangeCode(newCode);
              updateCursorPosition();
              checkSuggestions(newCode, e.target.selectionStart);
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={() => updateCursorPosition()}
            onClick={() => {
              updateCursorPosition();
              setShowAutocomplete(false);
            }}
            onBlur={() => {
              setShowAutocomplete(false);
            }}
            onScroll={handleScroll}
            placeholder={
              selectedLanguage.id === 'python'
                ? '# Write your Python code here...\n# Press Ctrl+Enter to compile and run'
                : `// Write your ${selectedLanguage.name} code here...\n// Press Ctrl+Enter to compile and run`
            }
            spellCheck="false"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-[#58a6ff] p-3 pl-3 resize-none outline-none font-mono code-font overflow-auto select-text whitespace-pre placeholder:text-[#8b949e]/60 placeholder:italic selection:bg-[#58a6ff]/35"
            style={{
              fontSize: `${settings.fontSize || 14}px`,
              lineHeight: '1.6rem',
              tabSize: settings.tabSize || 4,
              whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
              wordBreak: 'break-word',
              caretColor: 'var(--accent-primary, #58a6ff)'
            }}
          />

          {/* INTELLIGENT CODE AUTOCOMPLETE DROPDOWN */}
          {showAutocomplete && suggestions.length > 0 && (
            <div
              style={{
                top: `${dropdownPos.top}px`,
                left: `${dropdownPos.left}px`,
                maxWidth: '380px',
                minWidth: '290px',
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
              }}
              className="absolute z-50 border rounded-xl shadow-2xl shadow-black/90 overflow-hidden animate-in fade-in zoom-in-95 duration-100 font-sans"
            >
              {/* Header */}
              <div 
                className="h-6 px-2.5 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between text-[10px] text-[#8b949e] font-semibold tracking-wide uppercase select-none"
                style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <span className="flex items-center gap-1 text-[#58a6ff]" style={{ color: 'var(--accent-primary)' }}>
                  <Sparkles size={11} />
                  <span>Suggestions</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono lowercase">Tab or ↵</span>
                  <button
                    onClick={() => setShowAutocomplete(false)}
                    className="text-[#8b949e] hover:text-[#e6edf3] p-0.5 rounded"
                    title="Dismiss (Esc)"
                  >
                    <X size={10} />
                  </button>
                </div>
              </div>

              {/* Suggestions List */}
              <div className="max-h-56 overflow-y-auto p-1 space-y-0.5 select-none">
                {suggestions.map((item, idx) => {
                  const isHighlighted = idx === selectedSuggestionIdx;
                  return (
                    <div
                      key={idx}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applySuggestion(item);
                      }}
                      onMouseEnter={() => setSelectedSuggestionIdx(idx)}
                      className={`px-2 py-1.5 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                        isHighlighted
                          ? 'bg-[#21262d] text-[#e6edf3] border-l-2 border-[#58a6ff]'
                          : 'text-[#8b949e] hover:bg-[#21262d]/60 hover:text-[#e6edf3]'
                      }`}
                      style={
                        isHighlighted
                          ? { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderLeftColor: 'var(--accent-primary)' }
                          : { color: 'var(--text-secondary)' }
                      }
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {item.kind === 'module' && <Package size={13} className="text-[#58a6ff] shrink-0" style={{ color: 'var(--accent-primary)' }} />}
                        {item.kind === 'function' && <Terminal size={13} className="text-[#3fb950] shrink-0" style={{ color: 'var(--accent-success)' }} />}
                        {item.kind === 'snippet' && <Braces size={13} className="text-purple-400 shrink-0" />}
                        <span className="font-mono text-xs text-[#e6edf3] truncate font-medium" style={{ color: 'var(--text-primary)' }}>
                          {item.label}
                        </span>
                      </div>

                      <span 
                        className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase shrink-0 bg-[#0f1117] text-[#8b949e] border border-[#30363d]"
                        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                      >
                        {item.kind}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Item Description Footer */}
              {suggestions[selectedSuggestionIdx]?.detail && (
                <div 
                  className="px-2.5 py-1.5 bg-[#0f1117] border-t border-[#30363d] text-[11px] text-[#8b949e] truncate font-sans select-none"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {suggestions[selectedSuggestionIdx].detail}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
