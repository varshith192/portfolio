import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content.js'
import { usePointerVars } from '../hooks.js'
import AgentGraph from './AgentGraph.jsx'
import SplitText from './SplitText.jsx'
import { ArrowDown, ArrowUpRight, GitHubIcon, LinkedInIcon } from './Icons.jsx'

export default function Hero() {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const [covered, setCovered] = useState(false)
  const [kbd, setKbd] = useState('Ctrl K')
  usePointerVars(ref)

  useEffect(() => {
    // headline words rise in on load
    const t = setTimeout(() => titleRef.current?.classList.add('is-in'), 120)
    const mac = /mac|iphone|ipad/i.test(navigator.userAgentData?.platform || navigator.platform || '')
    if (mac) setKbd('⌘K')
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // As the paper sheet slides over the (sticky) hero, ease the hero back and
    // stop its animation once it is fully covered.
    const el = ref.current
    let raf = 0
    const update = () => {
      raf = 0
      const h = window.innerHeight || 1
      const p = Math.min(1, Math.max(0, window.scrollY / h))
      el.style.setProperty('--hp', p.toFixed(3))
      setCovered(window.scrollY > h * 0.95)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="spot" aria-hidden="true" />

      <div className="hero__stage">
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              <span className="pulse" aria-hidden="true" />
              {profile.name} · Portfolio 2026
            </p>
            <h1 id="hero-title" className="hero__title" ref={titleRef}>
              <SplitText>
                hi, i&rsquo;m <em>varshith.</em>
              </SplitText>
            </h1>
            <p className="hero__role">AI Engineer. Agentic AI Developer.</p>
            <p className="hero__lede">
              I build intelligent systems, multi-agent workflows, and backend software that turn complex problems into
              practical solutions.
            </p>
            <div className="hero__actions">
              <a className="btn btn--light" href="#work" data-magnetic="0.3">
                Explore my work <ArrowDown />
              </a>
              <a className="btn btn--ghost-light" href={profile.resume} target="_blank" rel="noopener" data-magnetic="0.3">
                View résumé <ArrowUpRight />
              </a>
            </div>
            <ul className="hero__social" aria-label="Profiles">
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener">
                  <GitHubIcon /> GitHub
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener">
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
              <li className="hero__ask">
                <button type="button" onClick={() => window.dispatchEvent(new Event('cmdk:open'))}>
                  <kbd>{kbd}</kbd> Ask the orchestrator
                </button>
              </li>
            </ul>
          </div>
          <div className="hero__art">
            <AgentGraph paused={covered} />
          </div>
        </div>

        <div className="wrap hero__foot">
          <a href="#about" className="scrollcue">
            <span className="scrollcue__line" aria-hidden="true" />
            Scroll to explore
          </a>
          <p className="hero__meta">{profile.roles.join(' · ')}</p>
        </div>
      </div>
    </section>
  )
}
