import React from 'react';
import { 
  Files, 
  Play, 
  Settings, 
  HelpCircle, 
  BookOpen,
  Sparkles
} from 'lucide-react';

export function ActivityBar({
  activeView,
  setActiveView,
  onRunCode,
  isRunning,
  onToggleShortcuts,
  onToggleSettings
}) {
  return (
    <aside className="w-12 bg-[#080c14] border-r border-slate-800/80 flex flex-col justify-between items-center py-2.5 z-20 shrink-0 select-none">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {/* Explorer */}
        <button
          onClick={() => setActiveView(activeView === 'explorer' ? null : 'explorer')}
          title="File Explorer"
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all relative ${
            activeView === 'explorer'
              ? 'text-cyan-300 bg-slate-800 border border-cyan-500/30 shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Files size={18} strokeWidth={1.75} />
        </button>

        {/* Run */}
        <button
          onClick={onRunCode}
          title="Compile & Run (Ctrl + Enter)"
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all relative ${
            isRunning
              ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
              : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60'
          }`}
        >
          <Play size={17} strokeWidth={1.75} className={isRunning ? 'animate-pulse' : ''} />
        </button>

        {/* Templates / Snippets */}
        <button
          onClick={() => setActiveView(activeView === 'snippets' ? null : 'snippets')}
          title="Algorithm Library"
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all relative ${
            activeView === 'snippets'
              ? 'text-cyan-300 bg-slate-800 border border-cyan-500/30 shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BookOpen size={17} strokeWidth={1.75} />
        </button>
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        <button
          onClick={onToggleShortcuts}
          title="Keyboard Shortcuts (F1)"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
        >
          <HelpCircle size={17} strokeWidth={1.75} />
        </button>

        <button
          onClick={onToggleSettings}
          title="Editor Settings"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
        >
          <Settings size={17} strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}
