import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import Equalizer from './Equalizer.jsx'

const Hero3D = lazy(() => import('./Hero3D.jsx'))

export default function Hero() {
  const { t } = useTranslation()
  return (
    <header className="hero">
      <Suspense fallback={null}><Hero3D /></Suspense>
      <div className="wrap">
        <span className="status"><span className="dot" /> {t('hero.status')}</span>
        <h1><span className="ln"><span>Ishan</span></span><span className="ln"><span>Jain</span></span></h1>
        <p className="role"><b>{t('hero.role')}</b> — {t('hero.roleSuffix')}</p>
        <p className="lede">{t('hero.lede')}</p>
        <div className="contacts">
          <a className="chip" href="mailto:jain.ishan126@gmail.com" aria-label="Email Ishan"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg><span><span className="lbl">mail</span>&nbsp; jain.ishan126@gmail.com</span></a>
          <a className="chip" href="tel:+919982659449" aria-label="Call Ishan"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" /></svg><span><span className="lbl">tel</span>&nbsp; +91 99826 59449</span></a>
          <a className="chip" href="https://www.linkedin.com/in/ishan-jain-b10a77147/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.65 22 11 22 14.4V21h-4v-5.8c0-1.4-.02-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21H9z" /></svg><span><span className="lbl">in</span>&nbsp; LinkedIn</span></a>
          <a className="chip" href="https://github.com/ishanjain126" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg><span><span className="lbl">gh</span>&nbsp; GitHub</span></a>
        </div>
        <Equalizer />
      </div>
    </header>
  )
}
