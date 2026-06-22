import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { localAnswer } from '../lib/kb.js'
import Icon from '../lib/icons.jsx'

const SYS = "You are the portfolio assistant for Ishan Jain, a Senior Software Engineer (5+ yrs, Bengaluru). Answer in third person, warm and concise (2-4 sentences), using only these facts. Bhanzu (Apr 2025+, SDE3): Amazon IVS live classroom replacing Zoom (~50% cheaper, 50,000+ monthly sessions), real-time WebSocket whiteboard (+30% engagement), Python/Flask/DynamoDB layered backend, RAG-grounded AI features, microfrontend React+TS platform, Playwright+Vitest (~50% fewer prod issues). Avataar.ai (Jul 2024-Mar 2025): Three.js + React Three Fiber 3D tooling (~50% faster), render/frontend perf +40-50%. Stayflexi (2021-2024, Senior SE): Bidflexi booking engine, React Native POS, scaled PMS+OTA to 1,000+ hotels, Jython->Django, +75% frontend perf. Project: Shrohi (shrohione.in) solo AWS serverless ecommerce. Education: B.Tech CS, NIIT University 2017-2021, CGPA 8.0. Open to senior/full-stack/real-time/AI roles. Contact jain.ishan126@gmail.com. If unknown, say so and suggest emailing him."

export default function ChatWidget({ open, setOpen }) {
  const { t } = useTranslation()
  const [msgs, setMsgs] = useState([])
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const history = useRef([])

  useEffect(() => { if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [msgs, open])
  useEffect(() => { if (open) setTimeout(() => inputRef.current && inputRef.current.focus(), 200) }, [open])

  const ask = async (q) => {
    if (!q || busy) return
    setMsgs((m) => [...m, { role: 'user', text: q }])
    history.current.push({ role: 'user', content: q })
    setBusy(true)
    let text = ''
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system: SYS, messages: history.current }),
      })
      const data = await r.json()
      text = ((data && data.content) || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim()
    } catch (e) { /* falls through to local */ }
    if (!text) text = localAnswer(q)
    history.current.push({ role: 'assistant', content: text })
    setMsgs((m) => [...m, { role: 'bot', text }])
    setBusy(false)
  }

  const onSend = () => { const v = inputRef.current.value.trim(); inputRef.current.value = ''; ask(v) }

  return (
    <>
      <button className={'chat-fab' + (open ? ' open' : '')} onClick={() => setOpen((o) => !o)} aria-label="Ask AI">
        <Icon name={open ? 'X' : 'MessageCircle'} size={22} />
      </button>
      <div className={'chat-panel' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="chat-head">
          <span><span className="chat-dot" /> {t('chat.title')}</span>
          <button onClick={() => setOpen(false)} aria-label="Close"><Icon name="X" size={16} /></button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          <div className="msg bot"><div className="b">{t('chat.greeting')}</div></div>
          {msgs.map((m, i) => <div className={'msg ' + m.role} key={i}><div className="b">{m.text}</div></div>)}
          {busy && <div className="msg bot"><div className="b"><span className="dots"><span /><span /><span /></span></div></div>}
        </div>
        <div className="chat-sugg">
          {['s1', 's2', 's3'].map((s) => <button key={s} onClick={() => ask(t('chat.' + s))}>{t('chat.' + s)}</button>)}
        </div>
        <div className="chat-input">
          <input ref={inputRef} placeholder={t('chat.placeholder')} onKeyDown={(e) => { if (e.key === 'Enter') onSend() }} disabled={busy} />
          <button onClick={onSend} disabled={busy} aria-label="Send"><Icon name="Send" size={16} /></button>
        </div>
      </div>
    </>
  )
}
