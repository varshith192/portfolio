import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import Marquee from './components/Marquee.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import CommandMenu from './components/CommandMenu.jsx'
import Toaster from './components/Toaster.jsx'
import { useMagnetics, useReveal } from './hooks.js'
import { initSmoothScroll, interceptAnchors } from './lib/smooth.js'

export default function App() {
  useReveal()
  useMagnetics()

  useEffect(() => {
    const stopSmooth = initSmoothScroll()
    const stopAnchors = interceptAnchors()
    return () => {
      stopAnchors()
      stopSmooth()
    }
  }, [])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <div className="stage">
          <Hero />
          <div className="paper">
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Education />
            <Marquee />
            <Services />
          </div>
        </div>
        <Contact />
      </main>
      <CommandMenu />
      <WhatsAppFab />
      <Toaster />
    </>
  )
}
