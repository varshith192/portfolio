import { useEffect, useState } from 'react'
import { nav, profile } from '../data/content.js'
import { useActiveSection, useScrollProgress } from '../hooks.js'

const ids = ['top', ...nav.map((n) => n.id)]

export default function Header() {
  const active = useActiveSection(ids)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  const [onDark, setOnDark] = useState(true)

  useEffect(() => {
    // Hero and contact are dark, so the bar switches to light text while over them.
    const dark = ['top', 'contact'].map((id) => document.getElementById(id))
    const onScroll = () => {
      setSolid(window.scrollY > 24)
      setOnDark(dark.some((el) => el && el.getBoundingClientRect().top <= 32 && el.getBoundingClientRect().bottom > 32))
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
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`hdr${solid ? ' is-solid' : ''}${onDark ? ' on-dark' : ''}${open ? ' is-open' : ''}`}>
      <div className="hdr__bar">
        <a className="hdr__mark" href="#top" onClick={() => setOpen(false)} aria-label="Dara Sai Varshith, back to top">
          <span className="hdr__dot" aria-hidden="true" />
          <span>d.s.varshith</span>
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'is-active' : undefined}
              aria-current={active === n.id ? 'true' : undefined}
            >
              <span className="hdr__n">{n.n}</span>
              {n.label}
            </a>
          ))}
        </nav>

        <a className="hdr__cta" href={profile.resume} target="_blank" rel="noopener">
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
              <a href={`#${n.id}`} onClick={() => setOpen(false)}>
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
