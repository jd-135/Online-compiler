import React from 'react';
import { X, Settings as SettingsIcon, Sliders, Type, CornerDownLeft } from 'lucide-react';

export function SettingsModal({ isOpen, onClose, settings, onUpdateSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="h-10 px-4 bg-[#1f1f1f] border-b border-[#333] flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-2">
            <SettingsIcon size={15} className="text-[#007acc]" />
            <span>Editor Settings</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#888] hover:text-white p-1 rounded"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs text-[#ccc]">
          {/* Font Size */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Font Size</div>
              <div className="text-[11px] text-[#888]">Editor monospace text size</div>
            </div>
            <select
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ ...settings, fontSize: Number(e.target.value) })}
              className="bg-[#1e1e1e] border border-[#444] rounded px-2.5 py-1 text-white text-xs outline-none focus:border-[#007acc]"
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
              <div className="text-[11px] text-[#888]">Number of spaces per Tab press</div>
            </div>
            <select
              value={settings.tabSize}
              onChange={(e) => onUpdateSettings({ ...settings, tabSize: Number(e.target.value) })}
              className="bg-[#1e1e1e] border border-[#444] rounded px-2.5 py-1 text-white text-xs outline-none focus:border-[#007acc]"
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
              <div className="text-[11px] text-[#888]">Automatically pairs (), [], {}, "", ''</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoCloseBrackets}
              onChange={(e) => onUpdateSettings({ ...settings, autoCloseBrackets: e.target.checked })}
              className="w-4 h-4 rounded bg-[#1e1e1e] border-[#444] text-[#007acc] focus:ring-0 cursor-pointer accent-[#007acc]"
            />
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Word Wrap</div>
              <div className="text-[11px] text-[#888]">Wrap long lines automatically</div>
            </div>
            <input
              type="checkbox"
              checked={settings.wordWrap}
              onChange={(e) => onUpdateSettings({ ...settings, wordWrap: e.target.checked })}
              className="w-4 h-4 rounded bg-[#1e1e1e] border-[#444] text-[#007acc] focus:ring-0 cursor-pointer accent-[#007acc]"
            />
          </div>
        </div>

        <div className="bg-[#1e1e1e] px-4 py-3 text-[11px] text-[#888] border-t border-[#333] flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#007acc] hover:bg-[#0069b3] text-white rounded font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
