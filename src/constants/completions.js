/**
 * Intelligent Code Autocomplete & Snippet Library for JD COMPILER
 * Covers Python, C, C++, Java with comprehensive imports and standard functions.
 */

export const COMPLETIONS_BY_LANG = {
  python: [
    // Common Data Science & Math Imports
    {
      label: 'import numpy as np',
      insertText: 'import numpy as np\n',
      detail: 'NumPy arrays & mathematical computation',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'num', 'np', 'numpy']
    },
    {
      label: 'import pandas as pd',
      insertText: 'import pandas as pd\n',
      detail: 'Pandas DataFrames & tabular data analysis',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'pan', 'pd', 'pandas']
    },
    {
      label: 'import math',
      insertText: 'import math\n',
      detail: 'Standard math functions (sqrt, pow, sin, cos, pi)',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'mat', 'math']
    },
    {
      label: 'import random',
      insertText: 'import random\n',
      detail: 'Random number generation (randint, choice, shuffle)',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'ran', 'random']
    },
    {
      label: 'import statistics',
      insertText: 'import statistics\n',
      detail: 'Mathematical statistics (mean, median, mode, stdev)',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'stat', 'statistics']
    },
    {
      label: 'import sys',
      insertText: 'import sys\n',
      detail: 'System-specific parameters and stdin/stdout',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'sys']
    },
    {
      label: 'import os',
      insertText: 'import os\n',
      detail: 'Operating system interfaces and paths',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'os']
    },
    {
      label: 'import json',
      insertText: 'import json\n',
      detail: 'JSON encoder and decoder',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'jso', 'json']
    },
    {
      label: 'import datetime',
      insertText: 'import datetime\n',
      detail: 'Date and time operations',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'dat', 'datetime', 'time']
    },
    {
      label: 'from collections import defaultdict, Counter',
      insertText: 'from collections import defaultdict, Counter\n',
      detail: 'High-performance container datatypes',
      kind: 'module',
      trigger: ['from', 'col', 'collections', 'counter', 'defaultdict']
    },
    {
      label: 'from typing import List, Dict, Tuple, Optional',
      insertText: 'from typing import List, Dict, Tuple, Optional\n',
      detail: 'Type hinting annotations',
      kind: 'module',
      trigger: ['from', 'typ', 'typing', 'list', 'dict']
    },

    // Snippets & Functions
    {
      label: 'print(...)',
      insertText: 'print()',
      cursorOffset: 6,
      detail: 'Print text or objects to stdout',
      kind: 'function',
      trigger: ['pr', 'pri', 'print']
    },
    {
      label: 'input(...)',
      insertText: 'input()',
      cursorOffset: 6,
      detail: 'Read line from standard input',
      kind: 'function',
      trigger: ['in', 'inp', 'input']
    },
    {
      label: 'list(map(int, input().split()))',
      insertText: 'list(map(int, input().split()))',
      detail: 'Read list of integers from stdin line',
      kind: 'snippet',
      trigger: ['list', 'map', 'read', 'inp', 'int']
    },
    {
      label: 'def function_name(args):',
      insertText: 'def my_function():\n    pass\n',
      detail: 'Define a Python function',
      kind: 'snippet',
      trigger: ['def', 'fun', 'function']
    },
    {
      label: 'class ClassName:',
      insertText: 'class MyClass:\n    def __init__(self):\n        pass\n',
      detail: 'Define a Python class with constructor',
      kind: 'snippet',
      trigger: ['cla', 'class']
    },
    {
      label: 'for i in range(n):',
      insertText: 'for i in range(10):\n    ',
      detail: 'For-loop with range iterator',
      kind: 'snippet',
      trigger: ['for', 'ran', 'range']
    },
    {
      label: 'if __name__ == "__main__":',
      insertText: 'if __name__ == "__main__":\n    main()\n',
      detail: 'Boilerplate main execution block',
      kind: 'snippet',
      trigger: ['if', 'main', '__name__']
    },
    {
      label: 'try: ... except Exception as e:',
      insertText: 'try:\n    pass\nexcept Exception as e:\n    print(f"Error: {e}")\n',
      detail: 'Exception handling block',
      kind: 'snippet',
      trigger: ['try', 'exc', 'except']
    },
    {
      label: 'np.array([...])',
      insertText: 'np.array([1, 2, 3, 4, 5])',
      detail: 'Create a NumPy multidimensional array',
      kind: 'function',
      trigger: ['np', 'arr', 'array']
    },
    {
      label: 'pd.DataFrame({...})',
      insertText: 'pd.DataFrame({"col1": [1, 2], "col2": [3, 4]})',
      detail: 'Create a 2D labeled Pandas DataFrame',
      kind: 'function',
      trigger: ['pd', 'data', 'dataframe', 'df']
    },
    {
      label: 'math.sqrt(x)',
      insertText: 'math.sqrt()',
      cursorOffset: 10,
      detail: 'Return the square root of x',
      kind: 'function',
      trigger: ['sqrt', 'math']
    },
    {
      label: 'random.randint(a, b)',
      insertText: 'random.randint(1, 100)',
      detail: 'Return random integer in range [a, b]',
      kind: 'function',
      trigger: ['rand', 'randint', 'random']
    },
    {
      label: 'statistics.mean(data)',
      insertText: 'statistics.mean()',
      cursorOffset: 16,
      detail: 'Compute sample arithmetic mean',
      kind: 'function',
      trigger: ['mean', 'stat', 'statistics']
    }
  ],

  c: [
    {
      label: '#include <stdio.h>',
      insertText: '#include <stdio.h>\n',
      detail: 'Standard input/output (printf, scanf, fopen)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'stdio']
    },
    {
      label: '#include <stdlib.h>',
      insertText: '#include <stdlib.h>\n',
      detail: 'Standard library (malloc, free, rand, exit)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'stdlib']
    },
    {
      label: '#include <string.h>',
      insertText: '#include <string.h>\n',
      detail: 'String functions (strlen, strcpy, strcmp, strcat)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'string']
    },
    {
      label: '#include <math.h>',
      insertText: '#include <math.h>\n',
      detail: 'Math library (sqrt, pow, sin, cos, floor)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'math']
    },
    {
      label: '#include <stdbool.h>',
      insertText: '#include <stdbool.h>\n',
      detail: 'Boolean type support (bool, true, false)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'stdbool', 'bool']
    },
    {
      label: '#include <time.h>',
      insertText: '#include <time.h>\n',
      detail: 'Date and time library (time, clock)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'time']
    },
    {
      label: 'int main() { ... }',
      insertText: 'int main(void) {\n    printf("Hello from C!\\n");\n    return 0;\n}\n',
      detail: 'C program entry point',
      kind: 'snippet',
      trigger: ['main', 'int']
    },
    {
      label: 'printf("%s\\n", ...);',
      insertText: 'printf("\\n");',
      cursorOffset: 8,
      detail: 'Formatted output to stdout',
      kind: 'function',
      trigger: ['pr', 'pri', 'printf']
    },
    {
      label: 'scanf("%d", &var);',
      insertText: 'scanf("%d", &);',
      cursorOffset: 13,
      detail: 'Formatted input from stdin',
      kind: 'function',
      trigger: ['sc', 'sca', 'scanf']
    },
    {
      label: 'for (int i = 0; i < n; i++)',
      insertText: 'for (int i = 0; i < 10; i++) {\n    \n}\n',
      detail: 'Standard C for-loop counter',
      kind: 'snippet',
      trigger: ['for', 'loop']
    },
    {
      label: 'malloc(sizeof(...) * n)',
      insertText: 'malloc(sizeof(int) * 10)',
      detail: 'Allocate heap memory dynamically',
      kind: 'function',
      trigger: ['mal', 'malloc']
    },
    {
      label: 'free(ptr);',
      insertText: 'free();',
      cursorOffset: 5,
      detail: 'Release allocated memory',
      kind: 'function',
      trigger: ['fre', 'free']
    }
  ],

  cpp: [
    {
      label: '#include <iostream>',
      insertText: '#include <iostream>\n',
      detail: 'Standard C++ I/O stream (std::cout, std::cin)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'iostream', 'cout']
    },
    {
      label: '#include <vector>',
      insertText: '#include <vector>\n',
      detail: 'Dynamic array container std::vector',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'vector']
    },
    {
      label: '#include <string>',
      insertText: '#include <string>\n',
      detail: 'Standard string class std::string',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'string']
    },
    {
      label: '#include <algorithm>',
      insertText: '#include <algorithm>\n',
      detail: 'STL algorithms (std::sort, reverse, find, max, min)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'algorithm', 'sort']
    },
    {
      label: '#include <map>',
      insertText: '#include <map>\n',
      detail: 'Associative sorted map container',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'map']
    },
    {
      label: '#include <unordered_map>',
      insertText: '#include <unordered_map>\n',
      detail: 'Fast hash table key-value map',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'unordered', 'map']
    },
    {
      label: '#include <cmath>',
      insertText: '#include <cmath>\n',
      detail: 'C++ mathematical library (std::sqrt, pow, sin)',
      kind: 'module',
      trigger: ['#', '#in', '#inc', 'include', 'cmath', 'math']
    },
    {
      label: 'using namespace std;',
      insertText: 'using namespace std;\n',
      detail: 'Bring std namespace into global scope',
      kind: 'snippet',
      trigger: ['us', 'usi', 'using', 'namespace']
    },
    {
      label: 'int main() { ... }',
      insertText: 'int main() {\n    std::cout << "Hello C++!" << std::endl;\n    return 0;\n}\n',
      detail: 'C++ main program function',
      kind: 'snippet',
      trigger: ['main', 'int']
    },
    {
      label: 'std::cout << ... << std::endl;',
      insertText: 'std::cout <<  << std::endl;',
      cursorOffset: 13,
      detail: 'Print to standard output',
      kind: 'snippet',
      trigger: ['cou', 'cout']
    },
    {
      label: 'std::cin >> ...;',
      insertText: 'std::cin >> ;',
      cursorOffset: 12,
      detail: 'Read from standard input',
      kind: 'snippet',
      trigger: ['cin']
    },
    {
      label: 'std::vector<int> v;',
      insertText: 'std::vector<int> v = {1, 2, 3, 4, 5};\n',
      detail: 'Initialize a vector with elements',
      kind: 'snippet',
      trigger: ['vec', 'vector']
    },
    {
      label: 'std::sort(v.begin(), v.end());',
      insertText: 'std::sort(v.begin(), v.end());\n',
      detail: 'Sort vector ascending with quicksort',
      kind: 'snippet',
      trigger: ['sort']
    }
  ],

  java: [
    {
      label: 'import java.util.*;',
      insertText: 'import java.util.*;\n',
      detail: 'Java Utilities (Scanner, List, ArrayList, Map, Set)',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'util', 'java.util']
    },
    {
      label: 'import java.io.*;',
      insertText: 'import java.io.*;\n',
      detail: 'Java I/O (BufferedReader, InputStreamReader)',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'io', 'java.io']
    },
    {
      label: 'import java.math.*;',
      insertText: 'import java.math.*;\n',
      detail: 'Arbitrary precision math (BigInteger, BigDecimal)',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'math', 'java.math']
    },
    {
      label: 'import java.util.stream.*;',
      insertText: 'import java.util.stream.*;\n',
      detail: 'Modern Java Stream API and Collectors',
      kind: 'module',
      trigger: ['im', 'imp', 'import', 'stream']
    },
    {
      label: 'public class Main { ... }',
      insertText: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
      detail: 'Standard Java runnable class template',
      kind: 'snippet',
      trigger: ['main', 'class', 'public']
    },
    {
      label: 'System.out.println(...);',
      insertText: 'System.out.println();',
      cursorOffset: 19,
      detail: 'Print a line to console output',
      kind: 'snippet',
      trigger: ['sys', 'sout', 'print', 'println']
    },
    {
      label: 'Scanner sc = new Scanner(System.in);',
      insertText: 'Scanner sc = new Scanner(System.in);\n',
      detail: 'Read user keyboard input from standard input',
      kind: 'snippet',
      trigger: ['scan', 'scanner', 'sc']
    },
    {
      label: 'List<String> list = new ArrayList<>();',
      insertText: 'List<String> list = new ArrayList<>();\n',
      detail: 'Create a resizable array list',
      kind: 'snippet',
      trigger: ['list', 'arraylist']
    },
    {
      label: 'Map<String, Integer> map = new HashMap<>();',
      insertText: 'Map<String, Integer> map = new HashMap<>();\n',
      detail: 'Create a key-value hash map',
      kind: 'snippet',
      trigger: ['map', 'hashmap']
    },
    {
      label: 'for (int i = 0; i < n; i++) { ... }',
      insertText: 'for (int i = 0; i < 10; i++) {\n    \n}\n',
      detail: 'Standard index loop',
      kind: 'snippet',
      trigger: ['for', 'loop']
    }
  ]
};
