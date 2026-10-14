import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Adds .is-in to every [data-reveal] element once it scrolls into view.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Returns the id of the section currently under the upper third of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return p
}

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Writes the pointer position into --mx / --my (px, relative to the element)
// and --px / --py (-1..1, for parallax). --spot is 1 while hovered.
export function usePointerVars(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer()) return
    let raf = 0
    let x = 0
    let y = 0
    let w = 1
    let h = 1
    const flush = () => {
      raf = 0
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      el.style.setProperty('--px', ((x / w) * 2 - 1).toFixed(3))
      el.style.setProperty('--py', ((y / h) * 2 - 1).toFixed(3))
    }
    const move = (e) => {
      const r = el.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      w = r.width || 1
      h = r.height || 1
      if (!raf) raf = requestAnimationFrame(flush)
    }
    const enter = () => el.style.setProperty('--spot', '1')
    const leave = () => {
      el.style.setProperty('--spot', '0')
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref])
}

// Elements with [data-magnetic] lean toward the pointer while hovered.
export function useMagnetics() {
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return
    const cleanups = [...document.querySelectorAll('[data-magnetic]')].map((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.25
      let raf = 0
      const move = (e) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`
        })
      }
      const leave = () => {
        cancelAnimationFrame(raf)
        el.style.transform = ''
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        cancelAnimationFrame(raf)
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    })
    return () => cleanups.forEach((c) => c())
  }, [])
}
