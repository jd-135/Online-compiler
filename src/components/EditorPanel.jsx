import React, { useRef, useState, useMemo, useEffect } from 'react';
import { 
  FileCode, 
  X, 
  Plus, 
  Check, 
  CornerDownLeft,
  FilePlus2,
  Trash2,
  FolderTree,
  PanelLeftOpen,
  Sparkles,
  Package,
  Braces,
  Terminal
} from 'lucide-react';
import { COMPLETIONS_BY_LANG } from '../constants/completions';

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
  const [activeLine, setActiveLine] = useState(1);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState(0);
  const [dropdownPos, setDropdownPos] = useState({ top: 40, left: 60 });
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Close autocomplete on language switch
  useEffect(() => {
    setShowAutocomplete(false);
  }, [selectedLanguage.id]);

  // Calculate line numbers
  const lines = useMemo(() => {
    return (code || '').split('\n');
  }, [code]);

  const totalLines = lines.length;

  // Sync scroll between textarea and line numbers gutter
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
    // Dismiss suggestions on aggressive scrolling
    if (showAutocomplete) {
      setShowAutocomplete(false);
    }
  };

  // Track cursor position
  const updateCursorPosition = () => {
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

    // Extract current token (letters, numbers, underscore, '#', '.')
    const match = currentLine.match(/([#a-zA-Z0-9_\.]+)$/);
    const currentToken = match ? match[1] : '';
    const trimmedLine = currentLine.trim();

    if (!currentToken && trimmedLine.length < 2) {
      setShowAutocomplete(false);
      return;
    }

    const langList = COMPLETIONS_BY_LANG[selectedLanguage.id] || [];
    const tokenLower = currentToken.toLowerCase();
    const lineLower = trimmedLine.toLowerCase();

    const matches = langList.filter((item) => {
      // 1. Trigger array match
      if (item.trigger && item.trigger.some(trig => trig.startsWith(tokenLower) || tokenLower.startsWith(trig))) {
        return true;
      }
      // 2. Starts with current line or label contains token
      if (item.label.toLowerCase().includes(tokenLower)) return true;
      if (item.insertText.toLowerCase().startsWith(lineLower)) return true;
      return false;
    });

    if (matches.length > 0) {
      setSuggestions(matches.slice(0, 7));
      setSelectedSuggestionIdx(0);

      // Compute visual cursor offset anchored to code margin
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
    const match = currentLine.match(/([#a-zA-Z0-9_\.]+)$/);
    const currentToken = match ? match[1] : '';

    const prefix = textBefore.substring(0, textBefore.length - currentToken.length);
    const newFullCode = prefix + item.insertText + textAfter;

    onChangeCode(newFullCode);
    setShowAutocomplete(false);

    requestAnimationFrame(() => {
      const newPos = prefix.length + (item.cursorOffset ?? item.insertText.length);
      textarea.selectionStart = textarea.selectionEnd = newPos;
      textarea.focus();
      updateCursorPosition();
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

  // Keystroke handler (Tab indent, Auto-close, Enter indent, and CTRL+ENTER TO RUN)
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
        setSelectedSuggestionIdx((prev) => (prev + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab' || (e.key === 'Enter' && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault();
        applySuggestion(suggestions[selectedSuggestionIdx]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowAutocomplete(false);
        return;
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

    // Enter key: maintain existing indentation
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
        updateCursorPosition();
      });
      return;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0f1117] overflow-hidden select-text border-r border-[#30363d]">
      {/* LANGUAGE-SPECIFIC FILE TABS STRIP */}
      <div className="h-10 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between overflow-x-auto select-none px-2 shrink-0">
        <div className="flex items-center gap-1.5 h-full">
          {/* Quick Show Workspace button when sidebar is collapsed */}
          {!isExplorerOpen && (
            <button
              onClick={onToggleExplorer}
              title="Open Workspace / File Explorer (Ctrl+B)"
              className="h-7 px-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] hover:text-[#58a6ff] border border-[#30363d] flex items-center gap-1.5 text-xs transition-all mr-1 animate-in fade-in duration-150"
            >
              <FolderTree size={13} className="text-[#58a6ff]" />
              <span className="font-medium text-[11px]">Workspace</span>
            </button>
          )}

          {/* Files belonging ONLY to the selected language */}
          {files.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <div
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={`h-7 px-3 rounded-lg flex items-center gap-2 text-xs cursor-pointer transition-all relative group ${
                  isActive
                    ? 'bg-[#21262d] text-[#58a6ff] font-semibold border border-[#58a6ff]/40 shadow-xs'
                    : 'bg-[#161b22] text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3] border border-transparent'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: selectedLanguage.dotColor }}
                />
                <span>{file.name}</span>

                {/* Close/delete file (allowed if more than 1 file exists) */}
                {files.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseFile(file.id);
                    }}
                    title="Close file"
                    className="text-[#8b949e] hover:text-[#f85149] rounded p-0.5 ml-1 transition-colors opacity-70 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Inline New File Form or "+" Trigger */}
          {isCreatingFile ? (
            <form onSubmit={handleCreateSubmit} className="flex items-center gap-1 bg-[#21262d] border border-[#58a6ff]/50 rounded-lg px-2 py-0.5">
              <input
                type="text"
                autoFocus
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={() => {
                  if (!newFileName.trim()) setIsCreatingFile(false);
                }}
                placeholder={`filename${selectedLanguage.extension}`}
                className="bg-transparent text-[#e6edf3] font-mono text-xs w-28 outline-none placeholder:text-[#8b949e]"
              />
              <button type="submit" className="text-[#3fb950] hover:text-[#3fb950]">
                <Check size={12} />
              </button>
              <button 
                type="button" 
                onClick={() => setIsCreatingFile(false)} 
                className="text-[#8b949e] hover:text-[#e6edf3]"
              >
                <X size={12} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsCreatingFile(true)}
              title={`Add new ${selectedLanguage.name} file (${selectedLanguage.extension})`}
              className="h-7 px-2 rounded-lg text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] border border-dashed border-[#30363d] flex items-center gap-1 text-xs transition-colors"
            >
              <Plus size={13} />
              <span className="text-[11px]">New {selectedLanguage.extension}</span>
            </button>
          )}
        </div>

        {/* Language Badge on right */}
        <div className="hidden sm:flex items-center gap-2 text-[#8b949e] text-xs pr-2">
          <span className="text-[11px] font-mono bg-[#21262d] border border-[#30363d] text-[#8b949e] px-2 py-0.5 rounded-md">
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
          style={{ lineHeight: '1.6rem' }}
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
              >
                {lineNum <= totalLines ? lineNum : ''}
              </div>
            );
          })}
        </div>

        {/* Textarea Code Editor */}
        <div className="flex-1 relative h-full overflow-hidden bg-[#0f1117]">
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
            onKeyUp={updateCursorPosition}
            onClick={() => {
              updateCursorPosition();
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
            className="w-full h-full bg-transparent text-[#e6edf3] p-3 pl-3 resize-none outline-none font-mono code-font overflow-auto select-text whitespace-pre placeholder:text-[#8b949e]/60 placeholder:italic"
            style={{
              lineHeight: '1.6rem',
              tabSize: settings.tabSize || 4,
              whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre'
            }}
          />

          {/* INTELLIGENT CODE AUTOCOMPLETE DROPDOWN */}
          {showAutocomplete && suggestions.length > 0 && (
            <div
              style={{
                top: `${dropdownPos.top}px`,
                left: `${dropdownPos.left}px`,
                maxWidth: '380px',
                minWidth: '290px'
              }}
              className="absolute z-50 bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl shadow-black/90 overflow-hidden animate-in fade-in zoom-in-95 duration-100 font-sans"
            >
              {/* Header */}
              <div className="h-6 px-2.5 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between text-[10px] text-[#8b949e] font-semibold tracking-wide uppercase select-none">
                <span className="flex items-center gap-1 text-[#58a6ff]">
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
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {item.kind === 'module' && <Package size={13} className="text-[#58a6ff] shrink-0" />}
                        {item.kind === 'function' && <Terminal size={13} className="text-[#3fb950] shrink-0" />}
                        {item.kind === 'snippet' && <Braces size={13} className="text-purple-400 shrink-0" />}
                        <span className="font-mono text-xs text-[#e6edf3] truncate font-medium">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono uppercase shrink-0 bg-[#0f1117] text-[#8b949e] border border-[#30363d]">
                        {item.kind}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Item Description Footer */}
              {suggestions[selectedSuggestionIdx]?.detail && (
                <div className="px-2.5 py-1.5 bg-[#0f1117] border-t border-[#30363d] text-[11px] text-[#8b949e] truncate font-sans select-none">
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
