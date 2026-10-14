import Lenis from 'lenis'

// Smooth wheel scrolling (Lenis) plus one place that knows how to scroll to a
// section, so in-page links, the command menu and the career trace all move
// the same way. Disabled entirely for reduced-motion users.

let lenis = null
// Lenis already honours html { scroll-padding-top }, so no extra offset here.
const HEADER_OFFSET = 0

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (reduced()) return () => {}
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  let raf = 0
  const loop = (t) => {
    lenis?.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToHash(hash) {
  const top = hash === '#top' || hash === '#'
  const el = top ? null : document.querySelector(hash)
  if (!top && !el) return false
  if (lenis) {
    lenis.scrollTo(top ? 0 : el, { offset: top ? 0 : HEADER_OFFSET, duration: 1.3 })
  } else if (top) {
    window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' })
  } else {
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' })
  }
  // Move focus with the scroll so keyboard users continue from the target.
  const target = top ? document.getElementById('top') : el
  if (target) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }
  if (history.replaceState) history.replaceState(null, '', top ? location.pathname : hash)
  return true
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.classList.toggle('is-locked', locked)
}

// Route every same-page link through scrollToHash.
export function interceptAnchors() {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const hash = a.getAttribute('href')
    if (scrollToHash(hash)) e.preventDefault()
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
