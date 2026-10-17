import React from 'react';
import { 
  GitBranch, 
  CheckCheck, 
  AlertTriangle, 
  Cpu, 
  Zap,
  Globe,
  FileCode2
} from 'lucide-react';

export function StatusBar({
  selectedLanguage,
  activeFileName,
  isRunning,
  executionResult,
  cursorPosition,
  settings,
  stdin
}) {
  const isSuccess = executionResult?.success;
  const hasError = executionResult && !executionResult.success;

  return (
    <footer className="h-6 bg-[#080c14] border-t border-slate-800/80 text-slate-400 text-[11px] flex items-center justify-between px-3 select-none z-30 shrink-0 font-sans">
      {/* Left side items */}
      <div className="flex items-center gap-3">
        {/* Branch */}
        <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
          <GitBranch size={12} className="text-cyan-400" />
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
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCheck size={12} />
              <span>Passed</span>
            </span>
          ) : hasError ? (
            <span className="flex items-center gap-1 text-rose-400 font-medium">
              <AlertTriangle size={12} />
              <span>Error</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400">
              <Zap size={11} className="text-cyan-400" />
              <span>Ready</span>
            </span>
          )}
        </div>

        {/* Current active file */}
        {activeFileName && (
          <div className="hidden sm:flex items-center gap-1 text-slate-300 font-mono">
            <FileCode2 size={11} className="text-indigo-400" />
            <span>{activeFileName}</span>
          </div>
        )}

        {/* Stdin status */}
        {stdin?.trim() && (
          <div className="hidden sm:flex items-center gap-1 bg-cyan-950/80 text-cyan-300 px-1.5 py-0.2 rounded text-[10px] border border-cyan-800/60">
            <span>Stdin: Active</span>
          </div>
        )}
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Line & Column Position */}
        <div className="hover:text-slate-200 transition-colors font-mono">
          <span>Ln {cursorPosition.line}, Col {cursorPosition.col}</span>
        </div>

        {/* Tab Size */}
        <div className="hidden sm:block hover:text-slate-200 transition-colors">
          <span>Spaces: {settings.tabSize || 4}</span>
        </div>

        {/* Language details */}
        <div className="hover:text-slate-200 transition-colors font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedLanguage.dotColor }} />
          <span>{selectedLanguage.name} ({selectedLanguage.version})</span>
        </div>

        {/* Vercel Status */}
        <div className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors">
          <Globe size={11} className="text-cyan-400" />
          <span>Vercel Serverless</span>
        </div>
      </div>
    </footer>
  );
}
