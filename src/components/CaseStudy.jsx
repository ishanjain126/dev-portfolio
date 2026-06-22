import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'
import Flow from './Flow.jsx'
import Icon from '../lib/icons.jsx'

export default function CaseStudy({ companyId, onBack, onOpen }) {
  const { t } = useTranslation()
  const idx = profile.companies.findIndex((c) => c.id === companyId)
  const c = profile.companies[idx]
  if (!c) return null
  const next = profile.companies[(idx + 1) % profile.companies.length]
  const name = c.id === 'avataar' ? 'Avataar.ai' : c.id.charAt(0).toUpperCase() + c.id.slice(1)
  const nextName = next.id === 'avataar' ? 'Avataar.ai' : next.id.charAt(0).toUpperCase() + next.id.slice(1)

  return (
    <article className="case">
      <button className="case-back" onClick={onBack}>
        <Icon name="ArrowRight" size={15} className="flip" /> {t('case.back')}
      </button>

      <header className="case-head">
        <span className="case-ic"><Icon name={c.icon} size={26} /></span>
        <div>
          <h1>{name}</h1>
          <span className="case-role">{t('companies.' + c.id + '.role')} · {c.meta}</span>
        </div>
      </header>
      <p className="case-intro">{t('case.' + c.id + '.intro')}</p>

      <div className="accs">
        {c.accomplishments.map((a) => (
          <section className="acc" key={a.id}>
            <div className="acc-head">
              <span className="acc-ic"><Icon name={a.icon} size={20} /></span>
              <div>
                <h3>{t('case.' + c.id + '.' + a.id + '.title')}</h3>
                <span className="acc-metric">{a.metric}</span>
              </div>
            </div>
            <p className="acc-body">{t('case.' + c.id + '.' + a.id + '.body')}</p>
            <Flow nodes={a.flow} />
            <div className="acc-note">
              <span className="acc-note-label">{t('case.plain')}</span>
              <p>{t('case.' + c.id + '.' + a.id + '.note')}</p>
            </div>
          </section>
        ))}
      </div>

      <button className="case-next" onClick={() => onOpen(next.id)}>
        <span>{t('case.next')}</span>
        <strong>{nextName} <Icon name="ArrowRight" size={16} /></strong>
      </button>
    </article>
  )
}
