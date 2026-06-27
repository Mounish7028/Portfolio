# My-Portfolio

Welcome to my interactive portfolio! This isn't just a static resume; it's a showcase of modern web engineering and AI design.

✨ Key Features:

Liquid Glass UI: A futuristic, iOS-26 inspired aesthetic with smooth micro-animations.
AI Companion: A simulated NLP chatbot that can answer questions about my skills, education, and projects in real-time.
Core Reactor Game: An interactive puzzle that requires users to reconstruct an AI deployment workflow (Python → LangGraph → Gemini → Vector DB → AWS → Deployment) to stabilize the system.
Portfolios shouldn't be boring. So, I gamified mine. 🎮✨

I'm excited to share my completely redesigned developer portfolio! Instead of just listing my AI/ML projects and AWS certifications, I built interactive experiences directly into the UI:

💬 AI Companion: A custom chatbot built into the site. Ask it about my RAG projects, my education at VIT-AP, or how to contact me, and it will respond like a true LLM. 🧩 Core Reactor Puzzle: An interactive flowchart game where you have to correctly architect an AI system (Python → LangGraph → Gemini → Vector DB → AWS → Deployment) to stabilize the "core". 🎨 Liquid Glass Aesthetics: Designed from scratch using React, TailwindCSS, and Framer Motion for buttery-smooth animations.

I'd love for you to check out the repo (and play the mini-game!) here: https://github.com/Mounish7028/Portfolio

#SoftwareEngineering #AI #ReactJS #WebDesign #OpenSource #TechPortfolio #DeveloperJourney

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

#Preview
<img width="1924" height="1084" alt="image" src="https://github.com/user-attachments/assets/36ebe216-c9de-4089-8b54-c7363f92cb10" />


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
