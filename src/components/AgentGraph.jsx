import { useEffect, useRef, useState } from 'react'
import { useFlow } from '../useFlow.js'
import { usePrefersReducedMotion } from '../hooks.js'

// Hero illustration: a small LangGraph-style canvas. The orchestrator boots its
// agents, then dispatches work to each one and collects the result. Every node
// can be dragged; edges, the ring and the travelling packets follow along.
const START = {
  hub: { x: 300, y: 288 },
  a0: { x: 300, y: 92 },
  a1: { x: 470, y: 190 },
  a2: { x: 470, y: 386 },
  a3: { x: 300, y: 484 },
  a4: { x: 130, y: 386 },
  a5: { x: 130, y: 190 },
}
const LABELS = ['plan', 'retrieve', 'act', 'verify', 'tools', 'memory']
const AGENTS = LABELS.map((_, i) => `a${i}`)
const order = [0, 1, 5, 4, 2, 3] // plan, retrieve, memory, tools, act, verify
const BOOT_MS = 2100
const R_HUB = 34
const R_AGENT = 20

const steps = order.flatMap((i) => [
  { edge: `e${i}`, node: `a${i}`, who: 'orchestrator', text: `dispatch → ${LABELS[i]}`, ms: 900, hold: 700 },
  { edge: `e${i}`, reverse: true, node: 'hub', who: LABELS[i], text: 'result returned', ms: 800, hold: 260 },
])

// Line from the hub's rim to the agent's rim, so packets leave and arrive cleanly.
function edgePath(h, a) {
  const dx = a.x - h.x
  const dy = a.y - h.y
  const d = Math.hypot(dx, dy) || 1
  const ux = dx / d
  const uy = dy / d
  if (d < R_HUB + R_AGENT + 4) return `M${h.x} ${h.y} L${h.x + ux} ${h.y + uy}`
  return `M${h.x + ux * (R_HUB + 2)} ${h.y + uy * (R_HUB + 2)} L${a.x - ux * (R_AGENT + 2)} ${a.y - uy * (R_AGENT + 2)}`
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

export default function AgentGraph({ paused = false }) {
  const reduced = usePrefersReducedMotion()
  const flow = useFlow(steps, { maxLog: 1, startDelay: reduced ? 0 : BOOT_MS, enabled: !paused })
  const [online, setOnline] = useState(0)
  const [pos, setPos] = useState(START)
  const [dragging, setDragging] = useState(null)
  const [moved, setMoved] = useState(false)
  const layerRef = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    if (reduced) return setOnline(AGENTS.length)
    let n = 0
    let timer = 0
    const start = setTimeout(() => {
      timer = setInterval(() => {
        n += 1
        setOnline(n)
        if (n >= AGENTS.length) clearInterval(timer)
      }, 140)
    }, 700)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [reduced])

  const toSvg = (e) => {
    const m = layerRef.current.getScreenCTM()
    if (!m) return { x: 0, y: 0 }
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
    return { x: p.x, y: p.y }
  }

  const onDown = (id) => (e) => {
    if (e.button !== 0) return
    e.preventDefault()
    const p = toSvg(e)
    drag.current = { id, dx: pos[id].x - p.x, dy: pos[id].y - p.y }
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(id)
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d) return
    const p = toSvg(e)
    setPos((cur) => ({ ...cur, [d.id]: { x: clamp(p.x + d.dx, 28, 572), y: clamp(p.y + d.dy, 28, 552) } }))
    setMoved(true)
  }
  const onUp = (e) => {
    if (!drag.current) return
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    drag.current = null
    setDragging(null)
  }
  const nodeProps = (id) => ({
    onPointerDown: onDown(id),
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
  })

  const hub = pos.hub
  const last = flow.log[flow.log.length - 1]
  const booting = online < AGENTS.length

  return (
    <div className={`agraph-wrap${dragging ? ' is-dragging' : ''}`}>
      <svg ref={flow.svgRef} className="agraph" viewBox="0 0 600 580" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="ag-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ag-pk">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".7" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="agraph__l0">
          <circle cx={300} cy={288} r="252" className="agraph__orbit agraph__draw" pathLength="1" />
          <circle cx={300} cy={288} r="196" className="agraph__orbit agraph__orbit--dash" />
          <circle cx={hub.x} cy={hub.y} r="110" className="agraph__orbit agraph__draw" pathLength="1" />
        </g>

        <g className="agraph__l1" ref={layerRef}>
          {AGENTS.map((id, i) => {
            const a = pos[id]
            const b = pos[AGENTS[(i + 1) % AGENTS.length]]
            return <line key={`r${id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="agraph__ring" />
          })}

          {AGENTS.map((id, i) => (
            <path key={`e${i}`} data-edge={`e${i}`} d={edgePath(hub, pos[id])} className="agraph__edge" pathLength="1" style={{ '--i': i }} />
          ))}

          {AGENTS.map((id, i) => {
            const a = pos[id]
            const below = a.y > hub.y
            return (
              <g
                key={id}
                className={`agraph__agent${dragging === id ? ' is-grabbed' : ''}`}
                data-node={id}
                style={{ '--i': i }}
                {...nodeProps(id)}
              >
                <circle cx={a.x} cy={a.y} r="34" className="agraph__hit" />
                <circle cx={a.x} cy={a.y} r={R_AGENT} className="agraph__agent-ring" />
                <circle cx={a.x} cy={a.y} r="27" className="agraph__agent-halo" />
                <circle cx={a.x} cy={a.y} r="6" className="agraph__agent-core" />
                <text x={a.x} y={a.y + (below ? 44 : -34)} textAnchor="middle" className="agraph__label">
                  {LABELS[i]}
                </text>
              </g>
            )
          })}

          <circle cx={hub.x} cy={hub.y} r="92" fill="url(#ag-glow)" className="agraph__glow" />
          <g data-node="hub" className={`agraph__hubg${dragging === 'hub' ? ' is-grabbed' : ''}`} {...nodeProps('hub')}>
            <circle cx={hub.x} cy={hub.y} r="46" className="agraph__hit" />
            <circle cx={hub.x} cy={hub.y} r={R_HUB} className="agraph__hub" />
            <circle cx={hub.x} cy={hub.y} r="11" className="agraph__hub-core" />
            <text x={hub.x} y={hub.y + 62} textAnchor="middle" className="agraph__label agraph__label--hub">
              orchestrator
            </text>
          </g>

          <g data-packet className="agraph__packet">
            <circle r="12" fill="url(#ag-pk)" cx="-50" cy="-50" />
            <circle r="4" className="agraph__packet-head" cx="-50" cy="-50" />
            <circle r="2.4" className="agraph__packet-tail" cx="-50" cy="-50" />
          </g>
        </g>
      </svg>

      <div className="agraph__bar">
        <p className="agraph__trace" aria-hidden="true">
          <span className={`agraph__trace-dot${booting ? ' is-booting' : ''}`} />
          {booting ? (
            <>
              <span className="agraph__trace-who">booting agents</span> {online}/{AGENTS.length}
            </>
          ) : last ? (
            <>
              <span className="agraph__trace-who">{last.who}</span> {last.text}
            </>
          ) : (
            <>
              <span className="agraph__trace-who">
                {AGENTS.length}/{AGENTS.length} agents
              </span>{' '}
              online
            </>
          )}
        </p>
        {moved ? (
          <button type="button" className="agraph__reset" onClick={() => (setPos(START), setMoved(false))}>
            ↺ reset layout
          </button>
        ) : (
          <span className="agraph__hint" aria-hidden="true">
            ✥ drag the nodes
          </span>
        )}
      </div>
    </div>
  )
}
