/**
 * Comprehensive Programming University & Interactive Curriculum
 * Covers Python, C, C++, and Java with progressive locking/unlocking,
 * theory concepts, practical challenges, and test cases.
 * Every topic contains at least 5 interactive challenges with hidden answers.
 * Enriched with real-world analogies, step-by-step human recipes, and beginner pitfall traps.
 */

export const CURRICULUM = {
  "c": {
    "languageId": "c",
    "languageName": "C",
    "color": "#555555",
    "accentColor": "#58a6ff",
    "badge": "GCC 14",
    "description": "Master procedural programming, memory management, pointers, and data structures from scratch.",
    "modules": [
      {
        "id": "c_mod_1",
        "title": "Module 1: Fundamentals & Variables",
        "summary": "Learn syntax, data types, arithmetic operators, and standard I/O (printf, scanf).",
        "level": 1,
        "problems": [
          {
            "id": "c_m1_p1",
            "title": "Basic Arithmetic Operations",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "In C, standard input and output functions are scanf() and printf() from <stdio.h>. Common arithmetic operators include +, -, *, /, and % (modulo).",
            "description": "Read two integers a and b. Print their sum (a + b), difference (a - b), and product (a * b) each on a separate line.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        // TODO: Calculate and print sum, difference, and product on separate lines\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        printf(\"%d\\n\", a + b);\n        printf(\"%d\\n\", a - b);\n        printf(\"%d\\n\", a * b);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "10 5\n",
                "expectedOutput": "15\n5\n50"
              },
              {
                "input": "20 4\n",
                "expectedOutput": "24\n16\n80"
              }
            ],
            "hints": [
              "Use %d in printf with \\n for newlines.",
              "Difference is a - b."
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m1_p2",
            "title": "Swap Two Numbers Without Temporary Variable",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Swapping values without a temporary variable can be achieved using arithmetic addition and subtraction:\na = a + b;\nb = a - b;\na = a - b;",
            "description": "Read two integers a and b. Swap their values without using any third/temporary variable, and print them separated by a space.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        // TODO: Swap a and b without using any third variable\n        \n        printf(\"%d %d\\n\", a, b);\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        a = a + b;\n        b = a - b;\n        a = a - b;\n        printf(\"%d %d\\n\", a, b);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "3 7\n",
                "expectedOutput": "7 3"
              },
              {
                "input": "100 200\n",
                "expectedOutput": "200 100"
              }
            ],
            "hints": [
              "Add b to a, then subtract b from new a, then subtract new b from new a.",
              "Check with simple numbers first."
            ],
            "analogy": "Imagine you have a glass of blue juice in your left hand and green juice in your right hand. To swap them without an extra glass or spilling, you combine their quantities mathematically, then separate them step by step!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m1_p3",
            "title": "Temperature Converter (Celsius to Fahrenheit)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "The formula to convert Celsius (C) to Fahrenheit (F) is:\nF = (C * 9 / 5) + 32.\nUsing integers, perform multiplication before division to preserve precision.",
            "description": "Read an integer representing temperature in Celsius. Print the corresponding temperature in Fahrenheit (as an integer).",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int c;\n    if (scanf(\"%d\", &c) == 1) {\n        // TODO: Convert Celsius to Fahrenheit and print integer result\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int c;\n    if (scanf(\"%d\", &c) == 1) {\n        int f = (c * 9 / 5) + 32;\n        printf(\"%d\\n\", f);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "0\n",
                "expectedOutput": "32"
              },
              {
                "input": "100\n",
                "expectedOutput": "212"
              },
              {
                "input": "25\n",
                "expectedOutput": "77"
              }
            ],
            "hints": [
              "Multiply by 9 first, divide by 5, then add 32."
            ],
            "analogy": "Like a dual-scale outdoor thermometer: Celsius measures water freezing at 0° and boiling at 100°, while Fahrenheit measures freezing at 32° and boiling at 212°. The formula is just a mathematical gear translating between the two rulers!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m1_p4",
            "title": "Rectangle Area and Perimeter",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "For a rectangle with length L and width W:\nArea = L * W\nPerimeter = 2 * (L + W)",
            "description": "Given two integers representing length and width of a rectangle, compute and print the Area on the first line and Perimeter on the second line.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int length, width;\n    if (scanf(\"%d %d\", &length, &width) == 2) {\n        // TODO: Compute and print Area and Perimeter on separate lines\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int length, width;\n    if (scanf(\"%d %d\", &length, &width) == 2) {\n        printf(\"%d\\n\", length * width);\n        printf(\"%d\\n\", 2 * (length + width));\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5 3\n",
                "expectedOutput": "15\n16"
              },
              {
                "input": "10 8\n",
                "expectedOutput": "80\n36"
              }
            ],
            "hints": [
              "Area is length * width.",
              "Perimeter is 2 * (length + width)."
            ],
            "analogy": "Imagine laying floor tiles in your bedroom. The Area is how many square tiles fit on the whole floor, while the Perimeter is how many footsteps it takes to walk along the walls around the whole room.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m1_p5",
            "title": "ASCII Value & Case Converter",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "In C, every char is stored as an integer ASCII code. For instance, 'A' is 65 and 'a' is 97. The difference between lowercase and uppercase is 32.",
            "description": "Read a single lowercase character (from 'a' to 'z'). Print its ASCII integer value on the first line, and its uppercase equivalent on the second line.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    char ch;\n    if (scanf(\" %c\", &ch) == 1) {\n        // TODO: Print ASCII integer code, then print uppercase character on next line\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    char ch;\n    if (scanf(\" %c\", &ch) == 1) {\n        printf(\"%d\\n\", (int)ch);\n        printf(\"%c\\n\", ch - 32);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "a\n",
                "expectedOutput": "97\nA"
              },
              {
                "input": "z\n",
                "expectedOutput": "122\nZ"
              }
            ],
            "hints": [
              "To convert lowercase to uppercase, subtract 32 from the char code.",
              "Use %d to print ASCII integer code, %c to print character."
            ],
            "analogy": "Like a light switch: If the room is dark (lowercase), flip the switch ON (uppercase). If already ON, flip it OFF!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      },
      {
        "id": "c_mod_2",
        "title": "Module 2: Conditionals & Branching",
        "summary": "Master if-else conditions, nested statements, and switch-case branching.",
        "level": 2,
        "problems": [
          {
            "id": "c_m2_p1",
            "title": "Even or Odd Number Checker",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "An integer is even if divisible by 2 with remainder 0 (n % 2 == 0); otherwise, it is odd.",
            "description": "Read an integer n. Print \"Even\" if the number is even, or \"Odd\" if it is odd.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Check if n is Even or Odd and print \"Even\" or \"Odd\"\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        if (n % 2 == 0) {\n            printf(\"Even\\n\");\n        } else {\n            printf(\"Odd\\n\");\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "42\n",
                "expectedOutput": "Even"
              },
              {
                "input": "17\n",
                "expectedOutput": "Odd"
              },
              {
                "input": "0\n",
                "expectedOutput": "Even"
              }
            ],
            "hints": [
              "Use the modulo operator % 2."
            ],
            "analogy": "Imagine you have a bag of candies and you share them equally between 2 friends. If every candy finds a pair with zero leftovers, it's EVEN. If there's 1 lonely candy left over, it's ODD!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m2_p2",
            "title": "Leap Year Detector",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "A year is a leap year if it is divisible by 4, except end-of-century years which must be divisible by 400.\nFormula: (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)",
            "description": "Read an integer year. Print \"Leap Year\" if it is a leap year, otherwise print \"Not Leap Year\".",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int year;\n    if (scanf(\"%d\", &year) == 1) {\n        // TODO: Determine if year is a Leap Year\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int year;\n    if (scanf(\"%d\", &year) == 1) {\n        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n            printf(\"Leap Year\\n\");\n        } else {\n            printf(\"Not Leap Year\\n\");\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "2024\n",
                "expectedOutput": "Leap Year"
              },
              {
                "input": "1900\n",
                "expectedOutput": "Not Leap Year"
              },
              {
                "input": "2000\n",
                "expectedOutput": "Leap Year"
              }
            ],
            "hints": [
              "Centuries like 1900 are not leap years because 1900 % 400 != 0.",
              "Combine conditions with logical OR (||) and AND (&&)."
            ],
            "analogy": "The Earth takes about 365.2422 days to orbit the Sun — not an exact 365 days! That extra fraction of a day adds up, so every 4 years our calendar adds February 29 to keep our seasons from drifting out of sync.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m2_p3",
            "title": "Maximum of Three Numbers",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "To find the largest of three numbers a, b, and c, compare them using relational operators or nested if-else statements.",
            "description": "Given three integers, print the maximum value among them.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    if (scanf(\"%d %d %d\", &a, &b, &c) == 3) {\n        // TODO: Find and print the maximum value\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    if (scanf(\"%d %d %d\", &a, &b, &c) == 3) {\n        int max = a;\n        if (b > max) max = b;\n        if (c > max) max = c;\n        printf(\"%d\\n\", max);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "12 85 45\n",
                "expectedOutput": "85"
              },
              {
                "input": "99 2 4\n",
                "expectedOutput": "99"
              },
              {
                "input": "7 7 7\n",
                "expectedOutput": "7"
              }
            ],
            "hints": [
              "Initialize max with a, then compare with b, then with c."
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m2_p4",
            "title": "Triangle Classification by Sides",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "A triangle with side lengths a, b, and c is:\n- Equilateral: all three sides are equal (a == b && b == c)\n- Isosceles: any two sides are equal\n- Scalene: all three sides are different",
            "description": "Read three positive integers representing side lengths. Print \"Equilateral\", \"Isosceles\", or \"Scalene\".",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    if (scanf(\"%d %d %d\", &a, &b, &c) == 3) {\n        // TODO: Classify triangle as \"Equilateral\", \"Isosceles\", or \"Scalene\"\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b, c;\n    if (scanf(\"%d %d %d\", &a, &b, &c) == 3) {\n        if (a == b && b == c) {\n            printf(\"Equilateral\\n\");\n        } else if (a == b || b == c || a == c) {\n            printf(\"Isosceles\\n\");\n        } else {\n            printf(\"Scalene\\n\");\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5 5 5\n",
                "expectedOutput": "Equilateral"
              },
              {
                "input": "5 5 8\n",
                "expectedOutput": "Isosceles"
              },
              {
                "input": "3 4 5\n",
                "expectedOutput": "Scalene"
              }
            ],
            "hints": [
              "Check for Equilateral first, then Isosceles, then else Scalene."
            ],
            "analogy": "Imagine three wooden sticks. If one stick is 10 meters long and the other two are only 1 meter each, their tips can never reach each other to close the triangle! Any two sides together must always be longer than the third.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m2_p5",
            "title": "Switch-Case Arithmetic Calculator",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "The switch-case construct is ideal for multi-way branching based on discrete character or integer values.\nRemember to include a break; statement in each case.",
            "description": "Read an integer a, an operator character op (+, -, *, /), and an integer b. Compute and print the result. For division, output integer division.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    char op;\n    if (scanf(\"%d %c %d\", &a, &op, &b) == 3) {\n        // TODO: Use switch-case on op to compute and print the result\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    char op;\n    if (scanf(\"%d %c %d\", &a, &op, &b) == 3) {\n        switch (op) {\n            case '+': printf(\"%d\\n\", a + b); break;\n            case '-': printf(\"%d\\n\", a - b); break;\n            case '*': printf(\"%d\\n\", a * b); break;\n            case '/': printf(\"%d\\n\", a / b); break;\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "14 + 6\n",
                "expectedOutput": "20"
              },
              {
                "input": "50 - 15\n",
                "expectedOutput": "35"
              },
              {
                "input": "8 * 7\n",
                "expectedOutput": "56"
              },
              {
                "input": "100 / 4\n",
                "expectedOutput": "25"
              }
            ],
            "hints": [
              "In scanf, \" %c\" with a leading space ignores whitespace characters."
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      },
      {
        "id": "c_mod_3",
        "title": "Module 3: Loops & Iterations (for, while, do-while)",
        "summary": "Iterate through series, factorials, digit extraction, and prime checks.",
        "level": 3,
        "problems": [
          {
            "id": "c_m3_p1",
            "title": "Factorial of a Number (for loop)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "The factorial of n (written n!) is the product of all positive integers less than or equal to n. 0! = 1.",
            "description": "Read a non-negative integer n (n <= 12). Using a for loop, compute and print n!.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Compute factorial of n using a for loop\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        long long fact = 1;\n        for (int i = 1; i <= n; i++) {\n            fact *= i;\n        }\n        printf(\"%lld\\n\", fact);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n",
                "expectedOutput": "120"
              },
              {
                "input": "0\n",
                "expectedOutput": "1"
              },
              {
                "input": "6\n",
                "expectedOutput": "720"
              }
            ],
            "hints": [
              "Initialize fact = 1.",
              "Loop from 1 to n inclusive."
            ],
            "analogy": "Imagine you have 5 differently colored books on a shelf. How many different ways can you arrange them? 5 choices for the first slot × 4 for the second × 3 for the third × 2 × 1 = 120 unique arrangements!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m3_p2",
            "title": "Sum of Digits (while loop)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "To extract digits of a positive number n in a while loop:\nRemainder n % 10 yields the last digit.\nDivision n /= 10 removes the last digit.",
            "description": "Read a positive integer n. Using a while loop, calculate and print the sum of its digits.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Calculate and print sum of digits using while loop\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int sum = 0;\n        while (n > 0) {\n            sum += (n % 10);\n            n /= 10;\n        }\n        printf(\"%d\\n\", sum);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "12345\n",
                "expectedOutput": "15"
              },
              {
                "input": "908\n",
                "expectedOutput": "17"
              },
              {
                "input": "7\n",
                "expectedOutput": "7"
              }
            ],
            "hints": [
              "Use while (n > 0) with n % 10 and n /= 10."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m3_p3",
            "title": "Palindrome Number Checker",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "A number is a palindrome if it reads the same backwards as forwards (e.g., 121, 1331). Reverse the number mathematically and compare with the original.",
            "description": "Read an integer n. Print \"Palindrome\" if it is a palindrome, or \"Not Palindrome\" otherwise.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Reverse the integer and check if original == reversed\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int original = n;\n        long long reversed = 0;\n        while (n > 0) {\n            reversed = reversed * 10 + (n % 10);\n            n /= 10;\n        }\n        if (original == reversed) {\n            printf(\"Palindrome\\n\");\n        } else {\n            printf(\"Not Palindrome\\n\");\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "1221\n",
                "expectedOutput": "Palindrome"
              },
              {
                "input": "1234\n",
                "expectedOutput": "Not Palindrome"
              },
              {
                "input": "7\n",
                "expectedOutput": "Palindrome"
              }
            ],
            "hints": [
              "Save the original value before modifying n in the loop.",
              "Reversed formula: rev = rev * 10 + rem;"
            ],
            "analogy": "Hold a word or number up to a mirror. If the reflection in the mirror reads character-for-character identical to the original (like 'RACECAR' or '1221'), it's a Palindrome!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m3_p4",
            "title": "Prime Number Verifier",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "A prime number is greater than 1 and has no positive divisors other than 1 and itself. We only need to test divisors up to sqrt(n).",
            "description": "Read an integer n. Print \"Prime\" if it is a prime number, otherwise print \"Not Prime\". (Numbers <= 1 are not prime).",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Determine if n is Prime or Not Prime\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        if (n <= 1) {\n            printf(\"Not Prime\\n\");\n            return 0;\n        }\n        int isPrime = 1;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                isPrime = 0;\n                break;\n            }\n        }\n        if (isPrime) {\n            printf(\"Prime\\n\");\n        } else {\n            printf(\"Not Prime\\n\");\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "29\n",
                "expectedOutput": "Prime"
              },
              {
                "input": "1\n",
                "expectedOutput": "Not Prime"
              },
              {
                "input": "49\n",
                "expectedOutput": "Not Prime"
              },
              {
                "input": "2\n",
                "expectedOutput": "Prime"
              }
            ],
            "hints": [
              "Check if n <= 1 first.",
              "Loop i * i <= n for optimal efficiency."
            ],
            "analogy": "Think of prime numbers as the unbreakable 'atomic building blocks' of mathematics. You cannot divide 7 candies into equal smaller groups without cutting candies in half!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m3_p5",
            "title": "Multiplication Table Generator (do-while loop)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "A do-while loop executes the loop body at least once before testing the loop condition at the end.",
            "description": "Read an integer n. Using a do-while loop, print the first 5 multiples of n in the format \"n x i = res\" each on a new line (i from 1 to 5).",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Print first 5 multiples using a do-while loop (i = 1 to 5)\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int i = 1;\n        do {\n            printf(\"%d x %d = %d\\n\", n, i, n * i);\n            i++;\n        } while (i <= 5);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "7\n",
                "expectedOutput": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35"
              },
              {
                "input": "3\n",
                "expectedOutput": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15"
              }
            ],
            "hints": [
              "do { ... } while (i <= 5);"
            ],
            "analogy": "Like marching troops in neat rows: 4 rows of 5 soldiers = 20 soldiers. A loop prints each row step-by-step from 1 to 5.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      },
      {
        "id": "c_mod_4",
        "title": "Module 4: Arrays & Sorting Algorithms",
        "summary": "Reverse, Left Rotate, Right Rotate, Bubble Sort, Merge Sort, and Element Search.",
        "level": 4,
        "problems": [
          {
            "id": "c_m4_p1",
            "title": "Reverse Array In-Place",
            "difficulty": "Easy",
            "xp": 45,
            "concept": "Reversing an array in-place uses two pointers: left starting at 0, right starting at n - 1. Swap elements and increment left, decrement right until they meet.",
            "description": "Read n followed by n integers. Reverse the array in-place and print the elements separated by spaces.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Reverse arr in-place using two pointers\n        \n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int left = 0, right = n - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n1 2 3 4 5\n",
                "expectedOutput": "5 4 3 2 1"
              },
              {
                "input": "4\n10 20 30 40\n",
                "expectedOutput": "40 30 20 10"
              }
            ],
            "hints": [
              "Swap arr[left] and arr[right] until left >= right."
            ],
            "analogy": "Picture two people standing at opposite ends of a row of parked cars. Person A and Person B swap cars, take one step inward toward each other, swap the next cars, until they meet in the middle.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m4_p2",
            "title": "Left Rotate Array by K Positions",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "Left rotating an array by k shifts elements to the left by k places. Element at index i moves to (i - k + n) % n.",
            "description": "Read n and k, followed by n integers. Rotate the array to the left by k positions and print the resulting array.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n, k;\n    if (scanf(\"%d %d\", &n, &k) == 2) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Left rotate arr by k positions\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n, k;\n    if (scanf(\"%d %d\", &n, &k) == 2) {\n        int arr[100], res[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        k = k % n;\n        for (int i = 0; i < n; i++) {\n            res[i] = arr[(i + k) % n];\n        }\n        for (int i = 0; i < n; i++) printf(\"%d%c\", res[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5 2\n1 2 3 4 5\n",
                "expectedOutput": "3 4 5 1 2"
              },
              {
                "input": "6 1\n10 20 30 40 50 60\n",
                "expectedOutput": "20 30 40 50 60 10"
              }
            ],
            "hints": [
              "k = k % n handles rotations larger than array size.",
              "New element at index i is original element at (i + k) % n."
            ],
            "analogy": "Think of a carousel or Ferris wheel: Every rider shifts one seat forward. The rider at the very front loops all the way around to the back!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m4_p3",
            "title": "Right Rotate Array by K Positions",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "Right rotating shifts elements to the right. Element at index i moves to (i + k) % n.",
            "description": "Read n and k, followed by n integers. Rotate the array to the right by k positions and print the resulting array.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n, k;\n    if (scanf(\"%d %d\", &n, &k) == 2) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Right rotate arr by k positions\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n, k;\n    if (scanf(\"%d %d\", &n, &k) == 2) {\n        int arr[100], res[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        k = k % n;\n        for (int i = 0; i < n; i++) {\n            res[(i + k) % n] = arr[i];\n        }\n        for (int i = 0; i < n; i++) printf(\"%d%c\", res[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5 2\n1 2 3 4 5\n",
                "expectedOutput": "4 5 1 2 3"
              },
              {
                "input": "4 1\n10 20 30 40\n",
                "expectedOutput": "40 10 20 30"
              }
            ],
            "hints": [
              "Target position for index i is (i + k) % n."
            ],
            "analogy": "Think of a carousel or Ferris wheel: Every rider shifts one seat forward. The rider at the very front loops all the way around to the back!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m4_p4",
            "title": "Bubble Sort Algorithm",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Time complexity is O(N^2).",
            "description": "Read n followed by n integers. Sort the array in ascending order using Bubble Sort and print the sorted array.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Implement Bubble Sort\n        \n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                }\n            }\n        }\n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "6\n64 34 25 12 22 11\n",
                "expectedOutput": "11 12 22 25 34 64"
              },
              {
                "input": "5\n5 1 4 2 8\n",
                "expectedOutput": "1 2 4 5 8"
              }
            ],
            "hints": [
              "Outer loop runs from 0 to n - 2.",
              "Inner loop compares arr[j] and arr[j + 1]."
            ],
            "analogy": "Imagine air bubbles floating upward in fizzy soda: In each pass, the biggest bubble naturally rises past smaller bubbles until the biggest is floating at the very top.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m4_p5",
            "title": "Merge Sort Algorithm",
            "difficulty": "Hard",
            "xp": 65,
            "concept": "Merge Sort is an O(N log N) divide-and-conquer algorithm. It divides the array into halves, recursively sorts them, and merges the two sorted halves.",
            "description": "Read n followed by n integers. Sort the array using Merge Sort and print the sorted array separated by spaces.",
            "starterCode": "#include <stdio.h>\n\n// TODO: Implement merge and mergeSort functions\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Call mergeSort on arr\n        \n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[100], R[100];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) {\n            arr[k++] = L[i++];\n        } else {\n            arr[k++] = R[j++];\n        }\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        mergeSort(arr, 0, n - 1);\n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "6\n12 11 13 5 6 7\n",
                "expectedOutput": "5 6 7 11 12 13"
              },
              {
                "input": "5\n38 27 43 3 9\n",
                "expectedOutput": "3 9 27 38 43"
              }
            ],
            "hints": [
              "Midpoint calculation: m = l + (r - l) / 2.",
              "Merge two sorted subarrays into the main array."
            ],
            "analogy": "Divide and Conquer: If you have a deck of 100 shuffled cards, sort 50 cards on the left, sort 50 on the right, then zip them together by always picking the smallest top card from either pile.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m4_p6",
            "title": "Second Largest Element in Array",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "To find the second largest element in a single pass O(N), keep track of first_max and second_max while iterating through the array.",
            "description": "Read n (n >= 2) followed by n distinct integers. Find and print the second largest element.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Find and print the second largest element\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int max1 = -1000000, max2 = -1000000;\n        for (int i = 0; i < n; i++) {\n            if (arr[i] > max1) {\n                max2 = max1;\n                max1 = arr[i];\n            } else if (arr[i] > max2 && arr[i] != max1) {\n                max2 = arr[i];\n            }\n        }\n        printf(\"%d\\n\", max2);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n10 5 20 8 15\n",
                "expectedOutput": "15"
              },
              {
                "input": "4\n1 99 50 75\n",
                "expectedOutput": "75"
              }
            ],
            "hints": [
              "When a new max is found, the previous max becomes max2."
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      },
      {
        "id": "c_mod_5",
        "title": "Module 5: Strings & Text Processing",
        "summary": "String reversal, palindrome check, vowel counting, and case toggling.",
        "level": 5,
        "problems": [
          {
            "id": "c_m5_p1",
            "title": "String Length Without strlen()",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "In C, strings are null-terminated character arrays ending with '\\0'. You can find length by counting characters until reaching '\\0'.",
            "description": "Read a word (without spaces). Calculate and print its length without using the library function strlen().",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        // TODO: Compute and print the string length without strlen()\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        int len = 0;\n        while (str[len] != '\\0') {\n            len++;\n        }\n        printf(\"%d\\n\", len);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "HelloWorld\n",
                "expectedOutput": "10"
              },
              {
                "input": "Antigravity\n",
                "expectedOutput": "11"
              }
            ],
            "hints": [
              "Loop while str[len] != '\\0'."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m5_p2",
            "title": "Reverse a String",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "To reverse a string in-place, swap characters from both ends using left = 0 and right = len - 1 until left >= right.",
            "description": "Read a single word and print it reversed.",
            "starterCode": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        // TODO: Reverse the string and print it\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        int len = strlen(str);\n        for (int i = 0; i < len / 2; i++) {\n            char temp = str[i];\n            str[i] = str[len - 1 - i];\n            str[len - 1 - i] = temp;\n        }\n        printf(\"%s\\n\", str);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "coding\n",
                "expectedOutput": "gnidoc"
              },
              {
                "input": "racecar\n",
                "expectedOutput": "racecar"
              }
            ],
            "hints": [
              "Swap str[i] and str[len - 1 - i] up to len / 2."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m5_p3",
            "title": "Palindrome String Checker",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "A string is a palindrome if it reads identically forwards and backwards (e.g. \"madam\", \"level\").",
            "description": "Read a single word. Print \"Palindrome\" if it is a palindrome, or \"Not Palindrome\" otherwise.",
            "starterCode": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        // TODO: Check if str is a palindrome\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        int len = strlen(str);\n        int isPal = 1;\n        for (int i = 0; i < len / 2; i++) {\n            if (str[i] != str[len - 1 - i]) {\n                isPal = 0;\n                break;\n            }\n        }\n        if (isPal) printf(\"Palindrome\\n\");\n        else printf(\"Not Palindrome\\n\");\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "madam\n",
                "expectedOutput": "Palindrome"
              },
              {
                "input": "compiler\n",
                "expectedOutput": "Not Palindrome"
              }
            ],
            "hints": [
              "Compare characters from start and end towards the center."
            ],
            "analogy": "Hold a word or number up to a mirror. If the reflection in the mirror reads character-for-character identical to the original (like 'RACECAR' or '1221'), it's a Palindrome!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m5_p4",
            "title": "Count Vowels and Consonants",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Vowels are 'a', 'e', 'i', 'o', 'u' (and uppercase equivalents). Other alphabetic characters are consonants.",
            "description": "Read a lowercase word. Print the number of vowels on the first line, and the number of consonants on the second line.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        // TODO: Count vowels and consonants, print each on a new line\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        int vowels = 0, consonants = 0;\n        for (int i = 0; str[i] != '\\0'; i++) {\n            char c = str[i];\n            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {\n                vowels++;\n            } else if (c >= 'a' && c <= 'z') {\n                consonants++;\n            }\n        }\n        printf(\"%d\\n%d\\n\", vowels, consonants);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "education\n",
                "expectedOutput": "5\n4"
              },
              {
                "input": "rhythm\n",
                "expectedOutput": "0\n6"
              }
            ],
            "hints": [
              "Check if char is one of a, e, i, o, u."
            ],
            "analogy": "Vowels (A, E, I, O, U) are the open-mouthed vocal cords of human speech. Imagine filtering pebbles from sand: each character passes through a filter that rings a bell whenever a vowel appears.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m5_p5",
            "title": "Toggle Case of Every Letter",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "To toggle case: if a letter is uppercase ('A'-'Z'), add 32 to make it lowercase; if lowercase ('a'-'z'), subtract 32 to make it uppercase.",
            "description": "Given a word containing letters, toggle the case of each character and print the modified word.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        // TODO: Toggle case of each letter in str\n        \n        printf(\"%s\\n\", str);\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    char str[100];\n    if (scanf(\"%s\", str) == 1) {\n        for (int i = 0; str[i] != '\\0'; i++) {\n            if (str[i] >= 'a' && str[i] <= 'z') {\n                str[i] -= 32;\n            } else if (str[i] >= 'A' && str[i] <= 'Z') {\n                str[i] += 32;\n            }\n        }\n        printf(\"%s\\n\", str);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "HelloWORLD\n",
                "expectedOutput": "hELLOworld"
              },
              {
                "input": "cODE\n",
                "expectedOutput": "Code"
              }
            ],
            "hints": [
              "'a' - 32 = 'A', and 'A' + 32 = 'a'."
            ],
            "analogy": "Like a light switch: If the room is dark (lowercase), flip the switch ON (uppercase). If already ON, flip it OFF!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      },
      {
        "id": "c_mod_6",
        "title": "Module 6: Functions & Recursion",
        "summary": "Recursive power, GCD Euclidean algorithm, Fibonacci numbers, and sum of series.",
        "level": 6,
        "problems": [
          {
            "id": "c_m6_p1",
            "title": "Recursive Factorial Function",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "A recursive function calls itself to break down a problem into smaller instances. Base case: fact(0) = 1. Recursive step: fact(n) = n * fact(n - 1).",
            "description": "Write a recursive function fact(n). Read n (0 <= n <= 10) and print its factorial.",
            "starterCode": "#include <stdio.h>\n\n// TODO: Implement recursive factorial function\nlong long fact(int n) {\n    \n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%lld\\n\", fact(n));\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nlong long fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%lld\\n\", fact(n));\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "4\n",
                "expectedOutput": "24"
              },
              {
                "input": "7\n",
                "expectedOutput": "5040"
              }
            ],
            "hints": [
              "Base case: if (n <= 1) return 1;"
            ],
            "analogy": "Imagine you have 5 differently colored books on a shelf. How many different ways can you arrange them? 5 choices for the first slot × 4 for the second × 3 for the third × 2 × 1 = 120 unique arrangements!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m6_p2",
            "title": "Greatest Common Divisor (Euclidean Algorithm)",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Euclidean Algorithm: gcd(a, b) = gcd(b, a % b), with base case gcd(a, 0) = a.",
            "description": "Read two positive integers a and b. Write a recursive function to compute and print their GCD.",
            "starterCode": "#include <stdio.h>\n\n// TODO: Implement recursive gcd function\nint gcd(int a, int b) {\n    \n}\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        printf(\"%d\\n\", gcd(a, b));\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        printf(\"%d\\n\", gcd(a, b));\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "48 18\n",
                "expectedOutput": "6"
              },
              {
                "input": "100 25\n",
                "expectedOutput": "25"
              },
              {
                "input": "17 13\n",
                "expectedOutput": "1"
              }
            ],
            "hints": [
              "If b == 0, return a; otherwise recurse with gcd(b, a % b)."
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m6_p3",
            "title": "N-th Fibonacci Number (Recursion)",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Fibonacci sequence: F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2).",
            "description": "Read an integer n (0 <= n <= 20). Write a function to calculate and print the N-th Fibonacci number.",
            "starterCode": "#include <stdio.h>\n\n// TODO: Implement fibonacci function\nint fib(int n) {\n    \n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%d\\n\", fib(n));\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%d\\n\", fib(n));\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "7\n",
                "expectedOutput": "13"
              },
              {
                "input": "10\n",
                "expectedOutput": "55"
              },
              {
                "input": "0\n",
                "expectedOutput": "0"
              }
            ],
            "hints": [
              "Handle base cases n == 0 and n == 1."
            ],
            "analogy": "Nature's favorite pattern! Look at how sunflower seeds or pinecones spiral: each new number is born by adding the previous two numbers together (0, 1, 1, 2, 3, 5, 8, 13...).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m6_p4",
            "title": "Power Function (X raised to N)",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "Power calculation: power(x, n) = x * power(x, n - 1), with base case power(x, 0) = 1.",
            "description": "Given two integers base x and exponent n (n >= 0), compute x^n using recursion.",
            "starterCode": "#include <stdio.h>\n\n// TODO: Implement recursive power function\nlong long power(int x, int n) {\n    \n}\n\nint main(void) {\n    int x, n;\n    if (scanf(\"%d %d\", &x, &n) == 2) {\n        printf(\"%lld\\n\", power(x, n));\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nlong long power(int x, int n) {\n    if (n == 0) return 1;\n    return x * power(x, n - 1);\n}\n\nint main(void) {\n    int x, n;\n    if (scanf(\"%d %d\", &x, &n) == 2) {\n        printf(\"%lld\\n\", power(x, n));\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "2 5\n",
                "expectedOutput": "32"
              },
              {
                "input": "3 4\n",
                "expectedOutput": "81"
              },
              {
                "input": "5 0\n",
                "expectedOutput": "1"
              }
            ],
            "hints": [
              "x^0 is always 1."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m6_p5",
            "title": "Sum of Natural Numbers (Recursion)",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Sum of first n natural numbers can be expressed recursively as:\nsum(n) = n + sum(n - 1), where sum(1) = 1.",
            "description": "Read an integer n. Using a recursive function, compute and print the sum of numbers from 1 to n.",
            "starterCode": "#include <stdio.h>\n\n// TODO: Implement recursive sum function\nint sumNatural(int n) {\n    \n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%d\\n\", sumNatural(n));\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint sumNatural(int n) {\n    if (n <= 1) return n;\n    return n + sumNatural(n - 1);\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        printf(\"%d\\n\", sumNatural(n));\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "10\n",
                "expectedOutput": "55"
              },
              {
                "input": "5\n",
                "expectedOutput": "15"
              }
            ],
            "hints": [
              "Base case is n <= 1."
            ],
            "analogy": "Russian Nesting Dolls (Matryoshka)! You open a large doll to find a slightly smaller doll inside. You keep opening dolls until you find the tiny solid baby doll at the center (Base Case), then close them back up.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      },
      {
        "id": "c_mod_7",
        "title": "Module 7: Pointers & Memory Management",
        "summary": "Pass-by-reference swap, pointer arithmetic, dynamic arrays with malloc & free.",
        "level": 7,
        "problems": [
          {
            "id": "c_m7_p1",
            "title": "Swap Two Variables Using Pointers",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "In C, functions pass arguments by value. To modify caller variables, pass memory addresses using pointers (&a, &b) and dereference them with (*p).",
            "description": "Implement a function void swap(int *x, int *y) to swap the values of two variables.",
            "starterCode": "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    // TODO: Swap the values pointed to by x and y\n    \n}\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        swap(&a, &b);\n        printf(\"%d %d\\n\", a, b);\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) == 2) {\n        swap(&a, &b);\n        printf(\"%d %d\\n\", a, b);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "15 25\n",
                "expectedOutput": "25 15"
              },
              {
                "input": "9 2\n",
                "expectedOutput": "2 9"
              }
            ],
            "hints": [
              "Use *x to read or write the value at pointer x."
            ],
            "analogy": "Imagine you have a glass of blue juice in your left hand and green juice in your right hand. To swap them without an extra glass or spilling, you combine their quantities mathematically, then separate them step by step!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers 3D video game engines (Unreal Engine), operating systems, and high-speed web browsers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m7_p2",
            "title": "Sum of Array Elements Using Pointer Arithmetic",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "An array name arr decays into a pointer to its first element (&arr[0]). You can traverse elements using *(arr + i) or by incrementing a pointer.",
            "description": "Read n followed by n integers. Calculate and print the sum using pointer traversal instead of array brackets [].",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Sum all elements using pointer arithmetic *(ptr + i)\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int *ptr = arr;\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += *(ptr + i);\n        }\n        printf(\"%d\\n\", sum);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "4\n10 20 30 40\n",
                "expectedOutput": "100"
              },
              {
                "input": "3\n5 15 25\n",
                "expectedOutput": "45"
              }
            ],
            "hints": [
              "*(ptr + i) accesses the i-th element."
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers 3D video game engines (Unreal Engine), operating systems, and high-speed web browsers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m7_p3",
            "title": "Reverse Array In-Place Using Two Pointers",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "Pointer reversal uses two pointer variables: int *left = arr and int *right = arr + n - 1. Dereference and swap values, advancing pointers inward.",
            "description": "Given n and n integers, reverse the array in-place using two pointer variables.",
            "starterCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        \n        // TODO: Reverse array using pointer variables left and right\n        \n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int *left = arr;\n        int *right = arr + n - 1;\n        while (left < right) {\n            int temp = *left;\n            *left = *right;\n            *right = temp;\n            left++;\n            right--;\n        }\n        for (int i = 0; i < n; i++) printf(\"%d%c\", arr[i], i == n - 1 ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n1 2 3 4 5\n",
                "expectedOutput": "5 4 3 2 1"
              },
              {
                "input": "3\n9 8 7\n",
                "expectedOutput": "7 8 9"
              }
            ],
            "hints": [
              "left starts at arr, right starts at arr + n - 1.",
              "Increment left, decrement right."
            ],
            "analogy": "Picture two people standing at opposite ends of a row of parked cars. Person A and Person B swap cars, take one step inward toward each other, swap the next cars, until they meet in the middle.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m7_p4",
            "title": "Find Min and Max Using Pointers",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "Functions can return multiple results by accepting pointer arguments for min and max.",
            "description": "Implement void findMinMax(int *arr, int n, int *min, int *max). Print min on first line and max on second line.",
            "starterCode": "#include <stdio.h>\n\nvoid findMinMax(int *arr, int n, int *min, int *max) {\n    // TODO: Find min and max and assign to *min and *max\n    \n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int min, max;\n        findMinMax(arr, n, &min, &max);\n        printf(\"%d\\n%d\\n\", min, max);\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n\nvoid findMinMax(int *arr, int n, int *min, int *max) {\n    *min = arr[0];\n    *max = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] < *min) *min = arr[i];\n        if (arr[i] > *max) *max = arr[i];\n    }\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int arr[100];\n        for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n        int min, max;\n        findMinMax(arr, n, &min, &max);\n        printf(\"%d\\n%d\\n\", min, max);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n34 12 89 5 21\n",
                "expectedOutput": "5\n89"
              },
              {
                "input": "3\n-10 0 10\n",
                "expectedOutput": "-10\n10"
              }
            ],
            "hints": [
              "Initialize *min and *max with arr[0]."
            ],
            "analogy": "Imagine a treasure map. Instead of hauling a 500-pound gold safe with you everywhere, you carry a tiny slip of paper with GPS coordinates written on it. The slip of paper is your pointer!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers 3D video game engines (Unreal Engine), operating systems, and high-speed web browsers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          },
          {
            "id": "c_m7_p5",
            "title": "Dynamic Array Allocation with malloc() and free()",
            "difficulty": "Hard",
            "xp": 60,
            "concept": "malloc(size_t bytes) allocates heap memory dynamically during runtime. Always free() memory when done to prevent memory leaks.",
            "description": "Read integer n, dynamically allocate memory for an array of n integers using malloc, read the elements, compute their product, and free the allocated memory.",
            "starterCode": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        // TODO: Allocate memory with malloc, read elements, compute product, free memory\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        long long prod = 1;\n        for (int i = 0; i < n; i++) {\n            scanf(\"%d\", &arr[i]);\n            prod *= arr[i];\n        }\n        printf(\"%lld\\n\", prod);\n        free(arr);\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "4\n1 2 3 4\n",
                "expectedOutput": "24"
              },
              {
                "input": "3\n2 5 10\n",
                "expectedOutput": "100"
              }
            ],
            "hints": [
              "int *arr = (int*)malloc(n * sizeof(int));",
              "Call free(arr) before program exit."
            ],
            "analogy": "Like reserving hotel rooms on demand: Instead of building an entire empty hotel in advance, you ask the front desk (malloc) for exactly N rooms right when guests arrive, and check out (free) when you leave.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers 3D video game engines (Unreal Engine), operating systems, and high-speed web browsers.",
            "beginnerTrap": "In C, scanf() needs the '&' address symbol before variable names, but printf() does not! Also, remember \\n to print on a new line."
          }
        ]
      }
    ]
  },
  "python": {
    "languageId": "python",
    "languageName": "Python",
    "color": "#3572A5",
    "accentColor": "#58a6ff",
    "badge": "Python 3.12",
    "description": "Master readable, expressive Python for data structures, automation, algorithms, and scripting.",
    "modules": [
      {
        "id": "py_mod_1",
        "title": "Module 1: Basics, Math & Input/Output",
        "summary": "Learn variables, dynamic types, input(), formatted print(), and arithmetic operators.",
        "level": 1,
        "problems": [
          {
            "id": "py_m1_p1",
            "title": "Arithmetic Operations & Modulo",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Python supports arithmetic operators: +, -, *, / (float division), // (integer floor division), and % (modulo).",
            "description": "Read two integers a and b from input(). Print their sum, difference (a - b), product (a * b), and floor quotient (a // b) on separate lines.",
            "starterCode": "# Read two integers\na, b = map(int, input().split())\n\n# TODO: Compute and print sum, difference, product, and floor quotient on separate lines\n",
            "solutionCode": "a, b = map(int, input().split())\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a // b)\n",
            "testCases": [
              {
                "input": "15 4\n",
                "expectedOutput": "19\n11\n60\n3"
              },
              {
                "input": "20 5\n",
                "expectedOutput": "25\n15\n100\n4"
              }
            ],
            "hints": [
              "Use // for integer floor division in Python."
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m1_p2",
            "title": "Swap Two Variables in Python",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Python provides tuple unpacking syntax: a, b = b, a, allowing simultaneous value swapping in a single line without temporary variables.",
            "description": "Read two words a and b. Swap their values in one line, and print them separated by a space.",
            "starterCode": "a, b = input().split()\n\n# TODO: Swap a and b in one line using tuple unpacking\na, b = b, a\n\nprint(f\"{a} {b}\")\n",
            "solutionCode": "a, b = input().split()\na, b = b, a\nprint(f\"{a} {b}\")\n",
            "testCases": [
              {
                "input": "Hello World\n",
                "expectedOutput": "World Hello"
              },
              {
                "input": "Python Coding\n",
                "expectedOutput": "Coding Python"
              }
            ],
            "hints": [
              "In Python, a, b = b, a cleanly swaps two values."
            ],
            "analogy": "Imagine you have a glass of blue juice in your left hand and green juice in your right hand. To swap them without an extra glass or spilling, you combine their quantities mathematically, then separate them step by step!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m1_p3",
            "title": "Temperature Converter (Celsius to Fahrenheit)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Formula: F = (C * 9 / 5) + 32. Using round() or int(), convert to nearest integer.",
            "description": "Read integer Celsius temperature. Print the corresponding Fahrenheit value as an integer.",
            "starterCode": "c = int(input())\n\n# TODO: Convert Celsius to Fahrenheit and print integer result\n",
            "solutionCode": "c = int(input())\nf = int((c * 9 / 5) + 32)\nprint(f)\n",
            "testCases": [
              {
                "input": "0\n",
                "expectedOutput": "32"
              },
              {
                "input": "100\n",
                "expectedOutput": "212"
              },
              {
                "input": "37\n",
                "expectedOutput": "98"
              }
            ],
            "hints": [
              "int((c * 9 / 5) + 32)"
            ],
            "analogy": "Like a dual-scale outdoor thermometer: Celsius measures water freezing at 0° and boiling at 100°, while Fahrenheit measures freezing at 32° and boiling at 212°. The formula is just a mathematical gear translating between the two rulers!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m1_p4",
            "title": "Circle Area and Circumference",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Area = pi * r^2 and Circumference = 2 * pi * r. For integer output with pi approx 3.14159, round to nearest integer.",
            "description": "Read integer radius r. Using pi = 3.14159, print integer area on line 1, and integer circumference on line 2 (using round()).",
            "starterCode": "r = int(input())\nPI = 3.14159\n\n# TODO: Compute and print round(Area) and round(Circumference)\n",
            "solutionCode": "r = int(input())\nPI = 3.14159\narea = round(PI * r * r)\ncirc = round(2 * PI * r)\nprint(area)\nprint(circ)\n",
            "testCases": [
              {
                "input": "5\n",
                "expectedOutput": "79\n31"
              },
              {
                "input": "10\n",
                "expectedOutput": "314\n63"
              }
            ],
            "hints": [
              "Use round() on both expressions."
            ],
            "analogy": "Imagine laying floor tiles in your bedroom. The Area is how many square tiles fit on the whole floor, while the Perimeter is how many footsteps it takes to walk along the walls around the whole room.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m1_p5",
            "title": "Simple Interest Calculator",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Simple Interest SI = (P * R * T) / 100.",
            "description": "Read principal P, rate R, and time T (integers). Compute and print the integer simple interest using round().",
            "starterCode": "p, r, t = map(int, input().split())\n\n# TODO: Calculate Simple Interest and print round(SI)\n",
            "solutionCode": "p, r, t = map(int, input().split())\nsi = round((p * r * t) / 100)\nprint(si)\n",
            "testCases": [
              {
                "input": "1000 5 2\n",
                "expectedOutput": "100"
              },
              {
                "input": "5000 8 3\n",
                "expectedOutput": "1200"
              }
            ],
            "hints": [
              "round((p * r * t) / 100)"
            ],
            "analogy": "Think of a train track switch or a vending machine dial: You push the button for '+' (Addition), and the track switches instantly to the Addition tunnel without testing all other tunnels one by one.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          }
        ]
      },
      {
        "id": "py_mod_2",
        "title": "Module 2: Conditionals & Logic",
        "summary": "if, elif, else, boolean logic (and, or, not), and truthy/falsy rules.",
        "level": 2,
        "problems": [
          {
            "id": "py_m2_p1",
            "title": "Even or Odd Number Checker",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Use n % 2 == 0 to test evenness.",
            "description": "Read an integer n. Print \"Even\" if even, else \"Odd\".",
            "starterCode": "n = int(input())\n\n# TODO: Check if n is Even or Odd and print result\n",
            "solutionCode": "n = int(input())\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")\n",
            "testCases": [
              {
                "input": "10\n",
                "expectedOutput": "Even"
              },
              {
                "input": "7\n",
                "expectedOutput": "Odd"
              }
            ],
            "hints": [
              "if n % 2 == 0: print(\"Even\")"
            ],
            "analogy": "Imagine you have a bag of candies and you share them equally between 2 friends. If every candy finds a pair with zero leftovers, it's EVEN. If there's 1 lonely candy left over, it's ODD!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m2_p2",
            "title": "Leap Year Detector in Python",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "A year is a leap year if (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0).",
            "description": "Read year. Print \"Leap Year\" or \"Not Leap Year\".",
            "starterCode": "year = int(input())\n\n# TODO: Determine if year is Leap Year\n",
            "solutionCode": "year = int(input())\nif (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0):\n    print(\"Leap Year\")\nelse:\n    print(\"Not Leap Year\")\n",
            "testCases": [
              {
                "input": "2024\n",
                "expectedOutput": "Leap Year"
              },
              {
                "input": "2023\n",
                "expectedOutput": "Not Leap Year"
              }
            ],
            "hints": [
              "Combine conditions with logical or and and."
            ],
            "analogy": "The Earth takes about 365.2422 days to orbit the Sun — not an exact 365 days! That extra fraction of a day adds up, so every 4 years our calendar adds February 29 to keep our seasons from drifting out of sync.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m2_p3",
            "title": "Maximum of Three Numbers",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Find maximum using if-elif statements or max() built-in.",
            "description": "Read three integers a, b, c and print the maximum value.",
            "starterCode": "a, b, c = map(int, input().split())\n\n# TODO: Find and print the maximum value\n",
            "solutionCode": "a, b, c = map(int, input().split())\nprint(max(a, b, c))\n",
            "testCases": [
              {
                "input": "15 42 27\n",
                "expectedOutput": "42"
              },
              {
                "input": "99 100 98\n",
                "expectedOutput": "100"
              }
            ],
            "hints": [
              "max(a, b, c)"
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m2_p4",
            "title": "Grade Calculator (A, B, C, D, F)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Score mapping:\n>= 90: A\n>= 80: B\n>= 70: C\n>= 60: D\nElse: F",
            "description": "Read integer score (0 to 100). Print the corresponding letter grade.",
            "starterCode": "score = int(input())\n\n# TODO: Print corresponding letter grade\n",
            "solutionCode": "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelif score >= 70:\n    print(\"C\")\nelif score >= 60:\n    print(\"D\")\nelse:\n    print(\"F\")\n",
            "testCases": [
              {
                "input": "95\n",
                "expectedOutput": "A"
              },
              {
                "input": "72\n",
                "expectedOutput": "C"
              },
              {
                "input": "45\n",
                "expectedOutput": "F"
              }
            ],
            "hints": [
              "Use elif chain starting from highest score down."
            ],
            "analogy": "Think of a train track switch or a vending machine dial: You push the button for '+' (Addition), and the track switches instantly to the Addition tunnel without testing all other tunnels one by one.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m2_p5",
            "title": "Triangle Validity Checker",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Triangle Inequality Theorem: Three sides form a valid triangle if and only if the sum of any two sides is strictly greater than the third side: a + b > c and a + c > b and b + c > a.",
            "description": "Read three integers a, b, c. Print \"Valid\" if they can form a triangle, otherwise \"Invalid\".",
            "starterCode": "a, b, c = map(int, input().split())\n\n# TODO: Check if a, b, c form a Valid triangle\n",
            "solutionCode": "a, b, c = map(int, input().split())\nif a + b > c and a + c > b and b + c > a:\n    print(\"Valid\")\nelse:\n    print(\"Invalid\")\n",
            "testCases": [
              {
                "input": "3 4 5\n",
                "expectedOutput": "Valid"
              },
              {
                "input": "1 2 10\n",
                "expectedOutput": "Invalid"
              }
            ],
            "hints": [
              "Check all 3 conditions: a + b > c, a + c > b, b + c > a."
            ],
            "analogy": "Imagine three wooden sticks. If one stick is 10 meters long and the other two are only 1 meter each, their tips can never reach each other to close the triangle! Any two sides together must always be longer than the third.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          }
        ]
      },
      {
        "id": "py_mod_3",
        "title": "Module 3: Loops & Number Patterns",
        "summary": "for loops, while loops, range(), break, continue, and pattern generation.",
        "level": 3,
        "problems": [
          {
            "id": "py_m3_p1",
            "title": "Factorial of a Number",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Compute factorial using a for loop with math or range(1, n + 1).",
            "description": "Read integer n (0 <= n <= 15). Print n!.",
            "starterCode": "n = int(input())\n\n# TODO: Calculate and print n!\n",
            "solutionCode": "n = int(input())\nfact = 1\nfor i in range(1, n + 1):\n    fact *= i\nprint(fact)\n",
            "testCases": [
              {
                "input": "5\n",
                "expectedOutput": "120"
              },
              {
                "input": "0\n",
                "expectedOutput": "1"
              }
            ],
            "hints": [
              "Loop over range(1, n + 1)."
            ],
            "analogy": "Imagine you have 5 differently colored books on a shelf. How many different ways can you arrange them? 5 choices for the first slot × 4 for the second × 3 for the third × 2 × 1 = 120 unique arrangements!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m3_p2",
            "title": "Fibonacci Series Generator",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Generate first n terms of Fibonacci sequence: 0, 1, 1, 2, 3, 5, ...",
            "description": "Read integer n (n >= 1). Print the first n Fibonacci numbers separated by spaces.",
            "starterCode": "n = int(input())\n\n# TODO: Generate and print first n Fibonacci numbers separated by spaces\n",
            "solutionCode": "n = int(input())\nfibs = []\na, b = 0, 1\nfor _ in range(n):\n    fibs.append(str(a))\n    a, b = b, a + b\nprint(\" \".join(fibs))\n",
            "testCases": [
              {
                "input": "6\n",
                "expectedOutput": "0 1 1 2 3 5"
              },
              {
                "input": "3\n",
                "expectedOutput": "0 1 1"
              }
            ],
            "hints": [
              "Start with a, b = 0, 1 and update a, b = b, a + b."
            ],
            "analogy": "Nature's favorite pattern! Look at how sunflower seeds or pinecones spiral: each new number is born by adding the previous two numbers together (0, 1, 1, 2, 3, 5, 8, 13...).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m3_p3",
            "title": "Sum of Digits of an Integer",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Sum digits either by converting to string sum(int(d) for d in str(n)) or modulo arithmetic.",
            "description": "Read positive integer n. Calculate and print the sum of its digits.",
            "starterCode": "n = input().strip()\n\n# TODO: Calculate and print the sum of digits of n\n",
            "solutionCode": "n = input().strip()\nprint(sum(int(d) for d in n))\n",
            "testCases": [
              {
                "input": "12345\n",
                "expectedOutput": "15"
              },
              {
                "input": "987\n",
                "expectedOutput": "24"
              }
            ],
            "hints": [
              "sum(int(c) for c in n)"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m3_p4",
            "title": "Prime Number Range Count",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Count how many prime numbers exist between 2 and n inclusive.",
            "description": "Read integer n. Print the count of prime numbers in the range [2, n].",
            "starterCode": "n = int(input())\n\n# TODO: Count and print number of prime numbers in [2, n]\n",
            "solutionCode": "n = int(input())\ndef is_prime(num):\n    if num <= 1: return False\n    i = 2\n    while i * i <= num:\n        if num % i == 0: return False\n        i += 1\n    return True\n\ncount = sum(1 for x in range(2, n + 1) if is_prime(x))\nprint(count)\n",
            "testCases": [
              {
                "input": "10\n",
                "expectedOutput": "4"
              },
              {
                "input": "20\n",
                "expectedOutput": "8"
              }
            ],
            "hints": [
              "Primes up to 10 are 2, 3, 5, 7 (total 4)."
            ],
            "analogy": "Think of prime numbers as the unbreakable 'atomic building blocks' of mathematics. You cannot divide 7 candies into equal smaller groups without cutting candies in half!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m3_p5",
            "title": "Multiplication Table Formatter",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Format lines: f\"{n} x {i} = {n * i}\".",
            "description": "Read integer n. Print the first 5 multiples in format \"n x i = res\" (i from 1 to 5).",
            "starterCode": "n = int(input())\n\n# TODO: Print first 5 multiples formatted as \"n x i = res\"\n",
            "solutionCode": "n = int(input())\nfor i in range(1, 6):\n    print(f\"{n} x {i} = {n * i}\")\n",
            "testCases": [
              {
                "input": "4\n",
                "expectedOutput": "4 x 1 = 4\n4 x 2 = 8\n4 x 3 = 12\n4 x 4 = 16\n4 x 5 = 20"
              }
            ],
            "hints": [
              "for i in range(1, 6): print(f\"{n} x {i} = {n * i}\")"
            ],
            "analogy": "Like marching troops in neat rows: 4 rows of 5 soldiers = 20 soldiers. A loop prints each row step-by-step from 1 to 5.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          }
        ]
      },
      {
        "id": "py_mod_4",
        "title": "Module 4: Lists, Tuples & Comprehensions",
        "summary": "List slicing, sorting, filtering, comprehensions, and rotations.",
        "level": 4,
        "problems": [
          {
            "id": "py_m4_p1",
            "title": "Find Minimum and Maximum in List",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Built-in functions min() and max() return the smallest and largest elements of an iterable.",
            "description": "Read n followed by a list of n integers. Print the minimum on line 1, and the maximum on line 2.",
            "starterCode": "n = int(input())\narr = list(map(int, input().split()))\n\n# TODO: Print min(arr) and max(arr) on separate lines\n",
            "solutionCode": "n = int(input())\narr = list(map(int, input().split()))\nprint(min(arr))\nprint(max(arr))\n",
            "testCases": [
              {
                "input": "5\n12 45 2 89 33\n",
                "expectedOutput": "2\n89"
              },
              {
                "input": "3\n-5 0 10\n",
                "expectedOutput": "-5\n10"
              }
            ],
            "hints": [
              "print(min(arr)) then print(max(arr))"
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m4_p2",
            "title": "Remove Duplicates Preserving Order",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "To eliminate duplicates while maintaining original insertion order, use a set for seen tracking or dict.fromkeys().",
            "description": "Given a space-separated list of integers, remove duplicates while keeping their first appearance order. Print separated by spaces.",
            "starterCode": "arr = input().split()\n\n# TODO: Remove duplicates preserving first appearance order\n",
            "solutionCode": "arr = input().split()\nseen = set()\nres = []\nfor x in arr:\n    if x not in seen:\n        seen.add(x)\n        res.append(x)\nprint(\" \".join(res))\n",
            "testCases": [
              {
                "input": "1 2 2 3 4 4 1 5\n",
                "expectedOutput": "1 2 3 4 5"
              },
              {
                "input": "9 9 9 9\n",
                "expectedOutput": "9"
              }
            ],
            "hints": [
              "Keep a set of seen elements."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m4_p3",
            "title": "List Comprehension: Even Squares",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "List comprehension syntax: [x**2 for x in arr if x % 2 == 0].",
            "description": "Read space-separated integers. Using a list comprehension, extract only even numbers, square them, and print them separated by spaces.",
            "starterCode": "arr = list(map(int, input().split()))\n\n# TODO: Use list comprehension to square even numbers\n",
            "solutionCode": "arr = list(map(int, input().split()))\nres = [x ** 2 for x in arr if x % 2 == 0]\nprint(\" \".join(map(str, res)))\n",
            "testCases": [
              {
                "input": "1 2 3 4 5 6\n",
                "expectedOutput": "4 16 36"
              },
              {
                "input": "7 9 11\n",
                "expectedOutput": ""
              }
            ],
            "hints": [
              "[x**2 for x in arr if x % 2 == 0]"
            ],
            "analogy": "Imagine you have a bag of candies and you share them equally between 2 friends. If every candy finds a pair with zero leftovers, it's EVEN. If there's 1 lonely candy left over, it's ODD!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m4_p4",
            "title": "Rotate List by K Positions",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Python slicing makes list rotation elegant: arr[-k:] + arr[:-k] right rotates by k.",
            "description": "Read list of integers on line 1, and integer k on line 2. Rotate the list to the right by k positions and print.",
            "starterCode": "arr = input().split()\nk = int(input())\n\n# TODO: Right rotate list by k positions using slicing\n",
            "solutionCode": "arr = input().split()\nk = int(input())\nif len(arr) > 0:\n    k = k % len(arr)\n    arr = arr[-k:] + arr[:-k]\nprint(\" \".join(arr))\n",
            "testCases": [
              {
                "input": "1 2 3 4 5\n2\n",
                "expectedOutput": "4 5 1 2 3"
              },
              {
                "input": "10 20 30\n1\n",
                "expectedOutput": "30 10 20"
              }
            ],
            "hints": [
              "k = k % len(arr)",
              "arr[-k:] + arr[:-k]"
            ],
            "analogy": "Think of a carousel or Ferris wheel: Every rider shifts one seat forward. The rider at the very front loops all the way around to the back!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m4_p5",
            "title": "Merge and Sort Two Lists",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Combine lists with + or extend(), and sort with sorted().",
            "description": "Read two lines of space-separated integers. Merge both lists, sort in ascending order, and print separated by spaces.",
            "starterCode": "l1 = list(map(int, input().split()))\nl2 = list(map(int, input().split()))\n\n# TODO: Merge l1 and l2, sort in ascending order, print\n",
            "solutionCode": "l1 = list(map(int, input().split()))\nl2 = list(map(int, input().split()))\nres = sorted(l1 + l2)\nprint(\" \".join(map(str, res)))\n",
            "testCases": [
              {
                "input": "1 5 9\n2 4 8\n",
                "expectedOutput": "1 2 4 5 8 9"
              }
            ],
            "hints": [
              "sorted(l1 + l2)"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          }
        ]
      },
      {
        "id": "py_mod_5",
        "title": "Module 5: Strings, Dictionaries & Functions",
        "summary": "String algorithms, dictionaries, anagrams, and frequency counters.",
        "level": 5,
        "problems": [
          {
            "id": "py_m5_p1",
            "title": "Palindrome Phrase Checker",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Filter string to alphanumeric characters in lowercase: s = \"\".join(c.lower() for c in text if c.isalnum()), then test s == s[::-1].",
            "description": "Read a phrase. Print \"Palindrome\" if it reads the same backwards ignoring non-alphanumeric chars and case, else \"Not Palindrome\".",
            "starterCode": "text = input()\n\n# TODO: Check if text is a palindrome ignoring non-alphanumeric characters and case\n",
            "solutionCode": "text = input()\nclean = \"\".join(c.lower() for c in text if c.isalnum())\nif clean == clean[::-1]:\n    print(\"Palindrome\")\nelse:\n    print(\"Not Palindrome\")\n",
            "testCases": [
              {
                "input": "A man, a plan, a canal: Panama\n",
                "expectedOutput": "Palindrome"
              },
              {
                "input": "race a car\n",
                "expectedOutput": "Not Palindrome"
              }
            ],
            "hints": [
              "Use [::-1] for reversal."
            ],
            "analogy": "Hold a word or number up to a mirror. If the reflection in the mirror reads character-for-character identical to the original (like 'RACECAR' or '1221'), it's a Palindrome!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m5_p2",
            "title": "Word Frequency Counter",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Use a dictionary or collections.Counter to count occurrences of each word.",
            "description": "Read a sentence of words. Count occurrences of each word and print in alphabetical order: \"word: count\".",
            "starterCode": "words = input().split()\n\n# TODO: Count word frequencies and print sorted alphabetically as \"word: count\"\n",
            "solutionCode": "words = input().split()\nfreq = {}\nfor w in words:\n    freq[w] = freq.get(w, 0) + 1\nfor w in sorted(freq.keys()):\n    print(f\"{w}: {freq[w]}\")\n",
            "testCases": [
              {
                "input": "apple banana apple cherry banana apple\n",
                "expectedOutput": "apple: 3\nbanana: 2\ncherry: 1"
              }
            ],
            "hints": [
              "Use freq.get(w, 0) + 1 and sorted(freq.keys())."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m5_p3",
            "title": "Anagram Checker in Python",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Two words are anagrams if sorting their characters yields the same sequence (sorted(s1) == sorted(s2)).",
            "description": "Read two space-separated words. Print \"Anagram\" if they are anagrams, or \"Not Anagram\" otherwise.",
            "starterCode": "w1, w2 = input().split()\n\n# TODO: Check if w1 and w2 are anagrams\n",
            "solutionCode": "w1, w2 = input().split()\nif sorted(w1) == sorted(w2):\n    print(\"Anagram\")\nelse:\n    print(\"Not Anagram\")\n",
            "testCases": [
              {
                "input": "listen silent\n",
                "expectedOutput": "Anagram"
              },
              {
                "input": "hello world\n",
                "expectedOutput": "Not Anagram"
              }
            ],
            "hints": [
              "Compare sorted(w1) == sorted(w2)."
            ],
            "analogy": "Scrabble tiles! If you take the letter tiles for 'LISTEN' and rearrange them on the table, they spell 'SILENT' using the exact same tile count.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m5_p4",
            "title": "Count Vowels and Consonants in Python",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Iterate characters checking c in \"aeiou\".",
            "description": "Read lowercase word. Print vowels on line 1 and consonants on line 2.",
            "starterCode": "word = input().strip()\n\n# TODO: Count and print vowels and consonants on separate lines\n",
            "solutionCode": "word = input().strip()\nvowels = sum(1 for c in word if c in 'aeiou')\nconsonants = sum(1 for c in word if c.isalpha() and c not in 'aeiou')\nprint(vowels)\nprint(consonants)\n",
            "testCases": [
              {
                "input": "algorithm\n",
                "expectedOutput": "3\n6"
              }
            ],
            "hints": [
              "c in \"aeiou\""
            ],
            "analogy": "Vowels (A, E, I, O, U) are the open-mouthed vocal cords of human speech. Imagine filtering pebbles from sand: each character passes through a filter that rings a bell whenever a vowel appears.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          },
          {
            "id": "py_m5_p5",
            "title": "Recursive Sum of a List",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Recursive function sum_list(lst): return 0 if not lst else lst[0] + sum_list(lst[1:]).",
            "description": "Read space-separated integers. Compute their sum using a recursive function.",
            "starterCode": "def rec_sum(arr):\n    # TODO: Implement recursive sum\n    pass\n\nnumbers = list(map(int, input().split()))\nprint(rec_sum(numbers))\n",
            "solutionCode": "def rec_sum(arr):\n    if not arr:\n        return 0\n    return arr[0] + rec_sum(arr[1:])\n\nnumbers = list(map(int, input().split()))\nprint(rec_sum(numbers))\n",
            "testCases": [
              {
                "input": "1 2 3 4 5\n",
                "expectedOutput": "15"
              },
              {
                "input": "10 20 30\n",
                "expectedOutput": "60"
              }
            ],
            "hints": [
              "Base case: if not arr: return 0."
            ],
            "analogy": "Russian Nesting Dolls (Matryoshka)! You open a large doll to find a slightly smaller doll inside. You keep opening dolls until you find the tiny solid baby doll at the center (Base Case), then close them back up.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Python, input() always reads text (strings)! Remember to wrap it with int(input()) when dealing with numbers, and watch indentation."
          }
        ]
      }
    ]
  },
  "cpp": {
    "languageId": "cpp",
    "languageName": "C++",
    "color": "#f34b7d",
    "accentColor": "#f34b7d",
    "badge": "C++20 (GCC)",
    "description": "Learn modern competitive C++, STL containers (vector, map, set), algorithms, and templates.",
    "modules": [
      {
        "id": "cpp_mod_1",
        "title": "Module 1: Modern C++ & Fast I/O",
        "summary": "std::cin, std::cout, references (&), type casting, and fast I/O.",
        "level": 1,
        "problems": [
          {
            "id": "cpp_m1_p1",
            "title": "Fast I/O & Basic Arithmetic",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Modern C++ uses std::cin and std::cout from <iostream>. Adding ios_base::sync_with_stdio(false); cin.tie(NULL); optimizes I/O performance.",
            "description": "Read two integers a and b. Print their sum, difference, and product on separate lines.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        // TODO: Print sum, difference, product on separate lines\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << a + b << \"\\n\";\n        cout << a - b << \"\\n\";\n        cout << a * b << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "10 4\n",
                "expectedOutput": "14\n6\n40"
              },
              {
                "input": "25 5\n",
                "expectedOutput": "30\n20\n125"
              }
            ],
            "hints": [
              "Use cout << a + b << \"\\n\";"
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m1_p2",
            "title": "Swap by Reference in C++",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "In C++, passing by reference using void swapVals(int &x, int &y) allows direct modification of arguments without explicit pointer syntax.",
            "description": "Implement a function void swapVals(int &a, int &b) and print the swapped values.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nvoid swapVals(int &a, int &b) {\n    // TODO: Swap a and b using references\n    \n}\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        swapVals(a, b);\n        cout << a << \" \" << b << \"\\n\";\n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nvoid swapVals(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        swapVals(a, b);\n        cout << a << \" \" << b << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "100 200\n",
                "expectedOutput": "200 100"
              },
              {
                "input": "5 9\n",
                "expectedOutput": "9 5"
              }
            ],
            "hints": [
              "int temp = a; a = b; b = temp;"
            ],
            "analogy": "Imagine you have a glass of blue juice in your left hand and green juice in your right hand. To swap them without an extra glass or spilling, you combine their quantities mathematically, then separate them step by step!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m1_p3",
            "title": "Formatted Precision with std::setprecision",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "#include <iomanip> provides std::fixed and std::setprecision(n) to format floating-point output to exact decimal places.",
            "description": "Read two integers a and b. Print the float division result a / b rounded to exactly 2 decimal places.",
            "starterCode": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        // TODO: Print float division result (double)a / b to 2 decimal places\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << fixed << setprecision(2) << (double)a / b << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "10 3\n",
                "expectedOutput": "3.33"
              },
              {
                "input": "7 2\n",
                "expectedOutput": "3.50"
              }
            ],
            "hints": [
              "cout << fixed << setprecision(2) << (double)a / b;"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m1_p4",
            "title": "Min & Max Using std::min and std::max",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "<algorithm> provides std::min({a, b, c}) and std::max({a, b, c}) which accept initializer lists.",
            "description": "Read three integers. Print the minimum on line 1 and maximum on line 2 using std::min and std::max.",
            "starterCode": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Print min and max using std::min and std::max\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    if (cin >> a >> b >> c) {\n        cout << min({a, b, c}) << \"\\n\";\n        cout << max({a, b, c}) << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "45 12 88\n",
                "expectedOutput": "12\n88"
              },
              {
                "input": "9 9 9\n",
                "expectedOutput": "9\n9"
              }
            ],
            "hints": [
              "min({a, b, c}) and max({a, b, c})"
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m1_p5",
            "title": "Bitwise Operators in C++",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Bitwise operators: & (AND), | (OR), and ^ (XOR).",
            "description": "Read two integers a and b. Print a & b, a | b, and a ^ b on separate lines.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        // TODO: Compute and print a & b, a | b, and a ^ b on separate lines\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (cin >> a >> b) {\n        cout << (a & b) << \"\\n\";\n        cout << (a | b) << \"\\n\";\n        cout << (a ^ b) << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "12 25\n",
                "expectedOutput": "8\n29\n21"
              }
            ],
            "hints": [
              "Bitwise operations take place at the bit level."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          }
        ]
      },
      {
        "id": "cpp_mod_2",
        "title": "Module 2: Conditionals & Flow Control",
        "summary": "if-else, ternary operator, switch-case, and quadrant detection.",
        "level": 2,
        "problems": [
          {
            "id": "cpp_m2_p1",
            "title": "Quadrant Finder of Point (X, Y)",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Given 2D coordinates (x, y):\nQ1: x > 0, y > 0\nQ2: x < 0, y > 0\nQ3: x < 0, y < 0\nQ4: x > 0, y < 0\nOrigin: x == 0 && y == 0.",
            "description": "Read non-zero integers x and y. Print \"Q1\", \"Q2\", \"Q3\", or \"Q4\".",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, y;\n    if (cin >> x >> y) {\n        // TODO: Determine quadrant Q1, Q2, Q3, or Q4\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, y;\n    if (cin >> x >> y) {\n        if (x > 0 && y > 0) cout << \"Q1\\n\";\n        else if (x < 0 && y > 0) cout << \"Q2\\n\";\n        else if (x < 0 && y < 0) cout << \"Q3\\n\";\n        else cout << \"Q4\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5 3\n",
                "expectedOutput": "Q1"
              },
              {
                "input": "-4 7\n",
                "expectedOutput": "Q2"
              },
              {
                "input": "-2 -8\n",
                "expectedOutput": "Q3"
              },
              {
                "input": "6 -1\n",
                "expectedOutput": "Q4"
              }
            ],
            "hints": [
              "Check signs of x and y."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m2_p2",
            "title": "Leap Year Checker in C++",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Year is leap if (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0).",
            "description": "Read year. Print \"Leap Year\" or \"Not Leap Year\".",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int y;\n    if (cin >> y) {\n        // TODO: Check if year is Leap Year\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int y;\n    if (cin >> y) {\n        if ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)) {\n            cout << \"Leap Year\\n\";\n        } else {\n            cout << \"Not Leap Year\\n\";\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "2024\n",
                "expectedOutput": "Leap Year"
              },
              {
                "input": "2021\n",
                "expectedOutput": "Not Leap Year"
              }
            ],
            "hints": [
              "(y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)"
            ],
            "analogy": "The Earth takes about 365.2422 days to orbit the Sun — not an exact 365 days! That extra fraction of a day adds up, so every 4 years our calendar adds February 29 to keep our seasons from drifting out of sync.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m2_p3",
            "title": "Ternary Operator Even / Odd",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "The ternary operator (condition ? val_true : val_false) provides concise conditional evaluation.",
            "description": "Read integer n. Print \"Even\" or \"Odd\" using the ternary operator.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Use ternary operator to print \"Even\" or \"Odd\"\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        cout << (n % 2 == 0 ? \"Even\" : \"Odd\") << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "44\n",
                "expectedOutput": "Even"
              },
              {
                "input": "91\n",
                "expectedOutput": "Odd"
              }
            ],
            "hints": [
              "cout << (n % 2 == 0 ? \"Even\" : \"Odd\");"
            ],
            "analogy": "Imagine you have a bag of candies and you share them equally between 2 friends. If every candy finds a pair with zero leftovers, it's EVEN. If there's 1 lonely candy left over, it's ODD!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m2_p4",
            "title": "Simple Calculator with Switch",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Use switch(op) to evaluate +, -, *, /.",
            "description": "Read an expression: a op b. Print the integer result.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    char op;\n    if (cin >> a >> op >> b) {\n        // TODO: Compute and print result using switch\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    char op;\n    if (cin >> a >> op >> b) {\n        switch (op) {\n            case '+': cout << a + b << \"\\n\"; break;\n            case '-': cout << a - b << \"\\n\"; break;\n            case '*': cout << a * b << \"\\n\"; break;\n            case '/': cout << a / b << \"\\n\"; break;\n        }\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "12 + 18\n",
                "expectedOutput": "30"
              },
              {
                "input": "40 / 5\n",
                "expectedOutput": "8"
              }
            ],
            "hints": [
              "Switch on op character."
            ],
            "analogy": "Think of a train track switch or a vending machine dial: You push the button for '+' (Addition), and the track switches instantly to the Addition tunnel without testing all other tunnels one by one.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m2_p5",
            "title": "Age Category Classifier",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Age mapping:\n< 13: Child\n13 - 19: Teen\n20 - 64: Adult\n>= 65: Senior",
            "description": "Read an integer age. Print \"Child\", \"Teen\", \"Adult\", or \"Senior\".",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    if (cin >> age) {\n        // TODO: Classify age into Child, Teen, Adult, Senior\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age;\n    if (cin >> age) {\n        if (age < 13) cout << \"Child\\n\";\n        else if (age <= 19) cout << \"Teen\\n\";\n        else if (age <= 64) cout << \"Adult\\n\";\n        else cout << \"Senior\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "10\n",
                "expectedOutput": "Child"
              },
              {
                "input": "16\n",
                "expectedOutput": "Teen"
              },
              {
                "input": "25\n",
                "expectedOutput": "Adult"
              },
              {
                "input": "70\n",
                "expectedOutput": "Senior"
              }
            ],
            "hints": [
              "Use an if-else chain."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          }
        ]
      },
      {
        "id": "cpp_mod_3",
        "title": "Module 3: Loops & Series",
        "summary": "for, while, digit algorithms, Collatz sequence, and Armstrong numbers.",
        "level": 3,
        "problems": [
          {
            "id": "cpp_m3_p1",
            "title": "Sum of First N Natural Numbers",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Sum = n * (n + 1) / 2 or using a for loop.",
            "description": "Read integer n. Print the sum of integers from 1 to n.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Compute and print sum from 1 to n\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        cout << n * (n + 1) / 2 << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "10\n",
                "expectedOutput": "55"
              },
              {
                "input": "100\n",
                "expectedOutput": "5050"
              }
            ],
            "hints": [
              "Formula: n * (n + 1) / 2"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m3_p2",
            "title": "Reverse Digits of an Integer",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Reverse an integer using while (n > 0): rev = rev * 10 + (n % 10); n /= 10.",
            "description": "Read positive integer n. Reverse its digits and print the reversed number.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Reverse digits of n and print\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        int rev = 0;\n        while (n > 0) {\n            rev = rev * 10 + (n % 10);\n            n /= 10;\n        }\n        cout << rev << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "1234\n",
                "expectedOutput": "4321"
              },
              {
                "input": "9080\n",
                "expectedOutput": "809"
              }
            ],
            "hints": [
              "rev = rev * 10 + (n % 10); n /= 10;"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m3_p3",
            "title": "Check Armstrong Number",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "A 3-digit number is an Armstrong number if the sum of cubes of its digits equals the number itself (e.g. 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153).",
            "description": "Read a 3-digit positive integer n. Print \"Armstrong\" if it is an Armstrong number, or \"Not Armstrong\" otherwise.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Check if n is an Armstrong number\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        int original = n;\n        int sum = 0;\n        while (n > 0) {\n            int d = n % 10;\n            sum += (d * d * d);\n            n /= 10;\n        }\n        if (sum == original) cout << \"Armstrong\\n\";\n        else cout << \"Not Armstrong\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "153\n",
                "expectedOutput": "Armstrong"
              },
              {
                "input": "370\n",
                "expectedOutput": "Armstrong"
              },
              {
                "input": "123\n",
                "expectedOutput": "Not Armstrong"
              }
            ],
            "hints": [
              "Calculate sum of cubes of each digit."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m3_p4",
            "title": "Prime Number Verifier in C++",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Check divisibility from 2 up to sqrt(n).",
            "description": "Read integer n. Print \"Prime\" or \"Not Prime\".",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Determine if n is Prime\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        if (n <= 1) {\n            cout << \"Not Prime\\n\";\n            return 0;\n        }\n        bool isPrime = true;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                isPrime = false;\n                break;\n            }\n        }\n        cout << (isPrime ? \"Prime\" : \"Not Prime\") << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "17\n",
                "expectedOutput": "Prime"
              },
              {
                "input": "1\n",
                "expectedOutput": "Not Prime"
              },
              {
                "input": "25\n",
                "expectedOutput": "Not Prime"
              }
            ],
            "hints": [
              "Loop i * i <= n."
            ],
            "analogy": "Think of prime numbers as the unbreakable 'atomic building blocks' of mathematics. You cannot divide 7 candies into equal smaller groups without cutting candies in half!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m3_p5",
            "title": "Collatz Conjecture Steps",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Start with integer n:\nIf n is even: n = n / 2\nIf n is odd: n = 3 * n + 1\nRepeat until n becomes 1. Count the number of steps.",
            "description": "Read integer n (n >= 1). Count and print the total number of steps required to reach 1.",
            "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Count and print Collatz steps until n == 1\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        int steps = 0;\n        while (n > 1) {\n            if (n % 2 == 0) n /= 2;\n            else n = 3 * n + 1;\n            steps++;\n        }\n        cout << steps << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "6\n",
                "expectedOutput": "8"
              },
              {
                "input": "1\n",
                "expectedOutput": "0"
              },
              {
                "input": "11\n",
                "expectedOutput": "14"
              }
            ],
            "hints": [
              "While n > 1, update n and increment steps."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          }
        ]
      },
      {
        "id": "cpp_mod_4",
        "title": "Module 4: Vectors & STL Algorithms",
        "summary": "std::vector, std::sort, std::reverse, std::count, and std::unique.",
        "level": 4,
        "problems": [
          {
            "id": "cpp_m4_p1",
            "title": "Vector Sorting (Ascending & Descending)",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "std::sort(v.begin(), v.end()) sorts ascending. std::sort(v.rbegin(), v.rend()) sorts descending.",
            "description": "Read n followed by n integers into a std::vector. Print the vector sorted ascending on line 1, and descending on line 2.",
            "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        \n        // TODO: Sort ascending and print, then sort descending and print\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        sort(v.begin(), v.end());\n        for (int i = 0; i < n; i++) cout << v[i] << (i == n - 1 ? \"\" : \" \");\n        cout << \"\\n\";\n        sort(v.rbegin(), v.rend());\n        for (int i = 0; i < n; i++) cout << v[i] << (i == n - 1 ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n5 2 9 1 6\n",
                "expectedOutput": "1 2 5 6 9\n9 6 5 2 1"
              }
            ],
            "hints": [
              "sort(v.begin(), v.end()) and sort(v.rbegin(), v.rend())"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m4_p2",
            "title": "Reverse Vector with std::reverse",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "std::reverse(v.begin(), v.end()) reverses the elements in linear time.",
            "description": "Read n followed by n integers. Reverse the vector and print separated by spaces.",
            "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        \n        // TODO: Reverse v using std::reverse and print\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        reverse(v.begin(), v.end());\n        for (int i = 0; i < n; i++) cout << v[i] << (i == n - 1 ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "4\n10 20 30 40\n",
                "expectedOutput": "40 30 20 10"
              }
            ],
            "hints": [
              "reverse(v.begin(), v.end());"
            ],
            "analogy": "Picture two people standing at opposite ends of a row of parked cars. Person A and Person B swap cars, take one step inward toward each other, swap the next cars, until they meet in the middle.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m4_p3",
            "title": "Count Element Frequency with std::count",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "std::count(v.begin(), v.end(), target) returns how many times target appears in the range.",
            "description": "Read n followed by n integers, and target integer x. Print the frequency of x in the vector.",
            "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        int x;\n        cin >> x;\n        \n        // TODO: Count and print occurrences of x in v\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        int x;\n        cin >> x;\n        cout << count(v.begin(), v.end(), x) << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "6\n1 2 3 2 4 2\n2\n",
                "expectedOutput": "3"
              },
              {
                "input": "4\n5 5 5 5\n7\n",
                "expectedOutput": "0"
              }
            ],
            "hints": [
              "count(v.begin(), v.end(), x)"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m4_p4",
            "title": "Remove Consecutive Duplicates with std::unique",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "std::unique moves duplicate elements to the end. Combine with v.erase() to resize the vector.",
            "description": "Read a sorted vector of n integers. Remove duplicates using std::unique and print the unique elements separated by spaces.",
            "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        \n        // TODO: Remove consecutive duplicates using std::unique\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        auto it = unique(v.begin(), v.end());\n        v.erase(it, v.end());\n        for (size_t i = 0; i < v.size(); i++) cout << v[i] << (i == v.size() - 1 ? \"\" : \" \");\n        cout << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "7\n1 1 2 2 3 4 4\n",
                "expectedOutput": "1 2 3 4"
              }
            ],
            "hints": [
              "v.erase(unique(v.begin(), v.end()), v.end());"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m4_p5",
            "title": "Find Second Largest in Vector",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Maintain max1 and max2 while iterating or sort unique elements.",
            "description": "Read n followed by n distinct integers. Find and print the second largest element.",
            "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        \n        // TODO: Find and print the second largest element\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        sort(v.begin(), v.end());\n        cout << v[n - 2] << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n10 40 20 50 30\n",
                "expectedOutput": "40"
              }
            ],
            "hints": [
              "Since elements are distinct, sort and access v[n - 2]."
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          }
        ]
      },
      {
        "id": "cpp_mod_5",
        "title": "Module 5: Modern Strings & Functions",
        "summary": "std::string operations, palindromes, anagrams, pangrams, and binary search.",
        "level": 5,
        "problems": [
          {
            "id": "cpp_m5_p1",
            "title": "String Palindrome Checker in C++",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "In C++, compare string s with a reversed copy using std::reverse.",
            "description": "Read a word. Print \"Palindrome\" or \"Not Palindrome\".",
            "starterCode": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // TODO: Check if s is a palindrome\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        string rev = s;\n        reverse(rev.begin(), rev.end());\n        if (s == rev) cout << \"Palindrome\\n\";\n        else cout << \"Not Palindrome\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "racecar\n",
                "expectedOutput": "Palindrome"
              },
              {
                "input": "antigravity\n",
                "expectedOutput": "Not Palindrome"
              }
            ],
            "hints": [
              "string rev = s; reverse(rev.begin(), rev.end());"
            ],
            "analogy": "Hold a word or number up to a mirror. If the reflection in the mirror reads character-for-character identical to the original (like 'RACECAR' or '1221'), it's a Palindrome!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m5_p2",
            "title": "Check Anagrams with std::sort",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Sort both strings; if equal, they are anagrams.",
            "description": "Read two words. Print \"Anagram\" if they are anagrams, or \"Not Anagram\" otherwise.",
            "starterCode": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s1, s2;\n    if (cin >> s1 >> s2) {\n        // TODO: Check if s1 and s2 are anagrams\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s1, s2;\n    if (cin >> s1 >> s2) {\n        sort(s1.begin(), s1.end());\n        sort(s2.begin(), s2.end());\n        if (s1 == s2) cout << \"Anagram\\n\";\n        else cout << \"Not Anagram\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "triangle integral\n",
                "expectedOutput": "Anagram"
              },
              {
                "input": "apple orange\n",
                "expectedOutput": "Not Anagram"
              }
            ],
            "hints": [
              "sort both strings and compare with ==."
            ],
            "analogy": "Scrabble tiles! If you take the letter tiles for 'LISTEN' and rearrange them on the table, they spell 'SILENT' using the exact same tile count.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m5_p3",
            "title": "Binary Search with std::binary_search",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "std::binary_search(v.begin(), v.end(), val) returns true if val is present in a sorted vector.",
            "description": "Read n followed by n sorted integers, and target x. Print \"Found\" or \"Not Found\".",
            "starterCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        int x;\n        cin >> x;\n        \n        // TODO: Use std::binary_search to find x\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> v(n);\n        for (int i = 0; i < n; i++) cin >> v[i];\n        int x;\n        cin >> x;\n        if (binary_search(v.begin(), v.end(), x)) cout << \"Found\\n\";\n        else cout << \"Not Found\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "5\n10 20 30 40 50\n30\n",
                "expectedOutput": "Found"
              },
              {
                "input": "4\n2 4 6 8\n5\n",
                "expectedOutput": "Not Found"
              }
            ],
            "hints": [
              "binary_search(v.begin(), v.end(), x)"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m5_p4",
            "title": "Count Vowels and Consonants in C++",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Iterate characters checking c == 'a' || c == 'e' ...",
            "description": "Read a lowercase word. Print vowels on line 1 and consonants on line 2.",
            "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // TODO: Count vowels and consonants\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        int v = 0, c = 0;\n        for (char ch : s) {\n            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') v++;\n            else if (ch >= 'a' && ch <= 'z') c++;\n        }\n        cout << v << \"\\n\" << c << \"\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "developer\n",
                "expectedOutput": "4\n5"
              }
            ],
            "hints": [
              "Check each character against vowels."
            ],
            "analogy": "Vowels (A, E, I, O, U) are the open-mouthed vocal cords of human speech. Imagine filtering pebbles from sand: each character passes through a filter that rings a bell whenever a vowel appears.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          },
          {
            "id": "cpp_m5_p5",
            "title": "Check Pangram (Contains Every English Letter)",
            "difficulty": "Medium",
            "xp": 50,
            "concept": "A string is a pangram if it contains every letter from a to z at least once.",
            "description": "Read a lowercase single-word or string. Print \"Pangram\" if it contains all 26 English letters, else \"Not Pangram\".",
            "starterCode": "#include <iostream>\n#include <string>\n#include <set>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // TODO: Check if s contains all 26 letters\n        \n    }\n    return 0;\n}\n",
            "solutionCode": "#include <iostream>\n#include <string>\n#include <set>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        set<char> letters;\n        for (char ch : s) {\n            if (ch >= 'a' && ch <= 'z') letters.insert(ch);\n        }\n        if (letters.size() == 26) cout << \"Pangram\\n\";\n        else cout << \"Not Pangram\\n\";\n    }\n    return 0;\n}\n",
            "testCases": [
              {
                "input": "abcdefghijklmnopqrstuvwxyz\n",
                "expectedOutput": "Pangram"
              },
              {
                "input": "antigravity\n",
                "expectedOutput": "Not Pangram"
              }
            ],
            "hints": [
              "Insert characters into a set and check if size() == 26."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "Don't confuse '=' (storing a value) with '==' (checking if two values are equal). Also, make sure arrays don't go out of bounds."
          }
        ]
      }
    ]
  },
  "java": {
    "languageId": "java",
    "languageName": "Java",
    "color": "#b07219",
    "accentColor": "#58a6ff",
    "badge": "OpenJDK 21",
    "description": "Learn object-oriented enterprise Java, classes, collections, stream APIs, and standard input/output.",
    "modules": [
      {
        "id": "java_mod_1",
        "title": "Module 1: Java Basics & Scanner I/O",
        "summary": "Class Main, public static void main, Scanner, and arithmetic operations.",
        "level": 1,
        "problems": [
          {
            "id": "java_m1_p1",
            "title": "Scanner Sum and Average",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Java uses java.util.Scanner for reading input. Every program defines a class with public static void main(String[] args).",
            "description": "Read two integers a and b. Print their sum on the first line and integer average (a + b) / 2 on the second line.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            // TODO: Print sum on line 1, integer average on line 2\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.println(a + b);\n            System.out.println((a + b) / 2);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "10 20\n",
                "expectedOutput": "30\n15"
              },
              {
                "input": "8 4\n",
                "expectedOutput": "12\n6"
              }
            ],
            "hints": [
              "System.out.println(a + b);"
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m1_p2",
            "title": "Swap Two Variables Without Temp",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Swap using arithmetic: a = a + b; b = a - b; a = a - b;",
            "description": "Read two integers a and b. Swap their values and print them separated by a space.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            // TODO: Swap a and b without using a third variable\n            \n            System.out.println(a + \" \" + b);\n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            a = a + b;\n            b = a - b;\n            a = a - b;\n            System.out.println(a + \" \" + b);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "7 14\n",
                "expectedOutput": "14 7"
              }
            ],
            "hints": [
              "a = a + b; b = a - b; a = a - b;"
            ],
            "analogy": "Imagine you have a glass of blue juice in your left hand and green juice in your right hand. To swap them without an extra glass or spilling, you combine their quantities mathematically, then separate them step by step!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m1_p3",
            "title": "Fahrenheit to Celsius Converter",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Formula: C = (F - 32) * 5 / 9.",
            "description": "Read integer temperature in Fahrenheit. Print the integer Celsius value.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int f = sc.nextInt();\n            // TODO: Convert to Celsius and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int f = sc.nextInt();\n            int c = (f - 32) * 5 / 9;\n            System.out.println(c);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "212\n",
                "expectedOutput": "100"
              },
              {
                "input": "32\n",
                "expectedOutput": "0"
              }
            ],
            "hints": [
              "(f - 32) * 5 / 9"
            ],
            "analogy": "Like a dual-scale outdoor thermometer: Celsius measures water freezing at 0° and boiling at 100°, while Fahrenheit measures freezing at 32° and boiling at 212°. The formula is just a mathematical gear translating between the two rulers!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m1_p4",
            "title": "Rectangle Area and Perimeter",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Area = L * W; Perimeter = 2 * (L + W).",
            "description": "Read length and width. Print Area on line 1 and Perimeter on line 2.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int l = sc.nextInt();\n            int w = sc.nextInt();\n            // TODO: Print Area and Perimeter\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int l = sc.nextInt();\n            int w = sc.nextInt();\n            System.out.println(l * w);\n            System.out.println(2 * (l + w));\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "10 5\n",
                "expectedOutput": "50\n30"
              }
            ],
            "hints": [
              "System.out.println(l * w);"
            ],
            "analogy": "Imagine laying floor tiles in your bedroom. The Area is how many square tiles fit on the whole floor, while the Perimeter is how many footsteps it takes to walk along the walls around the whole room.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m1_p5",
            "title": "Extract Last Digit of a Number",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Modulo by 10 (n % 10) retrieves the units digit.",
            "description": "Read an integer n. Print its last digit.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            // TODO: Print last digit\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            System.out.println(Math.abs(n) % 10);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "987\n",
                "expectedOutput": "7"
              },
              {
                "input": "40\n",
                "expectedOutput": "0"
              }
            ],
            "hints": [
              "n % 10"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          }
        ]
      },
      {
        "id": "java_mod_2",
        "title": "Module 2: Conditionals & Decisions",
        "summary": "if-else chains, switch statements, and logical operators.",
        "level": 2,
        "problems": [
          {
            "id": "java_m2_p1",
            "title": "Positive, Negative or Zero",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Compare n > 0, n < 0, or n == 0.",
            "description": "Read an integer n. Print \"Positive\", \"Negative\", or \"Zero\".",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            // TODO: Determine if n is Positive, Negative, or Zero\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            if (n > 0) System.out.println(\"Positive\");\n            else if (n < 0) System.out.println(\"Negative\");\n            else System.out.println(\"Zero\");\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "15\n",
                "expectedOutput": "Positive"
              },
              {
                "input": "-7\n",
                "expectedOutput": "Negative"
              },
              {
                "input": "0\n",
                "expectedOutput": "Zero"
              }
            ],
            "hints": [
              "if (n > 0) ... else if (n < 0) ..."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m2_p2",
            "title": "Leap Year Detector in Java",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "(year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)",
            "description": "Read year. Print \"Leap Year\" or \"Not Leap Year\".",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int year = sc.nextInt();\n            // TODO: Check Leap Year\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int year = sc.nextInt();\n            if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n                System.out.println(\"Leap Year\");\n            } else {\n                System.out.println(\"Not Leap Year\");\n            }\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "2024\n",
                "expectedOutput": "Leap Year"
              },
              {
                "input": "2100\n",
                "expectedOutput": "Not Leap Year"
              }
            ],
            "hints": [
              "Combine conditions with || and &&."
            ],
            "analogy": "The Earth takes about 365.2422 days to orbit the Sun — not an exact 365 days! That extra fraction of a day adds up, so every 4 years our calendar adds February 29 to keep our seasons from drifting out of sync.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m2_p3",
            "title": "Greatest of Three Numbers",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Use Math.max(a, Math.max(b, c)).",
            "description": "Read three integers and print the largest value.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            int c = sc.nextInt();\n            // TODO: Find and print maximum value\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            int c = sc.nextInt();\n            System.out.println(Math.max(a, Math.max(b, c)));\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "12 85 45\n",
                "expectedOutput": "85"
              },
              {
                "input": "9 9 9\n",
                "expectedOutput": "9"
              }
            ],
            "hints": [
              "Math.max(a, Math.max(b, c))"
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m2_p4",
            "title": "Grade Classifier in Java",
            "difficulty": "Easy",
            "xp": 35,
            "concept": ">= 90: A, >= 80: B, >= 70: C, >= 60: D, else F.",
            "description": "Read score (0 to 100). Print grade letter.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int score = sc.nextInt();\n            // TODO: Print grade\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int score = sc.nextInt();\n            if (score >= 90) System.out.println(\"A\");\n            else if (score >= 80) System.out.println(\"B\");\n            else if (score >= 70) System.out.println(\"C\");\n            else if (score >= 60) System.out.println(\"D\");\n            else System.out.println(\"F\");\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "88\n",
                "expectedOutput": "B"
              },
              {
                "input": "55\n",
                "expectedOutput": "F"
              }
            ],
            "hints": [
              "if-else ladder."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m2_p5",
            "title": "Days in Month Switch",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Months 1, 3, 5, 7, 8, 10, 12 have 31 days. Months 4, 6, 9, 11 have 30 days. Month 2 has 28 days.",
            "description": "Read month number (1 to 12). Print number of days in that month.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int month = sc.nextInt();\n            // TODO: Print days in month using switch\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int month = sc.nextInt();\n            switch (month) {\n                case 1: case 3: case 5: case 7: case 8: case 10: case 12:\n                    System.out.println(31);\n                    break;\n                case 4: case 6: case 9: case 11:\n                    System.out.println(30);\n                    break;\n                case 2:\n                    System.out.println(28);\n                    break;\n            }\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "2\n",
                "expectedOutput": "28"
              },
              {
                "input": "7\n",
                "expectedOutput": "31"
              },
              {
                "input": "4\n",
                "expectedOutput": "30"
              }
            ],
            "hints": [
              "Use fall-through cases in switch."
            ],
            "analogy": "Think of a train track switch or a vending machine dial: You push the button for '+' (Addition), and the track switches instantly to the Addition tunnel without testing all other tunnels one by one.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          }
        ]
      },
      {
        "id": "java_mod_3",
        "title": "Module 3: Loops & Iteration",
        "summary": "for loop, while loop, factorials, digit sums, and prime checks.",
        "level": 3,
        "problems": [
          {
            "id": "java_m3_p1",
            "title": "Factorial of a Number in Java",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Loop from 1 to n multiplying result.",
            "description": "Read integer n. Print n!.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            // TODO: Compute and print n!\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long fact = 1;\n            for (int i = 1; i <= n; i++) fact *= i;\n            System.out.println(fact);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "5\n",
                "expectedOutput": "120"
              },
              {
                "input": "0\n",
                "expectedOutput": "1"
              }
            ],
            "hints": [
              "fact *= i in loop."
            ],
            "analogy": "Imagine you have 5 differently colored books on a shelf. How many different ways can you arrange them? 5 choices for the first slot × 4 for the second × 3 for the third × 2 × 1 = 120 unique arrangements!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m3_p2",
            "title": "Sum of First N Natural Numbers in Java",
            "difficulty": "Easy",
            "xp": 30,
            "concept": "Sum = (long)n * (n + 1) / 2.",
            "description": "Read n. Print sum of numbers from 1 to n.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            long n = sc.nextLong();\n            // TODO: Print sum from 1 to n\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            System.out.println(n * (n + 1) / 2);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "10\n",
                "expectedOutput": "55"
              }
            ],
            "hints": [
              "n * (n + 1) / 2"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m3_p3",
            "title": "Reverse an Integer in Java",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "rev = rev * 10 + (n % 10); n /= 10.",
            "description": "Read integer n. Print the reversed number.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            // TODO: Reverse integer and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int rev = 0;\n            while (n > 0) {\n                rev = rev * 10 + (n % 10);\n                n /= 10;\n            }\n            System.out.println(rev);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "12345\n",
                "expectedOutput": "54321"
              }
            ],
            "hints": [
              "rev = rev * 10 + (n % 10);"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m3_p4",
            "title": "Check Prime in Java",
            "difficulty": "Medium",
            "xp": 40,
            "concept": "Check divisors from 2 to sqrt(n).",
            "description": "Read integer n. Print \"Prime\" or \"Not Prime\".",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            // TODO: Check if n is Prime\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            if (n <= 1) {\n                System.out.println(\"Not Prime\");\n                return;\n            }\n            boolean isPrime = true;\n            for (int i = 2; i * i <= n; i++) {\n                if (n % i == 0) {\n                    isPrime = false;\n                    break;\n                }\n            }\n            System.out.println(isPrime ? \"Prime\" : \"Not Prime\");\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "23\n",
                "expectedOutput": "Prime"
              },
              {
                "input": "4\n",
                "expectedOutput": "Not Prime"
              }
            ],
            "hints": [
              "Check i * i <= n."
            ],
            "analogy": "Think of prime numbers as the unbreakable 'atomic building blocks' of mathematics. You cannot divide 7 candies into equal smaller groups without cutting candies in half!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Used in modern banking, WhatsApp end-to-end encryption, and password security keys.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m3_p5",
            "title": "Print Multiplication Table in Java",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Print lines: n + \" x \" + i + \" = \" + (n * i).",
            "description": "Read integer n. Print first 5 multiples.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            // TODO: Print first 5 multiples\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            for (int i = 1; i <= 5; i++) {\n                System.out.println(n + \" x \" + i + \" = \" + (n * i));\n            }\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "9\n",
                "expectedOutput": "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45"
              }
            ],
            "hints": [
              "Loop i from 1 to 5."
            ],
            "analogy": "Like marching troops in neat rows: 4 rows of 5 soldiers = 20 soldiers. A loop prints each row step-by-step from 1 to 5.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          }
        ]
      },
      {
        "id": "java_mod_4",
        "title": "Module 4: Arrays & Operations",
        "summary": "1D arrays, min/max, array reversal, linear search, and bubble sort.",
        "level": 4,
        "problems": [
          {
            "id": "java_m4_p1",
            "title": "Array Sum and Average in Java",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Iterate through int[] arr, accumulate sum, divide by n for average.",
            "description": "Read n followed by n integers. Print sum on line 1, and integer average on line 2.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            // TODO: Print sum on line 1 and integer average on line 2\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            int sum = 0;\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n                sum += arr[i];\n            }\n            System.out.println(sum);\n            System.out.println(sum / n);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "4\n10 20 30 40\n",
                "expectedOutput": "100\n25"
              }
            ],
            "hints": [
              "sum += arr[i] in loop."
            ],
            "analogy": "Think of variables as labeled storage jars. If you put 10 marbles in jar A and 5 in jar B, finding the sum is simply pouring both jars into a bowl and counting the total marbles (15).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m4_p2",
            "title": "Find Minimum and Maximum in Java Array",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Track min and max starting from arr[0].",
            "description": "Read n followed by n integers. Print min on line 1 and max on line 2.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            // TODO: Print min on line 1, max on line 2\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            int min = arr[0], max = arr[0];\n            for (int x : arr) {\n                if (x < min) min = x;\n                if (x > max) max = x;\n            }\n            System.out.println(min);\n            System.out.println(max);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "5\n15 42 7 99 23\n",
                "expectedOutput": "7\n99"
              }
            ],
            "hints": [
              "Compare each element with min and max."
            ],
            "analogy": "Like a game of 'King of the Hill': Start by picking the first contestant as the reigning champion. Each new challenger steps up; if a challenger is taller than the champion, they become the new champion!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m4_p3",
            "title": "Reverse an Array in Java",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Swap arr[left] and arr[right] moving inward.",
            "description": "Read n followed by n integers. Reverse the array and print separated by spaces.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            // TODO: Reverse arr and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            int left = 0, right = n - 1;\n            while (left < right) {\n                int temp = arr[left];\n                arr[left] = arr[right];\n                arr[right] = temp;\n                left++;\n                right--;\n            }\n            for (int i = 0; i < n; i++) {\n                System.out.print(arr[i] + (i == n - 1 ? \"\\n\" : \" \"));\n            }\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "4\n1 2 3 4\n",
                "expectedOutput": "4 3 2 1"
              }
            ],
            "hints": [
              "Two pointers left and right."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m4_p4",
            "title": "Linear Search in Java Array",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Scan from index 0 to n - 1 looking for target.",
            "description": "Read n followed by n integers, and target x. Print the 0-based index of x, or -1 if not found.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            int x = sc.nextInt();\n            // TODO: Find and print 0-based index of x, or -1\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            int x = sc.nextInt();\n            int idx = -1;\n            for (int i = 0; i < n; i++) {\n                if (arr[i] == x) {\n                    idx = i;\n                    break;\n                }\n            }\n            System.out.println(idx);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "5\n10 20 30 40 50\n30\n",
                "expectedOutput": "2"
              },
              {
                "input": "3\n1 2 3\n7\n",
                "expectedOutput": "-1"
              }
            ],
            "hints": [
              "Break as soon as element is found."
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Foundational logic used in smartphone apps, smart microwaves, ATM cash dispensers, and space rovers.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m4_p5",
            "title": "Bubble Sort in Java",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Bubble Sort repeatedly steps through the array, comparing adjacent elements and swapping them if arr[j] > arr[j + 1].",
            "description": "Read n followed by n integers. Sort using Bubble Sort and print separated by spaces.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            // TODO: Sort using Bubble Sort and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n            for (int i = 0; i < n - 1; i++) {\n                for (int j = 0; j < n - i - 1; j++) {\n                    if (arr[j] > arr[j + 1]) {\n                        int temp = arr[j];\n                        arr[j] = arr[j + 1];\n                        arr[j + 1] = temp;\n                    }\n                }\n            }\n            for (int i = 0; i < n; i++) {\n                System.out.print(arr[i] + (i == n - 1 ? \"\\n\" : \" \"));\n            }\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "5\n64 25 12 22 11\n",
                "expectedOutput": "11 12 22 25 64"
              }
            ],
            "hints": [
              "Nested loops with swap condition arr[j] > arr[j + 1]."
            ],
            "analogy": "Imagine air bubbles floating upward in fizzy soda: In each pass, the biggest bubble naturally rises past smaller bubbles until the biggest is floating at the very top.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          }
        ]
      },
      {
        "id": "java_mod_5",
        "title": "Module 5: Strings & Methods",
        "summary": "String methods, StringBuilder, anagrams, palindromes, and case manipulation.",
        "level": 5,
        "problems": [
          {
            "id": "java_m5_p1",
            "title": "Reverse a String with StringBuilder",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "new StringBuilder(s).reverse().toString() reverses a string efficiently.",
            "description": "Read a word. Print it reversed.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            // TODO: Reverse s and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            System.out.println(new StringBuilder(s).reverse().toString());\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "java\n",
                "expectedOutput": "avaj"
              },
              {
                "input": "developer\n",
                "expectedOutput": "repoleved"
              }
            ],
            "hints": [
              "new StringBuilder(s).reverse().toString()"
            ],
            "analogy": "Think of a computer program like a baking recipe: It reads your ingredients (inputs), follows clear numbered instructions step-by-step, and serves a finished cake (output).",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m5_p2",
            "title": "Palindrome String Checker in Java",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Compare s with its reversed version using .equals().",
            "description": "Read a word. Print \"Palindrome\" or \"Not Palindrome\".",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            // TODO: Check if s is Palindrome\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            String rev = new StringBuilder(s).reverse().toString();\n            if (s.equals(rev)) System.out.println(\"Palindrome\");\n            else System.out.println(\"Not Palindrome\");\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "racecar\n",
                "expectedOutput": "Palindrome"
              },
              {
                "input": "java\n",
                "expectedOutput": "Not Palindrome"
              }
            ],
            "hints": [
              "s.equals(rev)"
            ],
            "analogy": "Hold a word or number up to a mirror. If the reflection in the mirror reads character-for-character identical to the original (like 'RACECAR' or '1221'), it's a Palindrome!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m5_p3",
            "title": "Count Vowels in Java String",
            "difficulty": "Easy",
            "xp": 35,
            "concept": "Iterate characters using s.charAt(i) or toCharArray().",
            "description": "Read a lowercase word. Print the count of vowels.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            // TODO: Count vowels and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            int count = 0;\n            for (char c : s.toCharArray()) {\n                if (\"aeiou\".indexOf(c) != -1) count++;\n            }\n            System.out.println(count);\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "programming\n",
                "expectedOutput": "3"
              },
              {
                "input": "sky\n",
                "expectedOutput": "0"
              }
            ],
            "hints": [
              "\"aeiou\".indexOf(c) != -1"
            ],
            "analogy": "Vowels (A, E, I, O, U) are the open-mouthed vocal cords of human speech. Imagine filtering pebbles from sand: each character passes through a filter that rings a bell whenever a vowel appears.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m5_p4",
            "title": "Check Anagrams with Arrays.sort",
            "difficulty": "Easy",
            "xp": 40,
            "concept": "Convert strings to char[] arrays, sort with Arrays.sort(), and compare with Arrays.equals().",
            "description": "Read two words. Print \"Anagram\" or \"Not Anagram\".",
            "starterCode": "import java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s1 = sc.next();\n            String s2 = sc.next();\n            // TODO: Check if s1 and s2 are Anagrams\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s1 = sc.next();\n            String s2 = sc.next();\n            char[] a1 = s1.toCharArray();\n            char[] a2 = s2.toCharArray();\n            Arrays.sort(a1);\n            Arrays.sort(a2);\n            if (Arrays.equals(a1, a2)) System.out.println(\"Anagram\");\n            else System.out.println(\"Not Anagram\");\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "silent listen\n",
                "expectedOutput": "Anagram"
              },
              {
                "input": "cat dog\n",
                "expectedOutput": "Not Anagram"
              }
            ],
            "hints": [
              "Arrays.equals(a1, a2)"
            ],
            "analogy": "Scrabble tiles! If you take the letter tiles for 'LISTEN' and rearrange them on the table, they spell 'SILENT' using the exact same tile count.",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Powers Spotify playlist shuffling, Amazon product price sorting, and video game leaderboard rankings.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          },
          {
            "id": "java_m5_p5",
            "title": "Toggle Case in Java String",
            "difficulty": "Medium",
            "xp": 45,
            "concept": "Character.isLowerCase(c) and Character.toUpperCase(c).",
            "description": "Read a word. Toggle case of each letter and print.",
            "starterCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            // TODO: Toggle case of each letter and print\n            \n        }\n    }\n}\n",
            "solutionCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            StringBuilder sb = new StringBuilder();\n            for (char c : s.toCharArray()) {\n                if (Character.isLowerCase(c)) sb.append(Character.toUpperCase(c));\n                else if (Character.isUpperCase(c)) sb.append(Character.toLowerCase(c));\n                else sb.append(c);\n            }\n            System.out.println(sb.toString());\n        }\n    }\n}\n",
            "testCases": [
              {
                "input": "JavaSTUDIO\n",
                "expectedOutput": "jAVAstudio"
              }
            ],
            "hints": [
              "Character.isLowerCase(c)"
            ],
            "analogy": "Like a light switch: If the room is dark (lowercase), flip the switch ON (uppercase). If already ON, flip it OFF!",
            "stepByStep": [
              "Step 1 (Input): Receive the data entered by the user into labeled storage boxes (variables).",
              "Step 2 (Logic): Follow the rules of the recipe (calculate, check conditions with if/else, or loop step-by-step).",
              "Step 3 (Output): Print the final result clearly on the screen exactly as requested."
            ],
            "whyItMatters": "Drives Google search autocorrect, DNA sequence genetics analysis, and spam email filters.",
            "beginnerTrap": "In Java, always name your public class 'Main', and remember array indices start at 0 and end at length - 1."
          }
        ]
      }
    ]
  }
};
