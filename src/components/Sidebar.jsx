import React, { useState } from 'react';
import { 
  FolderTree, 
  FileCode, 
  Plus, 
  Trash2, 
  Check, 
  X,
  Code2,
  BookOpen,
  PanelLeftClose,
  ChevronLeft
} from 'lucide-react';

const ALGORITHM_SNIPPETS = {
  python: [
    {
      name: 'Fibonacci Generator',
      desc: 'Recursive and iterative Fibonacci sequence',
      code: `def fibonacci(n):\n    sequence = [0, 1]\n    while len(sequence) < n:\n        sequence.append(sequence[-1] + sequence[-2])\n    return sequence[:n]\n\nprint("Fibonacci(10):", fibonacci(10))\n`
    },
    {
      name: 'Prime Number Checker',
      desc: 'Optimized prime testing up to sqrt(N)',
      code: `def is_prime(num: int) -> bool:\n    if num < 2: return False\n    for i in range(2, int(num**0.5) + 1):\n        if num % i == 0:\n            return False\n    return True\n\nprint("Is 97 prime?", is_prime(97))\nprint("Is 100 prime?", is_prime(100))\n`
    },
    {
      name: 'Quick Sort Algorithm',
      desc: 'Divide & conquer recursive sort',
      code: `def quicksort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\ndata = [42, 17, 89, 5, 23, 67, 1]\nprint("Sorted:", quicksort(data))\n`
    }
  ],
  c: [
    {
      name: 'Fibonacci Sequence',
      desc: 'Generate N Fibonacci numbers in C',
      code: `#include <stdio.h>\n\nint main(void) {\n    int n = 10;\n    long long t1 = 0, t2 = 1, nextTerm;\n    printf("Fibonacci Series (10 terms):\\n");\n    for (int i = 1; i <= n; ++i) {\n        printf("%lld ", t1);\n        nextTerm = t1 + t2;\n        t1 = t2;\n        t2 = nextTerm;\n    }\n    printf("\\n");\n    return 0;\n}\n`
    },
    {
      name: 'Bubble Sort',
      desc: 'In-place array sort in C',
      code: `#include <stdio.h>\n\nvoid bubble_sort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int tmp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = tmp;\n            }\n        }\n    }\n}\n\nint main(void) {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    bubble_sort(arr, n);\n    printf("Sorted array: ");\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}\n`
    }
  ],
  cpp: [
    {
      name: 'Vector & Lambda Sorting',
      desc: 'Modern C++ STL algorithms',
      code: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> numbers = {50, 20, 10, 40, 30};\n    std::sort(numbers.begin(), numbers.end(), [](int a, int b) {\n        return a < b;\n    });\n    std::cout << "Sorted with Lambda: ";\n    for (int n : numbers) std::cout << n << " ";\n    std::cout << "\\n";\n    return 0;\n}\n`
    },
    {
      name: 'Binary Search',
      desc: 'O(log N) search in sorted vector',
      code: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int target = 23;\n    if (std::binary_search(v.begin(), v.end(), target)) {\n        std::cout << "Element " << target << " found in vector!\\n";\n    } else {\n        std::cout << "Element " << target << " not found.\\n";\n    }\n    return 0;\n}\n`
    }
  ],
  java: [
    {
      name: 'Streams & Filter',
      desc: 'Modern Java Stream API',
      code: `import java.util.List;\nimport java.util.Arrays;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Andrew");\n        List<String> filtered = names.stream()\n            .filter(name -> name.startsWith("A"))\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n        \n        System.out.println("Names starting with A: " + filtered);\n    }\n}\n`
    },
    {
      name: 'Matrix Multiplication',
      desc: '2D Arrays and linear algebra',
      code: `public class Main {\n    public static void main(String[] args) {\n        int[][] a = {{1, 2}, {3, 4}};\n        int[][] b = {{5, 6}, {7, 8}};\n        int[][] c = new int[2][2];\n        \n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                for (int k = 0; k < 2; k++) {\n                    c[i][j] += a[i][k] * b[k][j];\n                }\n            }\n        }\n        System.out.println("Result matrix:");\n        for (int[] row : c) {\n            System.out.println(row[0] + " " + row[1]);\n        }\n    }\n}\n`
    }
  ]
};

export function Sidebar({
  activeView,
  selectedLanguage,
  files,
  activeFileId,
  onSelectFile,
  onCloseFile,
  onAddFile,
  onLoadSnippet,
  onClose
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputName, setInputName] = useState('');

  if (!activeView) return null;

  const handleAddSubmit = (e) => {
    e?.preventDefault();
    let name = inputName.trim();
    if (!name) {
      setIsAdding(false);
      return;
    }
    const ext = selectedLanguage.extension;
    if (!name.endsWith(ext)) {
      name = `${name}${ext}`;
    }
    onAddFile(name);
    setInputName('');
    setIsAdding(false);
  };

  return (
    <div className="w-60 bg-[#0d131f] border-r border-slate-800/80 flex flex-col shrink-0 text-slate-300 z-10 animate-in slide-in-from-left-4 duration-200 ease-out select-none">
      {/* Header with Title & Minimise Button */}
      <div className="h-10 px-3 flex items-center justify-between border-b border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <span>{activeView === 'explorer' ? `${selectedLanguage.name} Files` : 'Algorithm Library'}</span>
        </span>
        <button 
          onClick={onClose}
          title="Minimise / Close Workspace (Ctrl+B)"
          className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 px-1.5 py-1 rounded-md transition-all text-[10px]"
        >
          <ChevronLeft size={13} />
          <span>Hide</span>
        </button>
      </div>

      {/* Explorer Content: ONLY SHOWS ACTIVE LANGUAGE FILES */}
      {activeView === 'explorer' && (
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Workspace</span>
            <button
              onClick={() => setIsAdding(true)}
              title={`Add ${selectedLanguage.name} file`}
              className="text-cyan-400 hover:text-cyan-300 p-1 hover:bg-slate-800 rounded-md transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Inline Add Input */}
          {isAdding && (
            <form onSubmit={handleAddSubmit} className="flex items-center gap-1 bg-slate-800 border border-cyan-500/50 rounded-lg px-2 py-1 my-1 animate-in zoom-in-95 duration-100">
              <input
                type="text"
                autoFocus
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onBlur={() => {
                  if (!inputName.trim()) setIsAdding(false);
                }}
                placeholder={`filename${selectedLanguage.extension}`}
                className="bg-transparent text-white font-mono text-xs w-full outline-none"
              />
              <button type="submit" className="text-cyan-400 hover:text-cyan-300">
                <Check size={12} />
              </button>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)} 
                className="text-slate-400 hover:text-slate-200"
              >
                <X size={12} />
              </button>
            </form>
          )}

          {/* List of files for this language ONLY */}
          <div className="mt-1 space-y-1">
            {files.map((file) => {
              const isSelected = file.id === activeFileId;
              return (
                <div
                  key={file.id}
                  onClick={() => onSelectFile(file.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all group ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-300 font-semibold border-l-2 border-cyan-400 shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: selectedLanguage.dotColor }}
                    />
                    <span className="font-mono truncate">{file.name}</span>
                  </div>

                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseFile(file.id);
                      }}
                      title="Delete file"
                      className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 p-0.5 rounded transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Snippets Content */}
      {activeView === 'snippets' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <div className="px-2 py-1 text-[11px] text-slate-400">
            Algorithms for <strong className="text-white">{selectedLanguage.name}</strong>:
          </div>

          {(ALGORITHM_SNIPPETS[selectedLanguage.id] || []).map((snippet, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 transition-all group cursor-pointer"
              onClick={() => onLoadSnippet(snippet.code)}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white group-hover:text-cyan-400">
                  {snippet.name}
                </span>
                <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  Insert →
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {snippet.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
