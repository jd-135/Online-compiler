import React, { useEffect, useState } from 'react';

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Smooth, rapid progress sweep
    const step1 = setTimeout(() => setProgress(45), 150);
    const step2 = setTimeout(() => setProgress(85), 450);
    const step3 = setTimeout(() => setProgress(100), 750);
    const step4 = setTimeout(() => setIsFading(true), 950);
    const step5 = setTimeout(() => onFinish(), 1200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(step5);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0f1117] select-none transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-5 text-center">
        {/* Minimalist Monochrome Logo Glyph */}
        <div className="w-12 h-12 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-[#58a6ff]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>

        {/* Brand Header */}
        <div className="space-y-1">
          <div className="text-sm font-mono font-bold tracking-[0.2em] text-[#e6edf3] uppercase">
            JD COMPILER
          </div>
          <div className="text-[11px] font-mono text-[#8b949e] tracking-wider">
            Fast Cloud Execution
          </div>
        </div>

        {/* Minimalist 2px Precision Progress Line */}
        <div className="w-48 space-y-2 pt-1">
          <div className="w-full h-[2px] bg-[#21262d] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#58a6ff] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
            <span>{progress === 100 ? 'Ready' : 'Initializing...'}</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
