import React, { useRef, useEffect, useState, useMemo } from 'react';
import { 
  FileCode2, 
  X, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

export function EditorPanel({
  selectedLanguage,
  onSelectLanguage,
  code,
  onChangeCode,
  isDirty,
  settings,
  onUpdateCursor
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const [activeLine, setActiveLine] = useState(1);

  // Calculate line numbers
  const lines = useMemo(() => {
    return code.split('\n');
  }, [code]);

  const totalLines = lines.length;

  // Sync scroll between textarea and line numbers gutter
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Track cursor position (Line & Col)
  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart;
    const textBefore = code.substring(0, pos);
    const lineArr = textBefore.split('\n');
    const lineNum = lineArr.length;
    const colNum = lineArr[lineArr.length - 1].length + 1;

    setActiveLine(lineNum);
    if (onUpdateCursor) {
      onUpdateCursor({ line: lineNum, col: colNum });
    }
  };

  // Smart keyboard handlers: Tab indentation, auto-closing brackets, enter indentation
  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;

    // Tab key handling (Indent 4 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const tabStr = ' '.repeat(settings.tabSize || 4);

      if (!e.shiftKey) {
        // Simple insert or multiline indent
        if (selectionStart === selectionEnd) {
          const newCode = value.substring(0, selectionStart) + tabStr + value.substring(selectionEnd);
          onChangeCode(newCode);
          requestAnimationFrame(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + tabStr.length;
            updateCursorPosition();
          });
        } else {
          // Multiline indent
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
        // Shift + Tab (Unindent)
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

    // Auto-close brackets and quotes if enabled in settings
    if (settings.autoCloseBrackets) {
      const pairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '"': '"',
        "'": "'"
      };

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

      // Skip over closing bracket if typed directly before it
      if (['}', ')', ']', '"', "'"].includes(e.key) && value[selectionStart] === e.key) {
        e.preventDefault();
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        updateCursorPosition();
        return;
      }
    }

    // Enter key: maintain existing line indentation
    if (e.key === 'Enter') {
      const curLineStart = value.substring(0, selectionStart).lastIndexOf('\n') + 1;
      const curLine = value.substring(curLineStart, selectionStart);
      const match = curLine.match(/^(\s+)/);
      const indent = match ? match[1] : '';

      // If previous line ends with { or : in Python, add an extra level of indentation
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
        updateCursorPosition();
      });
      return;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] overflow-hidden select-text border-r border-[#2b2b2b]">
      {/* File Tabs Header */}
      <div className="h-9 bg-[#252526] border-b border-[#181818] flex items-center justify-between overflow-x-auto select-none px-1">
        <div className="flex items-center h-full">
          {LANGUAGES.map((lang) => {
            const isActive = lang.id === selectedLanguage.id;
            return (
              <div
                key={lang.id}
                onClick={() => onSelectLanguage(lang)}
                className={`h-full flex items-center gap-2 px-3.5 text-xs cursor-pointer border-r border-[#1e1e1e] transition-colors relative group ${
                  isActive
                    ? 'bg-[#1e1e1e] text-white font-medium border-t-2 border-t-[#007acc]'
                    : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#202020] hover:text-[#cccccc]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: lang.dotColor }}
                />
                <span>{lang.filename}</span>

                {/* Dirty dot or Close icon */}
                {isActive && isDirty ? (
                  <span className="w-2 h-2 rounded-full bg-white ml-1 opacity-80" title="Modified" />
                ) : (
                  <span className="text-[#666] group-hover:text-[#aaa] ml-1 text-[11px]">
                    <X size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right side tab utilities */}
        <div className="hidden sm:flex items-center gap-2 px-2 text-[#858585] text-xs">
          <span className="text-[11px] bg-[#1e1e1e] px-2 py-0.5 rounded border border-[#333]">
            {selectedLanguage.tag}
          </span>
        </div>
      </div>

      {/* Editor Body with Line Numbers Gutter */}
      <div className="flex-1 relative flex overflow-hidden font-mono" style={{ fontSize: `${settings.fontSize || 14}px` }}>
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-14 bg-[#1e1e1e] text-[#6e7681] text-right pr-3 select-none py-3 overflow-hidden border-r border-[#282828] shrink-0 font-mono"
          style={{ lineHeight: '1.6rem' }}
        >
          {Array.from({ length: Math.max(totalLines, 20) }).map((_, idx) => {
            const lineNum = idx + 1;
            const isCurrent = lineNum === activeLine;
            return (
              <div
                key={lineNum}
                className={`h-[1.6rem] transition-colors ${
                  isCurrent ? 'text-white font-bold bg-white/5 pr-1' : ''
                }`}
              >
                {lineNum <= totalLines ? lineNum : ''}
              </div>
            );
          })}
        </div>

        {/* Textarea Code Editor */}
        <div className="flex-1 relative h-full overflow-hidden">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChangeCode(e.target.value);
              updateCursorPosition();
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorPosition}
            onClick={updateCursorPosition}
            onScroll={handleScroll}
            spellCheck="false"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-3 pl-3 resize-none outline-none font-mono code-font overflow-auto select-text whitespace-pre"
            style={{
              lineHeight: '1.6rem',
              tabSize: settings.tabSize || 4,
              whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre'
            }}
          />
        </div>
      </div>
    </div>
  );
}
