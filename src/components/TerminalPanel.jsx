import React, { useState } from 'react';
import { 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Maximize2, 
  Minimize2,
  CornerDownRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

export function TerminalPanel({
  executionResult,
  isRunning,
  stdin,
  onChangeStdin,
  onClearOutput,
  isExpanded,
  onToggleExpand
}) {
  const [activeTab, setActiveTab] = useState('output');
  const [copied, setCopied] = useState(false);

  // Auto-switch to diagnostics tab if compilation or runtime error occurs
  React.useEffect(() => {
    if (executionResult?.compileOutput || executionResult?.stderr) {
      if (!executionResult.stdout) {
        setActiveTab('errors');
      }
    } else if (executionResult?.stdout) {
      setActiveTab('output');
    }
  }, [executionResult]);

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

  const hasErrors = Boolean(executionResult?.compileOutput || executionResult?.stderr);
  const isSuccess = executionResult?.success;

  return (
    <div className="flex flex-col bg-[#0b0f19] text-slate-200 select-text h-full overflow-hidden transition-all duration-200 border-l border-slate-800/80">
      {/* Console Tab Header */}
      <div className="h-10 bg-[#0d131f] border-b border-slate-800/80 flex items-center justify-between px-3 select-none shrink-0">
        <div className="flex items-center gap-1 h-full">
          {/* Output Tab */}
          <button
            onClick={() => setActiveTab('output')}
            className={`h-7 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all ${
              activeTab === 'output'
                ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal size={13} />
            <span>Output</span>
            {executionResult?.stdout && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 animate-pulse" />
            )}
          </button>

          {/* Stdin Tab */}
          <button
            onClick={() => setActiveTab('stdin')}
            className={`h-7 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all ${
              activeTab === 'stdin'
                ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CornerDownRight size={13} />
            <span>Stdin</span>
            {stdin.trim() && (
              <span className="px-1.5 py-0.2 bg-cyan-950 text-cyan-300 rounded text-[9px] font-mono border border-cyan-700 ml-1">
                Active
              </span>
            )}
          </button>

          {/* Errors & Diagnostics Tab */}
          <button
            onClick={() => setActiveTab('errors')}
            className={`h-7 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all ${
              activeTab === 'errors'
                ? 'bg-slate-800 text-rose-300 font-semibold border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <AlertCircle size={13} className={hasErrors ? 'text-rose-400' : ''} />
            <span>Diagnostics</span>
            {hasErrors && (
              <span className="px-1.5 py-0.2 bg-rose-950 text-rose-300 rounded text-[9px] font-mono border border-rose-700 ml-1">
                !
              </span>
            )}
          </button>

          {/* Stats Tab */}
          <button
            onClick={() => setActiveTab('metrics')}
            className={`h-7 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all ${
              activeTab === 'metrics'
                ? 'bg-slate-800 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity size={13} />
            <span>Metrics</span>
          </button>
        </div>

        {/* Console Actions */}
        <div className="flex items-center gap-1 text-slate-400">
          {/* Status Badge */}
          {executionResult && !isRunning && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-mono">
              {isSuccess ? (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/40">
                  <CheckCircle2 size={12} />
                  <span>{executionResult.statusText || 'Passed'}</span>
                  {executionResult.time && <span>• {executionResult.time}</span>}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-500/40">
                  <AlertCircle size={12} />
                  <span>{executionResult.statusText || 'Failed'}</span>
                </span>
              )}
            </div>
          )}

          {/* Copy */}
          <button
            onClick={handleCopyOutput}
            title={copied ? "Copied output" : "Copy output to clipboard"}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          {/* Clear */}
          <button
            onClick={onClearOutput}
            title="Clear output console"
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>

          {/* Expand / Minimize */}
          <button
            onClick={onToggleExpand}
            title={isExpanded ? "Restore split" : "Maximize terminal"}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Console Content Area */}
      <div className="flex-1 overflow-auto p-3.5 font-mono text-xs leading-relaxed">
        {/* Loading / Compiling Overlay State */}
        {isRunning && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-14">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={16} className="text-emerald-400 animate-pulse fill-current" />
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Compiling & Executing...</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Connecting to cloud sandbox runtime
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Standard Output (stdout) */}
        {!isRunning && activeTab === 'output' && (
          <div>
            {executionResult?.stdout ? (
              <pre className="text-slate-100 whitespace-pre-wrap font-mono select-text selection:bg-cyan-900/60">
                {executionResult.stdout}
              </pre>
            ) : hasErrors ? (
              <div className="space-y-3">
                <div className="text-amber-300 bg-amber-950/40 p-3 rounded-lg border border-amber-500/30 flex items-start gap-2.5">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <div className="font-semibold text-amber-200">Execution Encountered Errors</div>
                    <div className="text-[11px] text-amber-300/80 mt-0.5">
                      Standard output was empty. See diagnostics below:
                    </div>
                  </div>
                </div>
                {executionResult.compileOutput && (
                  <pre className="text-rose-300 whitespace-pre-wrap font-mono p-3 bg-rose-950/20 rounded-lg border border-rose-500/30">
                    {executionResult.compileOutput}
                  </pre>
                )}
                {executionResult.stderr && (
                  <pre className="text-rose-300 whitespace-pre-wrap font-mono p-3 bg-rose-950/20 rounded-lg border border-rose-500/30">
                    {executionResult.stderr}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-14 select-none">
                <Terminal size={32} className="mx-auto mb-2 text-slate-600" />
                <p className="text-xs font-semibold text-slate-400">Terminal Ready</p>
                <p className="text-[11px] mt-1 text-slate-500">
                  Click <strong className="text-emerald-400">Run Code</strong> (or press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-300">Ctrl+Enter</kbd>) to compile and run.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Stdin */}
        {!isRunning && activeTab === 'stdin' && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between pb-2 text-[11px] text-slate-400">
              <span>Feed input into program standard input (cin / scanf / sys.stdin / Scanner):</span>
              {stdin && (
                <button
                  onClick={() => onChangeStdin('')}
                  className="text-rose-400 hover:text-rose-300 text-[10px]"
                >
                  Clear Stdin
                </button>
              )}
            </div>
            <textarea
              value={stdin}
              onChange={(e) => onChangeStdin(e.target.value)}
              placeholder="Enter custom input here... (e.g. test cases, numbers, multi-line data)"
              className="w-full flex-1 min-h-[160px] bg-[#090d16] text-slate-200 p-3 rounded-lg border border-slate-800 focus:border-cyan-500 outline-none font-mono text-xs resize-none"
            />
          </div>
        )}

        {/* Tab 3: Diagnostics & Errors */}
        {!isRunning && activeTab === 'errors' && (
          <div className="space-y-3">
            {executionResult?.compileOutput && (
              <div className="border border-rose-500/30 rounded-lg bg-rose-950/30 p-3.5">
                <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-2">
                  <AlertCircle size={14} />
                  <span>Compilation Output / Syntax Errors</span>
                </div>
                <pre className="text-rose-200 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                  {executionResult.compileOutput}
                </pre>
              </div>
            )}

            {executionResult?.stderr && (
              <div className="border border-amber-500/30 rounded-lg bg-amber-950/30 p-3.5">
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertCircle size={14} />
                  <span>Standard Error (stderr)</span>
                </div>
                <pre className="text-amber-200 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                  {executionResult.stderr}
                </pre>
              </div>
            )}

            {!executionResult?.compileOutput && !executionResult?.stderr && (
              <div className="text-slate-500 text-center py-14 select-none">
                <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-400/60" />
                <p className="text-xs text-slate-300">No compiler diagnostics or runtime errors reported.</p>
                <p className="text-[11px] mt-1 text-slate-500">Program exited successfully.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Execution Metrics */}
        {!isRunning && activeTab === 'metrics' && (
          <div className="p-2 space-y-4 max-w-lg">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Runtime Performance
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-[#0d131f] border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock size={12} className="text-cyan-400" /> Execution Time
                </div>
                <div className="text-xl font-bold text-white mt-1">
                  {executionResult?.time || '--'}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0d131f] border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Cpu size={12} className="text-indigo-400" /> Peak Memory
                </div>
                <div className="text-xl font-bold text-white mt-1">
                  {executionResult?.memory || 'Standard'}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0d131f] border border-slate-800">
                <div className="text-[11px] text-slate-400">Exit Status Code</div>
                <div className="text-xl font-bold text-white mt-1">
                  {executionResult?.exitCode ?? '--'}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0d131f] border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" /> Execution Engine
                </div>
                <div className="text-sm font-semibold text-cyan-300 mt-1">
                  {executionResult?.provider || 'Judge0 / Wandbox'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
