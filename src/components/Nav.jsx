import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const COMPANIES = [
  { id: 'bhanzu', label: 'Bhanzu' },
  { id: 'avataar', label: 'Avataar' },
  { id: 'stayflexi', label: 'Stayflexi' },
]

export default function Nav({ onHome, onOpen, onPalette, onContact }) {
  const [mac, setMac] = useState(true)
  useEffect(() => {
    setMac(/Mac|iPhone|iPad|iPod/.test((navigator.platform || '') + ' ' + (navigator.userAgent || '')))
  }, [])
  return (
    <nav className="nav"><div className="wrap">
      <button className="brand" onClick={onHome}><span className="dot" /> Ishan Jain</button>
      <div className="right">
        {COMPANIES.map((c) => (
          <button key={c.id} className="ghost hide-sm" onClick={() => onOpen(c.id)}>{c.label}</button>
        ))}
        <button className="cmdk-hint hide-sm" type="button" onClick={onPalette} aria-label="Open command palette">{mac ? '⌘K' : 'Ctrl K'}</button>
        <LanguageSwitcher />
        <button className="ghost" type="button" onClick={onContact}>Contact</button>
      </div>
    </div></nav>
  )
}
