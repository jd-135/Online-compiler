import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  CornerDownLeft, 
  Send,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';

export function TerminalPanel({
  executionResult,
  isRunning,
  terminalInput,
  onChangeTerminalInput,
  onSubmitTerminalInput,
  onClearOutput,
  isExpanded,
  onToggleExpand
}) {
  const [copied, setCopied] = useState(false);
  const [inlineInput, setInlineInput] = useState('');
  const inputRef = useRef(null);
  const consoleBottomRef = useRef(null);

  // Detect if output had an EOFError or input request
  const isInputRequired = React.useMemo(() => {
    if (!executionResult) return false;
    const err = executionResult.stderr || executionResult.compileOutput || '';
    return err.includes('EOFError') || 
           err.includes('NoSuchElementException') || 
           err.includes('EOF when reading') ||
           err.includes('InputMismatchException');
  }, [executionResult]);

  // Focus input when input is required
  useEffect(() => {
    if (isInputRequired && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputRequired]);

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

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!inlineInput.trim()) return;
    onSubmitTerminalInput(inlineInput.trim());
    setInlineInput('');
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    onSubmitTerminalInput(terminalInput.trim());
  };

  const hasErrors = Boolean(executionResult?.compileOutput || executionResult?.stderr);
  const isSuccess = executionResult?.success;

  return (
    <div className="flex flex-col bg-[#0d1117] text-slate-200 h-full overflow-hidden select-text border-l border-slate-800">
      {/* Terminal Title Bar */}
      <div className="h-10 bg-[#161b22] border-b border-slate-800 flex items-center justify-between px-3 select-none shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">Terminal Output</span>

          {/* Status Badge */}
          {executionResult && !isRunning && (
            <div className="ml-2 font-mono text-[11px]">
              {isSuccess ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={11} />
                  <span>Passed</span>
                  {executionResult.time && <span>• {executionResult.time}</span>}
                </span>
              ) : isInputRequired ? (
                <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full animate-pulse">
                  <AlertCircle size={11} />
                  <span>Input Required</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-950/70 border border-rose-500/40 px-2 py-0.5 rounded-full">
                  <AlertCircle size={11} />
                  <span>{executionResult.statusText || 'Error'}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Console Action Tools */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            onClick={handleCopyOutput}
            title={copied ? "Copied" : "Copy output"}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          <button
            onClick={onClearOutput}
            title="Clear output"
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            <Trash2 size={14} />
          </button>

          <button
            onClick={onToggleExpand}
            title={isExpanded ? "Restore split" : "Maximize terminal"}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded-md transition-colors hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Console Output View */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed space-y-3">
        {/* Loading Spinner */}
        {isRunning && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-16">
            <div className="w-9 h-9 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
            <div className="text-sm font-semibold text-white">Running code...</div>
          </div>
        )}

        {/* Empty Console State */}
        {!isRunning && !executionResult && (
          <div className="text-slate-500 text-center py-16 select-none">
            <Terminal size={32} className="mx-auto mb-2 opacity-40 text-slate-400" />
            <p className="text-xs font-semibold text-slate-400">Terminal is ready</p>
            <p className="text-[11px] mt-1 text-slate-500">
              Click <strong className="text-emerald-400">Run Code</strong> (or press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300">Ctrl+Enter</kbd>) to compile and run.
            </p>
          </div>
        )}

        {/* Standard Output (stdout) */}
        {!isRunning && executionResult && (
          <div className="space-y-3">
            {executionResult.stdout && (
              <pre className="text-slate-100 whitespace-pre-wrap font-mono selection:bg-cyan-900/60">
                {executionResult.stdout}
              </pre>
            )}

            {/* INTERACTIVE INPUT PROMPT IF PROGRAM WAS ASKING FOR INPUT (FIXES EOFError) */}
            {isInputRequired && (
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                  <AlertCircle size={14} className="text-amber-400 shrink-0" />
                  <span>This program is waiting for your input:</span>
                </div>
                <form onSubmit={handleInlineSubmit} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inlineInput}
                    onChange={(e) => setInlineInput(e.target.value)}
                    placeholder="Type number or input value (e.g. 4)..."
                    className="flex-1 bg-[#161b22] border border-amber-500/60 focus:border-amber-400 text-white font-mono text-xs px-3 py-1.5 rounded-lg outline-none shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-all shadow-md"
                  >
                    <span>Submit</span>
                    <CornerDownLeft size={12} />
                  </button>
                </form>
                <div className="text-[10px] text-amber-400/80">
                  Tip: Submitting will automatically supply your input and run the program.
                </div>
              </div>
            )}

            {/* Standard Error (stderr) if NOT just an input request */}
            {executionResult.stderr && !isInputRequired && (
              <div className="border border-rose-500/30 rounded-xl bg-rose-950/20 p-3">
                <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle size={14} />
                  <span>Runtime Error</span>
                </div>
                <pre className="text-rose-200 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                  {executionResult.stderr}
                </pre>
              </div>
            )}

            {/* Compiler Output (compile errors) */}
            {executionResult.compileOutput && (
              <div className="border border-rose-500/30 rounded-xl bg-rose-950/20 p-3">
                <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle size={14} />
                  <span>Compilation Error</span>
                </div>
                <pre className="text-rose-200 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                  {executionResult.compileOutput}
                </pre>
              </div>
            )}

            <div ref={consoleBottomRef} />
          </div>
        )}
      </div>

      {/* Terminal Interactive Input Prompt at the Bottom of Output */}
      <div className="p-2.5 bg-[#161b22] border-t border-slate-800">
        <form onSubmit={handlePromptSubmit} className="flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs pl-1 font-bold select-none">&gt;</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => onChangeTerminalInput(e.target.value)}
            placeholder="Provide program input here (e.g. 15, or test cases)..."
            className="flex-1 bg-[#0d1117] border border-slate-700/80 focus:border-cyan-500 text-slate-100 font-mono text-xs px-2.5 py-1.5 rounded-lg outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            title="Send input and run"
            disabled={isRunning}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs rounded-lg flex items-center gap-1 border border-slate-700 hover:border-cyan-500/50 transition-all shrink-0"
          >
            <span>Input</span>
            <CornerDownLeft size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}
