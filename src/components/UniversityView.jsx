import React, { useState, useEffect, useMemo } from 'react';
import { 
  GraduationCap, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Code2, 
  ChevronRight, 
  Flame, 
  HelpCircle,
  ExternalLink,
  Zap,
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  Check
} from 'lucide-react';
import { CURRICULUM } from '../constants/curriculum';
import { runCode } from '../services/compilerService';
import { analyzeErrorAsync } from '../services/aiDebugger';

const PROGRESS_STORAGE_KEY = 'jd_university_progress_v1';

export function UniversityView({ onBackToCompiler, onLoadCodeInCompiler, settings }) {
  // Available languages
  const languageKeys = ['c', 'python', 'cpp', 'java'];
  const [selectedLangKey, setSelectedLangKey] = useState('c');

  // Load progress from localStorage: set of completed problem IDs
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      completedProblems: [],
      totalXp: 0
    };
  });

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const currentCurriculum = CURRICULUM[selectedLangKey] || CURRICULUM.c;

  // Flatten all problems for the current language
  const allProblems = useMemo(() => {
    const list = [];
    currentCurriculum.modules.forEach((mod) => {
      mod.problems.forEach((prob) => {
        list.push({ ...prob, moduleId: mod.id, moduleTitle: mod.title, level: mod.level });
      });
    });
    return list;
  }, [currentCurriculum]);

  // Determine which problem is unlocked:
  // Problem 1 is always unlocked. Problem N is unlocked if Problem N-1 is completed.
  const isProblemUnlocked = (probIndex) => {
    if (probIndex === 0) return true;
    const prevProb = allProblems[probIndex - 1];
    return progress.completedProblems.includes(prevProb.id);
  };

  const isProblemCompleted = (probId) => {
    return progress.completedProblems.includes(probId);
  };

  // Currently active problem
  const [activeProblemId, setActiveProblemId] = useState(() => {
    return allProblems[0]?.id || 'c_m1_p1';
  });

  // If user switches language, select the first unlocked and uncompleted problem (or problem 1)
  useEffect(() => {
    if (allProblems.length > 0) {
      const firstUnsolved = allProblems.find((p, idx) => isProblemUnlocked(idx) && !isProblemCompleted(p.id));
      setActiveProblemId(firstUnsolved ? firstUnsolved.id : allProblems[0].id);
    }
  }, [selectedLangKey]);

  const activeProblem = useMemo(() => {
    return allProblems.find((p) => p.id === activeProblemId) || allProblems[0];
  }, [allProblems, activeProblemId]);

  const activeProbIndex = useMemo(() => {
    return allProblems.findIndex((p) => p.id === activeProblemId);
  }, [allProblems, activeProblemId]);

  // Code editor state for current problem
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [solutionCopied, setSolutionCopied] = useState(false);

  useEffect(() => {
    if (activeProblem) {
      setUserCode(activeProblem.starterCode || '');
    }
    setTestResults(null);
    setAiHint(null);
    setShowSolution(false); // Answer automatically hidden on every problem!
    setShowHints(false);
    setSolutionCopied(false);
  }, [activeProblemId]);

  // Testing & execution states
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [aiHint, setAiHint] = useState(null);
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Normalize output string for comparison
  const normalizeOutput = (str) => {
    return (str || '')
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((line) => line.trimEnd())
      .filter((line) => line.length > 0)
      .join('\n')
      .trim();
  };

  // Run and verify code against all test cases
  const handleRunVerify = async () => {
    if (isRunningTests || !activeProblem) return;
    setIsRunningTests(true);
    setTestResults(null);
    setAiHint(null);

    const testCases = activeProblem.testCases || [];
    const results = [];
    let allPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const res = await runCode({
          language: selectedLangKey,
          code: userCode,
          stdin: tc.input || ''
        });

        const actualNorm = normalizeOutput(res.stdout);
        const expectedNorm = normalizeOutput(tc.expectedOutput);
        const passed = actualNorm === expectedNorm && !res.stderr && res.exitCode === 0;

        if (!passed) allPassed = false;

        results.push({
          caseNum: i + 1,
          input: tc.input,
          expected: expectedNorm,
          actual: actualNorm,
          passed,
          error: res.stderr || res.compileOutput || ''
        });
      } catch (err) {
        allPassed = false;
        results.push({
          caseNum: i + 1,
          input: tc.input,
          expected: normalizeOutput(tc.expectedOutput),
          actual: '',
          passed: false,
          error: err.message || 'Execution error'
        });
      }
    }

    setTestResults({
      allPassed,
      cases: results
    });

    setIsRunningTests(false);

    // If all passed and not already completed, award XP and unlock next!
    if (allPassed && !isProblemCompleted(activeProblem.id)) {
      setProgress((prev) => ({
        completedProblems: [...prev.completedProblems, activeProblem.id],
        totalXp: prev.totalXp + (activeProblem.xp || 50)
      }));
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  };

  // Trigger AI Tutor guidance for stuck code
  const handleAskAiTutor = async () => {
    if (isAskingAi || !activeProblem) return;
    setIsAskingAi(true);
    try {
      const firstFailed = testResults?.cases?.find((c) => !c.passed);
      const errorMsg = firstFailed?.error || `Expected: "${firstFailed?.expected}" but got: "${firstFailed?.actual}"`;
      
      const analysis = await analyzeErrorAsync({
        language: selectedLangKey,
        code: userCode,
        errorText: `Problem: ${activeProblem.title}\nRequirements: ${activeProblem.description}\nFailure Output: ${errorMsg}`,
        apiKey: settings?.geminiApiKey || ''
      });
      setAiHint(analysis);
    } catch {
      setAiHint({
        explanation: 'Review the problem constraints, loop boundaries, and format your output exactly as expected in the test case.'
      });
    } finally {
      setIsAskingAi(false);
    }
  };

  // Move to next problem
  const handleProceedNext = () => {
    if (activeProbIndex < allProblems.length - 1) {
      setActiveProblemId(allProblems[activeProbIndex + 1].id);
    }
  };

  // Calculate language-specific completion stats
  const completedInLang = allProblems.filter((p) => isProblemCompleted(p.id)).length;
  const progressPercent = allProblems.length > 0 ? Math.round((completedInLang / allProblems.length) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0f1117] text-[#e6edf3] overflow-hidden select-text font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Top University Navigation Header */}
      <header className="h-13 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 select-none shrink-0" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCompiler}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] text-xs font-semibold transition-all group"
            style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to IDE Compiler</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-[#30363d]">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#58a6ff]/20 to-[#3fb950]/20 border border-[#58a6ff]/40 flex items-center justify-center text-[#58a6ff]">
              <GraduationCap size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#e6edf3] tracking-tight">JD Programming University</span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30 font-semibold">
                  Interactive Academy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right: Language Selectors & User XP */}
        <div className="flex items-center gap-3">
          {/* Language selector tabs */}
          <div className="flex items-center bg-[#0f1117] p-1 rounded-xl border border-[#30363d]" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            {languageKeys.map((key) => {
              const lang = CURRICULUM[key];
              const isSelected = selectedLangKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedLangKey(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#21262d] text-[#58a6ff] border border-[#58a6ff]/40 shadow-xs'
                      : 'text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                  style={isSelected ? { backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' } : {}}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span>{lang.languageName}</span>
                </button>
              );
            })}
          </div>

          {/* Gamified XP & Progress Badge */}
          <div className="flex items-center gap-2 bg-[#21262d] border border-[#30363d] px-3 py-1.5 rounded-xl text-xs font-mono" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
            <Flame size={14} className="text-amber-400 fill-amber-400 animate-bounce" />
            <span className="font-bold text-amber-300">{progress.totalXp} XP</span>
            <span className="text-[#8b949e]">•</span>
            <span className="text-[#3fb950] font-semibold">{completedInLang}/{allProblems.length} Solved</span>
          </div>
        </div>
      </header>

      {/* Main University Body (Sidebar Curriculum + Coding Workspace) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Module Roadmap & Level Tree */}
        <aside className="w-80 bg-[#161b22] border-r border-[#30363d] flex flex-col shrink-0 overflow-hidden select-none" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          {/* Progress Banner */}
          <div className="p-3.5 border-b border-[#30363d] space-y-2" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#e6edf3]">{currentCurriculum.languageName} Progress</span>
              <span className="font-mono text-[11px] text-[#58a6ff] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#0f1117] h-2 rounded-full overflow-hidden border border-[#30363d]">
              <div 
                className="bg-linear-to-r from-[#58a6ff] to-[#3fb950] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Modules & Problems List */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-3">
            {currentCurriculum.modules.map((mod) => {
              const moduleProblems = mod.problems;
              const allModCompleted = moduleProblems.every((p) => isProblemCompleted(p.id));

              return (
                <div 
                  key={mod.id} 
                  className="rounded-xl border border-[#30363d] overflow-hidden bg-[#0f1117]/60"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}
                >
                  {/* Module Header */}
                  <div className="p-2.5 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#58a6ff]/15 text-[#58a6ff] border border-[#58a6ff]/30 font-bold">
                          L{mod.level}
                        </span>
                        <h4 className="text-xs font-bold text-[#e6edf3]">{mod.title}</h4>
                      </div>
                    </div>
                    {allModCompleted ? (
                      <span className="text-[#3fb950] flex items-center gap-1 text-[10px] font-mono font-semibold">
                        <CheckCircle2 size={12} />
                        <span>Completed</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Module Problems */}
                  <div className="p-1 space-y-1">
                    {moduleProblems.map((prob) => {
                      const probGlobalIdx = allProblems.findIndex((p) => p.id === prob.id);
                      const isUnlocked = isProblemUnlocked(probGlobalIdx);
                      const isCompleted = isProblemCompleted(prob.id);
                      const isActive = prob.id === activeProblemId;

                      return (
                        <button
                          key={prob.id}
                          disabled={!isUnlocked}
                          onClick={() => setActiveProblemId(prob.id)}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-[#58a6ff]/15 text-[#58a6ff] font-semibold border border-[#58a6ff]/40 shadow-xs'
                              : isUnlocked
                              ? 'text-[#e6edf3] hover:bg-[#21262d] hover:text-[#58a6ff]'
                              : 'text-[#8b949e]/50 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isCompleted ? (
                              <CheckCircle2 size={14} className="text-[#3fb950] shrink-0" />
                            ) : isUnlocked ? (
                              <Unlock size={14} className="text-[#58a6ff] shrink-0" />
                            ) : (
                              <Lock size={14} className="text-[#8b949e]/60 shrink-0" />
                            )}
                            <span className="truncate">{prob.title}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-1">
                            <span className={`text-[9px] px-1.5 py-0.2 rounded border font-mono ${
                              prob.difficulty === 'Easy'
                                ? 'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/30'
                                : prob.difficulty === 'Medium'
                                ? 'text-amber-400 bg-amber-400/10 border-amber-400/30'
                                : 'text-[#f85149] bg-[#f85149]/10 border-[#f85149]/30'
                            }`}>
                              {prob.difficulty}
                            </span>
                            <span className="text-[10px] text-amber-300 font-mono">+{prob.xp}XP</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right: Interactive Lesson & Coding Workspace */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Left Sub-column: Concept Theory & Challenge Spec */}
          <div className="w-full md:w-5/12 border-r border-[#30363d] flex flex-col h-full overflow-hidden bg-[#161b22]/40" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            {/* Challenge Header */}
            <div className="p-4 border-b border-[#30363d] flex items-center justify-between shrink-0" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-1">
                  <span>Level {activeProblem?.level}</span>
                  <span>•</span>
                  <span>{activeProblem?.moduleTitle}</span>
                </div>
                <h2 className="text-base font-bold text-[#e6edf3]">{activeProblem?.title}</h2>
              </div>
              {isProblemCompleted(activeProblem?.id) && (
                <span className="bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 font-mono">
                  <CheckCircle2 size={13} />
                  <span>Solved</span>
                </span>
              )}
            </div>

            {/* Theory & Instructions scroll area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Theory / Concept card */}
              <div className="bg-[#0f1117] p-3.5 rounded-xl border border-[#30363d] space-y-2 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#58a6ff]">
                  <BookOpen size={14} />
                  <span>Concept & Theory</span>
                </div>
                <div className="text-xs text-[#e6edf3] whitespace-pre-wrap leading-relaxed font-sans">
                  {activeProblem?.concept}
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#e6edf3]">
                  <Code2 size={14} className="text-[#3fb950]" />
                  <span>Problem Statement</span>
                </div>
                <div className="text-xs text-[#8b949e] leading-relaxed bg-[#0f1117]/60 p-3 rounded-lg border border-[#30363d]">
                  {activeProblem?.description}
                </div>
              </div>

              {/* Sample Test Cases */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#e6edf3]">Sample Test Cases</div>
                {activeProblem?.testCases?.map((tc, idx) => (
                  <div key={idx} className="bg-[#0f1117] p-3 rounded-lg border border-[#30363d] font-mono text-xs space-y-1.5" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                    <div className="text-[11px] text-[#8b949e] font-sans font-semibold">Test Case {idx + 1}:</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <div className="text-[#8b949e] text-[10px] uppercase font-bold">Input</div>
                        <div className="bg-[#161b22] p-1.5 rounded border border-[#30363d] text-[#e6edf3] whitespace-pre">{tc.input || '(no input)'}</div>
                      </div>
                      <div>
                        <div className="text-[#8b949e] text-[10px] uppercase font-bold">Expected Output</div>
                        <div className="bg-[#161b22] p-1.5 rounded border border-[#30363d] text-[#3fb950] whitespace-pre">{tc.expectedOutput}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hints Accordion */}
              {activeProblem?.hints?.length > 0 && (
                <div className="border border-[#30363d] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="w-full p-2.5 bg-[#21262d] flex items-center justify-between text-xs text-[#8b949e] hover:text-[#e6edf3]"
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      <HelpCircle size={14} className="text-amber-400" />
                      <span>Need a Hint?</span>
                    </div>
                    <ChevronRight size={14} className={`transition-transform duration-200 ${showHints ? 'rotate-90' : ''}`} />
                  </button>
                  {showHints && (
                    <div className="p-3 bg-[#0f1117] text-xs text-[#8b949e] space-y-1 border-t border-[#30363d]">
                      {activeProblem.hints.map((hint, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{hint}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Automatically Hidden Solution Accordion (Forces Active Self Practice) */}
              {activeProblem?.solutionCode && (
                <div className="border border-[#30363d] rounded-xl overflow-hidden bg-[#0f1117]/60">
                  <div className="p-2.5 bg-[#21262d] flex items-center justify-between text-xs border-b border-[#30363d]">
                    <div className="flex items-center gap-2">
                      {showSolution ? (
                        <Eye size={14} className="text-[#3fb950]" />
                      ) : (
                        <EyeOff size={14} className="text-amber-400" />
                      )}
                      <span className="font-semibold text-[#e6edf3]">
                        {showSolution ? 'Official Reference Solution' : 'Answer Hidden (Practice First!)'}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                        showSolution
                          ? 'bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d]'
                          : 'bg-amber-400/15 text-amber-400 hover:bg-amber-400/25 border border-amber-400/40'
                      }`}
                    >
                      {showSolution ? (
                        <>
                          <EyeOff size={12} />
                          <span>Hide Answer</span>
                        </>
                      ) : (
                        <>
                          <Eye size={12} />
                          <span>Reveal Answer</span>
                        </>
                      )}
                    </button>
                  </div>

                  {showSolution ? (
                    <div className="p-3 bg-[#0d1117] space-y-2 border-t border-[#30363d]">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#8b949e] font-sans">Verified optimal code:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(activeProblem.solutionCode);
                                setSolutionCopied(true);
                                setTimeout(() => setSolutionCopied(false), 2000);
                              } catch {}
                            }}
                            className="text-[11px] text-[#8b949e] hover:text-[#e6edf3] flex items-center gap-1"
                          >
                            {solutionCopied ? <Check size={11} className="text-[#3fb950]" /> : <Copy size={11} />}
                            <span>{solutionCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                          <button
                            onClick={() => setUserCode(activeProblem.solutionCode)}
                            className="text-[11px] text-[#58a6ff] hover:underline flex items-center gap-1 font-mono"
                          >
                            <span>Load into Editor</span>
                          </button>
                        </div>
                      </div>
                      <pre className="p-2.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#e6edf3] font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed">
                        {activeProblem.solutionCode}
                      </pre>
                    </div>
                  ) : (
                    <div className="p-2.5 text-[11px] text-[#8b949e] leading-relaxed flex items-center gap-2 bg-[#0f1117]/80">
                      <Lock size={12} className="text-amber-400 shrink-0" />
                      <span>The answer is locked & hidden automatically to let you practice on your own. Test your code or use AI Tutor hints if you get stuck!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sub-column: Interactive Code Practice Workspace */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0f1117]" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Editor Bar */}
            <div className="h-10 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-3 shrink-0" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentCurriculum.color }} />
                <span className="text-xs font-mono font-semibold text-[#e6edf3]">{activeProblem?.title} ({currentCurriculum.languageName})</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Reset to starter code */}
                <button
                  onClick={() => setUserCode(activeProblem?.starterCode || '')}
                  title="Reset code to starter template"
                  className="p-1 hover:text-[#e6edf3] text-[#8b949e] hover:bg-[#21262d] rounded transition-colors text-xs flex items-center gap-1"
                >
                  <RotateCcw size={13} />
                  <span className="text-[11px] hidden sm:inline">Reset</span>
                </button>

                {/* Open in full IDE */}
                <button
                  onClick={() => onLoadCodeInCompiler(userCode, selectedLangKey)}
                  title="Send code to Full IDE Compiler"
                  className="px-2 py-1 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] rounded border border-[#30363d] text-xs flex items-center gap-1 font-semibold transition-all"
                  style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--accent-primary)' }}
                >
                  <span>Open in IDE</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>

            {/* Code Textarea Editor */}
            <div className="flex-1 relative font-mono text-[13px] overflow-hidden">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 bg-transparent text-[#e6edf3] font-mono text-[13px] outline-none resize-none leading-relaxed overflow-auto border-none focus:ring-0"
                style={{ tabSize: 4 }}
              />
            </div>

            {/* Bottom Test Runner & Results Drawer */}
            <div className="border-t border-[#30363d] bg-[#161b22] p-3 space-y-3 shrink-0" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunVerify}
                    disabled={isRunningTests}
                    className="px-4 py-2 bg-[#3fb950] hover:bg-[#2ea043] text-[#0f1117] rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isRunningTests ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#0f1117]/30 border-t-[#0f1117] rounded-full animate-spin" />
                        <span>Verifying Tests...</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} className="fill-current" />
                        <span>Run & Verify Code (Tests)</span>
                      </>
                    )}
                  </button>

                  {testResults && !testResults.allPassed && (
                    <button
                      onClick={handleAskAiTutor}
                      disabled={isAskingAi}
                      className="px-3 py-2 bg-[#58a6ff]/15 hover:bg-[#58a6ff]/25 text-[#58a6ff] border border-[#58a6ff]/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                      style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
                    >
                      <Sparkles size={14} />
                      <span>{isAskingAi ? 'AI Tutor Analyzing...' : 'Explain Error with AI'}</span>
                    </button>
                  )}
                </div>

                {/* If completed, show Proceed to Next Challenge button */}
                {isProblemCompleted(activeProblem?.id) && activeProbIndex < allProblems.length - 1 && (
                  <button
                    onClick={handleProceedNext}
                    className="px-4 py-2 bg-[#58a6ff] hover:bg-[#388bfd] text-[#0f1117] rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span>Next Challenge</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Celebration Banner when newly unlocked! */}
              {showCelebration && (
                <div className="p-3 bg-[#3fb950]/15 border border-[#3fb950]/40 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2 text-[#3fb950] text-xs font-bold">
                    <Award size={18} />
                    <span>🎉 Challenge Completed! +{activeProblem?.xp} XP Earned! Next module/challenge unlocked!</span>
                  </div>
                  {activeProbIndex < allProblems.length - 1 && (
                    <button
                      onClick={handleProceedNext}
                      className="px-3 py-1 bg-[#3fb950] text-[#0f1117] rounded-lg font-bold text-xs hover:bg-[#2ea043] transition-colors"
                    >
                      Next Challenge ➔
                    </button>
                  )}
                </div>
              )}

              {/* Test Results Output */}
              {testResults && (
                <div className="p-3 bg-[#0f1117] border border-[#30363d] rounded-xl space-y-2 text-xs font-mono max-h-40 overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#30363d] pb-1.5 text-xs font-sans">
                    <span className="font-bold text-[#e6edf3]">
                      {testResults.allPassed ? '✅ All Test Cases Passed!' : '❌ Some Test Cases Failed'}
                    </span>
                    <span className="text-[#8b949e] font-mono text-[11px]">
                      {testResults.cases.filter((c) => c.passed).length}/{testResults.cases.length} Passed
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {testResults.cases.map((c) => (
                      <div 
                        key={c.caseNum}
                        className={`p-2 rounded-lg border ${
                          c.passed
                            ? 'bg-[#3fb950]/10 border-[#3fb950]/30 text-[#3fb950]'
                            : 'bg-[#f85149]/10 border-[#f85149]/30 text-[#f85149]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-sans">Test Case {c.caseNum}: {c.passed ? 'PASSED' : 'FAILED'}</span>
                        </div>
                        {!c.passed && (
                          <div className="mt-1 space-y-1 text-[11px] text-[#e6edf3]">
                            <div>Input: <span className="text-[#8b949e]">{c.input || '(empty)'}</span></div>
                            <div>Expected: <span className="text-[#3fb950]">{c.expected}</span></div>
                            <div>Your Output: <span className="text-[#f85149]">{c.actual || '(no output)'}</span></div>
                            {c.error && <div className="text-[#f85149] mt-1">{c.error}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Tutor Diagnostic Advice */}
              {aiHint && (
                <div className="p-3 bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-xl space-y-1.5 text-xs font-sans animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-[#58a6ff]">
                    <Sparkles size={14} />
                    <span>AI Tutor Diagnostic Advice</span>
                  </div>
                  <div className="text-[#e6edf3] leading-relaxed text-[12px]">
                    {aiHint.explanation || aiHint.cause}
                  </div>
                  {aiHint.tip && (
                    <div className="text-[11px] text-[#8b949e]">
                      💡 Tip: {aiHint.tip}
                    </div>
                  )}
                  {aiHint.fixCode && (
                    <button
                      onClick={() => setUserCode(aiHint.fixCode)}
                      className="mt-1 px-2.5 py-1 bg-[#58a6ff] text-[#0f1117] rounded-md text-[11px] font-bold hover:bg-[#388bfd]"
                    >
                      Apply Suggested Fix to Editor
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
