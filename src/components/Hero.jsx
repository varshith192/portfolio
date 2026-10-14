import { profile } from '../data/content.js'
import AgentGraph from './AgentGraph.jsx'
import { ArrowDown, ArrowUpRight, GitHubIcon, LinkedInIcon } from './Icons.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="pulse" aria-hidden="true" />
            {profile.name} · Portfolio 2026
          </p>
          <h1 id="hero-title" className="hero__title">
            hi, i&rsquo;m <em>varshith.</em>
          </h1>
          <p className="hero__role">AI Engineer. Agentic AI Developer.</p>
          <p className="hero__lede">
            I build intelligent systems, multi-agent workflows, and backend software that turn complex problems into
            practical solutions.
          </p>
          <div className="hero__actions">
            <a className="btn btn--light" href="#work">
              Explore my work <ArrowDown />
            </a>
            <a className="btn btn--ghost-light" href={profile.resume} target="_blank" rel="noopener">
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
          </ul>
        </div>
        <div className="hero__art">
          <AgentGraph />
        </div>
      </div>

      <div className="wrap hero__foot">
        <a href="#about" className="scrollcue">
          <span className="scrollcue__line" aria-hidden="true" />
          Scroll to explore
        </a>
        <p className="hero__meta">{profile.roles.join(' · ')}</p>
      </div>
    </section>
  )
}
