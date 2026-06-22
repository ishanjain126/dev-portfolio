const KB = [
  { k: ['hello', 'hi ', 'hey'], a: "Hi! Ask about Ishan's work at Bhanzu, Avataar.ai or Stayflexi, his AI/RAG features, his tech stack, or whether he's open to a role." },
  { k: ['bhanzu', 'current', 'now', 'present'], a: "At Bhanzu (edtech) Ishan is a Software Engineer 3, full-stack, since April 2025. He architected a live-streaming classroom on Amazon IVS that replaced Zoom (~50% cheaper, 50,000+ monthly sessions), a real-time collaborative whiteboard, RAG-grounded AI features, and the microfrontend platform behind them." },
  { k: ['stream', 'ivs', 'zoom', 'video'], a: "Ishan replaced Zoom at Bhanzu with a proprietary classroom on Amazon IVS — video captured in the browser, compressed into adaptive quality levels and delivered sub-second, cutting streaming cost ~50% across 50,000+ monthly sessions." },
  { k: ['whiteboard', 'canvas', 'websocket', 'collaborat'], a: "He built a real-time collaborative whiteboard where each stroke is an event broadcast over WebSockets and replayed on every screen, with an event log so latecomers rebuild the board. It lifted engagement ~30%." },
  { k: ['rag', ' ai', 'llm', 'openai', 'gpt'], a: "Ishan's AI work includes lesson summaries, adaptive quizzes and feedback grounded with RAG, so answers come from the real curriculum. He works with the OpenAI API, prompt engineering and RAG pipelines." },
  { k: ['backend', 'flask', 'python', 'dynamo', 'database'], a: "His backend work is in Python, Flask and DynamoDB on a strict layered architecture (route → service → repository), with single-table design for fast reads at scale." },
  { k: ['avataar', '3d', 'three', 'render'], a: "At Avataar.ai Ishan built 3D animation and rendering tooling on Three.js + React Three Fiber, halving asset-creation time, and improved render and frontend performance 40–50%." },
  { k: ['stayflexi', 'hotel', 'pms', 'ota', 'booking'], a: "At Stayflexi (YC-backed hospitality SaaS) Ishan led the Bidflexi booking engine, shipped a React Native POS, scaled PMS & OTA platforms to 1,000+ hotels, and migrated from Jython to Django." },
  { k: ['skill', 'stack', 'tech', 'language'], a: "His stack: React, TypeScript, React Native, Three.js and microfrontends on the frontend; Python, Flask, FastAPI and Django on the backend; LLM integration and RAG for AI; plus AWS (Lambda, IVS, DynamoDB, S3), CI/CD, Playwright and Vitest." },
  { k: ['experience', 'years', 'how long'], a: "Ishan has 5+ years of experience across edtech, SaaS, enterprise 3D tooling and hospitality, currently a Senior Software Engineer at Bhanzu." },
  { k: ['role', 'hiring', 'available', 'open', 'hire'], a: "Yes — Ishan is open to senior, full-stack, real-time and AI engineering roles. The best way to reach him is jain.ishan126@gmail.com." },
  { k: ['contact', 'email', 'reach', 'linkedin', 'github'], a: "You can reach Ishan at jain.ishan126@gmail.com, and find him on LinkedIn and GitHub via the links on this page." },
  { k: ['education', 'college', 'degree', 'niit'], a: "Ishan holds a B.Tech in Computer Science from NIIT University (2017–2021), CGPA 8.0." },
  { k: ['who', 'about', 'tell me'], a: "Ishan Jain is a Senior Software Engineer with 5+ years building real-time, full-stack and AI-powered products across edtech, SaaS and hospitality. He's based in Bengaluru." },
]

export function localAnswer(q) {
  q = ' ' + (q || '').toLowerCase() + ' '
  let best = null, bs = 0
  for (const e of KB) {
    let s = 0
    for (const kw of e.k) if (q.includes(kw)) s += kw.trim().length > 4 ? 2 : 1
    if (s > bs) { bs = s; best = e }
  }
  return best && bs > 0
    ? best.a
    : "I can tell you about Ishan's work at Bhanzu, Avataar.ai and Stayflexi, his AI/RAG features, his tech stack, or how to reach him — try one of those, or email him at jain.ishan126@gmail.com."
}
