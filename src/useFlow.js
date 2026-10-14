import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './hooks.js'

// Drives a "packet" along SVG edges, one step at a time, like a trace of an
// agent run. Each step: { edge, reverse?, node, who, text, ms?, hold?, flag? }.
//  - edge:  data-edge id of the <path> the packet travels
//  - node:  data-node id that lights up when the packet arrives
//  - flag:  value written to the svg's data-flag on arrival (for CSS states)
// Per-frame work touches the DOM directly; React only re-renders once per step.

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const TRAIL = [0, 0.045, 0.09]

export function useFlow(steps, { autoplay = true, maxLog = 4, startDelay = 0, enabled = true } = {}) {
  const svgRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [log, setLog] = useState([])
  const [stepIndex, setStepIndex] = useState(-1)
  const run = useRef({ i: 0, phase: 'travel', elapsed: 0, clock: 0, loop: 1, wait: startDelay })

  useEffect(() => {
    setPlaying(autoplay && !reduced)
  }, [autoplay, reduced])

  useEffect(() => {
    const el = svgRef.current
    if (!el || !('IntersectionObserver' in window)) return setVisible(true)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const clearMarks = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.querySelectorAll('.is-hot, .is-live').forEach((n) => n.classList.remove('is-hot', 'is-live'))
  }, [])

  const reset = useCallback(() => {
    const svg = svgRef.current
    run.current = { i: 0, phase: 'travel', elapsed: 0, clock: 0, loop: run.current.loop + 1, wait: 0 }
    clearMarks()
    if (svg) svg.dataset.flag = ''
    setStepIndex(-1)
  }, [clearMarks])

  useEffect(() => {
    if (!playing || !visible || !enabled) return
    const svg = svgRef.current
    const packet = svg.querySelector('[data-packet]')
    const dots = packet ? [...packet.children] : []
    const s = run.current
    let raf = 0
    let last = performance.now()

    const place = (path, p, reverse) => {
      const len = path.getTotalLength()
      dots.forEach((d, k) => {
        const q = Math.max(0, ease(p) - TRAIL[k])
        const pt = path.getPointAtLength((reverse ? 1 - q : q) * len)
        d.setAttribute('cx', pt.x)
        d.setAttribute('cy', pt.y)
      })
    }

    const tick = (now) => {
      const dt = Math.min(64, now - last)
      last = now
      if (s.wait > 0) {
        s.wait -= dt
        raf = requestAnimationFrame(tick)
        return
      }
      s.elapsed += dt
      s.clock += dt
      const step = steps[s.i]
      const path = svg.querySelector(`[data-edge="${step.edge}"]`)

      if (s.phase === 'travel') {
        const ms = reduced ? 1 : step.ms ?? 1150
        const p = Math.min(1, s.elapsed / ms)
        if (path) {
          if (s.elapsed === dt) {
            svg.querySelectorAll('.is-live').forEach((n) => n.classList.remove('is-live'))
            path.classList.add('is-live')
            packet?.classList.add('is-moving')
          }
          place(path, p, step.reverse)
        }
        if (p >= 1) {
          packet?.classList.remove('is-moving')
          path?.classList.remove('is-live')
          svg.querySelectorAll('.is-hot').forEach((n) => n.classList.remove('is-hot'))
          svg.querySelector(`[data-node="${step.node}"]`)?.classList.add('is-hot')
          svg.dataset.flag = step.flag || ''
          const t = (s.clock / 1000).toFixed(1).padStart(4, '0')
          setLog((l) => [...l, { key: `${s.loop}-${s.i}`, t, who: step.who, text: step.text }].slice(-maxLog))
          setStepIndex(s.i)
          s.phase = 'hold'
          s.elapsed = 0
        }
      } else if (s.elapsed >= (step.hold ?? 520)) {
        s.i += 1
        s.phase = 'travel'
        s.elapsed = 0
        if (s.i >= steps.length) {
          s.i = 0
          s.clock = 0
          s.loop += 1
          svg.dataset.flag = ''
          setStepIndex(-1)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, visible, enabled, steps, reduced, maxLog])

  const toggle = useCallback(() => setPlaying((p) => !p), [])
  const replay = useCallback(() => {
    reset()
    setLog([])
    setPlaying(true)
  }, [reset])

  return { svgRef, log, playing, toggle, replay, stepIndex, total: steps.length }
}
