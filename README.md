# Identity Studio

> **Create your identity. Design your presence.**  
> A polished, privacy-first client-side digital profile card generator built with React, TypeScript, and Tailwind CSS.

![Identity Studio](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200)

## Overview

**Identity Studio** transforms user-provided personal and professional details into an attractive, customizable digital profile card in real-time. Built around the **Obsidian Editorial** design aesthetic, it operates **entirely client-side with zero backend, zero database, zero external APIs, and zero tracking**.

All input handling, dynamic rendering, formatting, draft persistence, and high-resolution 2x PNG exports occur natively inside the browser.

---

## Key Features

- **Obsidian Editorial Visual System**: Sophisticated palette featuring Obsidian Green (`#17251F`), Warm Ivory (`#F2EBDD`), and Muted Brass (`#B99A6A`) with editorial typography.
- **Smart Controlled Form**:
  - Full Name (required, 2–50 characters)
  - Role / Designation (optional, max 60 characters)
  - Biography (optional, max 180 characters with live character counter)
  - Avatar Image URL (with real-time status indicator and fallback initials avatar)
  - Location (optional, max 60 characters)
  - Email (optional, validated email format)
  - Social & Portfolio links (Website, LinkedIn, GitHub with URL validation)
- **3 Genuinely Distinct Templates**:
  - `Editorial`: Signature asymmetric layout with oversized serif titles, brass accent bars, and architectural metadata.
  - `Classic`: Balanced corporate profile with a centered circular avatar, refined ring, and badge pill grid.
  - `Compact`: Dense executive networking badge optimized for quick scanning and NFC-style digital passes.
- **4 Visual Themes**:
  - `Obsidian`: Deep green dark-mode surface with warm ivory typography and brass accents.
  - `Warm Ivory`: Crisp light editorial aesthetic with deep ink typography and subtle brass frames.
  - `Charcoal`: Minimalist dark slate palette with cool silver-white text.
  - `Dune Sand`: Warm sepia desert aesthetic with terracotta accents.
- **Corner & Typography Styling**:
  - Corner Radii: Sharp (`0px`), Subtle (`12px`), Curved (`24px`).
  - Font Styling: Editorial Serif, Modern Sans, and Mixed Hybrid.
- **High-Resolution 2x PNG Export**:
  - One-click client-side export using `html-to-image` at `pixelRatio: 2`.
  - Automatic font and asset loading checks with CORS error handling.
- **Quality of Life & Privacy**:
  - **Zero Telemetry / No Backend**: Profile data never leaves browser runtime memory.
  - **Local Draft Persistence**: Optional browser LocalStorage auto-save with restore on page reload.
  - **Load Sample & Reset**: One-click demo profile population or complete workspace clear.
  - **Copy Details & Native Share**: Formatted plain-text copy and Web Share API support with clipboard fallback.
  - **Toast Notifications**: Non-blocking toast feedback for exports, copies, draft status, and errors.

---

## Architecture

```
User Input
    ↓
React Controlled State (Single Source of Truth)
    ↓
Real-Time Validation (validation.ts)
    ↓
Structured Profile Object
    ↓
Dynamic ProfileCard Component (Theme + Template Renderers)
    ↓
Live Interactive Preview (Desktop & Mobile Simulation)
    ↓
DOM-to-PNG Canvas Capture (html-to-image @ 2x Pixel Density)
```

### Folder Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Wordmark, version badge, navigation & quick actions
│   │   ├── HeroSection.tsx     # Editorial hero heading and value pillars
│   │   ├── ProfileForm.tsx     # Controlled form inputs with validation & counters
│   │   ├── ImageInput.tsx      # Avatar URL handler, loading status & fallback initials
│   │   ├── ThemeSelector.tsx   # Color palette swatches, corner & font pickers
│   │   ├── TemplateSelector.tsx# 3 architectural layout pickers
│   │   ├── ProfileCard.tsx     # Dynamic multi-template & multi-theme card renderer
│   │   ├── LivePreview.tsx     # Responsive canvas container with device frame switcher
│   │   ├── ExportButton.tsx    # High-resolution 2x PNG exporter & share triggers
│   │   ├── Toast.tsx           # Toast notification provider
│   │   ├── SocialIcons.tsx     # Inline SVG vector icons for LinkedIn & GitHub
│   │   └── Footer.tsx          # Privacy declaration, architecture breakdown & credits
│   ├── hooks/
│   │   └── useProfile.ts       # Central profile state, auto-save & actions
│   ├── types/
│   │   └── profile.ts          # Strongly typed Profile and Appearance schemas
│   ├── utils/
│   │   ├── validation.ts       # Field and object validation rules
│   │   ├── exportCard.ts       # html-to-image export pipeline & share fallback
│   │   └── storage.ts          # LocalStorage draft persistence helper
│   ├── App.tsx                 # Single-page application root
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind CSS & typography baseline
├── tests/
│   └── validation.test.mjs     # Automated validation suite (Node test runner)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (Node 20+ recommended)
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone or navigate to the project directory
git clone https://github.com/your-username/identity-studio.git
cd identity-studio

# Install dependencies
npm install
```

### Development Server

Start Vite in local development mode:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Run Automated Tests

Execute the automated test suite verifying name limits, bio character thresholds, email schemas, and URL protocols:

```bash
npm test
```

### Production Build & Preview

Type-check with TypeScript and bundle production assets:

```bash
npm run build
npm run preview
```

---

## Technical Constraints & Design Principles

1. **Strictly Frontend-Only**: There is no backend, database, mock POST route, or proxy. All data transformation and exports occur locally in the client runtime.
2. **Untrusted Input Safety**: All user input is rendered via React text nodes; raw HTML injection is strictly prevented. External links use `rel="noopener noreferrer"`.
3. **Resilience**: Broken image URLs or missing optional fields fail gracefully without breaking the layout or crashing DOM capture.

---

## License

MIT License. Designed and engineered for the Antigravity Identity Studio specification.

