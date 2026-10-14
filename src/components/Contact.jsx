import { useState } from 'react'
import { profile } from '../data/content.js'
import { ArrowUpRight, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from './Icons.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap contact__inner">
        <p className="shead__meta shead__meta--dark" data-reveal>
          <span className="shead__n">06</span>
          <span className="shead__rule" aria-hidden="true" />
          <span className="shead__label">Contact</span>
        </p>

        <h2 className="contact__title" id="contact-title" data-reveal>
          let&rsquo;s build something <em>intelligent.</em>
        </h2>

        <div className="contact__mail" data-reveal>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight />
          </a>
          <button type="button" className="contact__copy" onClick={copy} aria-live="polite">
            <CopyIcon /> {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>

        <ul className="contact__links" data-reveal>
          <li>
            <a className="btn btn--light" href={profile.resume} download="Dara_Sai_Varshith_Resume.pdf">
              <DownloadIcon /> Download résumé
            </a>
          </li>
          <li>
            <a className="btn btn--ghost-light" href={profile.links.github} target="_blank" rel="noopener">
              <GitHubIcon /> GitHub
            </a>
          </li>
          <li>
            <a className="btn btn--ghost-light" href={profile.links.linkedin} target="_blank" rel="noopener">
              <LinkedInIcon /> LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <footer className="wrap foot">
        <p>© 2026 {profile.name}</p>
        <p className="foot__mid">Designed and built from scratch with React + Vite</p>
        <a href="#top" className="foot__top">
          Back to top ↑
        </a>
      </footer>
    </section>
  )
}
