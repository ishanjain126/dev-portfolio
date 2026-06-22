import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import Icon from '../lib/icons.jsx'

export default function Nav({ onHome, onContact, onPalette }) {
  const { t } = useTranslation()
  return (
    <header className="nav">
      <button className="brand" onClick={onHome}>
        <span className="brand-dot" />
        <span className="brand-name">Ishan Jain</span>
        <span className="brand-role">{t('hero.role')}</span>
      </button>
      <nav className="nav-actions">
        <button className="palette-trigger" onClick={onPalette} title="Commands">
          <Icon name="Command" size={14} />
          <span>{t('palette.open')}</span>
        </button>
        <LanguageSwitcher />
        <button className="nav-contact" onClick={onContact}>{t('nav.contact')}</button>
      </nav>
    </header>
  )
}
