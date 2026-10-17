import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { ActivityBar } from './components/ActivityBar';
import { Sidebar } from './components/Sidebar';
import { EditorPanel } from './components/EditorPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { ShortcutsModal } from './components/ShortcutsModal';
import { SettingsModal } from './components/SettingsModal';

import { LANGUAGES } from './constants/languages';
import { CODE_TEMPLATES } from './constants/templates';
import { runCode } from './services/compilerService';

const STORAGE_KEY = 'codepulse_workspace_v3';

const DEFAULT_WORKSPACE = {
  python: [
    { id: 'py_1', name: 'main.py', code: CODE_TEMPLATES.python.hello, isDefault: true }
  ],
  c: [
    { id: 'c_1', name: 'main.c', code: CODE_TEMPLATES.c.hello, isDefault: true }
  ],
  cpp: [
    { id: 'cpp_1', name: 'main.cpp', code: CODE_TEMPLATES.cpp.hello, isDefault: true }
  ],
  java: [
    { id: 'java_1', name: 'Main.java', code: CODE_TEMPLATES.java.hello, isDefault: true }
  ]
};

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

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

  const [activeTemplateType, setActiveTemplateType] = useState('hello');

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [terminalInput, setTerminalInput] = useState('');

  // UI layout states & Resizable Split
  const [activeView, setActiveView] = useState('explorer'); // 'explorer' | 'snippets' | null
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Adjustable workspace & output split percentage
  const [editorWidthPercent, setEditorWidthPercent] = useState(55);
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);

  // Editor settings
  const [settings, setSettings] = useState({
    fontSize: 14,
    tabSize: 4,
    autoCloseBrackets: true,
    wordWrap: false
  });

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
    const initialCode = `// ${cleanName}\n// ${selectedLanguage.name} Source File\n\n`;

    const newFileObj = {
      id: newId,
      name: cleanName,
      code: selectedLanguage.id === 'python' ? `# ${cleanName}\n# Python Source File\n\n` : initialCode,
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

  // Switch template (Hello World vs Interactive I/O)
  const handleSwitchTemplate = (type) => {
    setActiveTemplateType(type);
    const template = CODE_TEMPLATES[selectedLanguage.id]?.[type] || '';
    handleChangeCode(template);
  };

  // Reset current active file to template
  const handleResetCode = () => {
    const template = CODE_TEMPLATES[selectedLanguage.id]?.[activeTemplateType] || '';
    handleChangeCode(template);
  };

  // Load snippet into current active file
  const handleLoadSnippet = (snippetCode) => {
    handleChangeCode(snippetCode);
  };

  // Clear output console
  const handleClearOutput = () => {
    setExecutionResult(null);
  };

  // Primary Run Code Execution
  const handleRunCode = useCallback(async (customInput) => {
    if (isRunning) return;

    const inputToUse = (typeof customInput === 'string') ? customInput : terminalInput;

    setIsRunning(true);
    try {
      const result = await runCode({
        language: selectedLanguage.id,
        code: currentCode,
        stdin: inputToUse
      });
      setExecutionResult(result);
    } catch (err) {
      setExecutionResult({
        success: false,
        statusType: 'error',
        statusText: 'Execution Error',
        stdout: '',
        stderr: err.message || 'Unknown execution error occurred.',
        compileOutput: '',
        message: err.message,
        time: null,
        memory: null,
        exitCode: 1,
        provider: 'Error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, selectedLanguage.id, currentCode, terminalInput]);

  // Handle input submission directly from the Output tab
  const handleSubmitTerminalInput = (inputVal) => {
    setTerminalInput(inputVal);
    handleRunCode(inputVal);
  };

  // Global Keyboard Shortcuts (Ctrl+Enter, Ctrl+S, Ctrl+L, Esc, F1)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleRunCode();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        handleClearOutput();
      }

      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowSettings(false);
      }

      if (e.key === 'F1') {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0d1117] text-slate-200">
      {/* Modern Top Header */}
      <TopBar
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
        onRunCode={() => handleRunCode()}
        isRunning={isRunning}
        onResetCode={handleResetCode}
        activeFile={activeFile}
        activeTemplateType={activeTemplateType}
        onSwitchTemplate={handleSwitchTemplate}
        onToggleShortcuts={() => setShowShortcuts(true)}
        onToggleSettings={() => setShowSettings(true)}
        onNewFile={() => handleAddFile(`script_${currentLangFiles.length + 1}${selectedLanguage.extension}`)}
      />

      {/* Main Studio Work Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Leftmost Activity Bar */}
        <ActivityBar
          activeView={activeView}
          setActiveView={setActiveView}
          onRunCode={() => handleRunCode()}
          isRunning={isRunning}
          onToggleShortcuts={() => setShowShortcuts(true)}
          onToggleSettings={() => setShowSettings(true)}
        />

        {/* Collapsible Sidebar (Only displays active language files) */}
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
              className="flex flex-col min-h-[300px] md:min-h-0 h-full overflow-hidden shrink-0"
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
              />
            </div>
          )}

          {/* DRAGGABLE RESIZER BAR */}
          {!isTerminalExpanded && (
            <div
              onMouseDown={handleMouseDown}
              title="Drag to resize workspace and output panels"
              className="hidden md:flex w-2 hover:w-2 bg-[#161b22] hover:bg-cyan-500/50 cursor-col-resize items-center justify-center transition-colors z-20 select-none group border-x border-slate-800"
            >
              <div className="w-0.5 h-8 bg-slate-600 group-hover:bg-cyan-300 rounded-full" />
            </div>
          )}

          {/* Right / Bottom: Modern Console & Stdin */}
          <div 
            style={{ width: isTerminalExpanded ? '100%' : `${100 - editorWidthPercent}%` }}
            className="flex flex-col h-full overflow-hidden flex-1"
          >
            <TerminalPanel
              executionResult={executionResult}
              isRunning={isRunning}
              terminalInput={terminalInput}
              onChangeTerminalInput={setTerminalInput}
              onSubmitTerminalInput={handleSubmitTerminalInput}
              onClearOutput={handleClearOutput}
              isExpanded={isTerminalExpanded}
              onToggleExpand={() => setIsTerminalExpanded(!isTerminalExpanded)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar
        selectedLanguage={selectedLanguage}
        activeFileName={activeFile?.name}
        isRunning={isRunning}
        executionResult={executionResult}
        cursorPosition={cursorPosition}
        settings={settings}
      />

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
    </div>
  );
}
