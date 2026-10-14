import { useEffect, useState } from 'react'
import { nav, profile } from '../data/content.js'
import { useActiveSection, useScrollProgress } from '../hooks.js'
import { lockScroll } from '../lib/smooth.js'
import Brand from './Brand.jsx'

const ids = nav.map((n) => n.id)
const openMenu = () => window.dispatchEvent(new Event('cmdk:open'))

export default function Header() {
  const active = useActiveSection(ids)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [onDark, setOnDark] = useState(true)
  const [inHero, setInHero] = useState(true)
  const [kbd, setKbd] = useState('Ctrl K')

  useEffect(() => {
    if (/mac|iphone|ipad/i.test(navigator.userAgentData?.platform || navigator.platform || '')) setKbd('⌘K')
    // The hero is sticky, so "over the hero" means the paper sheet hasn't reached the bar yet.
    const paper = document.querySelector('.paper')
    const contact = document.getElementById('contact')
    const onScroll = () => {
      const paperTop = paper ? paper.getBoundingClientRect().top : 0
      const c = contact?.getBoundingClientRect()
      setSolid(window.scrollY > 24)
      setInHero(paperTop > window.innerHeight * 0.35)
      setOnDark(paperTop > 32 || (c && c.top <= 32 && c.bottom > 32))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const closeMenu = () => {
    lockScroll(false)
    setOpen(false)
  }
  const current = inHero ? null : active

  return (
    <header className={`hdr${solid ? ' is-solid' : ''}${onDark ? ' on-dark' : ''}${open ? ' is-open' : ''}`}>
      <div className="hdr__bar">
        <a className="hdr__mark" href="#top" onClick={closeMenu} aria-label="Dara Sai Varshith, back to top">
          <Brand />
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={current === n.id ? 'is-active' : undefined}
              aria-current={current === n.id ? 'true' : undefined}
            >
              <span className="hdr__n">{n.n}</span>
              {n.label}
            </a>
          ))}
        </nav>

        <button type="button" className="hdr__ask" onClick={openMenu} aria-label="Open command menu">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <span className="hdr__ask-label">Ask</span>
          <kbd>{kbd}</kbd>
        </button>

        <a className="hdr__cta" href={profile.resume} target="_blank" rel="noopener" data-magnetic="0.2">
          Résumé
        </a>

        <button
          type="button"
          className="hdr__toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className="hdr__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div id="mobile-nav" className="mnav" hidden={!open}>
        <ol>
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={closeMenu}>
                <span className="mnav__n">{n.n}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="mnav__foot">
          <a href={profile.resume} target="_blank" rel="noopener">Résumé ↗</a>
          <a href={profile.links.github} target="_blank" rel="noopener">GitHub ↗</a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
      </div>
    </header>
  )
}
