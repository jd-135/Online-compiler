/**
 * Comprehensive Developer Themes for JD COMPILER
 * 12 distinct, fully-immersive palettes (Dark, Light, Neon, Retro, Pastel).
 * Each theme provides complete styling for IDE chrome, panels, inputs, and syntax highlighting.
 */

export const THEMES = [
  {
    id: 'dark-modern',
    name: 'Dark Modern',
    description: 'Clean VS Code default charcoal & cobalt',
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
    description: 'Iconic Atom / Sublime balanced slate',
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
    description: 'Vibrant gothic purple & high-contrast neon',
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
    id: 'tokyo-night',
    name: 'Tokyo Night',
    description: 'Deep midnight blue with luminous neon accents',
    colors: {
      bgPrimary: '#1a1b26',
      bgSecondary: '#16161e',
      bgTertiary: '#24283b',
      textPrimary: '#c0caf5',
      textSecondary: '#7aa2f7',
      accentPrimary: '#7aa2f7',
      accentSuccess: '#9ece6a',
      accentError: '#f7768e',
      borderColor: '#292e42',
      // Syntax colors
      syntaxKeyword: '#bb9af7',
      syntaxFunction: '#7aa2f7',
      syntaxString: '#9ece6a',
      syntaxNumber: '#ff9e64',
      syntaxComment: '#565f89',
      syntaxOperator: '#89ddff',
      syntaxType: '#2ac3de',
      syntaxPreprocessor: '#bb9af7'
    }
  },
  {
    id: 'monokai-pro',
    name: 'Monokai Pro',
    description: 'Classic warm pastel on charcoal obsidian',
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
    id: 'nord',
    name: 'Nord Frost',
    description: 'Arctic ice blue & calm Scandinavian slate',
    colors: {
      bgPrimary: '#2e3440',
      bgSecondary: '#242933',
      bgTertiary: '#3b4252',
      textPrimary: '#eceff4',
      textSecondary: '#88c0d0',
      accentPrimary: '#88c0d0',
      accentSuccess: '#a3be8c',
      accentError: '#bf616a',
      borderColor: '#434c5e',
      // Syntax colors
      syntaxKeyword: '#81a1c1',
      syntaxFunction: '#88c0d0',
      syntaxString: '#a3be8c',
      syntaxNumber: '#b48ead',
      syntaxComment: '#616e88',
      syntaxOperator: '#81a1c1',
      syntaxType: '#8fbcbb',
      syntaxPreprocessor: '#5e81ac'
    }
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox Dark',
    description: 'Warm retro groove coffee & earthy tones',
    colors: {
      bgPrimary: '#282828',
      bgSecondary: '#1d2021',
      bgTertiary: '#3c3836',
      textPrimary: '#ebdbb2',
      textSecondary: '#a89984',
      accentPrimary: '#fe8019',
      accentSuccess: '#b8bb26',
      accentError: '#fb4934',
      borderColor: '#504945',
      // Syntax colors
      syntaxKeyword: '#fb4934',
      syntaxFunction: '#b8bb26',
      syntaxString: '#fabd2f',
      syntaxNumber: '#d3869b',
      syntaxComment: '#928374',
      syntaxOperator: '#fe8019',
      syntaxType: '#8ec07c',
      syntaxPreprocessor: '#fb4934'
    }
  },
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    description: 'Smooth modern pastel with lavender highlights',
    colors: {
      bgPrimary: '#1e1e2e',
      bgSecondary: '#181825',
      bgTertiary: '#313244',
      textPrimary: '#cdd6f4',
      textSecondary: '#a6adc8',
      accentPrimary: '#cba6f7',
      accentSuccess: '#a6e3a1',
      accentError: '#f38ba8',
      borderColor: '#45475a',
      // Syntax colors
      syntaxKeyword: '#cba6f7',
      syntaxFunction: '#89b4fa',
      syntaxString: '#a6e3a1',
      syntaxNumber: '#fab387',
      syntaxComment: '#6c7086',
      syntaxOperator: '#94e2d5',
      syntaxType: '#f9e2af',
      syntaxPreprocessor: '#f38ba8'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    description: 'Electric neon synthwave magenta & turquoise',
    colors: {
      bgPrimary: '#0b0e14',
      bgSecondary: '#121721',
      bgTertiary: '#1d2238',
      textPrimary: '#00f0ff',
      textSecondary: '#627598',
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
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    description: 'Precision optical teal & solar amber',
    colors: {
      bgPrimary: '#002b36',
      bgSecondary: '#073642',
      bgTertiary: '#0a4250',
      textPrimary: '#839496',
      textSecondary: '#586e75',
      accentPrimary: '#268bd2',
      accentSuccess: '#2aa198',
      accentError: '#dc322f',
      borderColor: '#0e4f5e',
      // Syntax colors
      syntaxKeyword: '#859900',
      syntaxFunction: '#268bd2',
      syntaxString: '#2aa198',
      syntaxNumber: '#d33682',
      syntaxComment: '#586e75',
      syntaxOperator: '#b58900',
      syntaxType: '#cb4b16',
      syntaxPreprocessor: '#cb4b16'
    }
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark Dimmed',
    description: 'GitHub engineering dark slate',
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
    id: 'clean-light',
    name: 'GitHub Clean Light',
    description: 'Crisp high-contrast day theme',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f6f8fa',
      bgTertiary: '#eaeef2',
      textPrimary: '#1f2328',
      textSecondary: '#656d76',
      accentPrimary: '#0969da',
      accentSuccess: '#1a7f37',
      accentError: '#cf222e',
      borderColor: '#d0d7de',
      // Syntax colors
      syntaxKeyword: '#cf222e',
      syntaxFunction: '#8250df',
      syntaxString: '#0a3069',
      syntaxNumber: '#0550ae',
      syntaxComment: '#6e7781',
      syntaxOperator: '#0969da',
      syntaxType: '#953800',
      syntaxPreprocessor: '#cf222e'
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
