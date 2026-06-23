import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Ported from the original interactive whiteboard demo: draw on the left, each
// segment replays on the "peer" board after a ~120 ms network hop.
export default function Whiteboard() {
  const { t } = useTranslation()
  const youRef = useRef(null)
  const peerRef = useRef(null)
  const ctxRef = useRef({})
  const [showHow, setShowHow] = useState(false)

  useEffect(() => {
    const you = youRef.current, peer = peerRef.current
    if (!you || !peer) return
    const dpr = window.devicePixelRatio || 1
    const sz = (cv, color) => {
      const w = cv.clientWidth || (cv.parentElement && cv.parentElement.clientWidth) || 300
      cv.width = Math.round(w * dpr); cv.height = Math.round(240 * dpr)
      const ctx = cv.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 2.6; ctx.strokeStyle = color
      return ctx
    }
    const setup = () => { ctxRef.current.you = sz(you, '#ff6a3d'); ctxRef.current.peer = sz(peer, '#5ad1c8') }
    setup()

    let drawing = false
    const pos = (e) => { const r = you.getBoundingClientRect(); const p = (e.touches && e.touches[0]) ? e.touches[0] : e; return { x: p.clientX - r.left, y: p.clientY - r.top } }
    const send = (seg) => setTimeout(() => {
      const cp = ctxRef.current.peer; if (!cp) return
      if (seg.move) { cp.beginPath(); cp.moveTo(seg.x, seg.y) } else { cp.lineTo(seg.x, seg.y); cp.stroke() }
    }, 120)
    const start = (e) => { drawing = true; const p = pos(e); ctxRef.current.you.beginPath(); ctxRef.current.you.moveTo(p.x, p.y); send({ move: true, x: p.x, y: p.y }); if (e.cancelable) e.preventDefault() }
    const move = (e) => { if (!drawing) return; const p = pos(e); ctxRef.current.you.lineTo(p.x, p.y); ctxRef.current.you.stroke(); send({ move: false, x: p.x, y: p.y }); if (e.cancelable) e.preventDefault() }
    const end = () => { drawing = false }

    you.addEventListener('pointerdown', start)
    you.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    you.addEventListener('touchstart', start, { passive: false })
    you.addEventListener('touchmove', move, { passive: false })
    you.addEventListener('touchend', end)
    window.addEventListener('resize', setup)
    return () => {
      you.removeEventListener('pointerdown', start)
      you.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      you.removeEventListener('touchstart', start)
      you.removeEventListener('touchmove', move)
      you.removeEventListener('touchend', end)
      window.removeEventListener('resize', setup)
    }
  }, [])

  const clear = () => {
    const y = youRef.current, p = peerRef.current
    ctxRef.current.you && ctxRef.current.you.clearRect(0, 0, y.width, y.height)
    ctxRef.current.peer && ctxRef.current.peer.clearRect(0, 0, p.width, p.height)
  }

  return (
    <article className="acc reveal" style={{ borderBottom: '1px solid var(--line)', paddingBottom: 0 }}>
      <div className="tryit">
        <div className="th">
          <div><h4>Try the whiteboard sync ✏️</h4><p>{t('wb.hint')}</p></div>
          <div className="btnrow"><button onClick={clear}>{t('wb.clear')}</button></div>
        </div>
        <div className="wb-grid">
          <div className="wb-pane you"><span className="tag"><span className="d" /> {t('wb.you')}</span><canvas ref={youRef} /></div>
          <div className="wb-pane peer"><span className="tag"><span className="d" /> {t('wb.peer')}</span><canvas ref={peerRef} /><span className="wb-latency">~120 ms sync</span></div>
        </div>
        <button className={'wb-toggle' + (showHow ? ' open' : '')} type="button" onClick={() => setShowHow((v) => !v)}>
          {t('wb.how')}<span className="chev">⌄</span>
        </button>
        <div className="wb-explain" hidden={!showHow}>
          <div className="wb-diagram">
            <span className="cap">What happens when you draw</span>
            <div className="cssflow">
              <div className="cf-node">
                <span className="cf-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21l4-4 4 4M14.5 8.5l-4 4-2-2" /></svg></span>
                <div className="cf-t">{t('ws.flow.you')}</div><div className="cf-s">{t('ws.flow.youSub')}</div>
              </div>
              <div className="cf-arrow"><span className="lbl">stroke event</span><span className="wire" /></div>
              <div className="cf-node hot">
                <span className="cf-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2.4" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" /></svg></span>
                <div className="cf-t">{t('ws.flow.server')}</div><div className="cf-s">{t('ws.flow.serverSub')}</div>
              </div>
              <div className="cf-arrow"><span className="lbl">broadcast</span><span className="wire" /></div>
              <div className="cf-node cool">
                <span className="cf-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3 19a6 6 0 0 1 12 0" /><path d="M16 6a3 3 0 0 1 0 6M22 19a6 6 0 0 0-4-5.6" /></svg></span>
                <div className="cf-t">{t('ws.flow.other')}</div><div className="cf-s">{t('ws.flow.otherSub')}</div>
              </div>
            </div>
          </div>
          <div className="wb-ws">
            <h5><span className="wbx-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3" /></svg></span> {t('ws.title')}</h5>
            <p>{t('ws.lead')}</p>
            <ol className="ws-steps">
              <li><b>1 · Handshake</b> {t('ws.step1')}</li>
              <li><b>2 · Agreement</b> {t('ws.step2')}</li>
              <li><b>3 · Live both ways</b> {t('ws.step3')}</li>
            </ol>
          </div>
        </div>
      </div>
    </article>
  )
}
