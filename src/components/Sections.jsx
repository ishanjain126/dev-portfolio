import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'
import Icon from '../lib/icons.jsx'

export function Skills() {
  const { t } = useTranslation()
  return (
    <section className="section" id="skills">
      <h2 className="section-title">{t('sections.skills')}</h2>
      <div className="skills">
        {profile.skills.map((g) => (
          <div className="skill-group" key={g.id}>
            <h4>{t('skills.' + g.id)}</h4>
            <div className="tags">
              {g.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Projects() {
  const { t } = useTranslation()
  return (
    <section className="section" id="projects">
      <h2 className="section-title">{t('sections.projects')}</h2>
      <div className="projects">
        {profile.projects.map((p) => (
          <a className="project" key={p.id} href={p.url} target="_blank" rel="noreferrer">
            <div className="project-head">
              <h3>Shrohi Boutique Platform</h3>
              <span className="project-tag">{t('projects.' + p.id + '.tagline')}</span>
            </div>
            <p>{t('projects.' + p.id + '.desc')}</p>
            <div className="card-pills">{p.stack.map((s) => <span className="pill" key={s}>{s}</span>)}</div>
            <span className="project-link">{p.label} <Icon name="ArrowRight" size={14} /></span>
          </a>
        ))}
      </div>
    </section>
  )
}

export function Education() {
  const { t } = useTranslation()
  return (
    <section className="section" id="education">
      <h2 className="section-title">{t('sections.education')}</h2>
      {profile.education.map((e) => (
        <div className="edu" key={e.id}>
          <div>
            <h3>{t('education.' + e.id + '.degree')}</h3>
            <span>{t('education.' + e.id + '.school')}</span>
          </div>
          <div className="edu-meta">
            <span>{e.period}</span>
            <strong>{e.score}</strong>
          </div>
        </div>
      ))}
    </section>
  )
}
