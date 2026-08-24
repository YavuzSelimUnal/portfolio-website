# Portfolio Site

A personal portfolio styled as a set of engineering spec sheets — a title
block up top, numbered general notes, and each project laid out as a
numbered sheet with leader-line callouts and a bill-of-materials table
for its tech stack.

## Features

- **Full-Stack / Cyber track toggle** — switches which projects are shown
  and flips the whole colour scheme between a light "draft" (vellum paper)
  look and a dark "print" (cyanotype blueprint) look, like real blueprint
  prints once did.
- **Layer toggles per project** — click chips like `Frontend`, `AI/ML`, or
  `Data` to isolate which notes and bill-of-materials rows are shown, like
  toggling layers in CAD software.
- **Live interactive demos** — a simulated RAG retrieval pipeline and a
  natural-language log parser, so visitors can try the actual feature
  instead of just reading about it.
- **Command palette** — press `/` anywhere to jump between sections.
- Scroll-triggered reveal animations, a typewriter hero title, and a
  cursor coordinate readout (desktop only).

## Tech Stack
- React + Vite
- Tailwind CSS
- IBM Plex Mono / IBM Plex Sans

## Getting Started

```bash
npm install
npm run dev
```

## Before deploying

Open `src/App.jsx` and fill in the `CONFIG` object at the top (email,
GitHub, LinkedIn, resume path). Each entry in `PROJECTS` needs a `track`
field (`'fullstack'` or `'cyber'`) plus the usual `github` / `demo` links —
add a project with `track: 'cyber'` to populate the Cyber view. Drop a
`resume.pdf` into `/public` if you want the CV link to work.

## Deploy

Push this to GitHub, then deploy for free on Vercel or Netlify — either
will auto-detect the Vite build (`npm run build`, output directory `dist`).