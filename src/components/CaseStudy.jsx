import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'
import diagramFor from '../data/diagrams.js'
import Diagram, { fitSvgText } from './Diagram.jsx'
import Whiteboard from './Whiteboard.jsx'

const displayName = (c) => c.name || c.id.charAt(0).toUpperCase() + c.id.slice(1)

function rich(text) {
  return String(text).split('\n\n').map((para, pi) => (
    <p key={pi}>{para.split('**').map((seg, i) => (i % 2 ? <b key={i}>{seg}</b> : seg))}</p>
  ))
}

export default function CaseStudy({ companyId, onBack, onOpen }) {
  const { t } = useTranslation()
  const [zoom, setZoom] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoom(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [zoom])

  const idx = profile.companies.findIndex((c) => c.id === companyId)
  const c = profile.companies[idx]
  if (!c) return null
  const last = profile.companies.length - 1
  const prev = idx === 0
    ? { k: '← Back', v: 'All experience', go: onBack }
    : { k: '← Previous', v: displayName(profile.companies[idx - 1]), go: () => onOpen(profile.companies[idx - 1].id) }
  const next = idx === last
    ? { k: 'Done →', v: 'Back to home', go: onBack }
    : { k: 'Next →', v: displayName(profile.companies[idx + 1]), go: () => onOpen(profile.companies[idx + 1].id) }

  const base = (a) => 'case.' + c.id + '.' + a.id + '.'

  return (
    <>
      <div className="wrap detail">
        <button className="back" onClick={onBack}>← {t('case.back')}</button>
        <div className="co-hero reveal">
          <div className="kicker">{c.kicker}</div>
          <h1>{displayName(c)}</h1>
          <div className="role-line">{t('companies.' + c.id + '.role')}</div>
          <div className="dates">{c.dates}</div>
          <p className="intro">{t('case.' + c.id + '.intro')}</p>
        </div>
      </div>

      <div className="wrap">
        {c.accomplishments.map((a, i) => (
          <div key={a.id}>
            <article className={'acc reveal' + (i % 2 ? ' flip' : '')}>
              <div className="acc-grid">
                <div>
                  <div className="num-tag">{String(i + 1).padStart(2, '0')} · {t(base(a) + 'cat').toUpperCase()}</div>
                  <h3>{t(base(a) + 'title')}</h3>
                  {rich(t(base(a) + 'body'))}
                  <div className="metric">{a.metric}</div>
                </div>
                <Diagram
                  cap={t(base(a) + 'diagram')}
                  body={diagramFor(c.id, a.id)}
                  plainLabel={t('case.plain')}
                  note={t(base(a) + 'note')}
                  onZoom={setZoom}
                />
              </div>
            </article>
            {c.id === 'bhanzu' && a.id === 'streaming' && <Whiteboard />}
          </div>
        ))}

        <div className="co-nav reveal">
          <button className="prev" onClick={prev.go}><div className="k">{prev.k}</div><div className="v">{prev.v}</div></button>
          <button className="next" onClick={next.go}><div className="k">{next.k}</div><div className="v">{next.v}</div></button>
        </div>
      </div>

      {zoom && (
        <div className="lightbox open" onClick={(e) => { if (e.target === e.currentTarget) setZoom(null) }}>
          <div className="lightbox-inner" ref={(el) => el && requestAnimationFrame(() => fitSvgText(el))}>
            <button className="lightbox-close" onClick={() => setZoom(null)} aria-label="Close">✕</button>
            <span className="cap">{zoom.cap}</span>
            <div dangerouslySetInnerHTML={{ __html: zoom.body }} />
            <p className="dia-note"><b>{zoom.plainLabel}</b>{zoom.note}</p>
            <div className="lb-hint">Click outside or press Esc to close</div>
          </div>
        </div>
      )}
    </>
  )
}
