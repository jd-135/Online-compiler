import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { ActivityBar } from './components/ActivityBar';
import { Sidebar } from './components/Sidebar';
import { EditorPanel } from './components/EditorPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { ShortcutsModal } from './components/ShortcutsModal';
import { SettingsModal } from './components/SettingsModal';

import { LANGUAGES, LANGUAGE_MAP } from './constants/languages';
import { CODE_TEMPLATES } from './constants/templates';
import { runCode } from './services/compilerService';

export default function App() {
  // Active language state (default: Python)
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  
  // Storage of code per language
  const [codeMap, setCodeMap] = useState(() => {
    const initial = {};
    LANGUAGES.forEach((lang) => {
      initial[lang.id] = CODE_TEMPLATES[lang.id]?.hello || '';
    });
    return initial;
  });

  const [activeTemplateType, setActiveTemplateType] = useState('hello'); // 'hello' | 'io'
  const [isDirtyMap, setIsDirtyMap] = useState({});

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [stdin, setStdin] = useState('');

  // UI layout states
  const [activeView, setActiveView] = useState('explorer'); // 'explorer' | 'snippets' | null
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Editor settings
  const [settings, setSettings] = useState({
    fontSize: 14,
    tabSize: 4,
    autoCloseBrackets: true,
    wordWrap: false
  });

  const currentCode = codeMap[selectedLanguage.id] || '';

  // Switch language
  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setCursorPosition({ line: 1, col: 1 });
  };

  // Update current code
  const handleChangeCode = (newCode) => {
    setCodeMap((prev) => ({
      ...prev,
      [selectedLanguage.id]: newCode
    }));
    setIsDirtyMap((prev) => ({
      ...prev,
      [selectedLanguage.id]: true
    }));
  };

  // Switch template (Hello World vs Interactive I/O)
  const handleSwitchTemplate = (type) => {
    setActiveTemplateType(type);
    const template = CODE_TEMPLATES[selectedLanguage.id]?.[type] || '';
    handleChangeCode(template);
  };

  // Reset current code to template
  const handleResetCode = () => {
    const template = CODE_TEMPLATES[selectedLanguage.id]?.[activeTemplateType] || '';
    handleChangeCode(template);
    setIsDirtyMap((prev) => ({
      ...prev,
      [selectedLanguage.id]: false
    }));
  };

  // Load snippet from sidebar
  const handleLoadSnippet = (snippetCode) => {
    handleChangeCode(snippetCode);
  };

  // Clear output
  const handleClearOutput = () => {
    setExecutionResult(null);
  };

  // Primary Run Code Execution
  const handleRunCode = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    try {
      const result = await runCode({
        language: selectedLanguage.id,
        code: currentCode,
        stdin: stdin
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
  }, [isRunning, selectedLanguage.id, currentCode, stdin]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter to run code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#1e1e1e] text-[#cccccc]">
      {/* Top Navigation & Toolbar */}
      <TopBar
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
        onRunCode={handleRunCode}
        isRunning={isRunning}
        onResetCode={handleResetCode}
        code={currentCode}
        activeTemplateType={activeTemplateType}
        onSwitchTemplate={handleSwitchTemplate}
        onToggleShortcuts={() => setShowShortcuts(true)}
        onToggleSettings={() => setShowSettings(true)}
        stdin={stdin}
      />

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Far-left Activity Bar */}
        <ActivityBar
          activeView={activeView}
          setActiveView={setActiveView}
          onRunCode={handleRunCode}
          isRunning={isRunning}
          onToggleShortcuts={() => setShowShortcuts(true)}
          onToggleSettings={() => setShowSettings(true)}
        />

        {/* Collapsible Sidebar (Explorer / Snippets) */}
        <Sidebar
          activeView={activeView}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={handleSelectLanguage}
          onLoadSnippet={handleLoadSnippet}
          onClose={() => setActiveView(null)}
        />

        {/* Main Work Area: Split View (Editor on Left, Terminal on Right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Left / Top: Code Editor */}
          {!isTerminalExpanded && (
            <div className="flex-1 flex flex-col min-h-[300px] md:min-h-0 h-full overflow-hidden">
              <EditorPanel
                selectedLanguage={selectedLanguage}
                onSelectLanguage={handleSelectLanguage}
                code={currentCode}
                onChangeCode={handleChangeCode}
                isDirty={Boolean(isDirtyMap[selectedLanguage.id])}
                settings={settings}
                onUpdateCursor={setCursorPosition}
              />
            </div>
          )}

          {/* Right / Bottom: Terminal & Output Console */}
          <div className={`${isTerminalExpanded ? 'w-full' : 'w-full md:w-[460px] lg:w-[520px]'} flex flex-col h-full overflow-hidden`}>
            <TerminalPanel
              executionResult={executionResult}
              isRunning={isRunning}
              stdin={stdin}
              onChangeStdin={setStdin}
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
        isRunning={isRunning}
        executionResult={executionResult}
        cursorPosition={cursorPosition}
        settings={settings}
        stdin={stdin}
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
