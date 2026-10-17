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
  Plus,
  Terminal,
  Code
} from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

export function TopBar({
  selectedLanguage,
  onSelectLanguage,
  onRunCode,
  isRunning,
  onResetCode,
  activeFile,
  activeTemplateType,
  onSwitchTemplate,
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
    <header className="h-14 bg-[#0d131f]/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-4 select-none z-30 shadow-lg shadow-black/20">
      {/* Left: Branding & Language Selector */}
      <div className="flex items-center gap-3">
        {/* Modern Distinctive Brand Logo */}
        <div className="flex items-center gap-2.5 pr-3 border-r border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20">
            <Zap size={17} className="fill-current text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-white font-mono">CodePulse</span>
              <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-1.5 py-0.2 rounded-full">
                Studio
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5 font-sans">Online Compiler</span>
          </div>
        </div>

        {/* Floating Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all hover:border-cyan-500/50 shadow-xs"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full ring-2 ring-slate-800" 
              style={{ backgroundColor: selectedLanguage.dotColor }}
            />
            <span className="font-semibold text-white">{selectedLanguage.name}</span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              {selectedLanguage.version}
            </span>
            <ChevronDown size={13} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
                Switch Language Environment
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
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 text-white font-medium border-l-2 border-cyan-400' 
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: lang.dotColor }}
                      />
                      <div>
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {lang.extension} files
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {lang.version}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Template Selector (Hello World vs Interactive I/O) */}
        <div className="hidden md:flex items-center rounded-lg bg-slate-900/90 p-0.5 border border-slate-800">
          <button
            onClick={() => onSwitchTemplate('hello')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeTemplateType === 'hello'
                ? 'bg-slate-800 text-cyan-300 shadow-xs border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hello World
          </button>
          <button
            onClick={() => onSwitchTemplate('io')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeTemplateType === 'io'
                ? 'bg-slate-800 text-cyan-300 shadow-xs border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standard I/O
          </button>
        </div>
      </div>

      {/* Right: Actions & High-Speed Run Button */}
      <div className="flex items-center gap-2">
        {/* New File for current language */}
        <button
          onClick={onNewFile}
          title={`Create new ${selectedLanguage.name} file (${selectedLanguage.extension})`}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
        >
          <Plus size={14} className="text-cyan-400" />
          <span className="hidden sm:inline font-medium">New {selectedLanguage.extension}</span>
        </button>

        {/* Specific Download for active file */}
        <button
          onClick={handleDownloadActiveFile}
          title={`Download active file: ${activeFile?.name || ''}`}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
        >
          <Download size={14} className="text-indigo-400" />
          <span className="hidden sm:inline font-medium">Download {activeFile?.name}</span>
        </button>

        {/* Reset Template */}
        <button
          onClick={onResetCode}
          title="Reset to boilerplate template"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <RotateCcw size={15} />
        </button>

        {/* Copy Code */}
        <button
          onClick={handleCopy}
          title={copied ? "Copied to clipboard!" : "Copy code"}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative"
        >
          {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        </button>

        {/* Shortcuts */}
        <button
          onClick={onToggleShortcuts}
          title="Keyboard shortcuts (F1)"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
        >
          <HelpCircle size={15} />
        </button>

        {/* Settings */}
        <button
          onClick={onToggleSettings}
          title="Editor settings"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Settings size={15} />
        </button>

        {/* PRIMARY "COMPILE & RUN" GLOWING BUTTON */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          title="Compile and execute code (Ctrl+Enter)"
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95 ${
            isRunning
              ? 'bg-emerald-800/50 text-emerald-300 cursor-not-allowed border border-emerald-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-emerald-950/40 border border-emerald-300/40 anim-glow-btn'
          }`}
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play size={14} className="fill-current text-slate-950" />
              <span>Run Code</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono font-medium bg-slate-950/20 text-slate-900 px-1.5 py-0.2 rounded border border-slate-950/30 ml-0.5">
                Ctrl+↵
              </kbd>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
