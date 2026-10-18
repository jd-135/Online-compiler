import React, { useEffect, useState } from 'react';
import { Zap, Terminal, Sparkles, Code2 } from 'lucide-react';

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Studio...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Stage 1
    const t1 = setTimeout(() => {
      setProgress(35);
      setStatusText('Mounting Language Workspaces...');
    }, 200);

    // Stage 2
    const t2 = setTimeout(() => {
      setProgress(75);
      setStatusText('Connecting Sandbox Runtimes...');
    }, 600);

    // Stage 3
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Studio Ready');
    }, 1000);

    // Fade out and finish
    const t4 = setTimeout(() => {
      setIsFading(true);
    }, 1250);

    const t5 = setTimeout(() => {
      onFinish();
    }, 1550);

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1117] select-none transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#58a6ff]/15 via-indigo-600/10 to-[#3fb950]/10 blur-3xl pointer-events-none" />

      {/* Main Branding Card */}
      <div className="relative flex flex-col items-center text-center space-y-6 max-w-sm px-6">
        {/* Animated Glowing Logo */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#58a6ff] via-indigo-500 to-[#3fb950] rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-[#161b22] border border-[#30363d] flex items-center justify-center shadow-2xl">
            <Zap size={38} className="text-[#58a6ff] fill-current animate-bounce" />
          </div>
        </div>

        {/* Brand Title with smooth tracking */}
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-[#e6edf3]">
              CodePulse
            </span>
            <span className="text-xs font-bold text-[#58a6ff] bg-[#58a6ff]/10 border border-[#58a6ff]/30 px-2 py-0.5 rounded-full">
              Studio
            </span>
          </div>
          <p className="text-xs text-[#8b949e] mt-1 font-sans">
            Next-Gen Multi-Language Cloud Compiler
          </p>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-64 space-y-2">
          <div className="h-1.5 w-full bg-[#161b22] rounded-full overflow-hidden border border-[#30363d] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#58a6ff] via-indigo-500 to-[#3fb950] rounded-full transition-all duration-300 ease-out shadow-sm shadow-[#58a6ff]/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-ping" />
              <span>{statusText}</span>
            </span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
