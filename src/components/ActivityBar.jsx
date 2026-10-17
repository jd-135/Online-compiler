import React from 'react';
import { 
  Files, 
  Play, 
  Terminal, 
  Settings, 
  HelpCircle, 
  FolderTree,
  BookOpen
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
    <aside className="w-12 bg-[#181818] border-r border-[#2b2b2b] flex flex-col justify-between items-center py-2 z-20 shrink-0 select-none">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-1 w-full">
        {/* Explorer */}
        <button
          onClick={() => setActiveView(activeView === 'explorer' ? null : 'explorer')}
          title="Explorer (Files)"
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-all relative ${
            activeView === 'explorer'
              ? 'text-white border-l-2 border-[#007acc] bg-[#252526]'
              : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#252526]'
          }`}
        >
          <Files size={19} strokeWidth={1.75} />
        </button>

        {/* Run */}
        <button
          onClick={onRunCode}
          title="Run Code (Ctrl + Enter)"
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-all relative ${
            isRunning
              ? 'text-emerald-400 bg-emerald-950/30'
              : 'text-[#858585] hover:text-emerald-400 hover:bg-[#252526]'
          }`}
        >
          <Play size={18} strokeWidth={1.75} className={isRunning ? 'animate-pulse' : ''} />
        </button>

        {/* Templates / Snippets */}
        <button
          onClick={() => setActiveView(activeView === 'snippets' ? null : 'snippets')}
          title="Snippets & Templates"
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-all relative ${
            activeView === 'snippets'
              ? 'text-white border-l-2 border-[#007acc] bg-[#252526]'
              : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#252526]'
          }`}
        >
          <BookOpen size={18} strokeWidth={1.75} />
        </button>
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-1 w-full">
        <button
          onClick={onToggleShortcuts}
          title="Keyboard Shortcuts"
          className="w-10 h-10 flex items-center justify-center rounded-md text-[#858585] hover:text-[#cccccc] hover:bg-[#252526] transition-all"
        >
          <HelpCircle size={18} strokeWidth={1.75} />
        </button>

        <button
          onClick={onToggleSettings}
          title="Settings"
          className="w-10 h-10 flex items-center justify-center rounded-md text-[#858585] hover:text-[#cccccc] hover:bg-[#252526] transition-all"
        >
          <Settings size={18} strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}
