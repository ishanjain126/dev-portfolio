import { useEffect, useRef } from 'react'

// Ported from the original: shrink any SVG <text> that overflows its box.
export function fitSvgText(root) {
  if (!root) return
  root.querySelectorAll('.svgdia g').forEach((g) => {
    const rect = g.querySelector('rect.box')
    if (!rect) return
    const bw = parseFloat(rect.getAttribute('width')) - 10
    g.querySelectorAll('text').forEach((tx) => {
      try {
        tx.style.fontSize = ''
        const len = tx.getComputedTextLength()
        if (len > 0 && len > bw) {
          const base = tx.classList.contains('lbl') ? 10 : 8
          tx.style.fontSize = Math.max(5.5, (base * bw) / len).toFixed(2) + 'px'
        }
      } catch (e) { /* ignore */ }
    })
  })
}

const EXPAND = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/></svg>'

export default function Diagram({ cap, body, plainLabel, note, onZoom }) {
  const ref = useRef(null)
  useEffect(() => {
    const run = () => fitSvgText(ref.current)
    requestAnimationFrame(run)
    // fonts can finish loading after first paint; re-fit so measurements are right
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run)
    window.addEventListener('resize', run)
    return () => window.removeEventListener('resize', run)
  }, [body])

  return (
    <div className="dia" ref={ref} onClick={() => onZoom && onZoom({ cap, body, plainLabel, note })}>
      <span className="cap">{cap}</span>
      <span className="expand" aria-hidden="true" dangerouslySetInnerHTML={{ __html: EXPAND }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <p className="dia-note"><b>{plainLabel}</b>{note}</p>
    </div>
  )
}
