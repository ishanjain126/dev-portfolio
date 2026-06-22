import { useState, useCallback } from 'react'
import useHashRoute from './hooks/useHashRoute.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import ExperienceList from './components/ExperienceList.jsx'
import { Skills, Projects, Education } from './components/Sections.jsx'
import Contact from './components/Contact.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import CommandPalette from './components/CommandPalette.jsx'

export default function App() {
  const [route, navigate] = useHashRoute()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const openCase = useCallback((id) => navigate('/case/' + id), [navigate])
  const goHome = useCallback(() => navigate('/'), [navigate])
  const scrollTo = (id) => {
    if (route !== '/') { navigate('/'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120) }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const caseMatch = route.match(/^\/case\/(\w+)/)

  return (
    <div className="app">
      <Nav onHome={goHome} onContact={() => scrollTo('contact')} onPalette={() => setPaletteOpen(true)} />

      <main className="wrap">
        {caseMatch ? (
          <CaseStudy companyId={caseMatch[1]} onBack={goHome} onOpen={openCase} />
        ) : (
          <>
            <Hero />
            <Stats />
            <ExperienceList onOpen={openCase} />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </>
        )}
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} Ishan Jain</span>
        <span>Built with React · Vite · i18next</span>
      </footer>

      <ChatWidget open={chatOpen} setOpen={setChatOpen} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} onNavigate={navigate} onChat={() => setChatOpen(true)} />
    </div>
  )
}
