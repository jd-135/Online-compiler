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
  FileText,
  CornerDownRight,
  ShieldCheck,
  Flame
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
    <div className={`flex flex-col bg-[#181818] text-[#cccccc] select-text h-full overflow-hidden transition-all duration-200 border-l border-[#282828]`}>
      {/* Console Tab Header */}
      <div className="h-9 bg-[#1f1f1f] border-b border-[#2b2b2b] flex items-center justify-between px-2 select-none shrink-0">
        <div className="flex items-center h-full">
          {/* Output Tab */}
          <button
            onClick={() => setActiveTab('output')}
            className={`h-full flex items-center gap-1.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'output'
                ? 'border-[#007acc] text-white bg-[#181818]'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <Terminal size={13} />
            <span>Output</span>
            {executionResult?.stdout && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" />
            )}
          </button>

          {/* Stdin Tab */}
          <button
            onClick={() => setActiveTab('stdin')}
            className={`h-full flex items-center gap-1.5 px-3 text-xs font-medium border-b-2 transition-colors relative ${
              activeTab === 'stdin'
                ? 'border-[#007acc] text-white bg-[#181818]'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <CornerDownRight size={13} />
            <span>Custom Stdin</span>
            {stdin.trim() && (
              <span className="px-1.5 py-0.2 bg-blue-900/60 text-blue-300 rounded text-[9px] font-mono border border-blue-500/40 ml-1">
                Active
              </span>
            )}
          </button>

          {/* Errors & Diagnostics Tab */}
          <button
            onClick={() => setActiveTab('errors')}
            className={`h-full flex items-center gap-1.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'errors'
                ? 'border-red-500 text-white bg-[#181818]'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <AlertCircle size={13} className={hasErrors ? 'text-red-400' : ''} />
            <span>Diagnostics</span>
            {hasErrors && (
              <span className="px-1.5 py-0.2 bg-red-900/60 text-red-300 rounded text-[9px] font-mono border border-red-500/40 ml-1">
                !
              </span>
            )}
          </button>

          {/* Metrics Tab */}
          <button
            onClick={() => setActiveTab('metrics')}
            className={`h-full flex items-center gap-1.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'metrics'
                ? 'border-[#007acc] text-white bg-[#181818]'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <Cpu size={13} />
            <span>Stats</span>
          </button>
        </div>

        {/* Console Actions */}
        <div className="flex items-center gap-1 text-[#858585]">
          {/* Status Badge */}
          {executionResult && !isRunning && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] px-2 py-0.5 rounded mr-2 font-mono">
              {isSuccess ? (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  <CheckCircle2 size={12} />
                  <span>{executionResult.statusText || 'Passed'}</span>
                  {executionResult.time && <span>• {executionResult.time}</span>}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                  <AlertCircle size={12} />
                  <span>{executionResult.statusText || 'Execution Failed'}</span>
                </span>
              )}
            </div>
          )}

          {/* Copy */}
          <button
            onClick={handleCopyOutput}
            title={copied ? "Copied output" : "Copy output to clipboard"}
            className="p-1 hover:text-white hover:bg-[#2c2c2d] rounded transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>

          {/* Clear */}
          <button
            onClick={onClearOutput}
            title="Clear output console"
            className="p-1 hover:text-white hover:bg-[#2c2c2d] rounded transition-colors"
          >
            <Trash2 size={14} />
          </button>

          {/* Expand / Minimize */}
          <button
            onClick={onToggleExpand}
            title={isExpanded ? "Restore split" : "Maximize terminal"}
            className="p-1 hover:text-white hover:bg-[#2c2c2d] rounded transition-colors hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Console Content Area */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed">
        {/* Loading / Compiling Overlay State */}
        {isRunning && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-12">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame size={16} className="text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Compiling & Executing...</div>
              <div className="text-[11px] text-[#808080] mt-0.5">
                Connecting to cloud sandbox runtime
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Standard Output (stdout) */}
        {!isRunning && activeTab === 'output' && (
          <div>
            {executionResult?.stdout ? (
              <pre className="text-[#e1e4e8] whitespace-pre-wrap font-mono select-text selection:bg-[#264f78]">
                {executionResult.stdout}
              </pre>
            ) : hasErrors ? (
              <div className="space-y-3">
                <div className="text-amber-400/90 bg-amber-950/20 p-2.5 rounded border border-amber-500/20 flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <div className="font-semibold text-white">Execution Encountered Errors</div>
                    <div className="text-[11px] text-amber-200/80 mt-0.5">
                      Standard output was empty. See compiler and runtime logs below or in the Diagnostics tab.
                    </div>
                  </div>
                </div>
                {executionResult.compileOutput && (
                  <pre className="text-red-400/90 whitespace-pre-wrap font-mono p-2 bg-red-950/10 rounded border border-red-500/20">
                    {executionResult.compileOutput}
                  </pre>
                )}
                {executionResult.stderr && (
                  <pre className="text-red-400/90 whitespace-pre-wrap font-mono p-2 bg-red-950/10 rounded border border-red-500/20">
                    {executionResult.stderr}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-[#6e7681] text-center py-12 select-none">
                <Terminal size={32} className="mx-auto mb-2 opacity-40 text-[#858585]" />
                <p className="text-xs font-medium text-[#858585]">Console is idle</p>
                <p className="text-[11px] mt-1 text-[#666]">
                  Click <strong className="text-emerald-400">Run Code</strong> (or press <kbd className="bg-[#2a2a2a] px-1.5 py-0.5 rounded border border-[#444] text-[#ccc]">Ctrl+Enter</kbd>) to compile and run.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Stdin */}
        {!isRunning && activeTab === 'stdin' && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between pb-2 text-[11px] text-[#8e8e8e]">
              <span>Feed input stream into program standard input (cin / scanf / sys.stdin / Scanner):</span>
              {stdin && (
                <button
                  onClick={() => onChangeStdin('')}
                  className="text-red-400 hover:text-red-300 text-[10px]"
                >
                  Clear Stdin
                </button>
              )}
            </div>
            <textarea
              value={stdin}
              onChange={(e) => onChangeStdin(e.target.value)}
              placeholder="Enter standard input here... (e.g. sample test cases, multiple lines, numbers)"
              className="w-full flex-1 min-h-[160px] bg-[#141414] text-[#d4d4d4] p-3 rounded border border-[#333] focus:border-[#007acc] outline-none font-mono text-xs resize-none"
            />
          </div>
        )}

        {/* Tab 3: Diagnostics & Errors (stderr / compileOutput) */}
        {!isRunning && activeTab === 'errors' && (
          <div className="space-y-3">
            {executionResult?.compileOutput && (
              <div className="border border-red-500/30 rounded bg-red-950/20 p-3">
                <div className="text-xs font-semibold text-red-400 flex items-center gap-1.5 mb-2">
                  <AlertCircle size={14} />
                  <span>Compiler Output / Syntax Errors</span>
                </div>
                <pre className="text-red-300/90 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                  {executionResult.compileOutput}
                </pre>
              </div>
            )}

            {executionResult?.stderr && (
              <div className="border border-amber-500/30 rounded bg-amber-950/20 p-3">
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertCircle size={14} />
                  <span>Standard Error (stderr)</span>
                </div>
                <pre className="text-amber-300/90 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                  {executionResult.stderr}
                </pre>
              </div>
            )}

            {!executionResult?.compileOutput && !executionResult?.stderr && (
              <div className="text-[#6e7681] text-center py-12 select-none">
                <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50 text-emerald-400" />
                <p className="text-xs text-[#8e8e8e]">No compiler diagnostics or runtime errors reported.</p>
                <p className="text-[11px] mt-1 text-[#666]">Build succeeded with 0 errors.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Execution Metrics */}
        {!isRunning && activeTab === 'metrics' && (
          <div className="p-2 space-y-4 max-w-lg">
            <div className="text-xs font-semibold text-white uppercase tracking-wider text-[#8e8e8e]">
              Runtime Performance
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[#202020] border border-[#333]">
                <div className="text-[11px] text-[#858585] flex items-center gap-1">
                  <Clock size={12} /> Execution Time
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {executionResult?.time || '--'}
                </div>
              </div>

              <div className="p-3 rounded bg-[#202020] border border-[#333]">
                <div className="text-[11px] text-[#858585] flex items-center gap-1">
                  <Cpu size={12} /> Peak Memory
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {executionResult?.memory || 'Sandbox standard'}
                </div>
              </div>

              <div className="p-3 rounded bg-[#202020] border border-[#333]">
                <div className="text-[11px] text-[#858585]">Exit Status Code</div>
                <div className="text-lg font-bold text-white mt-1">
                  {executionResult?.exitCode ?? '--'}
                </div>
              </div>

              <div className="p-3 rounded bg-[#202020] border border-[#333]">
                <div className="text-[11px] text-[#858585] flex items-center gap-1">
                  <ShieldCheck size={12} /> Execution Engine
                </div>
                <div className="text-sm font-semibold text-blue-400 mt-1">
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
