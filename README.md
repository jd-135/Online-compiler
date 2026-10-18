# 🚀 JD COMPILER — Ultra-Fast Multi-Language Online IDE

A production-ready, ultra-fast Online Code Compiler web application built with **React**, **Vite**, and **Tailwind CSS**, optimized for instant deployment on **Vercel**.

Featuring an authentic custom-themed IDE layout, intelligent **Code Autocomplete & Snippet Dropdowns** (with toggles in Settings), client-side **Python WebAssembly VM (Pyodide)** with built-in support for **NumPy, Pandas, Math, Random, and Statistics**, and high-resilience sandboxes for **C, C++, and Java**.

---

## 🌟 Core Features

- **JD COMPILER Custom Palette**: Built with deep matte charcoal (`#0f1117`), panels (`#161b22`), tech-blue (`#58a6ff`), and emerald green (`#3fb950`).
- **Intelligent Code Autocomplete**: Instant suggestion dropdown when typing `import`, keywords, modules (`numpy`, `pandas`, `math`, `random`, `statistics`), with keyboard navigation (`↑`/`↓`, `Tab`, `Enter`).
- **Settings Toggle**: Instant option in Settings to enable/disable code autocomplete suggestions on demand.
- **Python WebAssembly JIT**: Zero-latency in-browser execution with complete support for `numpy`, `pandas`, `math`, `random`, `statistics`, `scipy`, and standard libraries.
- **Full Support for 4 Core Languages**:
  - 🐍 **Python**: 3.12 (Instant WebAssembly + NumPy & Pandas)
  - ☕ **Java**: OpenJDK 21 LTS (`java.util.*`, `java.io.*`, `java.math.*`)
  - ⚡ **C**: GNU GCC 14 / 13 (C17 standard)
  - 🚀 **C++**: GNU G++ 14 / 13 (C++20/C++23 STL)
- **Pre-loaded Boilerplate Templates**:
  - Automatically loads standard **"Hello World"** or **"Standard I/O"** templates when switching languages.
  - Interactive template toggle in the top bar.
- **Interactive Standard Input (`stdin`)**:
  - Dedicated `Custom Stdin` tab allowing competitive programming inputs (`cin`, `scanf`, `input()`, `Scanner`).
  - Active indicator badge when custom input stream is loaded.
- **Accurate Output & Error Segregation**:
  - Clearly partitions standard output (`stdout`), compiler warnings/syntax errors (`compile_output`), and runtime exceptions (`stderr`).
  - Automatic error diagnostic highlighting and tab focus on failure.
- **Dual-Provider Resilience Engine**:
  - **Primary**: Judge0 CE Public Sandbox API.
  - **Secondary (Automatic Fallback)**: Wandbox Cloud Execution API.
  - Zero API key required out of the box — works immediately.
- **Vercel Serverless Architecture**:
  - `/api/compile` serverless function proxy eliminates all browser CORS hurdles.
  - Ready for custom RapidAPI Judge0 private tokens if higher rate limits are needed.
- **Ultra-lightweight & Data-Conscious**:
  - Built with a minimal footprint (< 25MB total npm install) to strictly protect limited bandwidth budgets (sub-500 MB friendly).
  - Fast production build: completes in under **500ms**!

---

## 🛠️ Language Slugs & Execution Mapping

| Language | Extension | Judge0 ID | Wandbox Compiler | Runtime Version |
| :--- | :--- | :--- | :--- | :--- |
| **Python** | `.py` | `100` | `cpython-3.12.7` | Python 3.12.5 |
| **C** | `.c` | `103` | `gcc-13.2.0-c` | GCC 14.1.0 |
| **C++** | `.cpp` | `105` | `gcc-13.2.0` | G++ 14.1.0 |
| **Java** | `.java` | `91` | `openjdk-jdk-21+35` | OpenJDK 17.0.6 |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Enter` (or `Cmd + Enter`) | **Run / Compile Code** |
| `Tab` | Indent line / selection (4 spaces) |
| `Shift + Tab` | Un-indent line / selection |
| `Ctrl + L` | Clear output console |
| `Ctrl + S` | Trigger compilation |
| `F1` | Open Keyboard Shortcuts modal |
| `Esc` | Close dialogs / settings |

---

## 🚀 Local Development

### 1. Prerequisites
- Node.js `v18+` or `v20+` or `v25+`
- npm installed

### 2. Installation
```bash
# Navigate to the project directory
cd "Online compiler"

# Install dependencies (ultra-lightweight, ~25MB)
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The local development server includes a built-in proxy middleware for `/api/compile`.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, minified bundle in the `dist` directory.

---

## ☁️ Deployment to Vercel

### Option 1: Deploy with Vercel CLI (Fastest)

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command inside the `Online compiler` directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompts (accept defaults; Vite is automatically detected).
4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub / GitLab / Bitbucket

1. Push this directory to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial online code compiler"
   git branch -M main
   git remote add origin https://github.com/your-username/online-compiler.git
   git push -u origin main
   ```
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import your `online-compiler` repository.
4. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**! Your compiler will be live with full serverless functionality in seconds.

---

## ⚙️ Environment Variables (Optional)

The application works 100% out of the box using public tiers. If you wish to use your own dedicated Judge0 instance or RapidAPI subscription, configure these environment variables in your Vercel Project Settings or `.env.local`:

```env
# Optional: Dedicated Judge0 endpoint
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true

# Optional: RapidAPI Key for unlimited/paid quota
JUDGE0_API_KEY=your_rapidapi_key_here

# Optional: RapidAPI Host header
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
```

---

## 📂 Project Structure

```
Online compiler/
├── api/
│   └── compile.js               # Vercel Serverless Function proxy
├── public/
├── src/
│   ├── components/
│   │   ├── ActivityBar.jsx      # Leftmost 48px VS Code icon bar
│   │   ├── EditorPanel.jsx      # Line-numbered editor with smart indentation
│   │   ├── SettingsModal.jsx    # Font size, tab size, auto-brackets modal
│   │   ├── ShortcutsModal.jsx   # Keyboard shortcuts cheat sheet
│   │   ├── Sidebar.jsx          # Collapsible Explorer & Snippets panel
│   │   ├── StatusBar.jsx        # Bottom VS Code blue status bar
│   │   ├── TerminalPanel.jsx    # Split console (stdout, stdin, stderr, stats)
│   │   └── TopBar.jsx           # Language dropdown, run button, quick tools
│   ├── constants/
│   │   ├── languages.js         # IDs, compilers, badges, and version configs
│   │   └── templates.js         # Hello World & Standard I/O templates
│   ├── services/
│   │   └── compilerService.js   # Dual-provider execution service
│   ├── App.jsx                  # Main studio container
│   ├── index.css                # Tailwind CSS v4 styling & scrollbars
│   └── main.jsx                 # React root entry point
├── index.html                   # HTML entry with Fira Code font
├── package.json                 # Minimal dependencies
├── vercel.json                  # Vercel deployment routes & rewrites
├── vite.config.js               # Vite config with local dev API middleware
└── README.md                    # Documentation & deployment guide
```

---

## 🛡️ License

MIT License. Free for personal, academic, and commercial use.
