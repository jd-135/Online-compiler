export const CODE_TEMPLATES = {
  python: {
    hello: `# Python 3.12 Online Compiler
# Production-ready execution environment

def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to VS Code Studio."

def main():
    print("====================================")
    print(" 🚀 Python 3 Execution Environment")
    print("====================================")
    
    message = greet("Developer")
    print(message)
    
    # Calculate sum of squares
    squares = [x**2 for x in range(1, 6)]
    print(f"Squares from 1 to 5: {squares}")
    
    # Check for optional standard input
    import sys
    user_input = sys.stdin.read().strip()
    if user_input:
        print("\n[Standard Input Received]:")
        for line in user_input.splitlines():
            print(f"  > {line}")
    else:
        print("\nTip: Pass custom input via the 'Custom Stdin' tab.")

if __name__ == "__main__":
    main()
`,
    io: `# Python Interactive I/O Template
import sys

def solve():
    lines = sys.stdin.read().split()
    if not lines:
        print("Please provide input in the 'Custom Stdin' tab.")
        print("Example: Enter two integers to calculate their sum.")
        return

    try:
        a = int(lines[0])
        b = int(lines[1])
        print(f"Input A: {a}")
        print(f"Input B: {b}")
        print(f"Sum: {a + b}")
        print(f"Product: {a * b}")
    except (IndexError, ValueError) as e:
        print(f"Error parsing numbers: {e}")

if __name__ == "__main__":
    solve()
`
  },

  c: {
    hello: `// C (GCC 14) Online Compiler
// Production-ready execution environment

#include <stdio.h>
#include <stdlib.h>

void print_banner(void) {
    printf("====================================\\n");
    printf(" 🚀 C Language (GCC) Environment\\n");
    printf("====================================\\n");
}

int main(void) {
    print_banner();
    printf("Hello, World from modern C!\\n\\n");

    // Sample Fibonacci calculation
    int n = 8;
    long long a = 0, b = 1;
    printf("First %d Fibonacci numbers:\\n", n);
    for (int i = 0; i < n; i++) {
        printf("%lld ", a);
        long long next = a + b;
        a = b;
        b = next;
    }
    printf("\\n\\n");

    // Check for optional stdin
    char buffer[256];
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        printf("[Standard Input Received]: %s", buffer);
    } else {
        printf("Tip: Switch to 'Custom Stdin' tab to feed user input.\\n");
    }

    return 0;
}
`,
    io: `// C Standard Input/Output Template
#include <stdio.h>

int main(void) {
    int a, b;
    printf("Reading integers from Standard Input...\\n");
    
    if (scanf("%d %d", &a, &b) == 2) {
        printf("A = %d, B = %d\\n", a, b);
        printf("Sum = %d\\n", a + b);
        printf("Difference = %d\\n", a - b);
        printf("Product = %d\\n", a * b);
    } else {
        printf("Notice: No two integers were found in Standard Input.\\n");
        printf("Switch to 'Custom Stdin' tab and type: 25 75\\n");
    }

    return 0;
}
`
  },

  cpp: {
    hello: `// C++ (G++ 14) Online Compiler
// Production-ready execution environment

#include <iostream>
#include <vector>
#include <string>
#include <numeric>
#include <algorithm>

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    std::cout << "====================================\\n";
    std::cout << " 🚀 C++ (G++ Modern) Environment\\n";
    std::cout << "====================================\\n";
    std::cout << "Hello, World from Modern C++!\\n\\n";

    // STL Vector & Algorithm demonstration
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    int total = std::accumulate(numbers.begin(), numbers.end(), 0);
    
    std::cout << "Vector elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << "\\nTotal Sum: " << total << "\\n\\n";

    // Optional Standard Input check
    std::string inputLine;
    if (std::getline(std::cin, inputLine) && !inputLine.empty()) {
        std::cout << "[Standard Input Received]: " << inputLine << "\\n";
    } else {
        std::cout << "Tip: Enter custom test data in the 'Custom Stdin' tab.\\n";
    }

    return 0;
}
`,
    io: `// C++ Standard I/O Template (Competitive Programming style)
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int n;
    if (std::cin >> n) {
        std::cout << "Number of elements: " << n << "\\n";
        std::vector<int> arr(n);
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            std::cin >> arr[i];
            sum += arr[i];
        }
        std::cout << "Sum of array: " << sum << "\\n";
    } else {
        std::cout << "No input detected in Standard Input.\\n";
        std::cout << "Format: Enter N followed by N integers in 'Custom Stdin'.\\n";
        std::cout << "Example:\\n5\\n10 20 30 40 50\\n";
    }

    return 0;
}
`
  },

  java: {
    hello: `// Java (OpenJDK 17) Online Compiler
// Production-ready execution environment

import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        System.out.println("====================================");
        System.out.println(" 🚀 Java (OpenJDK LTS) Environment");
        System.out.println("====================================");
        System.out.println("Hello, World from Java!\\n");

        // Collections & Math demonstration
        List<String> frameworks = new ArrayList<>();
        frameworks.add("Spring Boot");
        frameworks.add("Quarkus");
        frameworks.add("Micronaut");

        System.out.println("Modern Java ecosystem tools:");
        frameworks.forEach(fw -> System.out.println("  • " + fw));
        System.out.println();

        // Optional standard input reading
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                System.out.println("[Standard Input Received]: " + line);
            } else {
                System.out.println("Tip: Add custom input in the 'Custom Stdin' tab.");
            }
        } else {
            System.out.println("Tip: Add custom input in the 'Custom Stdin' tab.");
        }
    }
}
`,
    io: `// Java Standard Input/Output Template
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Waiting for Standard Input...");
        if (sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println("A: " + a);
            System.out.println("B: " + b);
            System.out.println("A + B = " + (a + b));
            System.out.println("A * B = " + (a * b));
        } else {
            System.out.println("No integers supplied in 'Custom Stdin'.");
            System.out.println("Example input: 12 34");
        }
    }
}
`
  }
};
