import React, { useEffect, useState } from 'react';
import { Zap, Terminal, Sparkles, Cpu, Layers, CheckCircle2 } from 'lucide-react';

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing JD COMPILER Core...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Stage 1: Kernel & Virtual Machine
    const t1 = setTimeout(() => {
      setProgress(28);
      setStatusText('Mounting Language Workspaces (Python, Java, C, C++)...');
    }, 180);

    // Stage 2: Sandboxes & Modules
    const t2 = setTimeout(() => {
      setProgress(64);
      setStatusText('Pre-warming NumPy, Pandas, Math & Standard Libraries...');
    }, 550);

    // Stage 3: Ready
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('JD COMPILER Ready');
    }, 950);

    // Stage 4: Fade out
    const t4 = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const t5 = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1117] select-none transition-all duration-300 ${
        isFading ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Background Neon Circuit Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#58a6ff]/20 via-indigo-600/10 to-[#3fb950]/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Futuristic Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#58a6ff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Branding Card */}
      <div className="relative flex flex-col items-center text-center space-y-6 max-w-md px-6">
        {/* Animated JD Monogram Emblem */}
        <div className="relative group">
          {/* Pulsing neon aura */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#58a6ff] via-indigo-500 to-[#3fb950] rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse" />
          
          <div className="relative w-24 h-24 rounded-2xl bg-[#161b22] border-2 border-[#30363d] flex flex-col items-center justify-center shadow-2xl shadow-black/80 overflow-hidden">
            {/* Corner tech accents */}
            <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#58a6ff]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#58a6ff]" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#3fb950]" />
            <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#3fb950]" />

            <div className="font-mono font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#58a6ff] via-[#e6edf3] to-[#3fb950]">
              JD
            </div>
            <span className="text-[9px] font-mono tracking-widest text-[#58a6ff] uppercase -mt-0.5">
              COMPILER
            </span>
          </div>
        </div>

        {/* Brand Title with Sleek Typography */}
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-extrabold font-mono tracking-tight text-[#e6edf3]">
              JD COMPILER
            </span>
            <span className="text-[10px] font-bold tracking-wider text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/30 px-2 py-0.5 rounded-full uppercase">
              PRO
            </span>
          </div>
          <p className="text-xs text-[#8b949e] mt-1.5 font-sans">
            Ultra-Fast Multi-Language Cloud IDE • High-Speed JIT Architecture
          </p>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-72 space-y-2.5">
          <div className="h-1.5 w-full bg-[#161b22] rounded-full overflow-hidden border border-[#30363d] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#58a6ff] via-indigo-500 to-[#3fb950] rounded-full transition-all duration-300 ease-out shadow-sm shadow-[#58a6ff]/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
            <span className="flex items-center gap-1.5 text-left truncate mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-ping shrink-0" />
              <span className="truncate">{statusText}</span>
            </span>
            <span className="font-bold text-[#e6edf3] shrink-0">{progress}%</span>
          </div>
        </div>

        {/* Pre-Loaded Capability Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono text-[#8b949e] pt-1">
          <span className="px-2 py-0.5 rounded-md bg-[#161b22] border border-[#30363d]">
            Python 3.12 (NumPy + Pandas)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#161b22] border border-[#30363d]">
            GCC 13.2 (C/C++)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#161b22] border border-[#30363d]">
            OpenJDK 21
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/30 font-semibold">
            Instant JIT
          </span>
        </div>
      </div>
    </div>
  );
}
