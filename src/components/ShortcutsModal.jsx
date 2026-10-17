import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

export function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Enter', desc: 'Compile & Run code instantly' },
    { key: 'Tab', desc: 'Indent selection (4 spaces)' },
    { key: 'Shift + Tab', desc: 'Un-indent selection' },
    { key: 'Ctrl + L', desc: 'Clear output console' },
    { key: 'Ctrl + S', desc: 'Quick save / trigger run' },
    { key: 'Esc', desc: 'Close dialogs or menus' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-10 px-4 bg-[#1f1f1f] border-b border-[#333] flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-2">
            <Keyboard size={15} className="text-[#007acc]" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#888] hover:text-white p-1 rounded"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-4 space-y-2.5">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-[#303030] last:border-none">
              <span className="text-[#ccc]">{sc.desc}</span>
              <kbd className="px-2 py-1 bg-[#1e1e1e] border border-[#444] rounded text-[11px] font-mono text-[#58a6ff]">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1e1e] px-4 py-2.5 text-[11px] text-[#888] border-t border-[#333] text-right">
          Press <kbd className="bg-[#2a2a2a] px-1.5 py-0.5 rounded border border-[#444] text-[#ccc]">Esc</kbd> to dismiss
        </div>
      </div>
    </div>
  );
}
