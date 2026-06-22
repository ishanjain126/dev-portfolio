import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'
import Icon from '../lib/icons.jsx'

export default function ExperienceList({ onOpen }) {
  const { t } = useTranslation()
  return (
    <section className="section" id="experience">
      <h2 className="section-title">{t('sections.experience')}</h2>
      <div className="cards">
        {profile.companies.map((c) => (
          <button className="card" key={c.id} onClick={() => onOpen(c.id)}>
            <div className="card-top">
              <span className="card-ic"><Icon name={c.icon} size={22} /></span>
              <div className="card-head">
                <h3>{c.id === 'avataar' ? 'Avataar.ai' : c.id.charAt(0).toUpperCase() + c.id.slice(1)}</h3>
                <span className="card-role">{t('companies.' + c.id + '.role')}</span>
              </div>
              <span className="card-meta">{c.meta}</span>
            </div>
            <p className="card-summary">{t('companies.' + c.id + '.summary')}</p>
            <div className="card-pills">
              {c.pills.map((p) => <span className="pill" key={p}>{p}</span>)}
            </div>
            <span className="card-cta">{t('openCase')} <Icon name="ArrowRight" size={15} /></span>
          </button>
        ))}
      </div>
    </section>
  )
}
