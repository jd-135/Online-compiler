import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Zap, CheckCircle2 } from 'lucide-react';

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing compiler kernel...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const s1 = setTimeout(() => {
      setProgress(48);
      setStatusText('Mounting WebAssembly & Cloud engines...');
    }, 200);

    const s2 = setTimeout(() => {
      setProgress(82);
      setStatusText('Configuring syntax highlighter & hotkeys...');
    }, 550);

    const s3 = setTimeout(() => {
      setProgress(100);
      setStatusText('JD COMPILER Engine Online');
    }, 850);

    const s4 = setTimeout(() => {
      setIsFading(true);
    }, 1100);

    const s5 = setTimeout(() => {
      onFinish();
    }, 1350);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
      clearTimeout(s5);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0d14] select-none transition-all duration-400 ease-out ${
        isFading ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Background Glow Radial */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#58a6ff]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Sleek Central Emblem */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0f1117] border border-[#30363d] shadow-2xl flex items-center justify-center relative overflow-hidden group">
            {/* Ambient Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#58a6ff]/20 to-[#3fb950]/10 opacity-70" />
            
            <svg
              className="w-8 h-8 text-[#58a6ff] relative z-10 drop-shadow-[0_0_8px_rgba(88,166,255,0.6)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          {/* Micro status ping indicator */}
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#3fb950] border-2 border-[#0a0d14]" />
          </span>
        </div>

        {/* Branding */}
        <div className="space-y-1.5 mb-6">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl font-mono font-bold tracking-[0.25em] text-[#e6edf3] uppercase">
              JD COMPILER
            </h1>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#58a6ff]/15 text-[#58a6ff] border border-[#58a6ff]/30">
              v2.0
            </span>
          </div>
          <p className="text-xs font-mono text-[#8b949e] tracking-wide">
            High-Performance WebAssembly & Cloud Engine
          </p>
        </div>

        {/* 2px Precision Progress Bar with Leading Glow */}
        <div className="w-full space-y-2.5">
          <div className="relative w-full h-[3px] bg-[#161b22] rounded-full overflow-hidden border border-[#30363d]/50">
            <div
              className="h-full bg-gradient-to-r from-[#58a6ff] via-[#388bfd] to-[#3fb950] transition-all duration-300 ease-out relative shadow-[0_0_10px_rgba(88,166,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Label & Percentage */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
            <span className="truncate pr-2 flex items-center gap-1.5 text-[#8b949e]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-pulse" />
              {statusText}
            </span>
            <span className="text-[#e6edf3] font-semibold tabular-nums shrink-0">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
