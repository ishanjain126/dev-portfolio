import { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react'
import useHashRoute from './hooks/useHashRoute.js'
import useAutoLanguage from './hooks/useAutoLanguage.js'
import IconDefs from './components/IconDefs.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Experience from './components/Experience.jsx'
import { Skills, Project, Education } from './components/Sections.jsx'
import Contact from './components/Contact.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

const ChatWidget = lazy(() => import('./components/ChatWidget.jsx'))

export default function App() {
  useAutoLanguage()
  const [route, navigate] = useHashRoute()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const viewRef = useRef(null)

  const openCase = useCallback((id) => navigate('/case/' + id), [navigate])
  const goHome = useCallback(() => navigate('/'), [navigate])

  const caseMatch = route.match(/^\/case\/(\w+)/)
  const caseId = caseMatch ? caseMatch[1] : null

  // smooth-scroll to a section (going home first if we're on a case study)
  const scrollToId = useCallback((id) => {
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (caseId) { navigate('/'); setTimeout(go, 200) } else go()
  }, [navigate, caseId])

  // the chat assistant can route the visitor to the right part of the site
  const onChatAction = useCallback((a) => {
    if (!a) return
    if (a.kind === 'case') navigate('/case/' + a.target)
    else if (a.kind === 'link') window.open(a.target, '_blank', 'noopener')
    else if (a.kind === 'scroll') {
      const go = () => document.getElementById(a.target)?.scrollIntoView({ behavior: 'smooth' })
      if (caseId) { navigate('/'); setTimeout(go, 180) } else go()
    }
  }, [navigate, caseId])

  // scroll to top + (re)observe reveal elements whenever the view changes
  useEffect(() => {
    window.scrollTo(0, 0)
    const root = viewRef.current
    if (!root) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = root.querySelectorAll('.reveal')
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.14 })
    els.forEach((el, i) => { el.classList.remove('in'); el.style.transitionDelay = (Math.min(i, 4) * 0.05) + 's'; io.observe(el) })
    return () => io.disconnect()
  }, [caseId])

  // ⌘K / Ctrl-K opens the palette
  useEffect(() => {
    // ⌘K on macOS, Ctrl+K on Windows/Linux — toggles the palette
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); setPaletteOpen((o) => !o) } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <IconDefs />
      <ScrollProgress />
      <Nav onHome={goHome} onOpen={openCase} onPalette={() => setPaletteOpen(true)} onContact={() => scrollToId('contact')} />

      <main className="view" key={route} ref={viewRef}>
        {caseId ? (
          <CaseStudy companyId={caseId} onBack={goHome} onOpen={openCase} />
        ) : (
          <>
            <Hero />
            <Stats />
            <Experience onOpen={openCase} />
            <Skills />
            <Project />
            <Education />
            <Contact />
          </>
        )}
      </main>

      <Suspense fallback={null}>
        <ChatWidget open={chatOpen} setOpen={setChatOpen} onAction={onChatAction} />
      </Suspense>
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} onNavigate={navigate} onChat={() => setChatOpen(true)} />
    </>
  )
}
