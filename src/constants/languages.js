export const LANGUAGES = [
  {
    id: 'python',
    name: 'Python',
    label: 'Python 3.12',
    extension: '.py',
    filename: 'main.py',
    version: '3.12.5',
    judge0Id: 100,
    wandboxCompiler: 'cpython-3.12.7',
    badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    dotColor: '#38bdf8',
    iconBg: '#3572A5',
    tag: 'Python 3',
    description: 'CPython 3.12 with standard libraries'
  },
  {
    id: 'c',
    name: 'C',
    label: 'C (GCC 14)',
    extension: '.c',
    filename: 'main.c',
    version: 'GCC 14.1.0',
    judge0Id: 103,
    wandboxCompiler: 'gcc-13.2.0-c',
    badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    dotColor: '#555555',
    iconBg: '#555555',
    tag: 'C (GCC)',
    description: 'GNU C Compiler with standard C17/C23 support'
  },
  {
    id: 'cpp',
    name: 'C++',
    label: 'C++ (G++ 14)',
    extension: '.cpp',
    filename: 'main.cpp',
    version: 'GCC 14.1.0',
    judge0Id: 105,
    wandboxCompiler: 'gcc-13.2.0',
    badgeColor: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
    dotColor: '#f34b7d',
    iconBg: '#f34b7d',
    tag: 'C++ (G++)',
    description: 'GNU C++ Compiler with modern C++20/C++23 features'
  },
  {
    id: 'java',
    name: 'Java',
    label: 'Java (JDK 17)',
    extension: '.java',
    filename: 'Main.java',
    version: 'JDK 17.0.6',
    judge0Id: 91,
    wandboxCompiler: 'openjdk-jdk-21+35',
    badgeColor: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    dotColor: '#b07219',
    iconBg: '#b07219',
    tag: 'Java 17',
    description: 'OpenJDK LTS runtime environment'
  }
];

export const LANGUAGE_MAP = LANGUAGES.reduce((acc, lang) => {
  acc[lang.id] = lang;
  return acc;
}, {});
