import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../lib/icons.jsx'

const N = 40

export default function Equalizer() {
  const { t } = useTranslation()
  const barsRef = useRef(null)
  const micBtnRef = useRef(null)
  const state = useRef({ vals: [], tgt: [], ripples: [], ptr: { x: -999, on: false }, analyser: null, freq: null, stream: null, raf: 0 })

  useEffect(() => {
    const host = barsRef.current
    if (!host) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = []
    const s = state.current
    s.vals = []; s.tgt = []
    host.innerHTML = ''
    for (let i = 0; i < N; i++) {
      const b = document.createElement('i')
      host.appendChild(b); els.push(b); s.vals.push(8); s.tgt.push(8)
    }
    const rel = (cx) => { const r = host.getBoundingClientRect(); return ((cx - r.left) / r.width) * N }
    const onMove = (e) => { s.ptr.x = rel(e.clientX); s.ptr.on = true }
    const onLeave = () => { s.ptr.on = false }
    const onDown = (e) => { s.ripples.push({ p: Math.round(rel(e.clientX)), t: 0 }) }
    const onTouch = (e) => { if (e.touches[0]) { s.ptr.x = rel(e.touches[0].clientX); s.ptr.on = true } }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('pointerdown', onDown)
    host.addEventListener('touchmove', onTouch, { passive: true })
    host.addEventListener('touchend', onLeave)

    let t0 = 0
    const frame = () => {
      t0 += 0.05
      let mic = null
      if (s.analyser) { s.analyser.getByteFrequencyData(s.freq); mic = s.freq }
      for (let i = 0; i < N; i++) {
        let base
        if (mic) { const idx = Math.floor((i / N) * (s.freq.length * 0.7)); base = 8 + (mic[idx] / 255) * 42 }
        else if (reduce) base = 12
        else base = 11 + Math.sin(t0 + i * 0.5) * 5 + Math.sin(t0 * 0.7 + i * 0.27) * 4
        if (s.ptr.on) { const d = Math.abs(i - s.ptr.x); if (d < 4) base += ((4 - d) / 4) * 26 }
        for (const rp of s.ripples) { const diff = Math.abs(Math.abs(i - rp.p) - rp.t * 1.2); if (diff < 2) base += ((2 - diff) / 2) * 32 * Math.max(0, 1 - rp.t / 13) }
        s.tgt[i] = Math.max(6, Math.min(46, base))
      }
      for (let r = s.ripples.length - 1; r >= 0; r--) { s.ripples[r].t += 0.6; if (s.ripples[r].t > 15) s.ripples.splice(r, 1) }
      for (let i = 0; i < N; i++) { s.vals[i] += (s.tgt[i] - s.vals[i]) * 0.28; els[i].style.height = s.vals[i].toFixed(1) + 'px'; els[i].style.opacity = (0.5 + s.vals[i] / 92).toFixed(2) }
      s.raf = requestAnimationFrame(frame)
    }
    frame()
    return () => {
      cancelAnimationFrame(s.raf)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('pointerdown', onDown)
      host.removeEventListener('touchmove', onTouch)
      host.removeEventListener('touchend', onLeave)
      try { s.stream && s.stream.getTracks().forEach((tr) => tr.stop()) } catch (e) {}
    }
  }, [])

  const toggleMic = () => {
    const s = state.current
    const btn = micBtnRef.current
    const lbl = btn.querySelector('.t')
    if (s.analyser) {
      try { s.stream && s.stream.getTracks().forEach((tr) => tr.stop()) } catch (e) {}
      s.analyser = null; btn.classList.remove('on'); lbl.textContent = t('eq.mic'); return
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { lbl.textContent = t('eq.unavailable'); return }
    lbl.textContent = t('eq.allow')
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      s.stream = stream
      const AC = window.AudioContext || window.webkitAudioContext
      const ctx = new AC()
      const src = ctx.createMediaStreamSource(stream)
      s.analyser = ctx.createAnalyser(); s.analyser.fftSize = 128
      s.freq = new Uint8Array(s.analyser.frequencyBinCount)
      src.connect(s.analyser)
      btn.classList.add('on'); lbl.textContent = t('eq.listening')
    }).catch(() => { lbl.textContent = t('eq.blocked'); setTimeout(() => { lbl.textContent = t('eq.mic') }, 2200) })
  }

  return (
    <div className="eqwrap" aria-hidden="true">
      <div className="signal-bars" ref={barsRef} />
      <div className="eq-row">
        <span className="eq-hint">{t('eq.hint')}</span>
        <button className="eq-mic" ref={micBtnRef} type="button" onClick={toggleMic}>
          <Icon name="Mic" size={13} /><span className="t">{t('eq.mic')}</span>
        </button>
      </div>
    </div>
  )
}
