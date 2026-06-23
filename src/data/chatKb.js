// Curated, conversational answers for the offline assistant (English).
// This is the file the assistant "answers from" when there's no live model.
// Keys are matched as whole words / word-stems (see keyHit in kb.js), so short
// keys like "hi" won't match "his". Entries are ordered specific → generic so
// that, on a scoring tie, the more specific entry (earlier) wins.
const CHAT_KB = [
  { k: ['hello', 'hi', 'hey', 'yo', 'hiya', 'greetings', 'sup'],
    a: "Hey! I'm Ishan's assistant 👋 Ask me about his work at Bhanzu, Avataar.ai or Stayflexi, his own SaaS (Shrohi), his stack, or whether he's open to a role." },

  // ---- Bhanzu ----
  { k: ['bhanzu', 'current', 'currently', 'present', 'latest job', 'current job'],
    a: "At Bhanzu (edtech) he's a Senior Software Engineer building the real-time backbone of a live-classroom product. The headlines: he replaced Zoom with a proprietary Amazon IVS streaming platform (~50% cheaper across 50k+ monthly sessions), built a collaborative whiteboard over WebSockets, wired in RAG-grounded AI features, and owns the microfrontend platform behind it all. Want me to go deeper on any one of those?" },
  { k: ['stream', 'ivs', 'zoom', 'video', 'live class', 'broadcast'],
    a: "He swapped Zoom for a classroom he controls end to end on Amazon IVS — the trainer's camera is captured in the browser, compressed into adaptive quality levels and delivered sub-second. That cut streaming spend roughly in half across 50,000+ sessions a month. Think Netflix, but live." },
  { k: ['whiteboard', 'canvas', 'websocket', 'collaborat', 'sync', 'drawing'],
    a: "Every pen stroke becomes a tiny event broadcast over WebSockets and replayed on every screen, with an event log so latecomers can rebuild the board. The teacher writes once and it lands on every student's screen at the same instant — it lifted engagement about 30%. (There's a live demo of this on the Bhanzu case study!)" },
  { k: ['backend', 'flask', 'python', 'dynamo', 'dynamodb', 'server', 'database'],
    a: "The backend's in Python, Flask and DynamoDB on a strict route → service → repository architecture, with access-pattern-first single-table design so reads stay single-digit-millisecond at scale. Clean layers mean any one can be swapped or tested without breaking the others." },
  { k: ['rag', 'ai', 'llm', 'ml', 'openai', 'gpt', 'artificial', 'retrieval', 'hallucinat'],
    a: "He grounds the AI features — lesson summaries, adaptive quizzes, feedback — with Retrieval-Augmented Generation, so answers come from the real curriculum instead of the model's memory. Basically, the AI reads the actual lesson before it answers, so it doesn't make things up." },
  { k: ['microfrontend', 'module federation', 'storybook', 'remotes', 'micro frontend'],
    a: "He structured the frontend as microfrontends — a host shell loads independently-deployed remotes (classroom, assignments, gamification) at runtime, unified by a shared Storybook design system. Different teams ship on their own schedule, but it still feels like one product." },
  { k: ['test', 'playwright', 'vitest', 'quality', 'dashboard'],
    a: "He put a safety net under the dashboards: Vitest unit tests and Playwright end-to-end tests in CI, so a change can't ship unless it passes the full suite and type check. That cut production issues roughly 50%." },

  // ---- Avataar.ai ----
  { k: ['avataar', '3d', 'three d', 'enterprise 3d'],
    a: "At Avataar.ai (enterprise 3D, Jul 2024 – Mar 2025) he built the artist-facing tooling for creating 3D product assets on Three.js + React Three Fiber — and made it fast, roughly halving asset-creation time and improving render/frontend performance 40–50%." },
  { k: ['tooling', 'three', 'threejs', 'react three fiber', 'r3f', 'webgl'],
    a: "He built 3D animation and rendering tools on Three.js, driven declaratively through React Three Fiber — React owns the scene state, Three.js and the GPU draw it. Streamlining the create → preview → export loop cut asset-creation time about 50%." },
  { k: ['perf', 'performance', 'instanc', 'memoiz', 'lazy', 'optimiz', 'fps', 'frame'],
    a: "He profiled the render loop and went after the real costs — geometry instancing to batch draw calls, memoized scene graphs, and lazy loading so the viewport stays responsive while heavy meshes stream in. That bought 40–50% better performance and scalability." },
  { k: ['component', 'architecture', 'primitive', 'reusable', 'compose', 'velocity'],
    a: "He composed the editor from small reusable primitives — controls, materials, loaders — so features get assembled from trusted building blocks instead of copy-pasted. It kept the codebase maintainable and velocity high as it grew." },

  // ---- Stayflexi ----
  { k: ['stayflexi', 'hotel', 'hospitality', 'yc'],
    a: "At Stayflexi (YC-backed hospitality SaaS, 2021–24) he was a Senior Engineer across the whole platform: he led the Bidflexi booking engine, shipped a React Native POS, scaled PMS & OTA distribution to 1,000+ hotels, and migrated the stack off legacy Jython to Django." },
  { k: ['bidflexi', 'bid', 'auction', 'booking engine', 'pricing'],
    a: "Bidflexi is a dynamic booking engine he led, where guests bid on rooms against a live pricing engine that accepts or counters — a brand-new B2C channel. Guests name their price and the system decides in real time." },
  { k: ['pos', 'react native', 'restaurant', 'ios', 'android', 'point of sale'],
    a: "He architected a cross-platform point-of-sale app in React Native from one TypeScript codebase, opening the restaurant vertical without separate iOS and Android teams. One codebase becomes two real native apps." },
  { k: ['scale', 'scaled', 'thousand', 'pms', 'ota', 'distribution', 'channel'],
    a: "He scaled the PMS and OTA platforms past 1,000 hotels, keeping rooms and rates in sync across every booking channel in near real time. One dashboard keeps a thousand hotels correct everywhere they're sold." },
  { k: ['migrat', 'jython', 'django', 'legacy', 'moderniz'],
    a: "He moved the platform off a dead-end Jython runtime onto Django, then code-split the frontend into route-level chunks — about 75% faster loads. He swapped the engine without stopping the car." },

  // ---- availability / freelance (before Shrohi so "freelance projects" doesn't grab Shrohi) ----
  { k: ['freelance', 'freelancing', 'contract', 'contractor', 'consult', 'part time', 'part-time', 'gig', 'moonlight'],
    a: "Right now he's mostly focused on senior full-time roles (full-stack, real-time and AI), but he's genuinely open to a conversation about interesting freelance or consulting work too. Best way to start that is a quick email — jain.ishan126@gmail.com." },

  // ---- Shrohi ----
  { k: ['shrohi', 'shrohione', 'project', 'side project', 'boutique', 'own product', 'startup', 'saas'],
    a: "Shrohi (shrohione.in) is his own thing — an all-in-one SaaS for MSME fashion boutiques to run orders, customers, payments and fully custom workflows from a single dashboard. He designed, built and runs it solo on AWS serverless; it's already live with a paying client, with more onboarding." },

  // ---- skills / meta ----
  { k: ['skill', 'stack', 'tech', 'technolog', 'language', 'framework', 'tools', 'toolkit'],
    a: "Frontend: React, TypeScript, React Native, Zustand, Three.js and microfrontends. Backend: Python, Flask, FastAPI, Django, serverless and event-driven services. AI: LLM integration, prompt engineering and RAG. Plus AWS (Lambda, IVS, DynamoDB, S3), CI/CD, Playwright and Vitest." },
  { k: ['education', 'degree', 'college', 'university', 'niit', 'study', 'graduat', 'cgpa', 'btech'],
    a: "He's got a B.Tech in Computer Science from NIIT University (2017–2021), CGPA 8.0." },
  { k: ['contact', 'email', 'reach', 'hire', 'hiring', 'available', 'role', 'opportunit', 'phone', 'linkedin', 'github', 'recruit', 'open to'],
    a: "Yep — he's open to senior, full-stack, real-time and AI roles. The easiest way to reach him is jain.ishan126@gmail.com (or +91 99826 59449), and his LinkedIn and GitHub links are on this page." },
  { k: ['location', 'based', 'where', 'city', 'bengaluru', 'bangalore', 'india'],
    a: "He's based in Bengaluru, India." },
  { k: ['experience', 'years', 'how long', 'seniorit'],
    a: "5+ years, spanning edtech, enterprise 3D tooling and hospitality SaaS — currently a Senior Software Engineer (SDE3) at Bhanzu." },
  { k: ['strong', 'best at', 'specialt', 'specialis', 'specializ', 'expert', 'great at', 'good at'],
    a: "His sweet spot is the React ecosystem and frontend systems architecture, paired with real-time infrastructure — live streaming, WebSockets, event-driven backends — and AI integration. Basically the hard, invisible plumbing behind interactive products." },

  // ---- generic "who is he" — LAST so specific topics win ties ----
  { k: ['who', 'about', 'introduce', 'bio', 'overview', 'what does he do', 'what does ishan do', 'tell me'],
    a: "Ishan's a Senior Software Engineer with 5+ years building real-time, full-stack and AI-powered products — live-streaming classrooms, collaborative whiteboards, 3D tooling and LLM features — across edtech, SaaS and hospitality. He's in Bengaluru, currently at Bhanzu. Ask me about any of his roles or his stack!" },
]

export default CHAT_KB
