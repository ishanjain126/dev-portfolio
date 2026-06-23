# Ishan Jain — Portfolio (React + Vite)

A fast, multilingual portfolio for a senior software engineer. Content is data-driven (JSON), icons come from a real icon library (lucide-react), and the UI translates into five languages with full RTL support for Arabic.

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requires Node 18+.

## What's inside

```
src/
  data/profile.json        Structural content: companies, accomplishments,
                           flow-diagram steps, skills, projects, stats, contact.
  locales/                 Translations — en, it, fr, de, ar (one JSON per language).
  i18n.js                  i18next setup + RTL direction handling.
  lib/icons.js             Maps icon names (strings in JSON) -> lucide-react icons.
  lib/kb.js                Local knowledge base the AI chat falls back to offline.
  hooks/useHashRoute.js    Tiny hash router (home <-> case studies).
  components/              Nav, LanguageSwitcher, Hero, Hero3D (Three.js),
                           Equalizer, Stats, ExperienceList, SystemConsole,
                           CaseStudy, Flow (CSS diagrams), Whiteboard +
                           WebSocketExplainer, Sections (Skills/Projects/
                           Education), Contact, ChatWidget, CommandPalette,
                           ScrollProgress, Reveal (scroll-in wrapper).
  App.jsx                  Composition + routing.
```

## Motion & feel

- A top **scroll-progress bar** (`ScrollProgress`) and **reveal-on-scroll** fade-ups
  (`Reveal`, IntersectionObserver) — both no-ops under `prefers-reduced-motion`.
- Layered radial background gradients, an `h1` line-rise entrance, and pulsing ring dots.
- A **"System check" console** (`SystemConsole`) that flexes live runtime metrics — FPS is
  measured for real via `requestAnimationFrame`; the rest are honest, plain-language readouts.
- Case-study diagrams include a spinning **CSS 3D cube** (Three.js work) and **animated
  before/after perf bars**, and every diagram is **click-to-zoom** into a fullscreen lightbox.

## The 3D hero

`components/Hero3D.jsx` is a self-contained Three.js scene (raw `three`, no React
wrapper lib): a wireframe icosahedron in the signal-orange accent inside a shell of
additive orange particles, both reacting to the cursor. It caps `devicePixelRatio`
at 2, handles resize, honors `prefers-reduced-motion` (static render, no auto-spin),
and disposes all geometries/materials/renderer on unmount.

## The whiteboard demo

On the Bhanzu case study, `components/Whiteboard.jsx` renders two canvases: you draw
on the left with mouse or touch, and each stroke segment is replayed on the right
"peer" board after a ~120 ms delay to simulate a network hop. Canvases are only sized
when visible (a `display:none` canvas reports zero width). The "Wanna know how it
worked?" toggle reveals `WebSocketExplainer.jsx` — a CSS flow plus a plain-language
explanation of the WebSocket upgrade handshake.

## Editing content

All copy lives in `src/locales/*.json`, keyed by id. Structure (which company,
which icons, metrics, diagram steps) lives in `src/data/profile.json`. To add a
language, drop a new locale file in `src/locales/`, import it in `src/i18n.js`,
and add it to the `LANGS` array. Missing keys automatically fall back to English.

### Auto language by location

On first visit (before the visitor has picked a language in the switcher), the app
auto-selects one of the supported languages from where the computer is:

1. **Instant, offline** — `src/lib/detectLang.js` maps the OS **timezone → country →
   language** (falling back to the browser's preferred language, then English). This
   sets the initial render with no network call or permission prompt.
2. **Refine by IP** — `src/hooks/useAutoLanguage.js` then does a best-effort
   IP-country lookup (`get.geojs.io`, no key) and corrects the language if the
   country maps to a different one. Any network/CORS failure is ignored.

A saved **`langPref`** in `localStorage` always wins and **supersedes the IP lookup**:
it's written both when the user picks a language in the switcher and once auto-detection
resolves, so a chosen (or already-resolved) language sticks and the IP call never runs
again. The switcher shows the active language with a check + highlight. (The IP lookup
sends the visitor's IP to a third-party geo service — drop the hook from `App.jsx` if
you'd rather stay fully offline; timezone detection still works.)

## Case studies & diagrams

Each case study renders its accomplishments in an alternating two-column layout: a
numbered eyebrow, large title, a two-paragraph body (with `**highlighted**` keywords),
and a metric trend pill on one side; a diagram card with a header label, an expand-to-
fullscreen control, the animated diagram, and an "In plain terms" note on the other.

Every diagram is a data-driven CSS flow (see `components/Flow.jsx`) — no SVG — driven by
the `diagram` object on each accomplishment in `profile.json`. `diagram.kind` selects the
layout: `row` (linear), `col` (vertical stack), `branch` (whiteboard fan-out), `rag`
(offline-prep + pipeline), `tree` (host shell → module federation), or `gate` (CI checks
group). Nodes are `{ icon, t, s, tone }`, where `icon` is a lucide name and `tone` is
`""`, `"hot"` (orange), or `"cool"` (teal). Connector wires carry an animated traveling
dot; hot node chips glow. All animation is disabled under `prefers-reduced-motion`.

Body/title/note/category copy lives in `locales/*.json`; diagram node labels stay in
`profile.json` (they're mostly technical proper nouns).

## The AI chat

`ChatWidget` runs in two modes and shows which one it's in (a live status dot in
the panel header — "online · powered by Claude" vs "offline · answering from
local data"):

- **Online** — if an `ANTHROPIC_API_KEY` is configured, it calls
  `claude-sonnet-4-6` directly from the browser (`anthropic-version`,
  `x-api-key`, and the `anthropic-dangerous-direct-browser-access: true` header).
  Every live answer is **learned** into `localStorage` (`ij.learned`), and before
  each request the widget checks that memory first — so a repeated or
  near-identical question (Jaccard ≥ 0.72) is answered for free, no token spend.
- **Offline** — with no key, a failed request, or no network, it answers from
  `lib/kb.js`, in three layers: (1) the learned memory above; (2) a **curated,
  conversational knowledge base** (`src/data/chatKb.js`) — hand-written, human
  answers, not raw data dumps; (3) a localized data-derived fallback built from
  `profile.json` + the **active locale's** strings (so non-English questions still
  get a localized answer, preferring the concise summaries and plain-terms notes).
- **It navigates** — from the question it derives a relevant action (open the
  Bhanzu/Avataar/Stayflexi case study, jump to contact, visit shrohione.in) and a
  few follow-up suggestion chips, rendered under each answer. Matching is
  word-aware (whole-word / stem, with proper nouns weighted) so "his" never
  triggers "hi" and "tell me about Shrohi" lands on Shrohi, not the generic bio.
  All of this works offline too.
- **Export the memory** — run `exportChatMemory()` in the browser console to
  download `chat-memory.json` (the learned Q&A), e.g. to review it or fold good
  answers back into `chatKb.js`.

To enable the live model, set the key before running:

```bash
echo 'ANTHROPIC_API_KEY=sk-ant-...' >> .env   # or export it in your shell
npm run dev
```

⚠️ **This bundles the key into the client build** (Vite `define` in
`vite.config.js`). That's fine for local/personal use, but it's visible to
anyone who loads the page — for a public production deploy, **leave the key
unset** (the widget still works fully offline) and proxy the model through a
small backend that injects the key server-side.

## Notes

- Arabic strings are a solid first pass; **have a native speaker review before launch.**
  Technical proper nouns (WebSocket, HTTPS, Amazon IVS, React Native, Django, Three.js,
  DynamoDB, GitHub, LinkedIn) are intentionally kept in Latin script inside Arabic copy.
- Never ship an Anthropic API key in the frontend — the chat widget tries the live model
  but falls back to the offline knowledge base, so for production proxy the request through
  a small backend that injects the key server-side.
