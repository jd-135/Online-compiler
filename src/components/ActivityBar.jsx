import React from 'react';
import { 
  Files, 
  Play, 
  Settings, 
  HelpCircle, 
  BookOpen,
  Sparkles,
  GraduationCap
} from 'lucide-react';

export function ActivityBar({
  activeView,
  setActiveView,
  onRunCode,
  isRunning,
  onToggleShortcuts,
  onToggleSettings,
  appMode,
  onToggleAppMode
}) {
  return (
    <aside className="w-12 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between items-center py-2.5 z-20 shrink-0 select-none">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {/* Explorer */}
        <button
          onClick={() => setActiveView(activeView === 'explorer' ? null : 'explorer')}
          title="File Explorer"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${
            activeView === 'explorer'
              ? 'text-[#58a6ff] bg-[#21262d] border border-[#58a6ff]/40 shadow-xs'
              : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'
          }`}
        >
          <Files size={18} strokeWidth={1.75} />
        </button>

        {/* Run */}
        <button
          onClick={onRunCode}
          title="Compile & Run (Ctrl + Enter)"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${
            isRunning
              ? 'text-[#3fb950] bg-[#3fb950]/15 border border-[#3fb950]/40'
              : 'text-[#8b949e] hover:text-[#3fb950] hover:bg-[#21262d]'
          }`}
        >
          <Play size={17} strokeWidth={1.75} className={isRunning ? 'animate-pulse' : ''} />
        </button>

        {/* Templates / Snippets */}
        <button
          onClick={() => setActiveView(activeView === 'snippets' ? null : 'snippets')}
          title="Algorithm Library"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${
            activeView === 'snippets'
              ? 'text-[#58a6ff] bg-[#21262d] border border-[#58a6ff]/40 shadow-xs'
              : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'
          }`}
        >
          <BookOpen size={17} strokeWidth={1.75} />
        </button>

        {/* JD University Academy Shortcut */}
        <button
          onClick={() => onToggleAppMode && onToggleAppMode(appMode === 'university' ? 'compiler' : 'university')}
          title="JD University (Interactive Programming Academy)"
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative group ${
            appMode === 'university'
              ? 'text-[#a371f7] bg-[#a371f7]/20 border border-[#a371f7]/50 shadow-xs'
              : 'text-[#8b949e] hover:text-[#d2a8ff] hover:bg-[#21262d]'
          }`}
        >
          <GraduationCap size={18} strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#a371f7] ring-2 ring-[#161b22]" />
        </button>
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        <button
          onClick={onToggleShortcuts}
          title="Keyboard Shortcuts (F1)"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all"
        >
          <HelpCircle size={17} strokeWidth={1.75} />
        </button>

        <button
          onClick={onToggleSettings}
          title="Editor Settings"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all"
        >
          <Settings size={17} strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}
