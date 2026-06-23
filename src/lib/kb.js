// Offline assistant + online "memory" + navigation hints.
//
// Answer layers, in order:
//   1. learned memory — answers the live model already gave (cached, no tokens).
//   2. curated KB      — hand-written conversational English answers (chatKb.js).
//   3. data-derived    — built from profile.json + the active locale's strings.
//
// It also derives, from the question, a navigation action (open a case study,
// jump to contact, visit Shrohi) and a few follow-up suggestions — so the
// assistant can point people at the right part of the site. All of this works
// the same online and offline; the only thing the live model adds is fresher
// prose, which then gets learned for next time.
import profile from '../data/profile.json'
import i18n from '../i18n.js'
import CHAT_KB from '../data/chatKb.js'

const displayName = (c) => c.name || c.id.charAt(0).toUpperCase() + c.id.slice(1)
const clean = (s) => (s || '').replace(/\*\*/g, '').replace(/\n+/g, ' ').trim()
const norm = (s) => (s || '').toLowerCase().trim().replace(/\s+/g, ' ')
// all word-tokens, no length filter (so 2-char tech terms like "ai"/"3d" survive)
const tokensOf = (s) =>
  (s || '').toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)
// longer tokens for fuzzy similarity scoring
const bigTokens = (s) => tokensOf(s).filter((w) => w.length > 2)

// Match a key as a whole word or a word-stem — never a loose substring.
// "hi" must not match "his"; "migrat" should match "migration".
function keyHit(key, qRaw, toks) {
  if (key.includes(' ')) return qRaw.includes(key)        // phrase
  if (key.length <= 3) return toks.includes(key)          // short → whole word
  return toks.some((w) => w === key || w.startsWith(key)) // longer → word or stem
}
// proper nouns disambiguate hard — weight them above generic words/phrases so
// "tell me about Shrohi" beats the generic "tell me / about" entry.
const PROPER = new Set(['bhanzu', 'avataar', 'stayflexi', 'shrohi', 'shrohione', 'bidflexi', 'jython', 'django', 'ivs', 'vitest', 'playwright', 'dynamodb', 'niit', 'avataar.ai'])
const keyWeight = (key) => (PROPER.has(key) ? 5 : key.includes(' ') ? 2 : 3)

/* ---------------- 1. learned memory (online answers) ---------------- */
const LS_LEARNED = 'ij.learned'
function loadLearned() {
  try { const a = JSON.parse(localStorage.getItem(LS_LEARNED) || '[]'); return Array.isArray(a) ? a : [] } catch (e) { return [] }
}
function saveLearned(arr) {
  try { localStorage.setItem(LS_LEARNED, JSON.stringify(arr.slice(-300))) } catch (e) { /* private mode / full */ }
}
export function recordAnswer(q, a, lang) {
  const nq = norm(q)
  if (!nq || !a) return
  const arr = loadLearned().filter((e) => !(e.q === nq && e.lang === lang))
  arr.push({ q: nq, a, lang, t: Date.now() })
  saveLearned(arr)
}
function jaccard(aTokens, bSet) {
  if (!aTokens.length || !bSet.size) return 0
  let inter = 0
  for (const w of aTokens) if (bSet.has(w)) inter++
  return inter / (aTokens.length + bSet.size - inter)
}
export function learnedAnswer(q, lang) {
  const nq = norm(q)
  if (!nq) return null
  const arr = loadLearned()
  const exact = arr.find((e) => e.q === nq && e.lang === lang)
  if (exact) return exact.a
  const qt = bigTokens(nq)
  let best = null, bs = 0
  for (const e of arr) {
    if (e.lang !== lang) continue
    const sim = jaccard(qt, new Set(bigTokens(e.q)))
    if (sim > bs) { bs = sim; best = e }
  }
  return bs >= 0.72 ? best.a : null
}

/* ---------------- 2. curated conversational KB (English) ---------------- */
function kbAnswer(q) {
  const qRaw = ' ' + norm(q) + ' '
  const toks = tokensOf(q)
  let best = null, bs = 0
  for (const e of CHAT_KB) {
    let s = 0
    for (const k of e.k) { const lk = k.toLowerCase(); if (keyHit(lk, qRaw, toks)) s += keyWeight(lk) }
    if (s > bs) { bs = s; best = e } // first entry wins ties → specific beats generic
  }
  return (best && bs >= 3) ? best.a : null
}

/* ---------------- 3. data-derived, localized (non-English / fallback) ---------------- */
const VER = '5'
function buildCorpus(t) {
  const E = []
  const add = (keys, text) => { const tx = clean(text); if (tx) E.push({ keys: keys.map((k) => k.toLowerCase()), text: tx }) }

  add(['who', 'about', 'ishan', 'overview', 'introduce', 'tell'], t('hero.lede'))
  for (const c of profile.companies) {
    const name = displayName(c)
    add([c.id, name, 'experience', 'work', 'company', 'role', 'job'],
      `${t('companies.' + c.id + '.role')} · ${name}. ${t('companies.' + c.id + '.summary')}`)
    for (const a of c.accomplishments) {
      const base = 'case.' + c.id + '.' + a.id + '.'
      add([c.id, name, a.id], `${t(base + 'title')} — ${t(base + 'note')}`)
    }
  }
  for (const g of profile.skills) add(['skill', 'skills', 'stack', 'tech', g.id], `${t('skills.' + g.id)}: ${g.tags.join(', ')}.`)
  add(['shrohi', 'shrohione', 'saas', 'boutique', 'side hustle'], t('projects.shrohi.desc'))
  const edu = profile.education[0]
  add(['education', 'degree', 'college', 'university', 'niit', 'study', 'cgpa'],
    `${t('education.' + edu.id + '.degree')}, ${t('education.' + edu.id + '.school')} (${edu.period}, ${edu.score}).`)
  add(['contact', 'email', 'reach', 'hire', 'hiring', 'available', 'role', 'phone', 'linkedin', 'github'],
    `${t('contact.eyebrow')} — ${profile.contact.email} · ${profile.contact.phone}.`)
  return E
}
function getCorpus(t, lang) {
  const key = 'ij.ctx.' + lang
  try { const o = JSON.parse(localStorage.getItem(key) || 'null'); if (o && o.v === VER && Array.isArray(o.e)) return o.e } catch (e) { /* ignore */ }
  const e = buildCorpus(t)
  try { localStorage.setItem(key, JSON.stringify({ v: VER, e })) } catch (err) { /* ignore */ }
  return e
}
function dataAnswer(q, t, lang) {
  const corpus = getCorpus(t, lang)
  const qRaw = ' ' + norm(q) + ' '
  const toks = tokensOf(q)
  const qBig = bigTokens(q)
  let best = null, bs = 0
  for (const e of corpus) {
    let s = 0
    for (const k of e.keys) if (keyHit(k, qRaw, toks)) s += keyWeight(k)
    const et = new Set(bigTokens(e.text))
    for (const w of qBig) if (et.has(w)) s += 1
    if (s > bs) { bs = s; best = e }
  }
  return (best && bs >= 3) ? best.text : null
}

/* ---------------- navigation hints (where to send the visitor) ---------------- */
const ROUTES = [
  { keys: ['bhanzu'], kind: 'case', target: 'bhanzu', label: 'Open the Bhanzu case study' },
  { keys: ['avataar'], kind: 'case', target: 'avataar', label: 'Open the Avataar.ai case study' },
  { keys: ['stayflexi'], kind: 'case', target: 'stayflexi', label: 'Open the Stayflexi case study' },
  { keys: ['shrohi', 'shrohione'], kind: 'link', target: 'https://shrohione.in', label: 'Visit shrohione.in →' },
  { keys: ['contact', 'email', 'reach', 'hire', 'hiring', 'available', 'role', 'recruit', 'open to', 'freelance', 'consult'], kind: 'scroll', target: 'contact', label: 'Jump to contact' },
  { keys: ['skill', 'stack', 'tech', 'toolkit', 'framework'], kind: 'scroll', target: 'skills', label: 'See the full toolkit' },
  { keys: ['education', 'degree', 'university', 'niit'], kind: 'scroll', target: 'education', label: 'See education' },
]
export function suggestAction(q) {
  const qRaw = ' ' + norm(q) + ' '
  const toks = tokensOf(q)
  for (const r of ROUTES) if (r.keys.some((k) => keyHit(k, qRaw, toks))) return { kind: r.kind, target: r.target, label: r.label }
  return null
}

const FOLLOW = {
  bhanzu: ['How did he replace Zoom?', 'Tell me about the whiteboard', "What's the backend stack?"],
  avataar: ['What 3D tooling did he build?', 'How did he speed up rendering?'],
  stayflexi: ['What is Bidflexi?', 'How did he scale to 1,000+ hotels?'],
  shrohi: ['What does Shrohi do?', 'Is it live yet?'],
  contact: ['Is he open to roles?', 'Where is he based?'],
  default: ['What does he do at Bhanzu?', "What's his stack?", 'Is he open to roles?'],
}
export function followUps(q) {
  const qRaw = ' ' + norm(q) + ' '
  const toks = tokensOf(q)
  for (const id of ['bhanzu', 'avataar', 'stayflexi']) if (keyHit(id, qRaw, toks)) return FOLLOW[id]
  if (keyHit('shrohi', qRaw, toks)) return FOLLOW.shrohi
  if (['contact', 'email', 'hire', 'role', 'available', 'freelance'].some((k) => keyHit(k, qRaw, toks))) return FOLLOW.contact
  return FOLLOW.default
}

/* ---------------- orchestration ---------------- */
export function localAnswer(q, t) {
  const tt = t || i18n.t.bind(i18n)
  const lang = i18n.language || 'en'
  if (!norm(q)) return tt('chat.fallback')

  const learned = learnedAnswer(q, lang)
  if (learned) return learned

  if (lang === 'en') { const a = kbAnswer(q); if (a) return a }
  const a2 = dataAnswer(q, tt, lang)
  if (a2) return a2
  if (lang !== 'en') { const a3 = kbAnswer(q); if (a3) return a3 }

  return tt('chat.fallback')
}

/* ---------------- export the learned memory to a file ---------------- */
export function exportChatMemory() {
  const data = JSON.stringify(loadLearned(), null, 2)
  try {
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'chat-memory.json'; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch (e) { /* non-browser */ }
  return data
}
if (typeof window !== 'undefined') window.exportChatMemory = exportChatMemory
