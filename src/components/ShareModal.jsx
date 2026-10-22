import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  MessageCircle, 
  Send 
} from 'lucide-react';

export function ShareModal({ isOpen, onClose, shareUrl, selectedLanguage, codeLength }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareText = `Check out this ${selectedLanguage.name} code on JD Compiler:`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-modal-backdrop">
      <div 
        className="w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden anim-modal-content"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      >
        {/* Header */}
        <div 
          className="h-11 px-4 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between text-xs font-semibold text-[#e6edf3]"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        >
          <div className="flex items-center gap-2">
            <Share2 size={15} className="text-[#58a6ff]" style={{ color: 'var(--accent-primary)' }} />
            <span>Share Code Link</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30 font-medium">
              Zero Database
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#8b949e] hover:text-[#e6edf3] p-1 rounded-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs">
          <div>
            <div className="text-[11px] text-[#8b949e] mb-2" style={{ color: 'var(--text-secondary)' }}>
              Anyone with this link will open your exact <span className="font-semibold text-[#e6edf3]">{selectedLanguage.name}</span> code and environment:
            </div>

            {/* URL Display and Copy Bar */}
            <div 
              className="flex items-center gap-2 bg-[#0f1117] border border-[#30363d] rounded-xl p-1.5 pl-3"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent text-[#e6edf3] font-mono text-xs outline-none select-all truncate"
                style={{ color: 'var(--text-primary)' }}
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all shrink-0 ${
                  copied 
                    ? 'bg-[#3fb950] text-[#0f1117]' 
                    : 'bg-[#58a6ff] hover:bg-[#388bfd] text-[#0f1117]'
                }`}
                style={!copied ? { backgroundColor: 'var(--accent-primary)' } : {}}
              >
                {copied ? (
                  <>
                    <Check size={13} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Quick Share Buttons */}
          <div>
            <div className="text-[11px] font-medium text-[#8b949e] mb-2" style={{ color: 'var(--text-secondary)' }}>
              Quick Share:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-all text-xs"
                style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <MessageCircle size={14} className="text-[#3fb950]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-all text-xs"
                style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <Send size={14} className="text-[#58a6ff]" />
                <span>Twitter / X</span>
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-all text-xs"
                style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <ExternalLink size={14} className="text-cyan-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Zero Database Privacy Card */}
          <div 
            className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0f1117]/80 border border-[#30363d] text-[11px] text-[#8b949e]"
            style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <ShieldCheck size={16} className="text-[#3fb950] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#e6edf3]" style={{ color: 'var(--text-primary)' }}>100% Client-Side Compression:</span> Your code is compressed directly into the URL hash using LZ algorithm. No code is stored on any server or database, keeping your snippets permanent, fast, and completely private.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="bg-[#161b22] px-4 py-3 text-[11px] text-[#8b949e] border-t border-[#30363d] flex justify-between items-center"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
          <span>{codeLength} characters compressed</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] rounded-lg font-medium transition-all"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
