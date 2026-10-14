import { useEffect, useState } from 'react'
import { profile } from '../data/content.js'
import { WhatsAppIcon } from './Icons.jsx'

// Floating "chat on WhatsApp" button: appears once the hero is behind you and
// steps aside at the contact section, which has its own WhatsApp button.
export default function WhatsAppFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const atContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.75
      setShow(pastHero && !atContact)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <a
      className={`wafab${show ? ' is-on' : ''}`}
      href={profile.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label={`Chat on WhatsApp, ${profile.phone}`}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <WhatsAppIcon />
      <span className="wafab__label">Chat on WhatsApp</span>
    </a>
  )
}
