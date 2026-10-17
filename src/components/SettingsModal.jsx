import React from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';

export function SettingsModal({ isOpen, onClose, settings, onUpdateSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-11 px-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-2">
            <SettingsIcon size={15} className="text-cyan-400" />
            <span>Editor Settings</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs text-slate-300">
          {/* Font Size */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Font Size</div>
              <div className="text-[11px] text-slate-400">Editor monospace text size</div>
            </div>
            <select
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ ...settings, fontSize: Number(e.target.value) })}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
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
              <div className="font-medium text-white">Tab Indentation</div>
              <div className="text-[11px] text-slate-400">Number of spaces per Tab press</div>
            </div>
            <select
              value={settings.tabSize}
              onChange={(e) => onUpdateSettings({ ...settings, tabSize: Number(e.target.value) })}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces (Default)</option>
              <option value={8}>8 Spaces</option>
            </select>
          </div>

          {/* Auto Close Brackets */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Auto-close Brackets & Quotes</div>
              <div className="text-[11px] text-slate-400">Automatically pairs (), [], {}, "", ''</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoCloseBrackets}
              onChange={(e) => onUpdateSettings({ ...settings, autoCloseBrackets: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Word Wrap</div>
              <div className="text-[11px] text-slate-400">Wrap long lines automatically</div>
            </div>
            <input
              type="checkbox"
              checked={settings.wordWrap}
              onChange={(e) => onUpdateSettings({ ...settings, wordWrap: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer accent-cyan-500"
            />
          </div>
        </div>

        <div className="bg-slate-950/40 px-4 py-3 text-[11px] text-slate-400 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg font-medium transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
