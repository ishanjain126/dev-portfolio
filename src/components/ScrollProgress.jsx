import { useEffect, useRef } from 'react'

// Thin top bar that tracks how far the page is scrolled.
export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      el.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div className="progress" ref={ref} aria-hidden="true" />
}
