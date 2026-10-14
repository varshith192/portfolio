import { useEffect, useRef } from 'react'

// Mono label that "decodes" from random glyphs the first time it scrolls into view.
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_+#'

export default function Scramble({ text, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const run = () => {
      let frame = 0
      const tick = () => {
        frame += 1
        const resolved = Math.floor(frame / 2)
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          out += i < resolved || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        }
        el.textContent = out
        if (resolved < text.length) raf = requestAnimationFrame(tick)
        else el.textContent = text
      }
      tick()
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = text
    }
  }, [text])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" ref={ref}>
        {text}
      </span>
    </span>
  )
}
