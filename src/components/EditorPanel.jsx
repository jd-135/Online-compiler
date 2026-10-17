import React, { useRef, useState, useMemo } from 'react';
import { 
  FileCode, 
  X, 
  Plus, 
  Check, 
  CornerDownLeft,
  FilePlus2,
  Trash2
} from 'lucide-react';

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
  onRunCode
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const [activeLine, setActiveLine] = useState(1);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

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
  };

  // Track cursor position
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
      if (onRunCode) {
        onRunCode();
      }
      return;
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
    <div className="flex-1 flex flex-col h-full bg-[#0b0f19] overflow-hidden select-text border-r border-slate-800/80">
      {/* LANGUAGE-SPECIFIC FILE TABS STRIP */}
      <div className="h-10 bg-[#0d131f] border-b border-slate-800/80 flex items-center justify-between overflow-x-auto select-none px-2 shrink-0">
        <div className="flex items-center gap-1.5 h-full">
          {/* Files belonging ONLY to the selected language */}
          {files.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <div
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={`h-7 px-3 rounded-lg flex items-center gap-2 text-xs cursor-pointer transition-all relative group ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs'
                    : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
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
                    className="text-slate-500 hover:text-rose-400 rounded p-0.5 ml-1 transition-colors opacity-70 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Inline New File Form or "+" Trigger */}
          {isCreatingFile ? (
            <form onSubmit={handleCreateSubmit} className="flex items-center gap-1 bg-slate-800/90 border border-cyan-500/50 rounded-lg px-2 py-0.5">
              <input
                type="text"
                autoFocus
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={() => {
                  if (!newFileName.trim()) setIsCreatingFile(false);
                }}
                placeholder={`filename${selectedLanguage.extension}`}
                className="bg-transparent text-white font-mono text-xs w-28 outline-none"
              />
              <button type="submit" className="text-cyan-400 hover:text-cyan-300">
                <Check size={12} />
              </button>
              <button 
                type="button" 
                onClick={() => setIsCreatingFile(false)} 
                className="text-slate-400 hover:text-slate-200"
              >
                <X size={12} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsCreatingFile(true)}
              title={`Add new ${selectedLanguage.name} file (${selectedLanguage.extension})`}
              className="h-7 px-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-dashed border-slate-700/80 flex items-center gap-1 text-xs transition-colors"
            >
              <Plus size={13} />
              <span className="text-[11px]">New {selectedLanguage.extension}</span>
            </button>
          )}
        </div>

        {/* Language Badge on right */}
        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs pr-2">
          <span className="text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
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
          className="w-12 bg-[#090d16] text-slate-600 text-right pr-3 select-none py-3 overflow-hidden border-r border-slate-800/60 shrink-0 font-mono"
          style={{ lineHeight: '1.6rem' }}
        >
          {Array.from({ length: Math.max(totalLines, 20) }).map((_, idx) => {
            const lineNum = idx + 1;
            const isCurrent = lineNum === activeLine;
            return (
              <div
                key={lineNum}
                className={`h-[1.6rem] transition-colors ${
                  isCurrent ? 'text-cyan-400 font-bold bg-cyan-950/20' : ''
                }`}
              >
                {lineNum <= totalLines ? lineNum : ''}
              </div>
            );
          })}
        </div>

        {/* Textarea Code Editor */}
        <div className="flex-1 relative h-full overflow-hidden bg-[#0b0f19]">
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
            className="w-full h-full bg-transparent text-slate-200 p-3 pl-3 resize-none outline-none font-mono code-font overflow-auto select-text whitespace-pre"
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
