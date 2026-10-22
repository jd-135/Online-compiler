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
  Check,
  Globe,
  Lightbulb,
  ShieldAlert,
  Smile,
  Info,
  X,
  Trophy,
  Search
} from 'lucide-react';
import { CURRICULUM } from '../constants/curriculum';
import { runCode } from '../services/compilerService';
import { analyzeErrorAsync } from '../services/aiDebugger';

const PROGRESS_STORAGE_KEY = 'jd_university_progress_v1';

// Everyday Pocket Dictionary for Absolute Beginners
const BEGINNER_DICTIONARY = [
  {
    term: 'Variable',
    emoji: '📦',
    simpleMeaning: 'A labeled storage box or jar. You give it a name (like "age" or "score") and put a value inside. You can check what is inside or change it anytime.',
    everydayExample: 'A labeled jar in your kitchen marked "Sugar". You can fill it with 5 spoonfuls, take some out, or check how much is left.'
  },
  {
    term: 'Data Types',
    emoji: '🏷️',
    simpleMeaning: 'The shape and category of information. Integers (whole numbers like 42), Floats (decimals like 3.14), Strings (text letters like "Hello"), and Booleans (True or False flags).',
    everydayExample: 'You wouldn\'t pour water into a paper envelope — you need the right type of container for the right type of item!'
  },
  {
    term: 'Condition (if / else)',
    emoji: '🚦',
    simpleMeaning: 'A decision crossroads. The computer asks a simple YES/NO question: "If you have a ticket, the gate opens; otherwise, stay outside."',
    everydayExample: 'A traffic light: Green means Go, Red means Stop. The car checks the signal and decides what to do.'
  },
  {
    term: 'Loop (for / while)',
    emoji: '🔄',
    simpleMeaning: 'A repeating chore. Instead of writing the same instruction 100 times, you tell the computer: "Do this 100 times, then stop."',
    everydayExample: 'Doing 10 jumping jacks in gym class: You start at count = 1, jump, increment to 2, and stop when you reach 10.'
  },
  {
    term: 'Array / List',
    emoji: '🗄️',
    simpleMeaning: 'A row of numbered lockers placed side-by-side. Each locker holds one item. In programming, lockers are almost always numbered starting at #0, not #1!',
    everydayExample: 'An egg carton holding 6 eggs in numbered slots: slot 0, slot 1, slot 2, slot 3, slot 4, slot 5.'
  },
  {
    term: 'Function',
    emoji: '🥤',
    simpleMeaning: 'A dedicated mini-machine or kitchen recipe. You put ingredients in (inputs), the machine does its work, and it hands you the finished product (output).',
    everydayExample: 'A smoothie blender: You drop in bananas and milk (inputs), press start, and out pours a banana smoothie (output).'
  },
  {
    term: 'Input (stdin) & Output (stdout)',
    emoji: '👂🗣️',
    simpleMeaning: 'The ears and mouth of the computer! "Input" is the computer listening to what you type on the keyboard. "Output" is the computer printing words on the screen.',
    everydayExample: 'Ordering at a drive-thru: You speak your burger order into the microphone (Input), and the screen displays your total price (Output).'
  },
  {
    term: 'Modulo (%)',
    emoji: '🍕',
    simpleMeaning: 'The leftovers of division! If you divide 7 slices of pizza between 2 people, each gets 3 slices, and 1 slice is leftover. 7 % 2 = 1.',
    everydayExample: 'Checking if a number is Even: if number % 2 is 0, there are zero leftovers, so it is perfectly even!'
  },
  {
    term: 'Pointer',
    emoji: '🗺️',
    simpleMeaning: 'An address note pointing to a house, rather than carrying the entire house around. Instead of copying a 500-page book in memory, you just write down what page to look at.',
    everydayExample: 'Giving a friend your home address on a piece of paper, instead of physically transporting your house to them.'
  },
  {
    term: 'Compiler',
    emoji: '⚡',
    simpleMeaning: 'A lightning-fast universal translator. Humans write code using English-like words; the compiler translates that code into electrical pulses (0s and 1s) for your computer chip in 0.05 seconds!',
    everydayExample: 'An expert UN interpreter translating spoken English into foreign languages in real time.'
  }
];

// Helper to determine rank title and icon
const getRankInfo = (xp) => {
  if (xp < 100) return { title: 'Novice Explorer', emoji: '🌱', nextXp: 100, prevXp: 0, color: '#3fb950', badgeBg: 'bg-[#3fb950]/15 text-[#3fb950] border-[#3fb950]/30' };
  if (xp < 300) return { title: 'Code Apprentice', emoji: '🔨', nextXp: 300, prevXp: 100, color: '#58a6ff', badgeBg: 'bg-[#58a6ff]/15 text-[#58a6ff] border-[#58a6ff]/30' };
  if (xp < 600) return { title: 'Logic Crafter', emoji: '⚡', nextXp: 600, prevXp: 300, color: '#d2a8ff', badgeBg: 'bg-[#a371f7]/15 text-[#d2a8ff] border-[#a371f7]/30' };
  if (xp < 1000) return { title: 'Algorithm Knight', emoji: '🚀', nextXp: 1000, prevXp: 600, color: '#f0883e', badgeBg: 'bg-amber-400/15 text-amber-300 border-amber-400/30' };
  return { title: 'Grand Code Wizard', emoji: '🧙‍♂️', nextXp: null, prevXp: 1000, color: '#e3b341', badgeBg: 'bg-amber-500/20 text-yellow-300 border-yellow-400/40' };
};

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
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictSearch, setDictSearch] = useState('');

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

  // Trigger AI Tutor guidance for stuck code (Standard vs Explain Like I'm 5)
  const handleAskAiTutor = async (eli5 = false) => {
    if (isAskingAi || !activeProblem) return;
    setIsAskingAi(true);
    try {
      const firstFailed = testResults?.cases?.find((c) => !c.passed);
      const errorMsg = firstFailed?.error || `Expected: "${firstFailed?.expected}" but got: "${firstFailed?.actual}"`;
      
      const errorPrompt = eli5
        ? `[EXPLAIN LIKE I'M 5 - BEGINNER TUTOR MODE]\nYou are a caring, patient coding tutor teaching an absolute beginner who has NEVER coded before in their life. Explain this error or failure using an everyday real-world analogy (like cooking, toys, sports, traffic) with zero complex jargon. Give them a gentle, step-by-step hint on how to fix it:\nChallenge: ${activeProblem.title}\nRequirements: ${activeProblem.description}\nFailure Detail: ${errorMsg}`
        : `Challenge: ${activeProblem.title}\nRequirements: ${activeProblem.description}\nFailure Output: ${errorMsg}`;

      const analysis = await analyzeErrorAsync({
        language: selectedLangKey,
        code: userCode,
        errorText: errorPrompt,
        apiKey: settings?.geminiApiKey || ''
      });
      setAiHint(analysis);
    } catch {
      setAiHint({
        explanation: 'Look closely at what your program printed vs what was expected. Check for exact spacing, uppercase/lowercase letters, and newlines.'
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
  const rankInfo = getRankInfo(progress.totalXp);

  // Filter dictionary based on search query
  const filteredDictionary = useMemo(() => {
    if (!dictSearch.trim()) return BEGINNER_DICTIONARY;
    const q = dictSearch.toLowerCase();
    return BEGINNER_DICTIONARY.filter(
      (item) => item.term.toLowerCase().includes(q) || item.simpleMeaning.toLowerCase().includes(q) || item.everydayExample.toLowerCase().includes(q)
    );
  }, [dictSearch]);

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

        {/* Center / Right: Beginner Dictionary, Language Selectors & User Rank/XP */}
        <div className="flex items-center gap-2.5">
          {/* Beginner Pocket Dictionary Button */}
          <button
            onClick={() => setShowDictionary(true)}
            title="Open Coder's Pocket Dictionary (plain English for beginners)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-[#d2a8ff] border border-purple-500/40 text-xs font-bold transition-all active:scale-95 shadow-xs"
          >
            <BookOpen size={13} className="text-[#d2a8ff]" />
            <span className="hidden md:inline">Beginner Dictionary</span>
            <span className="md:hidden">Dictionary</span>
          </button>

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

          {/* Gamified XP & Rank Badge with Floating Particle Burst on Completion */}
          <div className="relative flex items-center gap-2 bg-[#21262d] border border-[#30363d] px-3 py-1.5 rounded-xl text-xs font-mono" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
            {showCelebration && (
              <div className="absolute -top-7 right-3 flex items-center gap-1 font-bold font-mono text-amber-300 text-xs anim-float-xp bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full shadow-lg">
                <Sparkles size={11} className="text-amber-300" />
                <span>+{activeProblem?.xp || 50} XP!</span>
              </div>
            )}
            <span className="flex items-center gap-1 text-[11px] font-sans font-semibold text-[#e6edf3]" title={`Rank Level: ${rankInfo.title}`}>
              <span>{rankInfo.emoji}</span>
              <span className="hidden lg:inline">{rankInfo.title}</span>
            </span>
            <span className="text-[#8b949e]">•</span>
            <Flame size={13} className="text-amber-400 fill-amber-400 animate-bounce" />
            <span className="font-bold text-amber-300">{progress.totalXp} XP</span>
            <span className="text-[#8b949e] hidden sm:inline">•</span>
            <span className="text-[#3fb950] font-semibold hidden sm:inline">{completedInLang}/{allProblems.length} Solved</span>
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
                          className={`w-full text-left p-2 rounded-lg text-xs transition-all duration-150 active:scale-[0.98] flex items-center justify-between ${
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
            <div className="p-4 border-b border-[#30363d] shrink-0" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between">
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

              {/* Real World Connection */}
              {activeProblem?.whyItMatters && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#58a6ff] bg-[#58a6ff]/10 border border-[#58a6ff]/25 px-2.5 py-1 rounded-lg font-sans">
                  <Globe size={13} className="shrink-0 text-[#58a6ff]" />
                  <span><strong>Real World:</strong> {activeProblem.whyItMatters}</span>
                </div>
              )}
            </div>

            {/* Theory & Instructions scroll area with Silky Slide Animation on Problem Switch */}
            <div key={activeProblemId} className="flex-1 overflow-y-auto p-4 space-y-4 anim-slide-up">
              {/* 1. Real-World Story & Everyday Analogy Card */}
              {activeProblem?.analogy && (
                <div className="bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-indigo-500/10 p-3.5 rounded-xl border border-amber-400/35 space-y-2 shadow-sm smooth-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Sparkles size={14} className="text-amber-400" />
                      <span>🌍 Real-World Analogy (No Jargon Needed)</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 font-semibold">
                      ELI5 Story
                    </span>
                  </div>
                  <p className="text-xs text-[#e6edf3] leading-relaxed font-sans">
                    {activeProblem.analogy}
                  </p>
                </div>
              )}

              {/* 2. The 3-Step Human Recipe (Think Before You Code) */}
              {activeProblem?.stepByStep && activeProblem.stepByStep.length > 0 && (
                <div className="bg-[#0f1117] p-3.5 rounded-xl border border-[#30363d] space-y-2.5 shadow-sm smooth-hover" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3fb950]">
                    <Lightbulb size={14} />
                    <span>🪜 How to Think Like a Programmer (3-Step Recipe)</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#e6edf3] font-sans">
                    {activeProblem.stepByStep.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 bg-[#161b22] p-2 rounded-lg border border-[#30363d]/60">
                        <span className="w-5 h-5 rounded-full bg-[#3fb950]/20 text-[#3fb950] border border-[#3fb950]/40 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed text-[11.5px] text-[#e6edf3]">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Language Concept & Syntax Rules */}
              <div className="bg-[#0f1117] p-3.5 rounded-xl border border-[#30363d] space-y-2 shadow-sm smooth-hover" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#58a6ff]">
                  <BookOpen size={14} />
                  <span>Language Syntax & Rules</span>
                </div>
                <div className="text-xs text-[#8b949e] whitespace-pre-wrap leading-relaxed font-sans">
                  {activeProblem?.concept}
                </div>
              </div>

              {/* 4. Common Beginner Pitfall to Avoid */}
              {activeProblem?.beginnerTrap && (
                <div className="bg-amber-400/10 border border-amber-400/30 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-200 smooth-hover">
                  <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed text-[11.5px]">
                    <strong className="text-amber-300">⚠️ Beginner Pitfall to Avoid:</strong> {activeProblem.beginnerTrap}
                  </div>
                </div>
              )}

              {/* 5. Problem Description */}
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
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleAskAiTutor(true)}
                        disabled={isAskingAi}
                        title="Explain this error using everyday stories and simple analogies (no complex jargon)"
                        className="px-3 py-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 hover:from-purple-500/30 hover:to-amber-500/30 text-[#d2a8ff] border border-purple-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                      >
                        <Smile size={14} className="text-[#d2a8ff]" />
                        <span>{isAskingAi ? 'Tutor Thinking...' : '🍼 Explain Like I\'m 5'}</span>
                      </button>

                      <button
                        onClick={() => handleAskAiTutor(false)}
                        disabled={isAskingAi}
                        title="Standard technical debugger analysis"
                        className="px-2.5 py-2 bg-[#58a6ff]/15 hover:bg-[#58a6ff]/25 text-[#58a6ff] border border-[#58a6ff]/40 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Sparkles size={13} />
                        <span>Technical Fix</span>
                      </button>
                    </div>
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

              {/* Celebration Banner when newly unlocked (Smooth Spring Animation) */}
              {showCelebration && (
                <div className="p-3 bg-[#3fb950]/15 border border-[#3fb950]/40 rounded-xl flex items-center justify-between anim-spring-pop">
                  <div className="flex items-center gap-2 text-[#3fb950] text-xs font-bold">
                    <Award size={18} className="animate-bounce" />
                    <span>🎉 Challenge Completed! +{activeProblem?.xp} XP Earned! Next challenge unlocked!</span>
                  </div>
                  {activeProbIndex < allProblems.length - 1 && (
                    <button
                      onClick={handleProceedNext}
                      className="px-3 py-1 bg-[#3fb950] text-[#0f1117] rounded-lg font-bold text-xs hover:bg-[#2ea043] transition-all duration-150 active:scale-95"
                    >
                      Next Challenge ➔
                    </button>
                  )}
                </div>
              )}

              {/* Test Results Output */}
              {testResults && (
                <div className="p-3 bg-[#0f1117] border border-[#30363d] rounded-xl space-y-2 text-xs font-mono max-h-40 overflow-y-auto anim-slide-up">
                  <div className="flex items-center justify-between border-b border-[#30363d] pb-1.5 text-xs font-sans">
                    <span className="font-bold text-[#e6edf3]">
                      {testResults.allPassed ? '✅ All Test Cases Passed!' : '❌ Some Test Cases Failed'}
                    </span>
                    <span className="text-[#8b949e] font-mono text-[11px]">
                      {testResults.cases.filter((c) => c.passed).length}/{testResults.cases.length} Passed
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {testResults.cases.map((c, cIdx) => (
                      <div 
                        key={c.caseNum}
                        style={{ animationDelay: `${cIdx * 40}ms` }}
                        className={`p-2 rounded-lg border anim-slide-up ${
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
                <div className="p-3 bg-[#58a6ff]/10 border border-[#58a6ff]/30 rounded-xl space-y-1.5 text-xs font-sans anim-slide-up">
                  <div className="flex items-center gap-1.5 font-bold text-[#58a6ff]">
                    <Sparkles size={14} />
                    <span>AI Tutor Guidance</span>
                  </div>
                  <div className="text-[#e6edf3] leading-relaxed text-[12px] whitespace-pre-line">
                    {aiHint.explanation || aiHint.cause}
                  </div>
                  {aiHint.tip && (
                    <div className="text-[11px] text-amber-300 font-medium">
                      💡 Tip: {aiHint.tip}
                    </div>
                  )}
                  {aiHint.fixCode && (
                    <button
                      onClick={() => setUserCode(aiHint.fixCode)}
                      className="mt-1 px-2.5 py-1 bg-[#58a6ff] text-[#0f1117] rounded-md text-[11px] font-bold hover:bg-[#388bfd] active:scale-95 transition-all"
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

      {/* Beginner Pocket Dictionary Modal (Silky Backdrop & Pop-In Animation) */}
      {showDictionary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm anim-modal-backdrop">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans anim-modal-content">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#30363d] flex items-center justify-between bg-[#21262d]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-[#d2a8ff] border border-purple-500/40 flex items-center justify-center">
                  <BookOpen size={17} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#e6edf3]">Coder's Pocket Dictionary (Everyday English)</h3>
                  <p className="text-[11px] text-[#8b949e]">Zero confusing computer science jargon — plain real-world comparisons so anyone can learn.</p>
                </div>
              </div>
              <button
                onClick={() => setShowDictionary(false)}
                className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-[#30363d] bg-[#0f1117]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Search any coding word (e.g. Variable, Loop, Array, Pointer, Modulo)..."
                  value={dictSearch}
                  onChange={(e) => setDictSearch(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-xl pl-9 pr-4 py-2 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
                />
              </div>
            </div>

            {/* Dictionary Entries List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredDictionary.map((item, idx) => (
                <div key={idx} className="bg-[#0f1117] p-3.5 rounded-xl border border-[#30363d] space-y-1.5 hover:border-[#58a6ff]/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <h4 className="font-bold text-xs text-[#58a6ff]">{item.term}</h4>
                  </div>
                  <p className="text-xs text-[#e6edf3] leading-relaxed">
                    {item.simpleMeaning}
                  </p>
                  <div className="bg-[#161b22] p-2 rounded-lg border border-[#30363d]/60 text-[11px] text-[#8b949e] flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">💡 Everyday Example:</span>
                    <span className="text-[#c9d1d9]">{item.everydayExample}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#30363d] bg-[#21262d] flex justify-end">
              <button
                onClick={() => setShowDictionary(false)}
                className="px-4 py-1.5 bg-[#58a6ff] text-[#0f1117] rounded-xl text-xs font-bold hover:bg-[#388bfd] transition-colors"
              >
                Got it! Back to Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
