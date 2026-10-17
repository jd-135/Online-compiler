import React from 'react';
import { 
  GitBranch, 
  CheckCheck, 
  AlertTriangle, 
  Cpu, 
  Bell, 
  Zap,
  Globe
} from 'lucide-react';

export function StatusBar({
  selectedLanguage,
  isRunning,
  executionResult,
  cursorPosition,
  settings,
  stdin
}) {
  const isSuccess = executionResult?.success;
  const hasError = executionResult && !executionResult.success;

  return (
    <footer className="h-6 bg-[#007acc] text-white text-[11px] flex items-center justify-between px-2 select-none z-30 shrink-0 font-sans">
      {/* Left side items */}
      <div className="flex items-center gap-3">
        {/* Branch */}
        <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <GitBranch size={12} />
          <span>main*</span>
        </div>

        {/* Cloud Sandbox Status */}
        <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          {isRunning ? (
            <span className="flex items-center gap-1 text-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
              <span>Executing...</span>
            </span>
          ) : isSuccess ? (
            <span className="flex items-center gap-1 text-emerald-100">
              <CheckCheck size={12} />
              <span>Succeeded</span>
            </span>
          ) : hasError ? (
            <span className="flex items-center gap-1 text-amber-100 font-medium">
              <AlertTriangle size={12} />
              <span>Error</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 opacity-90">
              <Zap size={12} />
              <span>Ready</span>
            </span>
          )}
        </div>

        {/* Stdin status */}
        {stdin.trim() && (
          <div className="hidden sm:flex items-center gap-1 bg-black/20 px-1.5 py-0.2 rounded text-[10px]">
            <span>Stdin: On</span>
          </div>
        )}
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Line & Column Position */}
        <div className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <span>Ln {cursorPosition.line}, Col {cursorPosition.col}</span>
        </div>

        {/* Tab Size */}
        <div className="hidden sm:block hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <span>Spaces: {settings.tabSize || 4}</span>
        </div>

        {/* Encoding */}
        <div className="hidden md:block hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <span>UTF-8</span>
        </div>

        {/* Language details */}
        <div className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors font-medium">
          <span>{selectedLanguage.name} ({selectedLanguage.version})</span>
        </div>

        {/* Vercel Ready pill */}
        <div className="hidden lg:flex items-center gap-1 bg-black/20 hover:bg-black/30 px-1.5 py-0.5 rounded transition-colors" title="Optimized for Vercel Serverless">
          <Globe size={11} />
          <span>Vercel Edge</span>
        </div>
      </div>
    </footer>
  );
}
