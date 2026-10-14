import { useEffect, useRef } from 'react'

// Two oversized type bands that drift in opposite directions. Scrolling speeds
// them up and leans them with the scroll velocity, then they settle back.
const ROWS = [
  ['AI agents', 'RAG pipelines', 'LangGraph', 'Automations', 'Python backends'],
  ['Full-stack web', 'Android apps', 'iOS apps', 'REST APIs', 'Freelance'],
]

function Band({ words, dir, bandRef }) {
  const run = [...words, ...words, ...words, ...words]
  return (
    <div className={`mq__band mq__band--${dir > 0 ? 'r' : 'l'}`} aria-hidden="true">
      <div className="mq__track" ref={bandRef}>
        {run.map((w, i) => (
          <span key={i} className="mq__item">
            {w}
            <svg className="mq__node" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="4" />
              <circle cx="10" cy="10" r="8.5" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  const wrap = useRef(null)
  const a = useRef(null)
  const b = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let visible = false
    let x = 0
    let vel = 0
    let lastY = window.scrollY
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(48, now - last)
      last = now
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      vel += (dy - vel) * 0.12
      x += (0.045 + Math.abs(vel) * 0.012) * dt * (vel < -0.5 ? -1 : 1)
      const skew = Math.max(-9, Math.min(9, vel * 0.35))
      const w = a.current.scrollWidth / 4 || 1
      const off = ((x % w) + w) % w
      a.current.style.transform = `translate3d(${-off}px,0,0) skewX(${-skew}deg)`
      b.current.style.transform = `translate3d(${off - w}px,0,0) skewX(${-skew}deg)`
      if (visible) raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        last = performance.now()
        lastY = window.scrollY
        raf = requestAnimationFrame(tick)
      } else if (!visible) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="mq" ref={wrap} aria-label="What I build: AI agents, RAG pipelines, automations, full-stack web, Android and iOS apps">
      <Band words={ROWS[0]} dir={-1} bandRef={a} />
      <Band words={ROWS[1]} dir={1} bandRef={b} />
    </section>
  )
}
