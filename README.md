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
  components/              Nav, LanguageSwitcher, Hero, Equalizer, Stats,
                           ExperienceList, CaseStudy, Flow (CSS diagram),
                           Sections (Skills/Projects/Education), Contact,
                           ChatWidget, CommandPalette.
  App.jsx                  Composition + routing.
```

## Editing content

All copy lives in `src/locales/*.json`, keyed by id. Structure (which company,
which icons, metrics, diagram steps) lives in `src/data/profile.json`. To add a
language, drop a new locale file in `src/locales/`, import it in `src/i18n.js`,
and add it to the `LANGS` array. Missing keys automatically fall back to English.

## Diagrams

Every diagram is a data-driven CSS flow (see `components/Flow.jsx`) built from the
`flow` array on each accomplishment in `profile.json` — no SVG. Each step is
`{ icon, t, s, tone }`, where `icon` is a lucide icon name and `tone` is
`""`, `"hot"`, or `"cool"`.

## The AI chat

`ChatWidget` first tries the Anthropic API; if no key/network is available it
answers from the local knowledge base in `lib/kb.js`, so it always responds.
To use the live model in production, proxy the request through a small backend
that injects your API key (never ship a key in the frontend).

## Notes

- Arabic strings are a solid first pass; have a native speaker review before launch.
- Next additions (intentionally left out of this pass): the 3D hero (drop in
  `@react-three/fiber`) and the live-drawing whiteboard canvas.
