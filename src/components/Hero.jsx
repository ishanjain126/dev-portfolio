import { useTranslation } from 'react-i18next'
import Equalizer from './Equalizer.jsx'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero">
      <span className="hero-status"><span className="pulse" /> {t('hero.status')}</span>
      <h1>
        Ishan Jain
        <span className="hero-role">{t('hero.role')}</span>
      </h1>
      <p className="lede">{t('hero.lede')}</p>
      <Equalizer />
    </section>
  )
}
