import React from 'react';
import { 
  FolderTree, 
  FileCode, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Check, 
  Layers,
  FileQuestion
} from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

const ALGORITHM_SNIPPETS = {
  python: [
    {
      name: 'Fibonacci Generator',
      desc: 'Recursive and iterative Fibonacci',
      code: `def fibonacci(n):\n    sequence = [0, 1]\n    while len(sequence) < n:\n        sequence.append(sequence[-1] + sequence[-2])\n    return sequence[:n]\n\nprint("Fibonacci(10):", fibonacci(10))\n`
    },
    {
      name: 'Prime Checker',
      desc: 'Check if integer is prime',
      code: `def is_prime(num: int) -> bool:\n    if num < 2: return False\n    for i in range(2, int(num**0.5) + 1):\n        if num % i == 0:\n            return False\n    return True\n\nprint("Is 97 prime?", is_prime(97))\nprint("Is 100 prime?", is_prime(100))\n`
    },
    {
      name: 'Quick Sort',
      desc: 'Divide & conquer sort algorithm',
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
      desc: 'Classic sorting in C',
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
      desc: 'O(log N) search on sorted vector',
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
      desc: '2D Arrays and matrices in Java',
      code: `public class Main {\n    public static void main(String[] args) {\n        int[][] a = {{1, 2}, {3, 4}};\n        int[][] b = {{5, 6}, {7, 8}};\n        int[][] c = new int[2][2];\n        \n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                for (int k = 0; k < 2; k++) {\n                    c[i][j] += a[i][k] * b[k][j];\n                }\n            }\n        }\n        System.out.println("Result matrix:");\n        for (int[] row : c) {\n            System.out.println(row[0] + " " + row[1]);\n        }\n    }\n}\n`
    }
  ]
};

export function Sidebar({
  activeView,
  selectedLanguage,
  onSelectLanguage,
  onLoadSnippet,
  onClose
}) {
  if (!activeView) return null;

  return (
    <div className="w-56 sm:w-64 bg-[#252526] border-r border-[#2b2b2b] flex flex-col shrink-0 text-[#cccccc] z-10 animate-in slide-in-from-left duration-150">
      {/* Header */}
      <div className="h-9 px-3 flex items-center justify-between border-b border-[#333] text-[11px] font-bold uppercase tracking-wider text-[#999999]">
        <span>{activeView === 'explorer' ? 'Explorer' : 'Algorithm Snippets'}</span>
        <button 
          onClick={onClose}
          className="text-[#888] hover:text-white px-1"
        >
          ✕
        </button>
      </div>

      {/* Explorer Content */}
      {activeView === 'explorer' && (
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
            <ChevronRight size={12} className="rotate-90 text-[#aaa]" />
            <span>Workspace</span>
          </div>

          <div className="mt-1 space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.id === selectedLanguage.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => onSelectLanguage(lang)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#37373d] text-white font-medium border-l-2 border-[#007acc]'
                      : 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: lang.dotColor }}
                    />
                    <span>{lang.filename}</span>
                  </div>
                  <span className="text-[10px] text-[#808080]">{lang.tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Snippets Content */}
      {activeView === 'snippets' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <div className="px-2 py-1 text-[11px] text-[#999]">
            Pre-built algorithms for <strong className="text-white">{selectedLanguage.name}</strong>:
          </div>

          {(ALGORITHM_SNIPPETS[selectedLanguage.id] || []).map((snippet, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-[#1e1e1e] hover:bg-[#2c2c2d] border border-[#383838] transition-all group cursor-pointer"
              onClick={() => onLoadSnippet(snippet.code)}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white group-hover:text-blue-400">
                  {snippet.name}
                </span>
                <span className="text-[10px] text-[#007acc] opacity-0 group-hover:opacity-100 transition-opacity">
                  Insert →
                </span>
              </div>
              <p className="text-[11px] text-[#888] mt-1 line-clamp-2">
                {snippet.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
