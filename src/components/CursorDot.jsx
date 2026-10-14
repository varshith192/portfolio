import { useEffect, useRef } from 'react'

// A soft ring that trails the pointer and grows over anything interactive.
// Mouse/trackpad only; the native cursor stays visible.
const INTERACTIVE = 'a, button, [role="option"], .agraph__agent, .agraph__hubg, .trace__row, [data-node]'

export default function CursorDot() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || !fine || reduced) return
    let x = -100
    let y = -100
    let cx = -100
    let cy = -100
    let raf = 0
    const tick = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0
    }
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      el.classList.add('is-on')
      el.classList.toggle('is-hover', !!e.target.closest?.(INTERACTIVE))
      el.classList.toggle('is-dark', !!e.target.closest?.('.hero, .contact, .trace, .fcon, .cmdk, .svc__row:hover'))
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const leave = () => el.classList.remove('is-on')
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return <div className="cdot" ref={ref} aria-hidden="true" />
}
