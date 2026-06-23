import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { localAnswer, recordAnswer, learnedAnswer, suggestAction, followUps } from '../lib/kb.js'

// Injected at build time from the ANTHROPIC_API_KEY env var (see vite.config.js).
const API_KEY = import.meta.env.ANTHROPIC_API_KEY || ''

const SYS = "You are the portfolio assistant for Ishan Jain, a Senior Software Engineer (5+ yrs, Bengaluru). Reply in the SAME language the user writes in. Answer in third person, warm and concise (2-4 sentences), using only these facts. Bhanzu (Apr 2025+, SDE3): Amazon IVS live classroom replacing Zoom (~50% cheaper, 50,000+ monthly sessions), real-time WebSocket whiteboard (+30% engagement), Python/Flask/DynamoDB layered backend, RAG-grounded AI features, microfrontend React+TS platform, Playwright+Vitest (~50% fewer prod issues). Avataar.ai (Jul 2024-Mar 2025): Three.js + React Three Fiber 3D tooling (~50% faster), render/frontend perf +40-50%. Stayflexi (2021-2024, Senior SE): Bidflexi booking engine, React Native POS, scaled PMS+OTA to 1,000+ hotels, Jython->Django, +75% frontend perf. Project: Shrohi (shrohione.in) — his own all-in-one SaaS for MSME fashion boutiques (orders, customers, payments, custom workflows), built solo on AWS serverless, live with a paying client. Education: B.Tech CS, NIIT University 2017-2021, CGPA 8.0. Open to senior/full-stack/real-time/AI roles. Contact jain.ishan126@gmail.com. If unknown, say so and suggest emailing him."

export default function ChatWidget({ open, setOpen, onAction }) {
  const { t, i18n } = useTranslation()
  const [msgs, setMsgs] = useState([])
  const [busy, setBusy] = useState(false)
  // null = unknown, true = live model reachable, false = answering from local data
  const [online, setOnline] = useState(API_KEY ? null : false)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const history = useRef([])

  useEffect(() => { if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [msgs, open])
  useEffect(() => { if (open) setTimeout(() => inputRef.current && inputRef.current.focus(), 250) }, [open])

  const ask = async (q) => {
    if (!q || busy) return
    const lang = i18n.language || 'en'
    setMsgs((m) => [...m, { role: 'user', text: q }])
    history.current.push({ role: 'user', content: q })
    setBusy(true)
    let text = ''
    // 1) Reuse a previously-learned answer — no token spend.
    const memo = learnedAnswer(q, lang)
    if (memo) text = memo
    // 2) Otherwise ask the live model, and learn from its answer.
    else if (API_KEY) {
      try {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system: SYS, messages: history.current }),
        })
        if (!r.ok) throw new Error('HTTP ' + r.status)
        const data = await r.json()
        text = ((data && data.content) || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim()
        if (text) { setOnline(true); recordAnswer(q, text, lang) }
      } catch (e) { setOnline(false) }
    }
    // 3) Fall back to the curated / data-derived offline assistant.
    if (!text) text = localAnswer(q, t)
    history.current.push({ role: 'assistant', content: text })
    // derive a navigation action + follow-up suggestions from the question
    setMsgs((m) => [...m, { role: 'bot', text, action: suggestAction(q), next: followUps(q) }])
    setBusy(false)
  }
  const onSend = () => { const v = inputRef.current.value.trim(); inputRef.current.value = ''; ask(v) }

  const statusLabel = online ? t('chat.online') : t('chat.offline')

  return (
    <>
      <button className={'chat-fab' + (open ? ' open' : '')} type="button" onClick={() => setOpen((o) => !o)} aria-label="Ask the AI about Ishan">
        <svg className="ic-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" /></svg>
        <svg className="ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        <span className="fab-label">{t('chat.open')}</span>
      </button>
      <div className={'chat-panel' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="ask-head">
          <div className="av">IJ</div>
          <div>
            <div className="t">{t('chat.title')}</div>
            <div className="s"><span className={'st-dot ' + (online ? 'on' : 'off')} /> {statusLabel}</div>
          </div>
          <button className="chat-x" type="button" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>
        <div className="ask-body" ref={bodyRef}>
          <div className="msg bot"><div className="bcol"><div className="b">{t('chat.greeting')}</div></div></div>
          {msgs.map((m, i) => (
            <div className={'msg ' + m.role} key={i}>
              <div className="bcol">
                <div className="b">{m.text}</div>
                {m.action && (
                  <button className="msg-action" type="button" onClick={() => { onAction && onAction(m.action); setOpen(false) }}>
                    {m.action.label} →
                  </button>
                )}
                {/* follow-ups only under the latest answer, so they don't pile up */}
                {m.role === 'bot' && i === msgs.length - 1 && m.next && m.next.length > 0 && (
                  <div className="msg-next">
                    {m.next.map((s, j) => <button key={j} type="button" onClick={() => ask(s)}>{s}</button>)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {busy && <div className="msg bot"><div className="bcol"><div className="b"><span className="dots"><span /><span /><span /></span></div></div></div>}
        </div>
        {/* starter prompts only before the conversation begins */}
        {msgs.length === 0 && (
          <div className="ask-sugg">
            {['s1', 's2', 's3'].map((s) => <button key={s} type="button" onClick={() => ask(t('chat.' + s))}>{t('chat.' + s)}</button>)}
          </div>
        )}
        <div className="ask-input">
          <input ref={inputRef} type="text" placeholder={t('chat.placeholder')} autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSend() } }} disabled={busy} />
          <button type="button" onClick={onSend} disabled={busy} aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg></button>
        </div>
      </div>
    </>
  )
}
