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
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-11 px-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-2">
            <Keyboard size={15} className="text-cyan-400" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-none">
              <span className="text-slate-300">{sc.desc}</span>
              <kbd className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-md text-[11px] font-mono text-cyan-300">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="bg-slate-950/40 px-4 py-3 text-[11px] text-slate-400 border-t border-slate-800 text-right">
          Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300">Esc</kbd> to dismiss
        </div>
      </div>
    </div>
  );
}
