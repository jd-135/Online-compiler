import React from 'react';
import { 
  GitBranch, 
  CheckCheck, 
  AlertTriangle, 
  Cpu, 
  Zap,
  Globe,
  FileCode2,
  Wifi,
  WifiOff
} from 'lucide-react';

export function StatusBar({
  selectedLanguage,
  activeFileName,
  isRunning,
  executionResult,
  cursorPosition,
  settings,
  stdin,
  isOnline = true
}) {
  const isSuccess = executionResult?.success;
  const hasError = executionResult && !executionResult.success;

  return (
    <footer className="h-6 bg-[#161b22] border-t border-[#30363d] text-[#8b949e] text-[11px] flex items-center justify-between px-3 select-none z-30 shrink-0 font-sans">
      {/* Left side items */}
      <div className="flex items-center gap-3">
        {/* Branch */}
        <div className="flex items-center gap-1.5 hover:text-[#e6edf3] transition-colors">
          <GitBranch size={12} className="text-[#58a6ff]" />
          <span className="font-mono">main</span>
        </div>

        {/* Cloud Sandbox Status */}
        <div className="flex items-center gap-1.5 transition-colors">
          {isRunning ? (
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Executing...</span>
            </span>
          ) : isSuccess ? (
            <span className="flex items-center gap-1 text-[#3fb950] font-medium">
              <CheckCheck size={12} />
              <span>Passed</span>
            </span>
          ) : hasError ? (
            <span className="flex items-center gap-1 text-[#f85149] font-medium">
              <AlertTriangle size={12} />
              <span>Error</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[#8b949e]">
              <Zap size={11} className="text-[#58a6ff]" />
              <span>Ready</span>
            </span>
          )}
        </div>

        {/* Latency badge */}
        {executionResult?.time && !isRunning && (
          <div className="hidden sm:flex items-center gap-1 text-[#3fb950] font-mono text-[10px] bg-[#3fb950]/15 px-1.5 py-0.2 rounded border border-[#3fb950]/30 font-semibold">
            <Zap size={10} className="fill-current text-[#3fb950]" />
            <span>{executionResult.time}</span>
          </div>
        )}

        {/* Current active file */}
        {activeFileName && (
          <div className="hidden sm:flex items-center gap-1 text-[#e6edf3] font-mono">
            <FileCode2 size={11} className="text-[#58a6ff]" />
            <span>{activeFileName}</span>
          </div>
        )}

        {/* Stdin status */}
        {stdin?.trim() && (
          <div className="hidden sm:flex items-center gap-1 bg-[#58a6ff]/15 text-[#58a6ff] px-1.5 py-0.2 rounded text-[10px] border border-[#58a6ff]/30">
            <span>Stdin: Active</span>
          </div>
        )}
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Line & Column Position */}
        <div className="hover:text-[#e6edf3] transition-colors font-mono">
          <span>Ln {cursorPosition.line}, Col {cursorPosition.col}</span>
        </div>

        {/* Tab Size */}
        <div className="hidden sm:block hover:text-[#e6edf3] transition-colors">
          <span>Spaces: {settings.tabSize || 4}</span>
        </div>

        {/* Language details */}
        <div className="hover:text-[#e6edf3] transition-colors font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedLanguage.dotColor }} />
          <span>{selectedLanguage.name} ({selectedLanguage.version})</span>
        </div>

        {/* Online / Offline Status */}
        <div className="hidden sm:flex items-center gap-1 transition-colors">
          {isOnline ? (
            <span className="flex items-center gap-1 text-[#3fb950] text-[10px]">
              <Wifi size={11} className="text-[#3fb950]" />
              <span>Online</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400 font-semibold text-[10px] bg-amber-500/15 px-1.5 py-0.2 rounded border border-amber-500/30">
              <WifiOff size={11} />
              <span>Offline (Python WASM Ready)</span>
            </span>
          )}
        </div>

        {/* Vercel Status */}
        <div className="hidden lg:flex items-center gap-1 text-[#8b949e] hover:text-[#e6edf3] transition-colors">
          <Globe size={11} className="text-[#58a6ff]" />
          <span>Vercel Serverless</span>
        </div>
      </div>
    </footer>
  );
}
