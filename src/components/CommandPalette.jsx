import { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'
import Icon from '../lib/icons.jsx'

export default function CommandPalette({ open, setOpen, onNavigate, onChat }) {
  const { t } = useTranslation()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  const commands = useMemo(() => [
    { id: 'home', icon: 'Command', label: t('palette.home'), run: () => onNavigate('/') },
    { id: 'bhanzu', icon: 'Boxes', label: t('palette.bhanzu'), run: () => onNavigate('/case/bhanzu') },
    { id: 'avataar', icon: 'Box', label: t('palette.avataar'), run: () => onNavigate('/case/avataar') },
    { id: 'stayflexi', icon: 'Building2', label: t('palette.stayflexi'), run: () => onNavigate('/case/stayflexi') },
    { id: 'chat', icon: 'MessageCircle', label: t('palette.chat'), run: () => onChat() },
    { id: 'email', icon: 'Mail', label: t('palette.email'), run: () => navigator.clipboard && navigator.clipboard.writeText(profile.contact.email) },
    { id: 'linkedin', icon: 'Linkedin', label: t('palette.linkedin'), run: () => window.open(profile.contact.linkedin, '_blank') },
    { id: 'github', icon: 'Github', label: t('palette.github'), run: () => window.open(profile.contact.github, '_blank') },
  ], [t, onNavigate, onChat])

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      else if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 50) } }, [open])

  if (!open) return null

  const run = (c) => { setOpen(false); c.run() }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
    else if (e.key === 'Enter' && filtered[sel]) run(filtered[sel])
  }

  return (
    <div className="palette-overlay" onClick={() => setOpen(false)}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <Icon name="Search" size={17} />
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setSel(0) }} onKeyDown={onKeyDown} placeholder={t('palette.placeholder')} />
        </div>
        <ul className="palette-list">
          {filtered.map((c, i) => (
            <li key={c.id}>
              <button className={'pitem' + (i === sel ? ' sel' : '')} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                <Icon name={c.icon} size={16} /> <span>{c.label}</span>
              </button>
            </li>
          ))}
          {!filtered.length && <li className="palette-empty">—</li>}
        </ul>
        <div className="palette-hint">{t('palette.hint')}</div>
      </div>
    </div>
  )
}
