import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  Settings, 
  HelpCircle, 
  ChevronDown, 
  Zap,
  Plus
} from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

export function TopBar({
  selectedLanguage,
  onSelectLanguage,
  onRunCode,
  isRunning,
  onResetCode,
  activeFile,
  onToggleShortcuts,
  onToggleSettings,
  onNewFile
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async () => {
    if (!activeFile?.code) return;
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadActiveFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-13 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-3 select-none z-30 shrink-0 font-sans">
      {/* Left: Branding & Language Selector */}
      <div className="flex items-center gap-2.5">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 pr-3 border-r border-[#30363d]">
          <div className="w-7 h-7 rounded-lg bg-[#58a6ff]/15 border border-[#58a6ff]/40 flex items-center justify-center text-[#58a6ff]">
            <Zap size={16} className="fill-current text-[#58a6ff]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight text-[#e6edf3] font-mono">JD COMPILER</span>
              <span className="text-[10px] font-semibold text-[#58a6ff] bg-[#58a6ff]/10 border border-[#58a6ff]/30 px-1.5 py-0.2 rounded-full">
                Studio
              </span>
            </div>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#58a6ff]/50 text-xs font-medium text-[#e6edf3] transition-colors"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: selectedLanguage.dotColor }}
            />
            <span className="font-semibold">{selectedLanguage.name}</span>
            <span className="text-[10px] text-[#8b949e] bg-[#161b22] px-1.5 py-0.5 rounded border border-[#30363d]">
              {selectedLanguage.version}
            </span>
            <ChevronDown size={13} className={`text-[#8b949e] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-60 bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[#8b949e] border-b border-[#30363d]">
                Select Language
              </div>
              {LANGUAGES.map((lang) => {
                const isSelected = lang.id === selectedLanguage.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onSelectLanguage(lang);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                      isSelected 
                        ? 'bg-[#58a6ff]/15 text-[#58a6ff] font-semibold border-l-2 border-[#58a6ff]' 
                        : 'text-[#e6edf3] hover:bg-[#21262d]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: lang.dotColor }}
                      />
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                      {lang.version}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions & Run Code Button */}
      <div className="flex items-center gap-1.5">
        {/* New File trigger */}
        <button
          onClick={onNewFile}
          title={`Create new ${selectedLanguage.name} file (${selectedLanguage.extension})`}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#e6edf3] hover:text-[#58a6ff] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md transition-colors"
        >
          <Plus size={13} className="text-[#58a6ff]" />
          <span className="hidden sm:inline font-medium">New {selectedLanguage.extension}</span>
        </button>

        {/* Specific Download for active file */}
        <button
          onClick={handleDownloadActiveFile}
          title={`Download active file: ${activeFile?.name || ''}`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#e6edf3] hover:text-[#58a6ff] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md transition-colors"
        >
          <Download size={13} className="text-[#58a6ff]" />
          <span className="hidden sm:inline font-medium">Download {activeFile?.name}</span>
        </button>

        {/* Clear Code */}
        <button
          onClick={onResetCode}
          title="Clear code"
          className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-md transition-colors"
        >
          <RotateCcw size={15} />
        </button>

        {/* Copy Code */}
        <button
          onClick={handleCopy}
          title={copied ? "Copied to clipboard!" : "Copy code"}
          className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-md transition-colors relative"
        >
          {copied ? <Check size={15} className="text-[#3fb950]" /> : <Copy size={15} />}
        </button>

        {/* Shortcuts */}
        <button
          onClick={onToggleShortcuts}
          title="Keyboard shortcuts (F1)"
          className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-md transition-colors hidden sm:block"
        >
          <HelpCircle size={15} />
        </button>

        {/* Settings */}
        <button
          onClick={onToggleSettings}
          title="Editor settings"
          className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-md transition-colors"
        >
          <Settings size={15} />
        </button>

        {/* PRIMARY "RUN CODE" BUTTON (--accent-success: #3fb950) */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          title="Compile and execute code (Ctrl+Enter)"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 ${
            isRunning
              ? 'bg-[#21262d] text-[#8b949e] cursor-not-allowed border border-[#30363d]'
              : 'bg-[#3fb950] hover:bg-[#2ea043] text-[#0f1117] font-bold shadow-emerald-950/40 border border-[#3fb950]/80 anim-glow-btn'
          }`}
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-[#8b949e] border-t-[#e6edf3] rounded-full animate-spin" />
              <span className="text-[#e6edf3]">Executing...</span>
            </>
          ) : (
            <>
              <Play size={13} className="fill-current text-[#0f1117]" />
              <span>Run Code</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono font-medium bg-[#0f1117]/20 text-[#0f1117] px-1.5 py-0.2 rounded border border-[#0f1117]/30 ml-0.5">
                Ctrl+↵
              </kbd>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
