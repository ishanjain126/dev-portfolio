import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'

export function Skills() {
  const { t } = useTranslation()
  return (
    <section className="block" id="skills"><div className="wrap">
      <div className="head reveal"><h2>The toolkit</h2><span className="idx">02 / skills</span></div>
      <div className="skillgrid">
        {profile.skills.map((g) => (
          <div className="skillcard reveal" key={g.id}>
            <h3><span className="k">›</span> {t('skills.' + g.id).toUpperCase()}</h3>
            <div className="tags">{g.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          </div>
        ))}
      </div>
    </div></section>
  )
}

export function Project() {
  const { t } = useTranslation()
  const p = profile.projects[0]
  return (
    <section className="block" id="projects"><div className="wrap">
      <div className="head reveal"><h2>Selected work</h2><span className="idx">03 / projects</span></div>
      <div className="project reveal">
        <div>
          <h3>Shrohi Boutique Platform</h3>
          <div className="tagline">{t('projects.' + p.id + '.tagline')}</div>
          <p>{t('projects.' + p.id + '.desc')}</p>
          <a className="live" href={p.url} target="_blank" rel="noopener noreferrer"><span className="dot" /> {p.label}</a>
        </div>
        <div className="pvis">
          <div className="pwin">
            <div className="pwin-bar">
              <span className="pwd r" /><span className="pwd y" /><span className="pwd g" />
              <span className="pwin-t">shrohi · operations</span>
              <span className="plive"><span className="plive-dot" /> live</span>
            </div>
            <div className="pkpis">
              <div className="pk"><b>1,284</b><span>orders</span></div>
              <div className="pk"><b>312</b><span>customers</span></div>
              <div className="pk hot"><b>₹4.8L</b><span>payments</span></div>
            </div>
            <div className="pchart-wrap">
              <svg className="pchart" viewBox="0 0 240 72" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5ad1c8" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#5ad1c8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,58 L30,50 L60,54 L90,40 L120,44 L150,28 L180,30 L210,16 L240,12 L240,72 L0,72 Z" fill="url(#pgrad)" />
                <polyline points="0,58 30,50 60,54 90,40 120,44 150,28 180,30 210,16 240,12" fill="none" stroke="#5ad1c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="240" cy="12" r="3" fill="#5ad1c8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div></section>
  )
}

export function Education() {
  const { t } = useTranslation()
  const e = profile.education[0]
  return (
    <section className="block" id="education"><div className="wrap">
      <div className="head reveal"><h2>Education</h2><span className="idx">04 / education</span></div>
      <div className="edu reveal">
        <div><h3>{t('education.' + e.id + '.degree')}</h3><div className="sub">{t('education.' + e.id + '.school')}</div></div>
        <div className="meta">{e.period}<br /><b>{e.score}</b></div>
      </div>
    </div></section>
  )
}
