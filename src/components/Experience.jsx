import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'

const displayName = (c) => c.name || c.id.charAt(0).toUpperCase() + c.id.slice(1)

export default function Experience({ onOpen }) {
  const { t } = useTranslation()
  return (
    <section className="block" id="experience"><div className="wrap">
      <div className="head reveal"><h2>Where I've built</h2><span className="idx">01 / experience</span></div>
      <div className="co-list">
        {profile.companies.map((c) => (
          <button className="co-card reveal" key={c.id} onClick={() => onOpen(c.id)}>
            <div className="co-top">
              <div>
                <h3>{displayName(c)}</h3>
                <div className="co-role">{t('companies.' + c.id + '.role')}</div>
              </div>
              <div className="co-meta">{c.meta}</div>
            </div>
            <p className="co-sum">{t('companies.' + c.id + '.summary')}</p>
            <div className="pills">{c.pills.map((p) => <span key={p}>{p}</span>)}</div>
            <span className="go">{t('openCase')} <span className="arr">→</span></span>
          </button>
        ))}
      </div>
    </div></section>
  )
}
