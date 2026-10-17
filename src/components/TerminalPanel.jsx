import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function TerminalPanel({
  executionResult,
  isRunning,
  onRunCodeWithInput,
  onClearOutput,
  isExpanded,
  onToggleExpand
}) {
  const [copied, setCopied] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const terminalInputRef = useRef(null);
  const consoleContainerRef = useRef(null);

  // Auto-focus terminal on mount or when execution finishes
  useEffect(() => {
    if (!isRunning && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [isRunning, executionResult]);

  // Focus terminal input when clicking anywhere in console
  const handleConsoleClick = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  const handleCopyOutput = async () => {
    const text = executionResult?.stdout || executionResult?.compileOutput || executionResult?.stderr || '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Check if an EOFError or input wait happened
  const isWaitingForInput = React.useMemo(() => {
    if (!executionResult) return false;
    const err = executionResult.stderr || '';
    return err.includes('EOFError') || 
           err.includes('NoSuchElementException') || 
           err.includes('EOF when reading') ||
           err.includes('InputMismatchException');
  }, [executionResult]);

  // Clean stdout to display
  const cleanStdout = React.useMemo(() => {
    if (!executionResult) return '';
    return executionResult.stdout || '';
  }, [executionResult]);

  // Handle Enter key inside the terminal
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = currentInput;
      setCurrentInput('');
      if (onRunCodeWithInput) {
        onRunCodeWithInput(val);
      }
    }
  };

  const isSuccess = executionResult?.success;
  const hasRealError = executionResult && !executionResult.success && !isWaitingForInput;

  return (
    <div 
      className="flex flex-col bg-[#0b0f17] text-slate-200 h-full overflow-hidden select-text border-l border-slate-800 cursor-text"
      onClick={handleConsoleClick}
    >
      {/* Terminal Title Bar */}
      <div className="h-9 bg-[#131924] border-b border-slate-800/80 flex items-center justify-between px-3 select-none shrink-0">
        <div className="flex items-center gap-2">
          {/* Terminal traffic light dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <span className="text-xs font-mono font-semibold text-slate-300">console</span>

          {/* Status Badge */}
          {executionResult && !isRunning && (
            <div className="ml-2 font-mono text-[11px]">
              {isSuccess ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px]">
                  <CheckCircle2 size={11} />
                  <span>Passed {executionResult.time ? `(${executionResult.time})` : ''}</span>
                </span>
              ) : isWaitingForInput ? (
                <span className="inline-flex items-center gap-1 text-cyan-400 text-[10px]">
                  <span>Ready for input</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-400 text-[10px]">
                  <AlertCircle size={11} />
                  <span>{executionResult.statusText || 'Error'}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Console Action Tools */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyOutput();
            }}
            title={copied ? "Copied" : "Copy output"}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClearOutput();
            }}
            title="Clear output"
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <Trash2 size={13} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            title={isExpanded ? "Restore split" : "Maximize terminal"}
            className="p-1 hover:text-white hover:bg-slate-800 rounded transition-colors hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Main Terminal Screen */}
      <div 
        ref={consoleContainerRef}
        className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed select-text"
      >
        {/* Loading Spinner */}
        {isRunning && (
          <div className="flex items-center gap-2 text-cyan-400 py-1">
            <span className="w-3 h-3 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-xs">Running program...</span>
          </div>
        )}

        {/* Empty State */}
        {!isRunning && !executionResult && (
          <div className="text-slate-600 select-none py-2">
            <div>Program output will appear here.</div>
            <div className="text-xs mt-1 text-slate-700">Press <kbd className="text-slate-500">Ctrl+Enter</kbd> to compile and run.</div>
          </div>
        )}

        {/* Standard Output with seamless inline typing directly in the console */}
        {!isRunning && executionResult && (
          <div className="whitespace-pre-wrap break-words">
            {/* Output text */}
            <span className="text-slate-100">{cleanStdout}</span>

            {/* Inline interactive input right in the terminal flow */}
            <span className="inline-flex items-baseline">
              <span className="text-cyan-300 font-semibold">{currentInput}</span>
              <span className="w-2 h-4 bg-cyan-400 inline-block translate-y-0.5 animate-pulse ml-0.5" />
            </span>

            {/* Hidden native input capturing typing anywhere in the console */}
            <input
              ref={terminalInputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
              autoFocus
            />

            {/* Non-EOF Compiler / Runtime Errors */}
            {hasRealError && (
              <div className="mt-3 text-rose-400">
                {executionResult.compileOutput && (
                  <div className="text-rose-400 whitespace-pre-wrap">
                    {executionResult.compileOutput}
                  </div>
                )}
                {executionResult.stderr && (
                  <div className="text-rose-400 whitespace-pre-wrap">
                    {executionResult.stderr}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
