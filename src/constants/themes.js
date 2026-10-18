/**
 * Preset themes for JD COMPILER
 * Each theme provides complete styling for IDE chrome and syntax highlighting.
 */

export const THEMES = [
  {
    id: 'dark-modern',
    name: 'Dark Modern (Default)',
    description: 'Clean VS Code inspired dark theme',
    colors: {
      bgPrimary: '#0f1117',
      bgSecondary: '#161b22',
      bgTertiary: '#21262d',
      textPrimary: '#e6edf3',
      textSecondary: '#8b949e',
      accentPrimary: '#58a6ff',
      accentSuccess: '#3fb950',
      accentError: '#f85149',
      borderColor: '#30363d',
      // Syntax colors
      syntaxKeyword: '#ff7b72',
      syntaxFunction: '#79c0ff',
      syntaxString: '#a5d6ff',
      syntaxNumber: '#ffa657',
      syntaxComment: '#8b949e',
      syntaxOperator: '#d2a8ff',
      syntaxType: '#7ee787',
      syntaxPreprocessor: '#ff7b72'
    }
  },
  {
    id: 'one-dark-pro',
    name: 'One Dark Pro',
    description: 'Atom / Sublime iconic balanced palette',
    colors: {
      bgPrimary: '#282c34',
      bgSecondary: '#21252b',
      bgTertiary: '#2c313a',
      textPrimary: '#abb2bf',
      textSecondary: '#6e7681',
      accentPrimary: '#61afef',
      accentSuccess: '#98c379',
      accentError: '#e06c75',
      borderColor: '#181a1f',
      // Syntax colors
      syntaxKeyword: '#c678dd',
      syntaxFunction: '#61afef',
      syntaxString: '#98c379',
      syntaxNumber: '#d19a66',
      syntaxComment: '#6e7681',
      syntaxOperator: '#56b6c2',
      syntaxType: '#e5c07b',
      syntaxPreprocessor: '#e06c75'
    }
  },
  {
    id: 'dracula',
    name: 'Dracula Night',
    description: 'Vibrant gothic high-contrast theme',
    colors: {
      bgPrimary: '#282a36',
      bgSecondary: '#21222c',
      bgTertiary: '#44475a',
      textPrimary: '#f8f8f2',
      textSecondary: '#6272a4',
      accentPrimary: '#bd93f9',
      accentSuccess: '#50fa7b',
      accentError: '#ff5555',
      borderColor: '#383a59',
      // Syntax colors
      syntaxKeyword: '#ff79c6',
      syntaxFunction: '#50fa7b',
      syntaxString: '#f1fa8c',
      syntaxNumber: '#bd93f9',
      syntaxComment: '#6272a4',
      syntaxOperator: '#ff79c6',
      syntaxType: '#8be9fd',
      syntaxPreprocessor: '#ff79c6'
    }
  },
  {
    id: 'monokai',
    name: 'Monokai Pro',
    description: 'Classic hacker warm pastel contrast',
    colors: {
      bgPrimary: '#2d2a2e',
      bgSecondary: '#221f22',
      bgTertiary: '#3a383b',
      textPrimary: '#fcfcfa',
      textSecondary: '#727072',
      accentPrimary: '#ffd866',
      accentSuccess: '#a9dc76',
      accentError: '#ff6188',
      borderColor: '#403e41',
      // Syntax colors
      syntaxKeyword: '#ff6188',
      syntaxFunction: '#a9dc76',
      syntaxString: '#ffd866',
      syntaxNumber: '#ab9df2',
      syntaxComment: '#727072',
      syntaxOperator: '#ff6188',
      syntaxType: '#78dce8',
      syntaxPreprocessor: '#ff6188'
    }
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark Dimmed',
    description: 'Official GitHub engineer dark theme',
    colors: {
      bgPrimary: '#1c2128',
      bgSecondary: '#22272e',
      bgTertiary: '#2d333b',
      textPrimary: '#adbac7',
      textSecondary: '#768390',
      accentPrimary: '#539bf5',
      accentSuccess: '#57ab5a',
      accentError: '#e5534b',
      borderColor: '#373e47',
      // Syntax colors
      syntaxKeyword: '#f47067',
      syntaxFunction: '#dcbdfb',
      syntaxString: '#96d0ff',
      syntaxNumber: '#6cb6ff',
      syntaxComment: '#768390',
      syntaxOperator: '#f47067',
      syntaxType: '#8ddb8c',
      syntaxPreprocessor: '#f47067'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    description: 'Neon synthwave electric palette',
    colors: {
      bgPrimary: '#0d0f18',
      bgSecondary: '#131726',
      bgTertiary: '#1d2238',
      textPrimary: '#00f0ff',
      textSecondary: '#5a6b8c',
      accentPrimary: '#ff0055',
      accentSuccess: '#00ff66',
      accentError: '#ff0033',
      borderColor: '#262f4d',
      // Syntax colors
      syntaxKeyword: '#ff007f',
      syntaxFunction: '#00ffcc',
      syntaxString: '#ffe600',
      syntaxNumber: '#ff7700',
      syntaxComment: '#5a6b8c',
      syntaxOperator: '#00f0ff',
      syntaxType: '#bf00ff',
      syntaxPreprocessor: '#ff007f'
    }
  }
];

export const DEFAULT_THEME_ID = 'dark-modern';

export function applyTheme(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const root = document.documentElement;

  root.style.setProperty('--bg-primary', theme.colors.bgPrimary);
  root.style.setProperty('--bg-secondary', theme.colors.bgSecondary);
  root.style.setProperty('--bg-tertiary', theme.colors.bgTertiary);
  root.style.setProperty('--text-primary', theme.colors.textPrimary);
  root.style.setProperty('--text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--accent-primary', theme.colors.accentPrimary);
  root.style.setProperty('--accent-success', theme.colors.accentSuccess);
  root.style.setProperty('--accent-error', theme.colors.accentError);
  root.style.setProperty('--border-color', theme.colors.borderColor);

  root.style.setProperty('--syntax-keyword', theme.colors.syntaxKeyword);
  root.style.setProperty('--syntax-function', theme.colors.syntaxFunction);
  root.style.setProperty('--syntax-string', theme.colors.syntaxString);
  root.style.setProperty('--syntax-number', theme.colors.syntaxNumber);
  root.style.setProperty('--syntax-comment', theme.colors.syntaxComment);
  root.style.setProperty('--syntax-operator', theme.colors.syntaxOperator);
  root.style.setProperty('--syntax-type', theme.colors.syntaxType);
  root.style.setProperty('--syntax-preprocessor', theme.colors.syntaxPreprocessor);
}
