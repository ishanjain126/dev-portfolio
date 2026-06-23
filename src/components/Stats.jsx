import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'

export default function Stats() {
  const { t } = useTranslation()
  const ref = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const countUp = (el) => {
      const to = parseFloat(el.dataset.to), suf = el.dataset.suf || ''
      if (reduce) { el.innerHTML = to + '<span class="suf">' + suf + '</span>'; return }
      let start = null
      const step = (ts) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / 1200, 1)
        const v = Math.round((1 - Math.pow(1 - p, 3)) * to)
        el.innerHTML = v + '<span class="suf">' + suf + '</span>'
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { host.querySelectorAll('.num').forEach(countUp); io.unobserve(host) } })
    }, { threshold: 0.4 })
    io.observe(host)
    return () => io.disconnect()
  }, [])

  return (
    <div className="wrap">
      <div className="stats" ref={ref}>
        {profile.stats.map((s) => (
          <div className="stat" key={s.id}>
            <div className="num" data-to={s.value} data-suf={s.suffix}>0<span className="suf">{s.suffix}</span></div>
            <div className="cap">{t('stats.' + s.id)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
