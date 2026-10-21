import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lightbulb,
  X,
  Loader2
} from 'lucide-react';
import { analyzeError, analyzeErrorAsync } from '../services/aiDebugger';

export function TerminalPanel({
  executionResult,
  isRunning,
  onRunCodeWithInput,
  onClearOutput,
  isExpanded,
  onToggleExpand,
  selectedLanguage,
  code,
  onApplyFix,
  geminiApiKey = ''
}) {
  const [copied, setCopied] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [submittedInput, setSubmittedInput] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const terminalInputRef = useRef(null);
  const consoleContainerRef = useRef(null);

  // Auto-focus terminal input whenever waiting for input
  useEffect(() => {
    if (terminalInputRef.current) {
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
    if (executionResult.isInteractivePrompt) return true;
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

  // Handle Enter key inside the terminal input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = currentInput;
      if (!val && val !== '0') return;
      setSubmittedInput(val);
      setCurrentInput('');
      if (onRunCodeWithInput) {
        onRunCodeWithInput(val + '\n');
      }
    }
  };

  // Trigger AI error diagnostics
  const handleRunAiDiagnostics = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const rawError = executionResult?.compileOutput || executionResult?.stderr || executionResult?.statusText || '';
      const analysis = await analyzeErrorAsync({
        language: selectedLanguage?.id || 'python',
        errorText: rawError,
        code: code || '',
        apiKey: geminiApiKey || ''
      });
      setAiAnalysis(analysis);
    } catch {
      const rawError = executionResult?.compileOutput || executionResult?.stderr || executionResult?.statusText || '';
      const analysis = analyzeError({
        language: selectedLanguage?.id || 'python',
        errorText: rawError,
        code: code || ''
      });
      setAiAnalysis(analysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isSuccess = executionResult?.success;
  const hasRealError = executionResult && !executionResult.success && !isWaitingForInput;

  return (
    <div 
      className="flex flex-col bg-[#0f1117] text-[#e6edf3] h-full overflow-hidden select-text border-l border-[#30363d] cursor-text"
      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      onClick={handleConsoleClick}
    >
      {/* Terminal Title Bar */}
      <div 
        className="h-9 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-3 select-none shrink-0"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2">
          {/* Terminal traffic light dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f85149]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]/80" />
          </div>

          <span className="text-xs font-mono font-semibold text-[#e6edf3]">console</span>

          {/* Status & Latency Badge */}
          {executionResult && !isRunning && (
            <div className="ml-2 font-mono text-[11px]">
              {isSuccess ? (
                <span className="inline-flex items-center gap-1.5 text-[#3fb950] text-[10px]">
                  <CheckCircle2 size={11} />
                  <span>Passed</span>
                  {executionResult.time && (
                    <span className="bg-[#3fb950]/15 text-[#3fb950] px-1.5 py-0.2 rounded border border-[#3fb950]/30 font-semibold font-mono">
                      ⚡ Latency: {executionResult.time}
                    </span>
                  )}
                  {executionResult.provider && (
                    <span className="text-[#8b949e] text-[9px] hidden md:inline">
                      • {executionResult.provider}
                    </span>
                  )}
                </span>
              ) : isWaitingForInput ? (
                <span className="inline-flex items-center gap-1.5 text-[#58a6ff] text-[10px] animate-pulse font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff] animate-ping" />
                  <span>Input required • Type below & press ↵ Enter</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[#f85149] text-[10px]">
                  <AlertCircle size={11} />
                  <span>{executionResult.statusText || 'Error'}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Console Action Tools */}
        <div className="flex items-center gap-1 text-[#8b949e]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyOutput();
            }}
            title={copied ? "Copied" : "Copy output"}
            className="p-1 hover:text-[#e6edf3] hover:bg-[#21262d] rounded transition-colors"
          >
            {copied ? <Check size={13} className="text-[#3fb950]" /> : <Copy size={13} />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSubmittedInput('');
              setCurrentInput('');
              setAiAnalysis(null);
              onClearOutput();
            }}
            title="Clear output"
            className="p-1 hover:text-[#e6edf3] hover:bg-[#21262d] rounded transition-colors"
          >
            <Trash2 size={13} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            title={isExpanded ? "Restore split" : "Maximize terminal"}
            className="p-1 hover:text-[#e6edf3] hover:bg-[#21262d] rounded transition-colors hidden sm:block"
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
        {/* Empty State */}
        {!isRunning && !executionResult && (
          <div className="text-[#8b949e] select-none py-2">
            <div>Program output will appear here.</div>
            <div className="text-xs mt-1 text-[#8b949e]/80">Press <kbd className="text-[#e6edf3] bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d]">Ctrl+Enter</kbd> to compile and run.</div>
          </div>
        )}

        {/* Console Output (Persists continuously without flickering or blanking out!) */}
        {executionResult && (
          <div className="whitespace-pre-wrap break-words">
            {/* Standard Output Text */}
            <span className="text-[#e6edf3]" style={{ color: 'var(--text-primary)' }}>{cleanStdout}</span>

            {/* If user submitted input and program is running, show the typed input inline */}
            {isRunning && submittedInput && (
              <span className="text-[#58a6ff] font-semibold" style={{ color: 'var(--accent-primary)' }}>{submittedInput}</span>
            )}

            {/* Non-EOF Compiler / Runtime Errors */}
            {hasRealError && (
              <div className="mt-3 text-[#f85149]">
                {executionResult.compileOutput && (
                  <div className="text-[#f85149] whitespace-pre-wrap">
                    {executionResult.compileOutput}
                  </div>
                )}
                {executionResult.stderr && (
                  <div className="text-[#f85149] whitespace-pre-wrap">
                    {executionResult.stderr}
                  </div>
                )}

                {/* AI Error Explainer & Debugger Trigger */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRunAiDiagnostics}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#58a6ff]/15 hover:bg-[#58a6ff]/25 text-[#e6edf3] border border-[#58a6ff]/40 text-xs font-semibold shadow-md transition-all active:scale-95 group disabled:opacity-50"
                    style={{ borderColor: 'var(--accent-primary)', color: 'var(--text-primary)' }}
                  >
                    {isAnalyzing ? (
                      <Loader2 size={14} className="text-[#58a6ff] animate-spin" style={{ color: 'var(--accent-primary)' }} />
                    ) : (
                      <Sparkles size={14} className="text-[#58a6ff] group-hover:rotate-12 transition-transform" style={{ color: 'var(--accent-primary)' }} />
                    )}
                    <span>{isAnalyzing ? 'Analyzing Issue...' : 'Explain & Fix with AI'}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#3fb950]/15 text-[#3fb950] font-mono border border-[#3fb950]/30 font-medium">
                      {geminiApiKey ? 'Gemini 1.5 Cloud' : 'Built-in • Zero Cost'}
                    </span>
                  </button>
                </div>

                {/* AI Debugger Assistant Card */}
                {aiAnalysis && (
                  <div 
                    className="mt-3 bg-[#161b22] border border-[#58a6ff]/40 rounded-xl p-3.5 space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 font-sans"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <div 
                    className="flex items-center justify-between border-b border-[#30363d] pb-2 text-xs"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles size={15} className="text-[#58a6ff]" style={{ color: 'var(--accent-primary)' }} />
                      <span className="font-bold text-[#e6edf3]">AI Debugger Assistant</span>
                      {aiAnalysis.line && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f85149]/15 text-[#f85149] border border-[#f85149]/30 font-semibold">
                          Line {aiAnalysis.line}
                        </span>
                      )}
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30">
                        {aiAnalysis.isGenerative ? 'Live Cloud AI' : 'Expert Engine'}
                      </span>
                    </div>
                      <button
                        type="button"
                        onClick={() => setAiAnalysis(null)}
                        className="text-[#8b949e] hover:text-[#e6edf3] p-0.5 rounded transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <X size={13} />
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {/* Type & Explanation */}
                      <div>
                        <div className="text-[11px] font-semibold text-[#f85149] mb-0.5">{aiAnalysis.type}</div>
                        <div className="text-[#e6edf3] leading-relaxed" style={{ color: 'var(--text-primary)' }}>{aiAnalysis.explanation}</div>
                      </div>

                      {/* Root cause */}
                      {aiAnalysis.cause && (
                        <div 
                          className="text-[#8b949e] text-[11px] leading-relaxed bg-[#0f1117]/80 p-2.5 rounded-lg border border-[#30363d]"
                          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                        >
                          <span className="text-[#e6edf3] font-semibold" style={{ color: 'var(--text-primary)' }}>Why this happened: </span>
                          {aiAnalysis.cause}
                        </div>
                      )}

                      {/* Diff comparison preview */}
                      {aiAnalysis.originalLine && aiAnalysis.suggestedLine && (
                        <div 
                          className="font-mono text-[11px] rounded-lg overflow-hidden border border-[#30363d]"
                          style={{ borderColor: 'var(--border-color)' }}
                        >
                          <div className="bg-[#f85149]/10 text-[#f85149] px-2.5 py-1.5 flex items-center gap-2 border-b border-[#f85149]/20">
                            <span className="select-none text-[#f85149]/60 font-bold">-</span>
                            <span className="truncate">{aiAnalysis.originalLine}</span>
                          </div>
                          <div className="bg-[#3fb950]/10 text-[#3fb950] px-2.5 py-1.5 flex items-center gap-2">
                            <span className="select-none text-[#3fb950]/60 font-bold">+</span>
                            <span className="truncate">{aiAnalysis.suggestedLine}</span>
                          </div>
                        </div>
                      )}

                      {/* Action buttons & tip */}
                      <div className="flex items-center justify-between pt-1">
                        {aiAnalysis.tip && (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e] truncate pr-2" style={{ color: 'var(--text-secondary)' }}>
                            <Lightbulb size={13} className="text-amber-400 shrink-0" />
                            <span className="truncate">{aiAnalysis.tip}</span>
                          </div>
                        )}

                        {aiAnalysis.fixCode && onApplyFix && (
                          <button
                            type="button"
                            onClick={() => {
                              onApplyFix(aiAnalysis.fixCode);
                              setAiAnalysis(null);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-[#3fb950] hover:bg-[#2ea043] text-[#0f1117] font-semibold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 ml-auto transition-all"
                          >
                            <Check size={13} />
                            <span>Apply Fix to Code</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Interactive Input Line when waiting for user input */}
        {!isRunning && isWaitingForInput && (
          <div className="flex items-center gap-1.5 font-mono text-[13px] mt-2 bg-[#161b22]/90 border border-[#30363d] rounded-lg px-2.5 py-1.5 shadow-sm">
            <span className="text-[#58a6ff] select-none font-bold" style={{ color: 'var(--accent-primary)' }}>&gt;</span>
            <input
              ref={terminalInputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your input and press Enter..."
              className="flex-1 bg-transparent text-[#e6edf3] font-semibold font-mono text-[13px] outline-none border-none p-0 focus:ring-0 placeholder:text-[#8b949e]/60 placeholder:font-normal"
              autoFocus
            />
            <span className="text-[10px] text-[#8b949e] font-mono px-1.5 py-0.5 rounded bg-[#21262d] border border-[#30363d]">
              ↵ Enter
            </span>
          </div>
        )}

        {/* Running status indicator at bottom (never blanks out the console!) */}
        {isRunning && (
          <div className="flex items-center gap-2 text-[#58a6ff] py-1.5 mt-2 font-mono text-xs" style={{ color: 'var(--accent-primary)' }}>
            <span className="w-3 h-3 border-2 border-[#58a6ff]/30 border-t-[#58a6ff] rounded-full animate-spin" />
            <span>Compiling & executing...</span>
          </div>
        )}
      </div>
    </div>
  );
}
