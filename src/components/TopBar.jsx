import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  Settings, 
  HelpCircle, 
  Code2, 
  ChevronDown, 
  Sparkles,
  Terminal,
  FileCode2
} from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

export function TopBar({
  selectedLanguage,
  onSelectLanguage,
  onRunCode,
  isRunning,
  onResetCode,
  code,
  activeTemplateType,
  onSwitchTemplate,
  onToggleShortcuts,
  onToggleSettings,
  stdin
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
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedLanguage.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-12 bg-[#181818] border-b border-[#2b2b2b] flex items-center justify-between px-3 select-none z-30">
      {/* Left: Branding & Language Selector */}
      <div className="flex items-center gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 pr-3 border-r border-[#2d2d2d]">
          <div className="w-7 h-7 rounded bg-[#007acc] flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Code2 size={16} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-semibold tracking-wide text-white">CodeStudio</span>
            <span className="text-[10px] text-[#858585] block -mt-0.5">Online Compiler</span>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] text-xs font-medium text-white transition-colors"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: selectedLanguage.dotColor }}
            />
            <span>{selectedLanguage.name}</span>
            <span className="text-[10px] text-[#8e8e8e] bg-[#1e1e1e] px-1.5 py-0.5 rounded border border-[#333]">
              {selectedLanguage.version}
            </span>
            <ChevronDown size={13} className={`text-[#858585] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-64 bg-[#252526] border border-[#3c3c3c] rounded-md shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#707070] border-b border-[#333]">
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
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                      isSelected 
                        ? 'bg-[#007acc] text-white font-medium' 
                        : 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: lang.dotColor }}
                      />
                      <div>
                        <div className="font-medium">{lang.name}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-[#858585]'}`}>
                          {lang.filename}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-blue-700/60 text-white' : 'bg-[#1e1e1e] text-[#8e8e8e] border border-[#333]'
                    }`}>
                      {lang.version}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Template Selector (Hello World vs Interactive I/O) */}
        <div className="hidden md:flex items-center rounded bg-[#212121] p-0.5 border border-[#333]">
          <button
            onClick={() => onSwitchTemplate('hello')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              activeTemplateType === 'hello'
                ? 'bg-[#333333] text-white shadow-sm'
                : 'text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            Hello World
          </button>
          <button
            onClick={() => onSwitchTemplate('io')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              activeTemplateType === 'io'
                ? 'bg-[#333333] text-white shadow-sm'
                : 'text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            Standard I/O
          </button>
        </div>
      </div>

      {/* Center: File breadcrumb */}
      <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#858585]">
        <span>workspace</span>
        <span>/</span>
        <span className="text-[#38bdf8] flex items-center gap-1">
          <FileCode2 size={13} />
          {selectedLanguage.filename}
        </span>
      </div>

      {/* Right: Actions & Run Button */}
      <div className="flex items-center gap-2">
        {/* Reset Template */}
        <button
          onClick={onResetCode}
          title="Reset to boilerplate template"
          className="p-1.5 text-[#858585] hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
        >
          <RotateCcw size={15} />
        </button>

        {/* Copy Code */}
        <button
          onClick={handleCopy}
          title={copied ? "Copied to clipboard!" : "Copy code"}
          className="p-1.5 text-[#858585] hover:text-white hover:bg-[#2a2d2e] rounded transition-colors relative"
        >
          {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        </button>

        {/* Download Code */}
        <button
          onClick={handleDownload}
          title="Download source code"
          className="p-1.5 text-[#858585] hover:text-white hover:bg-[#2a2d2e] rounded transition-colors hidden sm:block"
        >
          <Download size={15} />
        </button>

        {/* Shortcuts */}
        <button
          onClick={onToggleShortcuts}
          title="Keyboard shortcuts (F1)"
          className="p-1.5 text-[#858585] hover:text-white hover:bg-[#2a2d2e] rounded transition-colors hidden sm:block"
        >
          <HelpCircle size={15} />
        </button>

        {/* Settings */}
        <button
          onClick={onToggleSettings}
          title="Editor settings"
          className="p-1.5 text-[#858585] hover:text-white hover:bg-[#2a2d2e] rounded transition-colors"
        >
          <Settings size={15} />
        </button>

        {/* PRIMARY "RUN CODE" BUTTON */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95 ${
            isRunning
              ? 'bg-emerald-700/60 text-emerald-200 cursor-not-allowed border border-emerald-500/30'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40 border border-emerald-400/40'
          }`}
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play size={14} className="fill-current" />
              <span>Run Code</span>
              <kbd className="hidden sm:inline-block text-[10px] font-normal bg-emerald-800/60 px-1.5 py-0.2 rounded border border-emerald-500/40 ml-0.5">
                Ctrl+↵
              </kbd>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
