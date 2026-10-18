import React from 'react';
import { X, Keyboard } from 'lucide-react';

export function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Enter', desc: 'Compile & Run code instantly' },
    { key: 'Tab', desc: 'Indent selection (4 spaces)' },
    { key: 'Shift + Tab', desc: 'Un-indent selection' },
    { key: 'Ctrl + L', desc: 'Clear output console' },
    { key: 'Ctrl + S', desc: 'Trigger compilation / save' },
    { key: 'Esc', desc: 'Close dialogs or modals' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-11 px-4 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between text-xs font-semibold text-[#e6edf3]">
          <div className="flex items-center gap-2">
            <Keyboard size={15} className="text-[#58a6ff]" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#8b949e] hover:text-[#e6edf3] p-1 rounded-lg"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-[#30363d] last:border-none">
              <span className="text-[#e6edf3]">{sc.desc}</span>
              <kbd className="px-2.5 py-1 bg-[#0f1117] border border-[#30363d] rounded-md text-[11px] font-mono text-[#58a6ff]">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="bg-[#161b22] px-4 py-3 text-[11px] text-[#8b949e] border-t border-[#30363d] text-right">
          Press <kbd className="bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d] text-[#e6edf3]">Esc</kbd> to dismiss
        </div>
      </div>
    </div>
  );
}
