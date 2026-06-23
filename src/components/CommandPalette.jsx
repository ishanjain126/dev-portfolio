import { useState, useRef, useEffect, useMemo } from 'react'

export default function CommandPalette({ open, setOpen, onNavigate, onChat }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  const cmds = useMemo(() => [
    { t: 'Open Bhanzu case study', h: 'experience', ic: 'i-puzzle', run: () => onNavigate('/case/bhanzu') },
    { t: 'Open Avataar.ai case study', h: 'experience', ic: 'i-cube', run: () => onNavigate('/case/avataar') },
    { t: 'Open Stayflexi case study', h: 'experience', ic: 'i-hotel', run: () => onNavigate('/case/stayflexi') },
    { t: 'Go home', h: 'overview', ic: 'i-shell', run: () => onNavigate('/') },
    { t: 'Ask the AI about Ishan', h: 'assistant', ic: 'i-ai', run: () => onChat() },
    { t: 'Email Ishan', h: 'jain.ishan126@gmail.com', ic: 'i-doc', run: () => { location.href = 'mailto:jain.ishan126@gmail.com' } },
    { t: 'Call Ishan', h: '+91 99826 59449', ic: 'i-mobile', run: () => { location.href = 'tel:+919982659449' } },
    { t: 'Open LinkedIn', h: 'profile', ic: 'i-user', run: () => window.open('https://www.linkedin.com/in/ishan-jain-b10a77147/', '_blank') },
    { t: 'Open GitHub', h: 'profile', ic: 'i-code', run: () => window.open('https://github.com/ishanjain126', '_blank') },
  ], [onNavigate, onChat])

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim()
    return cmds.filter((c) => (c.t + ' ' + c.h).toLowerCase().includes(s))
  }, [q, cmds])

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 20) }
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => { setSel(0) }, [q])

  if (!open) return null
  const exec = (i) => { if (filtered[i]) { setOpen(false); filtered[i].run() } }

  return (
    <div className="palette open" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="palette-box">
        <input
          ref={inputRef}
          type="text"
          value={q}
          placeholder={'Type a command…  try “bhanzu”, “ask”, “email”'}
          autoComplete="off"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
            else if (e.key === 'Enter') { e.preventDefault(); exec(sel) }
            else if (e.key === 'Escape') setOpen(false)
          }}
        />
        <div className="palette-list">
          {filtered.map((c, i) => (
            <div
              key={c.t}
              className={'pitem' + (i === sel ? ' sel' : '')}
              onClick={() => exec(i)}
              onMouseMove={() => setSel(i)}
            >
              <span className="pi-ic"><svg viewBox="0 0 24 24"><use href={'#' + c.ic} /></svg></span>
              <span className="pi-t">{c.t}</span>
              <span className="pi-h">{c.h}</span>
            </div>
          ))}
        </div>
        <div className="palette-foot"><span>↑↓ navigate</span><span>⏎ select</span><span>esc close</span></div>
      </div>
    </div>
  )
}
