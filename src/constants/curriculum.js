/**
 * Comprehensive Programming University & Interactive Curriculum
 * Covers Python, C, C++, and Java with progressive locking/unlocking,
 * theory concepts, practical challenges, and test cases.
 */

export const CURRICULUM = {
  // =========================================================================
  // 1. C PROGRAMMING UNIVERSITY
  // =========================================================================
  c: {
    languageId: 'c',
    languageName: 'C',
    color: '#555555',
    accentColor: '#58a6ff',
    badge: 'GCC 14',
    description: 'Master procedural programming, memory management, pointers, and data structures from scratch.',
    modules: [
      {
        id: 'c_mod_1',
        title: 'Module 1: Fundamentals & Variables',
        summary: 'Learn syntax, data types, arithmetic operators, and standard I/O (printf, scanf).',
        level: 1,
        problems: [
          {
            id: 'c_m1_p1',
            title: 'Hello C & Basic Arithmetic',
            difficulty: 'Easy',
            xp: 30,
            concept: `In C, every program begins execution at the \`main()\` function.
Standard I/O functions like \`printf()\` and \`scanf()\` are declared in \`<stdio.h>\`.
Arithmetic operators include \`+\`, \`-\`, \`*\`, \`/\`, and \`%\` (modulo).`,
            description: 'Write a C program that takes two space-separated integers as input and prints their sum, difference, and product on separate lines.',
            starterCode: `#include <stdio.h>

int main(void) {
    int a, b;
    // Read two integers
    if (scanf("%d %d", &a, &b) == 2) {
        // Print Sum, Difference, Product
        printf("%d\\n", a + b);
        printf("%d\\n", a - b);
        printf("%d\\n", a * b);
    }
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) == 2) {
        printf("%d\\n", a + b);
        printf("%d\\n", a - b);
        printf("%d\\n", a * b);
    }
    return 0;
}
`,
            testCases: [
              { input: '10 5\n', expectedOutput: '15\n5\n50' },
              { input: '20 4\n', expectedOutput: '24\n16\n80' }
            ],
            hints: ['Use %d in scanf with &a and &b.', 'Print each result on a new line with \\n.']
          },
          {
            id: 'c_m1_p2',
            title: 'Swap Two Numbers Without Temporary Variable',
            difficulty: 'Easy',
            xp: 40,
            concept: `Swapping values without a temporary variable can be done using arithmetic:
\`a = a + b;\`
\`b = a - b;\`
\`a = a - b;\``,
            description: 'Read two integers a and b. Swap their values without using any third/temporary variable, and print them separated by a space.',
            starterCode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    
    // TODO: Swap a and b without a third variable
    
    printf("%d %d\\n", a, b);
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    a = a + b;
    b = a - b;
    a = a - b;
    printf("%d %d\\n", a, b);
    return 0;
}
`,
            testCases: [
              { input: '3 7\n', expectedOutput: '7 3' },
              { input: '100 200\n', expectedOutput: '200 100' }
            ],
            hints: ['Add them together, then subtract b to get original a, then subtract again.']
          }
        ]
      },

      {
        id: 'c_mod_2',
        title: 'Module 2: Conditionals & Branching',
        summary: 'Control program flow with if-else, else-if ladders, nested conditions, and switch-case.',
        level: 2,
        problems: [
          {
            id: 'c_m2_p1',
            title: 'Even or Odd Classifier',
            difficulty: 'Easy',
            xp: 40,
            concept: `The modulo operator \`%\` returns the remainder of integer division.
An integer is even if \`n % 2 == 0\`, and odd otherwise.`,
            description: 'Given an integer n, print "EVEN" if the number is even, or "ODD" if it is odd.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // TODO: Check if n is even or odd
    
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    if (n % 2 == 0) {
        printf("EVEN\\n");
    } else {
        printf("ODD\\n");
    }
    return 0;
}
`,
            testCases: [
              { input: '4\n', expectedOutput: 'EVEN' },
              { input: '7\n', expectedOutput: 'ODD' },
              { input: '0\n', expectedOutput: 'EVEN' }
            ],
            hints: ['Use if (n % 2 == 0).']
          },
          {
            id: 'c_m2_p2',
            title: 'Largest of Three Numbers',
            difficulty: 'Easy',
            xp: 50,
            concept: `Logical operators in C:
- \`&&\` (AND): Both conditions must be true.
- \`||\` (OR): At least one condition must be true.
- \`!\` (NOT): Inverts boolean truth.`,
            description: 'Read three integers a, b, and c. Print the largest of the three numbers.',
            starterCode: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);

    // TODO: Determine the maximum number among a, b, and c
    
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    printf("%d\\n", max);
    return 0;
}
`,
            testCases: [
              { input: '12 45 32\n', expectedOutput: '45' },
              { input: '99 10 5\n', expectedOutput: '99' },
              { input: '4 4 4\n', expectedOutput: '4' }
            ],
            hints: ['Initialize max with a, then compare with b and c.']
          },
          {
            id: 'c_m2_p3',
            title: 'Leap Year Checker',
            difficulty: 'Medium',
            xp: 60,
            concept: `A year is a leap year if:
1. It is divisible by 4 AND not divisible by 100, OR
2. It is divisible by 400.`,
            description: 'Given a year Y, print "LEAP YEAR" if it is a leap year, otherwise print "NOT LEAP YEAR".',
            starterCode: `#include <stdio.h>

int main(void) {
    int year;
    scanf("%d", &year);

    // TODO: Check leap year rules
    
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int year;
    scanf("%d", &year);
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("LEAP YEAR\\n");
    } else {
        printf("NOT LEAP YEAR\\n");
    }
    return 0;
}
`,
            testCases: [
              { input: '2024\n', expectedOutput: 'LEAP YEAR' },
              { input: '1900\n', expectedOutput: 'NOT LEAP YEAR' },
              { input: '2000\n', expectedOutput: 'LEAP YEAR' }
            ],
            hints: ['(year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)']
          }
        ]
      },

      {
        id: 'c_mod_3',
        title: 'Module 3: Loops & Iterations (for, while, do-while)',
        summary: 'Master repetitive execution, counters, sentinel loops, break & continue, and nested loops.',
        level: 3,
        problems: [
          {
            id: 'c_m3_p1',
            title: 'Sum of First N Natural Numbers (for loop)',
            difficulty: 'Easy',
            xp: 40,
            concept: `A for loop is written as:
\`for (int i = 1; i <= n; i++) { sum += i; }\``,
            description: 'Given a positive integer N, calculate and print the sum of all integers from 1 to N using a for loop.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // TODO: Calculate sum from 1 to n
    
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}
`,
            testCases: [
              { input: '5\n', expectedOutput: '15' },
              { input: '10\n', expectedOutput: '55' }
            ],
            hints: ['Initialize sum = 0 before the loop.']
          },
          {
            id: 'c_m3_p2',
            title: 'Reverse a Number & Check Palindrome (while loop)',
            difficulty: 'Medium',
            xp: 60,
            concept: `Extract digits from right to left using modulo 10:
\`rem = n % 10;\`
\`reversed = reversed * 10 + rem;\`
\`n = n / 10;\``,
            description: 'Given a positive integer n, reverse its digits. Print the reversed number, and on the next line print "PALINDROME" if it matches the original or "NOT PALINDROME" otherwise.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // TODO: Reverse the digits and compare
    
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int original = n;
    int reversed = 0;
    while (n > 0) {
        int rem = n % 10;
        reversed = reversed * 10 + rem;
        n /= 10;
    }
    printf("%d\\n", reversed);
    if (original == reversed) {
        printf("PALINDROME\\n");
    } else {
        printf("NOT PALINDROME\\n");
    }
    return 0;
}
`,
            testCases: [
              { input: '121\n', expectedOutput: '121\nPALINDROME' },
              { input: '1234\n', expectedOutput: '4321\nNOT PALINDROME' }
            ],
            hints: ['Save original = n before running the while loop.']
          },
          {
            id: 'c_m3_p3',
            title: 'Fibonacci Sequence (do-while loop)',
            difficulty: 'Medium',
            xp: 60,
            concept: `Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8...
Each term is the sum of the previous two terms.`,
            description: 'Read an integer N (N >= 2). Print the first N terms of the Fibonacci series separated by spaces.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // TODO: Generate and print first n terms
    
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    long long a = 0, b = 1;
    printf("%lld %lld", a, b);
    int count = 2;
    do {
        long long next = a + b;
        printf(" %lld", next);
        a = b;
        b = next;
        count++;
    } while (count < n);
    printf("\\n");
    return 0;
}
`,
            testCases: [
              { input: '5\n', expectedOutput: '0 1 1 2 3' },
              { input: '8\n', expectedOutput: '0 1 1 2 3 5 8 13' }
            ],
            hints: ['Keep track of a and b, compute next = a + b.']
          }
        ]
      },

      {
        id: 'c_mod_4',
        title: 'Module 4: Arrays & Data Structures (Sorting & Rotations)',
        summary: 'Deep dive into array manipulation: Bubble sort, Merge sort, Right Rotate, Left Rotate, Reverse, and Searching.',
        level: 4,
        problems: [
          {
            id: 'c_m4_p1',
            title: 'Reverse an Array In-Place',
            difficulty: 'Easy',
            xp: 50,
            concept: `Reversing in-place requires two pointers:
\`start = 0, end = size - 1;\`
Swap \`arr[start]\` and \`arr[end]\`, increment start and decrement end until \`start >= end\`.`,
            description: 'Given size N followed by N integers, reverse the array in-place and print the reversed elements separated by spaces.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // TODO: Reverse arr in-place
    
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    int start = 0, end = n - 1;
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            testCases: [
              { input: '5\n1 2 3 4 5\n', expectedOutput: '5 4 3 2 1' },
              { input: '4\n10 20 30 40\n', expectedOutput: '40 30 20 10' }
            ],
            hints: ['Use two indices: start = 0 and end = n - 1. Swap elements until they meet.']
          },
          {
            id: 'c_m4_p2',
            title: 'Left Rotate Array by K Positions',
            difficulty: 'Medium',
            xp: 70,
            concept: `Left rotating an array by K positions shifts every element K steps to the left.
Elements that fall off the front wrap around to the back.
Effective rotations = \`k % n\`.
Optimal algorithm (3-step reverse):
1. Reverse \`0\` to \`k - 1\`
2. Reverse \`k\` to \`n - 1\`
3. Reverse entire array \`0\` to \`n - 1\``,
            description: 'Given N and K on the first line, and N array elements on the second line, left rotate the array by K positions and print the resulting array.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // TODO: Left rotate array by k positions
    
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

void reverse(int arr[], int start, int end) {
    while (start < end) {
        int tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}

int main(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    k = k % n;
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
    reverse(arr, 0, n - 1);

    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            testCases: [
              { input: '5 2\n1 2 3 4 5\n', expectedOutput: '3 4 5 1 2' },
              { input: '7 3\n1 2 3 4 5 6 7\n', expectedOutput: '4 5 6 7 1 2 3' }
            ],
            hints: ['First normalize k with k = k % n. Use the 3-step reversal method for O(1) extra space.']
          },
          {
            id: 'c_m4_p3',
            title: 'Right Rotate Array by K Positions',
            difficulty: 'Medium',
            xp: 70,
            concept: `Right rotating an array by K positions shifts elements to the right.
Elements shifted off the end wrap around to the front.
3-step reverse algorithm:
1. Reverse entire array \`0\` to \`n - 1\`
2. Reverse \`0\` to \`k - 1\`
3. Reverse \`k\` to \`n - 1\``,
            description: 'Given N and K on line 1, and N array elements on line 2, right rotate the array by K positions and print the resulting array.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // TODO: Right rotate array by k positions
    
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

void reverse(int arr[], int start, int end) {
    while (start < end) {
        int tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}

int main(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    k = k % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);

    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            testCases: [
              { input: '5 2\n1 2 3 4 5\n', expectedOutput: '4 5 1 2 3' },
              { input: '6 1\n10 20 30 40 50 60\n', expectedOutput: '60 10 20 30 40 50' }
            ],
            hints: ['Reverse whole array first, then reverse the first k elements, then the remaining n-k elements.']
          },
          {
            id: 'c_m4_p4',
            title: 'Bubble Sort Algorithm',
            difficulty: 'Medium',
            xp: 80,
            concept: `Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.
After pass i, the largest element among unsorted items bubbles up to index n - 1 - i.
Time complexity: O(n^2), Space complexity: O(1).`,
            description: 'Given N elements, sort them in ascending order using the Bubble Sort algorithm. Print the sorted elements separated by spaces.',
            starterCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // TODO: Implement Bubble Sort
    
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            testCases: [
              { input: '6\n64 34 25 12 22 11\n', expectedOutput: '11 12 22 25 34 64' },
              { input: '5\n5 1 4 2 8\n', expectedOutput: '1 2 4 5 8' }
            ],
            hints: ['Outer loop: i from 0 to n-2. Inner loop: j from 0 to n-i-2. If arr[j] > arr[j+1], swap them.']
          },
          {
            id: 'c_m4_p5',
            title: 'Merge Sort Algorithm',
            difficulty: 'Hard',
            xp: 100,
            concept: `Merge Sort is a Divide-and-Conquer algorithm:
1. Divide array into two halves at mid = (left + right) / 2.
2. Recursively sort left and right halves.
3. Merge the two sorted halves into a single sorted array.
Time complexity: O(n log n) guaranteed!`,
            description: 'Given N elements, sort them in ascending order using the Merge Sort divide-and-conquer algorithm. Print the sorted elements.',
            starterCode: `#include <stdio.h>

// TODO: Implement merge() and mergeSort()

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // Call mergeSort(arr, 0, n - 1)
    
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            solutionCode: `#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) {
        printf("%d%c", arr[i], i == n - 1 ? '\\n' : ' ');
    }
    return 0;
}
`,
            testCases: [
              { input: '7\n38 27 43 3 9 82 10\n', expectedOutput: '3 9 10 27 38 43 82' },
              { input: '5\n12 11 13 5 6\n', expectedOutput: '5 6 11 12 13' }
            ],
            hints: ['Break down until base case l >= r. Merge using two temporary buffers L and R.']
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. PYTHON PROGRAMMING UNIVERSITY
  // =========================================================================
  python: {
    languageId: 'python',
    languageName: 'Python',
    color: '#38bdf8',
    accentColor: '#38bdf8',
    badge: 'Python 3.12',
    description: 'Learn dynamic typing, concise syntax, list comprehensions, sorting, and algorithmic thinking.',
    modules: [
      {
        id: 'py_mod_1',
        title: 'Module 1: Python Basics & Standard I/O',
        summary: 'Learn variables, string interpolation, print(), and reading input().',
        level: 1,
        problems: [
          {
            id: 'py_m1_p1',
            title: 'Greeting & Formatted Output',
            difficulty: 'Easy',
            xp: 30,
            concept: `In Python 3, input() returns a string.
You can format strings cleanly using f-strings: \`f"Hello, {name}!"\`.`,
            description: 'Read a user\'s name from input and print "Hello, {name}! Welcome to Python University." exactly.',
            starterCode: `# Read the user name
name = input().strip()

# TODO: Print the formatted greeting
`,
            solutionCode: `name = input().strip()
print(f"Hello, {name}! Welcome to Python University.")
`,
            testCases: [
              { input: 'Alice\n', expectedOutput: 'Hello, Alice! Welcome to Python University.' },
              { input: 'JD\n', expectedOutput: 'Hello, JD! Welcome to Python University.' }
            ],
            hints: ['Use f"Hello, {name}! Welcome to Python University."']
          },
          {
            id: 'py_m1_p2',
            title: 'Sum & Average of Numbers',
            difficulty: 'Easy',
            xp: 40,
            concept: `Convert strings to numbers with \`int()\` or \`float()\`.
\`map(int, input().split())\` converts space-separated inputs into integers in one step.`,
            description: 'Read three space-separated integers. Print their sum on the first line, and their average rounded to 2 decimal places on the second line.',
            starterCode: `# Read 3 integers
a, b, c = map(int, input().split())

# TODO: Print sum and formatted average
`,
            solutionCode: `a, b, c = map(int, input().split())
total = a + b + c
avg = total / 3.0
print(total)
print(f"{avg:.2f}")
`,
            testCases: [
              { input: '10 20 30\n', expectedOutput: '60\n20.00' },
              { input: '5 7 9\n', expectedOutput: '21\n7.00' }
            ],
            hints: ['Use total / 3.0 and format with f"{avg:.2f}".']
          }
        ]
      },

      {
        id: 'py_mod_2',
        title: 'Module 2: Conditionals & Logic',
        summary: 'if, elif, else, boolean logic, and comparison checks.',
        level: 2,
        problems: [
          {
            id: 'py_m2_p1',
            title: 'Number Classifier (Positive, Negative, or Zero)',
            difficulty: 'Easy',
            xp: 40,
            concept: `Python uses \`if\`, \`elif\`, and \`else\` without parentheses:
\`\`\`python
if x > 0:
    print("POSITIVE")
elif x < 0:
    print("NEGATIVE")
else:
    print("ZERO")
\`\`\``,
            description: 'Read an integer n. Print "POSITIVE", "NEGATIVE", or "ZERO" depending on its value.',
            starterCode: `n = int(input())

# TODO: Classify the integer
`,
            solutionCode: `n = int(input())
if n > 0:
    print("POSITIVE")
elif n < 0:
    print("NEGATIVE")
else:
    print("ZERO")
`,
            testCases: [
              { input: '42\n', expectedOutput: 'POSITIVE' },
              { input: '-15\n', expectedOutput: 'NEGATIVE' },
              { input: '0\n', expectedOutput: 'ZERO' }
            ],
            hints: ['Check n > 0, n < 0, and else.']
          },
          {
            id: 'py_m2_p2',
            title: 'FizzBuzz Challenge',
            difficulty: 'Easy',
            xp: 50,
            concept: `Classic interview problem:
- Divisible by both 3 and 5: "FizzBuzz"
- Divisible by 3: "Fizz"
- Divisible by 5: "Buzz"
- Otherwise: the number itself`,
            description: 'Given an integer n, print "FizzBuzz" if divisible by 15, "Fizz" if divisible by 3, "Buzz" if divisible by 5, or n itself.',
            starterCode: `n = int(input())

# TODO: Implement FizzBuzz logic
`,
            solutionCode: `n = int(input())
if n % 15 == 0:
    print("FizzBuzz")
elif n % 3 == 0:
    print("Fizz")
elif n % 5 == 0:
    print("Buzz")
else:
    print(n)
`,
            testCases: [
              { input: '15\n', expectedOutput: 'FizzBuzz' },
              { input: '9\n', expectedOutput: 'Fizz' },
              { input: '10\n', expectedOutput: 'Buzz' },
              { input: '7\n', expectedOutput: '7' }
            ],
            hints: ['Check n % 15 == 0 first!']
          }
        ]
      },

      {
        id: 'py_mod_3',
        title: 'Module 3: Loops & List Manipulations',
        summary: 'For loops, while loops, range(), list slicing, and rotations.',
        level: 3,
        problems: [
          {
            id: 'py_m3_p1',
            title: 'Prime Number Checker',
            difficulty: 'Medium',
            xp: 60,
            concept: `A prime number is only divisible by 1 and itself.
A number N is prime if no number from 2 up to \`int(N**0.5) + 1\` divides it evenly.`,
            description: 'Given an integer N, print "PRIME" if N is prime, otherwise print "NOT PRIME". (N >= 2).',
            starterCode: `n = int(input())

# TODO: Check if n is prime
`,
            solutionCode: `n = int(input())
is_prime = True
if n < 2:
    is_prime = False
else:
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            is_prime = False
            break

print("PRIME" if is_prime else "NOT PRIME")
`,
            testCases: [
              { input: '17\n', expectedOutput: 'PRIME' },
              { input: '25\n', expectedOutput: 'NOT PRIME' },
              { input: '2\n', expectedOutput: 'PRIME' }
            ],
            hints: ['Loop from 2 to int(n**0.5) + 1. If n % i == 0, it is not prime.']
          },
          {
            id: 'py_m3_p2',
            title: 'Left & Right List Rotation',
            difficulty: 'Medium',
            xp: 70,
            concept: `Python list slicing enables elegant rotations:
- Left rotate by k: \`lst[k:] + lst[:k]\`
- Right rotate by k: \`lst[-k:] + lst[:-k]\``,
            description: 'Given a list of numbers on line 1, and an integer K on line 2, perform a Left Rotation by K positions and print the resulting list elements separated by spaces.',
            starterCode: `nums = list(map(int, input().split()))
k = int(input())

# TODO: Left rotate nums by k positions
`,
            solutionCode: `nums = list(map(int, input().split()))
k = int(input())
k = k % len(nums)
rotated = nums[k:] + nums[:k]
print(*(rotated))
`,
            testCases: [
              { input: '1 2 3 4 5\n2\n', expectedOutput: '3 4 5 1 2' },
              { input: '10 20 30 40\n1\n', expectedOutput: '20 30 40 10' }
            ],
            hints: ['Use k = k % len(nums), then slice: nums[k:] + nums[:k].']
          },
          {
            id: 'py_m3_p3',
            title: 'Bubble Sort in Python',
            difficulty: 'Medium',
            xp: 80,
            concept: `In Python, swapping values can be written concisely as:
\`nums[j], nums[j+1] = nums[j+1], nums[j]\``,
            description: 'Given a list of integers, implement Bubble Sort to sort the numbers in ascending order. Print the sorted elements separated by spaces.',
            starterCode: `nums = list(map(int, input().split()))

# TODO: Implement Bubble Sort
`,
            solutionCode: `nums = list(map(int, input().split()))
n = len(nums)
for i in range(n - 1):
    for j in range(n - 1 - i):
        if nums[j] > nums[j + 1]:
            nums[j], nums[j + 1] = nums[j + 1], nums[j]
print(*nums)
`,
            testCases: [
              { input: '5 3 8 4 2\n', expectedOutput: '2 3 4 5 8' },
              { input: '10 1 7 4\n', expectedOutput: '1 4 7 10' }
            ],
            hints: ['Use nested for loops and tuple assignment for swapping: nums[j], nums[j+1] = nums[j+1], nums[j]']
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. C++ PROGRAMMING UNIVERSITY
  // =========================================================================
  cpp: {
    languageId: 'cpp',
    languageName: 'C++',
    color: '#f34b7d',
    accentColor: '#f34b7d',
    badge: 'G++ 14',
    description: 'Master modern C++, standard template library (std::vector, algorithms), and object orientation.',
    modules: [
      {
        id: 'cpp_mod_1',
        title: 'Module 1: Modern C++ & Streams',
        summary: 'Learn std::cin, std::cout, references, and fast I/O.',
        level: 1,
        problems: [
          {
            id: 'cpp_m1_p1',
            title: 'Stream I/O & Simple Calculations',
            difficulty: 'Easy',
            xp: 30,
            concept: `In C++, \`std::cin >> x\` reads input and \`std::cout << x << '\\n'\` writes output.
Include \`<iostream>\` and write \`using namespace std;\`.`,
            description: 'Read two integers a and b, print their product and their sum on separate lines.',
            starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    // TODO: Output product then sum
    
    return 0;
}
`,
            solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a * b << endl;
    cout << a + b << endl;
    return 0;
}
`,
            testCases: [
              { input: '6 7\n', expectedOutput: '42\n13' },
              { input: '10 20\n', expectedOutput: '200\n30' }
            ],
            hints: ['Use cout << a * b << "\\n";']
          }
        ]
      },
      {
        id: 'cpp_mod_2',
        title: 'Module 2: Vectors & Algorithm Library',
        summary: 'std::vector dynamic arrays, sorting, rotating, and binary searching.',
        level: 2,
        problems: [
          {
            id: 'cpp_m2_p1',
            title: 'Rotate Vector by K Elements',
            difficulty: 'Medium',
            xp: 70,
            concept: `In C++, \`std::vector\` is a dynamic contiguous array.
Rotating an array can be accomplished using \`std::reverse\` from \`<algorithm>\`:
\`reverse(vec.begin(), vec.end());\``,
            description: 'Given N and K on line 1, and N integers on line 2, rotate the vector left by K positions and print the result separated by spaces.',
            starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    // TODO: Left rotate vector by k positions
    
    for (int i = 0; i < n; i++) {
        cout << v[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
            solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];
    k = k % n;
    reverse(v.begin(), v.begin() + k);
    reverse(v.begin() + k, v.end());
    reverse(v.begin(), v.end());

    for (int i = 0; i < n; i++) {
        cout << v[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
            testCases: [
              { input: '5 2\n1 2 3 4 5\n', expectedOutput: '3 4 5 1 2' },
              { input: '4 1\n10 20 30 40\n', expectedOutput: '20 30 40 10' }
            ],
            hints: ['Normalize k = k % n, then reverse segments [0..k-1], [k..n-1], and [0..n-1].']
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. JAVA PROGRAMMING UNIVERSITY
  // =========================================================================
  java: {
    languageId: 'java',
    languageName: 'Java',
    color: '#ea580c',
    accentColor: '#ea580c',
    badge: 'JDK 21',
    description: 'Learn strongly typed object-oriented programming, Scanner, Arrays, and Collections.',
    modules: [
      {
        id: 'java_mod_1',
        title: 'Module 1: Java Basics & Scanner I/O',
        summary: 'Learn class Main, public static void main, Scanner, and arithmetic.',
        level: 1,
        problems: [
          {
            id: 'java_m1_p1',
            title: 'Scanner Reading & Multiplication',
            difficulty: 'Easy',
            xp: 30,
            concept: `In Java, standard input is read using \`java.util.Scanner\`:
\`Scanner sc = new Scanner(System.in);\`
\`int x = sc.nextInt();\``,
            description: 'Read two integers a and b using Scanner. Print their sum and product on separate lines.',
            starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // TODO: Read a and b, print sum then product
        
    }
}
`,
            solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
        System.out.println(a * b);
    }
}
`,
            testCases: [
              { input: '4 5\n', expectedOutput: '9\n20' },
              { input: '12 3\n', expectedOutput: '15\n36' }
            ],
            hints: ['Use sc.nextInt() to read integers.']
          }
        ]
      },
      {
        id: 'java_mod_2',
        title: 'Module 2: Arrays & Algorithms in Java',
        summary: 'Array manipulation, reversing, rotating, and sorting.',
        level: 2,
        problems: [
          {
            id: 'java_m2_p1',
            title: 'Reverse an Array in Java',
            difficulty: 'Easy',
            xp: 50,
            concept: `In Java, arrays have a \`.length\` property (without parentheses).
Two-pointer technique is optimal for in-place reversal.`,
            description: 'Given size N followed by N integers, reverse the array in-place and print the elements separated by spaces.',
            starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        // TODO: Reverse arr in-place
        
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`,
            solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int left = 0, right = n - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`,
            testCases: [
              { input: '5\n1 2 3 4 5\n', expectedOutput: '5 4 3 2 1' },
              { input: '4\n10 20 30 40\n', expectedOutput: '40 30 20 10' }
            ],
            hints: ['Use left = 0, right = n - 1. Swap arr[left] and arr[right] in a while loop.']
          }
        ]
      }
    ]
  }
};
