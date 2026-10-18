import React from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';

export function SettingsModal({ isOpen, onClose, settings, onUpdateSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-11 px-4 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between text-xs font-semibold text-[#e6edf3]">
          <div className="flex items-center gap-2">
            <SettingsIcon size={15} className="text-[#58a6ff]" />
            <span>Editor Settings</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#8b949e] hover:text-[#e6edf3] p-1 rounded-lg"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs text-[#e6edf3]">
          {/* Font Size */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#e6edf3]">Font Size</div>
              <div className="text-[11px] text-[#8b949e]">Editor monospace text size</div>
            </div>
            <select
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ ...settings, fontSize: Number(e.target.value) })}
              className="bg-[#0f1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-[#e6edf3] text-xs outline-none focus:border-[#58a6ff]"
            >
              <option value={12}>12 px</option>
              <option value={13}>13 px</option>
              <option value={14}>14 px (Default)</option>
              <option value={16}>16 px</option>
              <option value={18}>18 px</option>
            </select>
          </div>

          {/* Tab Size */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#e6edf3]">Tab Indentation</div>
              <div className="text-[11px] text-[#8b949e]">Number of spaces per Tab press</div>
            </div>
            <select
              value={settings.tabSize}
              onChange={(e) => onUpdateSettings({ ...settings, tabSize: Number(e.target.value) })}
              className="bg-[#0f1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-[#e6edf3] text-xs outline-none focus:border-[#58a6ff]"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces (Default)</option>
              <option value={8}>8 Spaces</option>
            </select>
          </div>

          {/* Auto Close Brackets */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#e6edf3]">Auto-close Brackets & Quotes</div>
              <div className="text-[11px] text-[#8b949e]">Automatically pairs (), [], {}, "", ''</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoCloseBrackets}
              onChange={(e) => onUpdateSettings({ ...settings, autoCloseBrackets: e.target.checked })}
              className="w-4 h-4 rounded bg-[#0f1117] border-[#30363d] text-[#58a6ff] focus:ring-0 cursor-pointer accent-[#58a6ff]"
            />
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#e6edf3]">Word Wrap</div>
              <div className="text-[11px] text-[#8b949e]">Wrap long lines automatically</div>
            </div>
            <input
              type="checkbox"
              checked={settings.wordWrap}
              onChange={(e) => onUpdateSettings({ ...settings, wordWrap: e.target.checked })}
              className="w-4 h-4 rounded bg-[#0f1117] border-[#30363d] text-[#58a6ff] focus:ring-0 cursor-pointer accent-[#58a6ff]"
            />
          </div>
        </div>

        <div className="bg-[#161b22] px-4 py-3 text-[11px] text-[#8b949e] border-t border-[#30363d] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#58a6ff] hover:bg-[#388bfd] text-[#0f1117] rounded-lg font-semibold transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
