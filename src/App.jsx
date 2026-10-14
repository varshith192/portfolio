import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import { useReveal } from './hooks.js'

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <div className="paper">
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
        </div>
        <Contact />
      </main>
    </>
  )
}
