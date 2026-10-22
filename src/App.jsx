import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { ActivityBar } from './components/ActivityBar';
import { Sidebar } from './components/Sidebar';
import { EditorPanel } from './components/EditorPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { ShortcutsModal } from './components/ShortcutsModal';
import { SettingsModal } from './components/SettingsModal';
import { ShareModal } from './components/ShareModal';
import { SplashScreen } from './components/SplashScreen';
import { UniversityView } from './components/UniversityView';
import { CheckCircle2, X } from 'lucide-react';

import { LANGUAGES } from './constants/languages';
import { runCode } from './services/compilerService';
import { detectInputRequirements } from './services/inputDetector';
import { applyTheme, DEFAULT_THEME_ID } from './constants/themes';
import { initPyodide } from './services/pyodideRunner';
import { encodeShareUrl, decodeShareUrl } from './utils/shareUrl';

// Bumping storage key to v5 so all users get clean empty editor on first visit
const STORAGE_KEY = 'codepulse_workspace_v5';

const DEFAULT_WORKSPACE = {
  python: [
    { id: 'py_1', name: 'main.py', code: '', isDefault: true }
  ],
  c: [
    { id: 'c_1', name: 'main.c', code: '', isDefault: true }
  ],
  cpp: [
    { id: 'cpp_1', name: 'main.cpp', code: '', isDefault: true }
  ],
  java: [
    { id: 'java_1', name: 'Main.java', code: '', isDefault: true }
  ]
};

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [appMode, setAppMode] = useState('compiler'); // 'compiler' | 'university'
  const [modeDirection, setModeDirection] = useState('forward'); // 'forward' (to Univ) | 'backward' (to Compiler)

  const handleSwitchMode = (newMode) => {
    if (newMode === appMode) return;
    setModeDirection(newMode === 'university' ? 'forward' : 'backward');
    setAppMode(newMode);
  };
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return sessionStorage.getItem('jd_splash_seen') !== 'true';
    } catch {
      return false;
    }
  });

  // Language-scoped files dictionary
  const [filesByLang, setFilesByLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.python && parsed.c && parsed.cpp && parsed.java) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_WORKSPACE;
  });

  // Track active file ID for each language
  const [activeFileIdByLang, setActiveFileIdByLang] = useState({
    python: 'py_1',
    c: 'c_1',
    cpp: 'cpp_1',
    java: 'java_1'
  });

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  // UI layout states & Resizable Split
  const [activeView, setActiveView] = useState('explorer');
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentShareUrl, setCurrentShareUrl] = useState('');
  const [sharedToast, setSharedToast] = useState(null);

  // PWA & Online status states
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Adjustable workspace & output split percentage
  const [editorWidthPercent, setEditorWidthPercent] = useState(55);
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);
  const lastPromptRef = useRef('');

  // Editor settings (persisted to localStorage)
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('jd_compiler_settings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch {}
    return {
      fontSize: 14,
      tabSize: 4,
      autoCloseBrackets: true,
      wordWrap: false,
      autocomplete: true,
      theme: DEFAULT_THEME_ID
    };
  });

  // Apply theme dynamically to document root
  useEffect(() => {
    applyTheme(settings.theme || DEFAULT_THEME_ID);
  }, [settings.theme]);

  // Pre-warm client-side Pyodide WebAssembly runtime for instant Python execution
  useEffect(() => {
    const timer = setTimeout(() => {
      initPyodide().catch(() => {});
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // PWA beforeinstallprompt & online/offline listeners
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setSharedToast('JD COMPILER installed successfully as standalone app!');
      setTimeout(() => setSharedToast(null), 5000);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    try {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch {}
  };

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem('jd_compiler_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Persist files to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filesByLang));
    } catch {
      // storage unavailable
    }
  }, [filesByLang]);

  // Resizable split handler
  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (moveEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offset = moveEvent.clientX - rect.left;
      const percent = (offset / rect.width) * 100;
      if (percent >= 20 && percent <= 80) {
        setEditorWidthPercent(percent);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  // Current files for the active language ONLY
  const currentLangFiles = useMemo(() => {
    return filesByLang[selectedLanguage.id] || [];
  }, [filesByLang, selectedLanguage.id]);

  // Current active file object
  const activeFile = useMemo(() => {
    const activeId = activeFileIdByLang[selectedLanguage.id];
    return currentLangFiles.find((f) => f.id === activeId) || currentLangFiles[0];
  }, [currentLangFiles, activeFileIdByLang, selectedLanguage.id]);

  const currentCode = activeFile?.code || '';

  // Select language from dropdown
  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setCursorPosition({ line: 1, col: 1 });
  };

  // Select a file within current language
  const handleSelectFile = (fileId) => {
    setActiveFileIdByLang((prev) => ({
      ...prev,
      [selectedLanguage.id]: fileId
    }));
    setCursorPosition({ line: 1, col: 1 });
  };

  // Update code of current active file
  const handleChangeCode = (newCode) => {
    if (!activeFile) return;
    setFilesByLang((prev) => {
      const langList = prev[selectedLanguage.id] || [];
      const updated = langList.map((f) => {
        if (f.id === activeFile.id) {
          return { ...f, code: newCode };
        }
        return f;
      });
      return { ...prev, [selectedLanguage.id]: updated };
    });
  };

  // Add new file strictly in current language
  const handleAddFile = (fileName) => {
    const ext = selectedLanguage.extension;
    let cleanName = fileName.trim();
    if (!cleanName.endsWith(ext)) {
      cleanName = `${cleanName}${ext}`;
    }

    const newId = `${selectedLanguage.id}_${Date.now()}`;
    const newFileObj = {
      id: newId,
      name: cleanName,
      code: '',
      isDefault: false
    };

    setFilesByLang((prev) => ({
      ...prev,
      [selectedLanguage.id]: [...(prev[selectedLanguage.id] || []), newFileObj]
    }));

    setActiveFileIdByLang((prev) => ({
      ...prev,
      [selectedLanguage.id]: newId
    }));
  };

  // Close/Delete a file within current language
  const handleCloseFile = (fileId) => {
    const langFiles = filesByLang[selectedLanguage.id] || [];
    if (langFiles.length <= 1) return;

    const remaining = langFiles.filter((f) => f.id !== fileId);
    setFilesByLang((prev) => ({
      ...prev,
      [selectedLanguage.id]: remaining
    }));

    if (activeFileIdByLang[selectedLanguage.id] === fileId) {
      setActiveFileIdByLang((prev) => ({
        ...prev,
        [selectedLanguage.id]: remaining[0].id
      }));
    }
  };

  // Clear current active file code
  const handleResetCode = () => {
    handleChangeCode('');
  };

  // Load snippet into current active file
  const handleLoadSnippet = (snippetCode) => {
    handleChangeCode(snippetCode);
  };

  // Clear output console
  const handleClearOutput = () => {
    setExecutionResult(null);
  };

  // Generate zero-database shareable URL
  const handleShareCode = () => {
    const url = encodeShareUrl({
      language: selectedLanguage.id,
      code: currentCode,
      fileName: activeFile?.name
    });
    setCurrentShareUrl(url);
    setShowShareModal(true);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  // Decode and load shared code from URL hash on initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash && (hash.includes('share=') || hash.startsWith('#share='))) {
      const decoded = decodeShareUrl(hash);
      if (decoded && (decoded.code || decoded.code === '')) {
        const targetLang = LANGUAGES.find((l) => l.id === decoded.language) || LANGUAGES[0];
        setSelectedLanguage(targetLang);

        const newId = `${targetLang.id}_shared_${Date.now()}`;
        const newFileName = decoded.fileName || `shared${targetLang.extension}`;
        const newFileObj = {
          id: newId,
          name: newFileName,
          code: decoded.code,
          isDefault: false
        };

        setFilesByLang((prev) => ({
          ...prev,
          [targetLang.id]: [newFileObj, ...(prev[targetLang.id] || [])]
        }));

        setActiveFileIdByLang((prev) => ({
          ...prev,
          [targetLang.id]: newId
        }));

        setSharedToast(`Loaded shared ${targetLang.name} snippet (${decoded.code.length} chars)!`);
        const timer = setTimeout(() => setSharedToast(null), 6000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Run Code Execution (handles direct terminal input)
  const handleRunCode = useCallback(async (customInput) => {
    if (isRunning) return;

    // Check if code expects user input and no input has been entered yet
    const hasInput = typeof customInput === 'string' && customInput.length > 0;
    if (!hasInput) {
      const { requiresInput, promptText } = detectInputRequirements(currentCode, selectedLanguage.id);
      if (requiresInput) {
        lastPromptRef.current = promptText;
        setExecutionResult({
          success: false,
          isInteractivePrompt: true,
          statusType: 'waiting_input',
          statusText: 'Waiting for input',
          stdout: promptText,
          stderr: '',
          compileOutput: '',
          time: null,
          memory: null,
          exitCode: null,
          provider: 'Interactive Terminal'
        });
        return;
      }
    }

    const inputToUse = hasInput ? customInput : '';

    setIsRunning(true);
    try {
      const result = await runCode({
        language: selectedLanguage.id,
        code: currentCode,
        stdin: inputToUse
      });

      let formattedStdout = result.stdout || '';
      const activePrompt = (lastPromptRef.current || detectInputRequirements(currentCode, selectedLanguage.id).promptText || '').trim();

      if (hasInput && formattedStdout) {
        const inputVal = inputToUse.trim();

        if (activePrompt && formattedStdout.includes(activePrompt)) {
          // Format prompt and entered value on the first line, then program output on the next line
          const idx = formattedStdout.indexOf(activePrompt);
          const endIdx = idx + activePrompt.length;
          const afterPrompt = formattedStdout.substring(endIdx).replace(/^\s*/, '');
          formattedStdout = formattedStdout.substring(0, endIdx) + ' ' + inputVal + '\n' + afterPrompt;
        } else if (activePrompt) {
          formattedStdout = activePrompt + ' ' + inputVal + '\n' + formattedStdout.trimStart();
        } else if (!formattedStdout.includes(inputVal)) {
          formattedStdout = formattedStdout ? `${inputVal}\n${formattedStdout}` : inputVal;
        }
      }

      setExecutionResult({
        ...result,
        stdout: formattedStdout,
        success: result.exitCode === 0 && !result.stderr
      });
    } catch (err) {
      setExecutionResult({
        success: false,
        statusType: 'error',
        statusText: 'Execution Error',
        stdout: '',
        stderr: err.message || 'Unknown execution error occurred.',
        compileOutput: '',
        time: null,
        memory: null,
        exitCode: 1,
        provider: 'Error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, selectedLanguage.id, currentCode]);

  // Global Keyboard Shortcuts (Ctrl+Enter, Ctrl+S, Ctrl+L, Ctrl+B, Esc, F1)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter to run code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }

      // Ctrl + B to toggle explorer sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setActiveView((prev) => (prev ? null : 'explorer'));
      }

      // Ctrl + S (save / run)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleRunCode();
      }

      // Ctrl + L (clear console)
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        handleClearOutput();
      }

      // Esc to close modals
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowSettings(false);
      }

      // F1 for shortcuts modal
      if (e.key === 'F1') {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0f1117] text-[#e6edf3]">
      {/* Attractive Initial Splash Loading Screen */}
      {showSplash && (
        <SplashScreen
          onFinish={() => {
            try {
              sessionStorage.setItem('jd_splash_seen', 'true');
            } catch {}
            setShowSplash(false);
          }}
        />
      )}

      {/* Modern Top Header */}
      <TopBar
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
        onRunCode={() => handleRunCode()}
        isRunning={isRunning}
        onResetCode={handleResetCode}
        activeFile={activeFile}
        onToggleShortcuts={() => setShowShortcuts(true)}
        onToggleSettings={() => setShowSettings(true)}
        onNewFile={() => handleAddFile(`script_${currentLangFiles.length + 1}${selectedLanguage.extension}`)}
        onShare={handleShareCode}
        installPrompt={installPrompt}
        onInstallApp={handleInstallApp}
        appMode={appMode}
        onToggleAppMode={handleSwitchMode}
      />

      {/* Cyber Scanning Laser Beam (Real-time Code Execution Effect) */}
      {isRunning && <div className="anim-laser-scan" />}

      {/* Main Work Area: Directional Sliding Transition (Compiler IDE <-> JD University) */}
      {appMode === 'university' ? (
        <div 
          key="mode-university" 
          className="flex-1 flex overflow-hidden relative anim-slide-from-right"
        >
          <UniversityView
            onBackToCompiler={() => handleSwitchMode('compiler')}
            onLoadCodeInCompiler={(code, langId) => {
              const langObj = LANGUAGES.find(l => l.id === langId) || LANGUAGES[0];
              setSelectedLanguage(langObj);
              handleChangeCode(code);
              handleSwitchMode('compiler');
              setSharedToast(`Loaded ${langObj.name} challenge code into Compiler IDE!`);
              setTimeout(() => setSharedToast(null), 4000);
            }}
            settings={settings}
          />
        </div>
      ) : (
        <div 
          key="mode-compiler" 
          className="flex-1 flex overflow-hidden relative anim-slide-from-left"
        >
          {/* Leftmost Activity Bar */}
          <ActivityBar
            activeView={activeView}
            setActiveView={setActiveView}
            onRunCode={() => handleRunCode()}
            isRunning={isRunning}
            onToggleShortcuts={() => setShowShortcuts(true)}
            onToggleSettings={() => setShowSettings(true)}
            appMode={appMode}
            onToggleAppMode={handleSwitchMode}
          />

          {/* Collapsible Sidebar (Toggles open/close cleanly) */}
          <Sidebar
            activeView={activeView}
            selectedLanguage={selectedLanguage}
            files={currentLangFiles}
            activeFileId={activeFile?.id}
            onSelectFile={handleSelectFile}
            onCloseFile={handleCloseFile}
            onAddFile={handleAddFile}
            onLoadSnippet={handleLoadSnippet}
            onClose={() => setActiveView(null)}
          />

          {/* Resizable Split Work Area (Editor & Terminal) */}
          <div 
            ref={containerRef} 
            className="flex-1 flex flex-col md:flex-row overflow-hidden relative"
          >
            {/* Left / Top: Code Editor */}
            {!isTerminalExpanded && (
              <div 
                style={{ width: `${editorWidthPercent}%` }}
                className="flex flex-col min-h-[300px] md:min-h-0 h-full overflow-hidden shrink-0 transition-[width] duration-75"
              >
                <EditorPanel
                  selectedLanguage={selectedLanguage}
                  files={currentLangFiles}
                  activeFileId={activeFile?.id}
                  onSelectFile={handleSelectFile}
                  onCloseFile={handleCloseFile}
                  onAddFile={handleAddFile}
                  code={currentCode}
                  onChangeCode={handleChangeCode}
                  settings={settings}
                  onUpdateCursor={setCursorPosition}
                  onRunCode={() => handleRunCode()}
                  isExplorerOpen={Boolean(activeView)}
                  onToggleExplorer={() => setActiveView(activeView ? null : 'explorer')}
                />
              </div>
            )}

            {/* DRAGGABLE RESIZER BAR */}
            {!isTerminalExpanded && (
              <div
                onMouseDown={handleMouseDown}
                title="Drag to resize editor and output terminal"
                className="hidden md:flex w-2 hover:w-2 bg-[#161b22] hover:bg-[#58a6ff]/40 cursor-col-resize items-center justify-center transition-colors z-20 select-none group border-x border-[#30363d]"
              >
                <div className="w-0.5 h-8 bg-[#30363d] group-hover:bg-[#58a6ff] rounded-full transition-colors" />
              </div>
            )}

            {/* Right / Bottom: Pure Native Terminal Console */}
            <div 
              style={{ width: isTerminalExpanded ? '100%' : `${100 - editorWidthPercent}%` }}
              className="flex flex-col h-full overflow-hidden flex-1"
            >
              <TerminalPanel
                executionResult={executionResult}
                isRunning={isRunning}
                onRunCodeWithInput={(inputVal) => handleRunCode(inputVal)}
                onClearOutput={handleClearOutput}
                isExpanded={isTerminalExpanded}
                onToggleExpand={() => setIsTerminalExpanded(!isTerminalExpanded)}
                selectedLanguage={selectedLanguage}
                code={currentCode}
                geminiApiKey={settings.geminiApiKey || ''}
                onApplyFix={(fixedCode) => {
                  handleChangeCode(fixedCode);
                  setSharedToast('AI Debugger: Fix applied to code! Press Ctrl+Enter to re-run.');
                  setTimeout(() => setSharedToast(null), 5000);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar (Active in Compiler IDE mode) */}
      {appMode === 'compiler' && (
        <StatusBar
          selectedLanguage={selectedLanguage}
          activeFileName={activeFile?.name}
          isRunning={isRunning}
          executionResult={executionResult}
          cursorPosition={cursorPosition}
          settings={settings}
          isOnline={isOnline}
        />
      )}

      {/* Modals */}
      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={currentShareUrl}
        selectedLanguage={selectedLanguage}
        codeLength={currentCode?.length || 0}
      />

      {/* Shared Code Load Notification Toast (Spring Pop) */}
      {sharedToast && (
        <div 
          className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#21262d] text-[#e6edf3] border border-[#3fb950] px-4 py-2.5 rounded-xl shadow-2xl anim-spring-pop font-mono text-xs"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--accent-success)', color: 'var(--text-primary)' }}
        >
          <CheckCircle2 size={16} className="text-[#3fb950]" style={{ color: 'var(--accent-success)' }} />
          <span>{sharedToast}</span>
          <button 
            onClick={() => setSharedToast(null)} 
            className="ml-2 text-[#8b949e] hover:text-[#e6edf3] p-0.5 rounded"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
