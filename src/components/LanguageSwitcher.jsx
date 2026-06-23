import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGS } from '../i18n.js'
import Icon from '../lib/icons.jsx'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

  return (
    <div className="lang" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <Icon name="Languages" size={15} />
        <span>{current.label}</span>
        <Icon name="ChevronDown" size={14} className={'chev' + (open ? ' up' : '')} />
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {LANGS.map((l) => {
            const active = l.code === i18n.language
            return (
              <li key={l.code}>
                <button
                  className={'lang-item' + (active ? ' active' : '')}
                  onClick={() => {
                    // a chosen language is a preference — it persists and beats auto/IP detection
                    try { localStorage.setItem('langPref', l.code) } catch (e) { /* ignore */ }
                    i18n.changeLanguage(l.code)
                    setOpen(false)
                  }}
                  role="option"
                  aria-selected={active}
                >
                  <span>{l.label}</span>
                  {active && <Icon name="Check" size={14} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
