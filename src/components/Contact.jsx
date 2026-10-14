import { useRef } from 'react'
import { profile } from '../data/content.js'
import { usePointerVars } from '../hooks.js'
import { toast } from '../lib/toast.js'
import Scramble from './Scramble.jsx'
import LocalTime from './LocalTime.jsx'
import SplitText from './SplitText.jsx'
import { ArrowUpRight, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'

export default function Contact() {
  const ref = useRef(null)
  const markRef = useRef(null)
  usePointerVars(ref)
  usePointerVars(markRef)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast('Email copied to clipboard')
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="contact" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="spot" aria-hidden="true" />
      <div className="wrap contact__inner">
        <p className="shead__meta shead__meta--dark" data-reveal>
          <span className="shead__n">07</span>
          <span className="shead__rule" aria-hidden="true" />
          <Scramble className="shead__label" text="Contact" />
        </p>

        <h2 className="contact__title" id="contact-title" data-reveal="split">
          <SplitText>
            let&rsquo;s build something <em>intelligent.</em>
          </SplitText>
        </h2>

        <div className="contact__mail" data-reveal>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight />
          </a>
          <button type="button" className="contact__copy" onClick={copy}>
            <CopyIcon /> Copy email
          </button>
        </div>

        <div className="contact__phone" data-reveal>
          <p className="contact__phone-label">
            <span className="svc__dot" aria-hidden="true" /> WhatsApp &amp; call · freelance projects welcome
          </p>
          <a className="contact__phone-num" href={profile.tel}>
            {profile.phone}
          </a>
          <LocalTime className="ltime" />
        </div>

        <ul className="contact__links" data-reveal>
          <li>
            <a className="btn btn--wa" href={profile.whatsapp} target="_blank" rel="noopener" data-magnetic="0.25">
              <WhatsAppIcon /> WhatsApp me
            </a>
          </li>
          <li>
            <a className="btn btn--ghost-light" href={profile.tel} data-magnetic="0.25">
              <PhoneIcon /> Call
            </a>
          </li>
          <li>
            <a
              className="btn btn--ghost-light"
              href={profile.resume}
              download="Dara_Sai_Varshith_Resume.pdf"
              data-magnetic="0.25"
            >
              <DownloadIcon /> Download résumé
            </a>
          </li>
          <li>
            <a className="btn btn--ghost-light" href={profile.links.github} target="_blank" rel="noopener" data-magnetic="0.25">
              <GitHubIcon /> GitHub
            </a>
          </li>
          <li>
            <a className="btn btn--ghost-light" href={profile.links.linkedin} target="_blank" rel="noopener" data-magnetic="0.25">
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

      <p className="wordmark" ref={markRef} aria-hidden="true">
        varshith<span>.</span>
      </p>
    </section>
  )
}
