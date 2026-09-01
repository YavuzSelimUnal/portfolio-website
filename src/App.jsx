import { useEffect, useRef, useState, useCallback } from 'react'

const CONFIG = {
  name: 'Yavuz Selim Ünal',
  email: 'yavuz6658@gmail.com',
  github: 'https://github.com/YavuzSelimUnal',
  linkedin: 'https://www.linkedin.com/in/yavuz-selim-unal-2396b92a9/',
  resumeUrl: '/resume.pdf',
  location: 'United Kingdom',
}

const DISCIPLINE = {
  fullstack: 'Computer Science — Full-Stack',
  cyber: 'Computer Science — Cybersecurity',
}

const TITLE_BLOCK_DISCIPLINE = {
  fullstack: 'Software Eng.',
  cyber: 'Security Eng.',
}

const LAYERS = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'data', label: 'Data' },
  { key: 'deploy', label: 'Deploy' },
]

const PROJECTS = [
  {
    id: 'project-01',
    track: 'fullstack',
    sheet: '01',
    of: '02',
    title: 'Multi-Source RAG Chatbot',
    subtitle: 'Retrieval-augmented generation over a personal document library',
    description:
      'A bilingual (English/Turkish) retrieval-augmented chatbot built over a personal library of long-form text drawn from several online sources with differing site architectures, plus locally-owned PDFs. Crawled, chunked, embedded, and served through a FastAPI backend and a React frontend.',
    callouts: [
      { layer: 'data', text: 'Custom rate-limited, resumable scrapers for three distinct site architectures: modern framework-embedded JSON, legacy server-rendered pages with a discovered internal JSON API, and HTML-fallback extraction' },
      { layer: 'data', text: 'Unified data pipeline: scrape → chunk → embed → index, covering 20,000+ text chunks' },
      { layer: 'ai', text: 'Local multilingual embeddings (Sentence Transformers) + ChromaDB vector search with metadata filtering' },
      { layer: 'ai', text: 'Layered language-detection logic to match response language to query language across edge cases' },
      { layer: 'deploy', text: 'Fully free, always-on stack: containerized FastAPI backend on Google Cloud Run (scale-to-zero) and React frontend on Vercel' },
    ],
    bom: [
      { part: 'Backend', spec: 'FastAPI, Python', layer: 'backend' },
      { part: 'Vector store', spec: 'ChromaDB', layer: 'data' },
      { part: 'Embeddings', spec: 'Sentence Transformers (local, multilingual)', layer: 'ai' },
      { part: 'Generation', spec: 'Google Gemini API', layer: 'ai' },
      { part: 'Frontend', spec: 'React', layer: 'frontend' },
      { part: 'Deployment', spec: 'Google Cloud Run + Vercel', layer: 'deploy' },
    ],
    github: 'https://github.com/YavuzSelimUnal/RAG-chatbot',
    demo: '',
    demoType: 'rag',
  },
  {
    id: 'project-02',
    track: 'fullstack',
    sheet: '02',
    of: '02',
    title: 'Fitness & Nutrition Tracker',
    subtitle: 'A full-stack workout and meal log with natural-language entry',
    description:
      "A gym and nutrition tracker built to replace paid subscription apps: logs workouts and meals against real nutrition data, charts progress over time, and can be updated by typing a plain-language message like \"I had 2 eggs and went for a 30 min run.\"",
    callouts: [
      { layer: 'backend', text: 'Auth, workout logging (sets/reps/weight or cardio duration/distance), and meal logging against real nutrition data' },
      { layer: 'ai', text: 'Natural-language logging via Claude API tool-calling: parses free text into structured entries automatically' },
      { layer: 'data', text: 'Real nutrition data pulled from USDA FoodData Central and Open Food Facts' },
      { layer: 'frontend', text: 'Progress charts for weight lifted and calorie trends over time' },
      { layer: 'frontend', text: 'Installable as a PWA — add to your phone home screen like a native app' },
    ],
    bom: [
      { part: 'Frontend', spec: 'React + Vite, Tailwind CSS, Recharts', layer: 'frontend' },
      { part: 'Backend', spec: 'Node.js + Express', layer: 'backend' },
      { part: 'ORM', spec: 'Prisma', layer: 'data' },
      { part: 'Database', spec: 'PostgreSQL', layer: 'data' },
      { part: 'AI', spec: 'Claude API (tool use / function calling)', layer: 'ai' },
      { part: 'External data', spec: 'USDA FoodData Central, MET value table', layer: 'data' },
    ],
    github: '',
    demo: '',
    demoType: 'log',
  },
  {
    id: 'project-03',
    track: 'cyber',
    sheet: '01',
    of: '02',
    title: 'Sentry — Web Security Scanner',
    subtitle: 'Full-stack vulnerability scanner with live-streaming results',
    description:
      "A web security scanner that checks a target site for common real-world misconfigurations — missing security headers, TLS issues, exposed sensitive paths, insecure cookies, open database ports, outdated JS libraries with known CVEs, and reflected XSS — and streams results live to the browser as each check completes, presented as a detective 'case file' UI.",
    callouts: [
      { layer: 'backend', text: 'Seven independent scanner modules (headers, TLS/cert, exposed paths, cookies, open ports, CVE lookup, reflected XSS) sharing one Finding data shape' },
      { layer: 'backend', text: 'Server-enforced target allowlist + explicit consent gate for custom URLs — authorization checked on the backend, not just hidden in the UI, so it can\'t be bypassed by calling the API directly' },
      { layer: 'data', text: 'Client-side library fingerprinting cross-referenced against the OSV.dev public vulnerability database for known CVEs' },
      { layer: 'frontend', text: 'Live-streaming results over a WebSocket rather than a single request/response — each check\'s findings render the moment it completes' },
      { layer: 'deploy', text: 'Containerized with Docker; backend deployed on Fly.io, frontend on GitHub Pages' },
    ],
    bom: [
      { part: 'Backend', spec: 'FastAPI, Python, WebSockets', layer: 'backend' },
      { part: 'Vulnerability DB', spec: 'OSV.dev API', layer: 'data' },
      { part: 'Frontend', spec: 'React + Vite (custom CSS, no UI framework)', layer: 'frontend' },
      { part: 'Containerization', spec: 'Docker', layer: 'deploy' },
      { part: 'Hosting', spec: 'Fly.io (backend), GitHub Pages (frontend)', layer: 'deploy' },
    ],
    github: 'https://github.com/YavuzSelimUnal/security-scanner',
    demo: 'https://yavuzselimunal.github.io/security-scanner/',
    demoType: '',
  },

  {
    id: 'project-04',
    track: 'cyber',
    sheet: '02',
    of: '02',
    title: 'ScoutRecon — Network Recon & Credential Auditing Toolkit',
    subtitle: 'Attacker-eye-view recon: port scanning, CVE lookup, subdomain enum, hash auditing',
    description:
      "A companion to Sentry from the other side of the fence: rather than checking your own app for weaknesses, ScoutRecon does the reconnaissance an attacker's first hour would — scanning ports, cross-referencing service versions against known CVEs, enumerating subdomains, and auditing password/hash strength.",
    callouts: [
      { layer: 'backend', text: 'Async TCP connect scanner with banner grabbing, feeding identified service versions directly into a CVE cross-reference against the live NVD API' },
      { layer: 'backend', text: 'Server-enforced scope gate: scanning and enumeration default to private/local targets only, requiring explicit confirmed authorization for any public target — checked server-side, not just a UI checkbox' },
      { layer: 'backend', text: 'Password/hash auditing (dictionary + bounded brute-force against MD5/SHA1/SHA256/bcrypt) deliberately capped in scope as a technical and ethical design decision, rather than built for maximum cracking power' },
      { layer: 'data', text: 'DNS-based subdomain enumeration against a curated wordlist, run through the same authorization policy as active scanning' },
      { layer: 'frontend', text: 'Custom radar-scope visualization: discovered hosts render as live pinging contacts, with a linked "contact log" showing service, CVE, and severity detail' },
    ],
    bom: [
      { part: 'Backend', spec: 'FastAPI, Python, asyncio', layer: 'backend' },
      { part: 'Vulnerability DB', spec: 'NVD (National Vulnerability Database) public API', layer: 'data' },
      { part: 'Hashing', spec: 'hashlib (MD5/SHA1/SHA256), bcrypt', layer: 'backend' },
      { part: 'Frontend', spec: 'React + Vite (custom CSS, no UI framework)', layer: 'frontend' },
    ],
    github: 'https://github.com/YavuzSelimUnal/scout-recon',
    demo: '',
    demoType: '',
  },
]

const NOTES = [
  'Third-year CS student — full-stack & applied AI, with a growing interest in security.',
  'Comfortable owning a project end-to-end: design, build, deploy, and the debugging in between.',
  'Stack: React · Node/Express · Python/FastAPI · PostgreSQL · LLM APIs.',
  'Open to internships and graduate roles.',
]

const BASE_JUMP_ITEMS = [
  { id: 'notes', label: 'General notes' },
]
const CONTACT_JUMP_ITEM = { id: 'contact', label: 'Approval / contact' }

// ---------- Hooks ----------

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])
  return reduced
}

// ---------- Small pieces ----------

function CursorHUD() {
  const [pos, setPos] = useState(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf
    const handler = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener('mousemove', handler)
    return () => {
      window.removeEventListener('mousemove', handler)
      cancelAnimationFrame(raf)
    }
  }, [])
  if (!pos) return null
  return (
    <div
      className="pointer-events-none fixed z-40 hidden sm:block"
      style={{ left: pos.x, top: pos.y, transform: 'translate(16px, 16px)' }}
    >
      <div className="font-mono text-[10px] text-[var(--accent)] bg-[var(--bg)]/85 border border-[var(--hairline)] px-1.5 py-0.5 whitespace-nowrap">
        X {String(Math.round(pos.x)).padStart(4, '0')} · Y {String(Math.round(pos.y)).padStart(4, '0')}
      </div>
    </div>
  )
}

function TrackToggle({ track, setTrack }) {
  const isCyber = track === 'cyber'
  return (
    <button
      onClick={() => setTrack(isCyber ? 'fullstack' : 'cyber')}
      className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider shrink-0"
      aria-pressed={isCyber}
      aria-label="Toggle Full-Stack/Cyber project track"
    >
      <span className={isCyber ? 'text-[var(--ink-faint)]' : 'text-[var(--accent)]'}>Full-Stack</span>
      <span className="relative w-9 h-5 rounded-full border border-[var(--hairline)] bg-[var(--bg-dim)] transition-colors">
        <span
          className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-[var(--accent)] transition-transform duration-300"
          style={{ transform: isCyber ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </span>
      <span className={isCyber ? 'text-[var(--accent)]' : 'text-[var(--ink-faint)]'}>Cyber</span>
    </button>
  )
}

function SectionLabel({ n, children }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`flex items-center gap-3 mb-8 reveal ${visible ? 'is-visible' : ''}`}>
      <span className="font-mono text-xs text-[var(--accent)] border border-[var(--accent)] px-2 py-0.5 shrink-0">{n}</span>
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--ink-faint)] shrink-0">{children}</span>
      <span className="h-px flex-1 bg-[var(--hairline)] draw-line" />
    </div>
  )
}

function TitleBlock({ track }) {
  return (
    <div className="border border-[var(--ink)]/70 font-mono text-[11px] sm:text-xs">
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--ink)]/30">
        <div className="p-3">
          <div className="text-[var(--ink-faint)] uppercase text-[10px] tracking-wider mb-1">Drawn by</div>
          <div>{CONFIG.name}</div>
        </div>
        <div className="p-3">
          <div className="text-[var(--ink-faint)] uppercase text-[10px] tracking-wider mb-1">Discipline</div>
          <div>{TITLE_BLOCK_DISCIPLINE[track]}</div>
        </div>
      </div>
    </div>
  )
}

function Typewriter({ text, speed = 45 }) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduced ? text : '')
  useEffect(() => {
    if (reduced) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, reduced])
  const done = shown.length >= text.length
  return (
    <span className={done ? '' : 'caret'}>
      {shown}
    </span>
  )
}

// ---------- Interactive demos ----------

function RagDemo() {
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState(-1)
  const stages = ['Embedding query', 'Searching vector index', 'Retrieving top chunks', 'Reranking by relevance', 'Generating answer']

  useEffect(() => {
    if (stage < 0 || stage >= stages.length) return
    const t = setTimeout(() => setStage((s) => s + 1), 500)
    return () => clearTimeout(t)
  }, [stage, stages.length])

  const run = () => {
    if (!query.trim() || (stage >= 0 && stage < stages.length)) return
    setStage(0)
  }

  const done = stage >= stages.length

  return (
    <div className="border border-[var(--hairline)] p-5 mb-10 bg-[var(--bg-dim)]/50">
      <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
        Try the pipeline <span className="text-[var(--ink-faint)] normal-case">— client-side simulation</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder='e.g. "summarize the third chapter"'
          className="flex-1 bg-transparent border border-[var(--hairline)] px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--ink-faint)]"
        />
        <button
          onClick={run}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
        >
          Run query
        </button>
      </div>
      <ul className="space-y-2">
        {stages.map((s, i) => (
          <li key={i} className="flex items-center gap-3 font-mono text-xs">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                stage > i ? 'bg-[var(--accent)]' : stage === i ? 'bg-[var(--amber)] animate-pulse' : 'bg-[var(--hairline)]'
              }`}
            />
            <span className={stage >= i ? 'text-[var(--ink)]' : 'text-[var(--ink-faint)]'}>{s}</span>
          </li>
        ))}
      </ul>
      {done && (
        <div className="mt-4 border-t border-[var(--hairline)] pt-4 text-sm">
          <span className="text-[var(--ink-faint)] font-mono text-xs uppercase tracking-wider block mb-1">Simulated response</span>
          Based on the retrieved chunks, here's a grounded answer about "{query}" — swap this line for the real backend call to go live.
        </div>
      )}
    </div>
  )
}

function LogDemo() {
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState(null)

  const parse = () => {
    const t = text.toLowerCase().trim()
    if (!t) return
    const distMatch = t.match(/(\d+(\.\d+)?)\s?(km|k|mi|miles?)/)
    const durMatch = t.match(/(\d+)\s?(min|minutes?|hrs?|hours?)/)
    const foodWords = t.match(/(\d+)\s?(eggs?|toast|bananas?|chicken|rice|oats?|yogurt)/g)

    if (distMatch || durMatch || /\b(ran|run|walk|cycl|bike|swim)/.test(t)) {
      const activity = /run|ran/.test(t) ? 'Running' : /walk/.test(t) ? 'Walking' : /cycl|bike/.test(t) ? 'Cycling' : /swim/.test(t) ? 'Swimming' : 'Cardio'
      setParsed({
        type: 'Workout',
        fields: [
          ['Activity', activity],
          ['Distance', distMatch ? distMatch[0] : '—'],
          ['Duration', durMatch ? durMatch[0] : '—'],
        ],
      })
    } else if (foodWords && foodWords.length) {
      setParsed({
        type: 'Meal',
        fields: [['Items logged', foodWords.join(', ')]],
      })
    } else {
      setParsed({
        type: 'Unrecognized',
        fields: [['Try', '"ran 5k in 28 minutes" or "2 eggs and toast"']],
      })
    }
  }

  return (
    <div className="border border-[var(--hairline)] p-5 mb-10 bg-[var(--bg-dim)]/50">
      <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
        Try natural-language logging <span className="text-[var(--ink-faint)] normal-case">— client-side simulation</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && parse()}
          placeholder='e.g. "ran 5k in 28 minutes"'
          className="flex-1 bg-transparent border border-[var(--hairline)] px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--ink-faint)]"
        />
        <button
          onClick={parse}
          className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
        >
          Parse entry
        </button>
      </div>
      {parsed && (
        <div className="border border-[var(--hairline)] font-mono text-xs">
          <div className="px-3 py-2 border-b border-[var(--hairline)] uppercase tracking-wider text-[var(--ink-faint)]">
            Parsed as: <span className="text-[var(--accent)]">{parsed.type}</span>
          </div>
          {parsed.fields.map(([label, val]) => (
            <div key={label} className="flex px-3 py-2 border-b border-[var(--hairline)] last:border-0 gap-4">
              <span className="text-[var(--ink-faint)] w-28 shrink-0 uppercase">{label}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------- Project sheet with layer toggles ----------

function LayerChips({ active, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {LAYERS.map((l) => {
        const isOn = active.has(l.key)
        return (
          <button
            key={l.key}
            onClick={() => onToggle(l.key)}
            className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border transition-colors ${
              isOn
                ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                : 'border-[var(--hairline)] text-[var(--ink-faint)]'
            }`}
          >
            {isOn ? '● ' : '○ '}
            {l.label}
          </button>
        )
      })}
    </div>
  )
}

function ProjectSheet({ project, sheetIndex, sheetTotal }) {
  const [active, setActive] = useState(new Set(LAYERS.map((l) => l.key)))
  const [sheetRef, visible] = useReveal(0.05)

  const toggle = useCallback((key) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size === 1) return prev // keep at least one layer visible
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  const visibleCallouts = project.callouts.filter((c) => active.has(c.layer))
  const visibleBom = project.bom.filter((r) => active.has(r.layer))

  return (
    <div
      id={project.id}
      ref={sheetRef}
      className={`sheet-frame border border-[var(--hairline)] bg-[var(--bg)]/60 p-6 sm:p-10 mb-16 reveal ${visible ? 'is-visible' : ''}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 font-mono text-[11px] text-[var(--ink-faint)] uppercase tracking-wider">
        <span>Sheet {sheetIndex} of {sheetTotal}</span>
        <span>Scale — none</span>
      </div>

      <h3 className="font-mono font-semibold text-2xl sm:text-3xl text-[var(--ink)] mb-1">{project.title}</h3>
      <p className="text-[var(--ink-faint)] mb-6">{project.subtitle}</p>
      <p className="max-w-2xl mb-8 leading-relaxed">{project.description}</p>

      {project.demoType === 'rag' && <RagDemo />}
      {project.demoType === 'log' && <LogDemo />}

      <div className="mb-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink-faint)] mb-3">
          Layers <span className="text-[var(--ink-faint)] normal-case">— toggle to isolate parts of the build</span>
        </div>
        <LayerChips active={active} onToggle={toggle} />
      </div>

      <div className="mb-10">
        <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-4">Notes</div>
        {visibleCallouts.length === 0 ? (
          <p className="text-sm text-[var(--ink-faint)] italic">No layers selected.</p>
        ) : (
          <ul className="space-y-4 max-w-2xl">
            {visibleCallouts.map((c, i) => (
              <li key={i} className={`pl-8 leader-line reveal is-visible text-sm leading-relaxed`}>
                {c.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-4">Bill of materials</div>
        <table className="w-full text-sm border-collapse min-w-[420px]">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)] text-left">
              <th className="border-b border-[var(--ink)]/30 py-2 pr-4">Component</th>
              <th className="border-b border-[var(--ink)]/30 py-2">Spec</th>
            </tr>
          </thead>
          <tbody>
            {visibleBom.map((row, i) => (
              <tr key={i} className="border-b border-[var(--hairline)]/60">
                <td className="py-2 pr-4 font-mono text-[var(--ink-faint)] whitespace-nowrap">{row.part}</td>
                <td className="py-2">{row.spec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 font-mono text-xs uppercase tracking-wider">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline decoration-1 underline-offset-4 hover:opacity-70">
            View source →
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline decoration-1 underline-offset-4 hover:opacity-70">
            Live demo →
          </a>
        )}
      </div>
    </div>
  )
}

// ---------- Command palette ----------

function CommandPalette({ open, setOpen, jumpItems }) {
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setOpen])

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  if (!open) return null

  const items = [
    ...BASE_JUMP_ITEMS,
    ...jumpItems.map((p, i) => ({ id: p.id, label: `Sheet 0${i + 1} — ${p.title}` })),
    CONTACT_JUMP_ITEM,
  ]

  return (
    <div
      className="fixed inset-0 z-50 bg-[var(--bg)]/80 backdrop-blur-sm flex items-start justify-center pt-28 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md border border-[var(--hairline)] bg-[var(--bg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-faint)] px-4 py-3 border-b border-[var(--hairline)]">
          Jump to sheet — Esc to close
        </div>
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => jump(it.id)}
            className="w-full text-left px-4 py-3 font-mono text-sm hover:bg-[var(--bg-dim)] flex items-center gap-3 border-b border-[var(--hairline)] last:border-0 transition-colors"
          >
            <span className="text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
            {it.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------- App ----------

export default function App() {
  const [track, setTrack] = useState('fullstack')
  const [copied, setCopied] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [notesRef, notesVisible] = useReveal()

  const visibleProjects = PROJECTS.filter((p) => p.track === track)
  const theme = track === 'cyber' ? 'print' : 'draft'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable — link fallback still works
    }
  }

  return (
    <div data-theme={theme}>
      <CursorHUD />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} jumpItems={visibleProjects} />

      {/* Top nav */}
      <header className="sticky top-0 z-20 backdrop-blur bg-[var(--bg)]/85 border-b border-[var(--hairline)]">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <span className="font-mono text-xs tracking-[0.25em] uppercase shrink-0">Y.S.Ü</span>
          <nav className="hidden sm:flex gap-6 font-mono text-xs uppercase tracking-wider text-[var(--ink-faint)]">
            <a href="#notes" className="hover:text-[var(--ink)] transition-colors">Notes</a>
            <a href="#projects" className="hover:text-[var(--ink)] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[var(--ink)] transition-colors">Contact</a>
            <button onClick={() => setPaletteOpen(true)} className="hover:text-[var(--ink)] transition-colors">
              Jump ( / )
            </button>
          </nav>
          <TrackToggle track={track} setTrack={setTrack} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* Hero / title block */}
        <section className="pt-16 sm:pt-24 pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)] mb-4">
            Portfolio — Rev. 02
          </div>
          <h1 className="font-mono font-semibold text-4xl sm:text-6xl leading-[1.05] mb-6 min-h-[1.2em]">
            <Typewriter text={CONFIG.name} />
          </h1>
          <p className="text-lg sm:text-xl text-[var(--ink-faint)] max-w-xl mb-6">{DISCIPLINE[track]}</p>
          <a
            href={CONFIG.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2 mb-10 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
          >
            View CV (PDF) →
          </a>
          <TitleBlock track={track} />
        </section>

        {/* General notes */}
        <section id="notes" className="pb-20">
          <SectionLabel n="A">General notes</SectionLabel>
          <ol ref={notesRef} className={`space-y-4 max-w-2xl list-none reveal ${notesVisible ? 'is-visible' : ''}`}>
            {NOTES.map((note, i) => (
              <li key={i} className="flex gap-4 text-sm sm:text-base leading-relaxed">
                <span className="font-mono text-[var(--accent)] shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className="pb-8">
          <SectionLabel n="B">Projects — {track === 'cyber' ? 'Cyber' : 'Full-Stack'}</SectionLabel>
          {visibleProjects.length === 0 ? (
            <div className="sheet-frame border border-dashed border-[var(--hairline)] p-10 mb-16 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--ink-faint)] mb-2">Sheet 00 of 00</p>
              <p className="text-[var(--ink-faint)]">Cyber sheets in progress — check back soon.</p>
            </div>
          ) : (
            visibleProjects.map((p, i) => (
              <ProjectSheet key={p.id} project={p} sheetIndex={i + 1} sheetTotal={visibleProjects.length} />
            ))
          )}
        </section>

        {/* Contact / approval block */}
        <section id="contact" className="pb-24">
          <SectionLabel n="C">Approval</SectionLabel>
          <div className="border border-[var(--ink)]/70 font-mono text-sm">
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--ink)]/30">
              <button onClick={copyEmail} className="p-6 text-left hover:bg-[var(--bg-dim)] transition-colors">
                <div className="text-[var(--ink-faint)] uppercase text-[10px] tracking-wider mb-2">Email</div>
                <div className="text-[var(--accent)] break-all">{copied ? 'Copied ✓' : CONFIG.email}</div>
              </button>
              <a href={CONFIG.github} target="_blank" rel="noreferrer" className="p-6 hover:bg-[var(--bg-dim)] transition-colors">
                <div className="text-[var(--ink-faint)] uppercase text-[10px] tracking-wider mb-2">GitHub</div>
                <div className="text-[var(--accent)]">{CONFIG.github.replace('https://', '')}</div>
              </a>
              <a href={CONFIG.linkedin} target="_blank" rel="noreferrer" className="p-6 hover:bg-[var(--bg-dim)] transition-colors">
                <div className="text-[var(--ink-faint)] uppercase text-[10px] tracking-wider mb-2">LinkedIn</div>
                <div className="text-[var(--accent)]">{CONFIG.linkedin.replace('https://', '')}</div>
              </a>
            </div>
          </div>
          <a
            href={CONFIG.resumeUrl}
            className="inline-block mt-6 font-mono text-xs uppercase tracking-wider text-[var(--accent)] underline decoration-1 underline-offset-4 hover:opacity-70"
          >
            Download resume (PDF) →
          </a>
        </section>

        <footer className="pb-10 font-mono text-[10px] text-[var(--ink-faint)] uppercase tracking-wider border-t border-[var(--hairline)] pt-6 flex justify-between flex-wrap gap-2">
          <span>{CONFIG.location} — Sheet drafted with care.</span>
          <button onClick={() => setPaletteOpen(true)} className="hover:text-[var(--ink)] transition-colors sm:hidden">
            Press / to jump
          </button>
        </footer>
      </main>
    </div>
  )
}