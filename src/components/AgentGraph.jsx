import { useFlow } from '../useFlow.js'

// Hero illustration: an orchestrator dispatching work to a ring of agents and
// collecting results. A decorative simulation, not a real system.
const agents = [
  { x: 300, y: 92, label: 'plan' },
  { x: 470, y: 190, label: 'retrieve' },
  { x: 470, y: 386, label: 'act' },
  { x: 300, y: 484, label: 'verify' },
  { x: 130, y: 386, label: 'tools' },
  { x: 130, y: 190, label: 'memory' },
]
const C = { x: 300, y: 288 }
const order = [0, 1, 5, 4, 2, 3] // plan, retrieve, memory, tools, act, verify

const steps = order.flatMap((i) => [
  { edge: `e${i}`, node: `a${i}`, who: 'orchestrator', text: `dispatch → ${agents[i].label}`, ms: 900, hold: 700 },
  { edge: `e${i}`, reverse: true, node: 'hub', who: agents[i].label, text: 'result returned', ms: 800, hold: 260 },
])

// Point on the circle edge so packets leave the hub / enter the agent cleanly.
function edgePath(a) {
  const dx = a.x - C.x
  const dy = a.y - C.y
  const d = Math.hypot(dx, dy)
  const ux = dx / d
  const uy = dy / d
  return `M${C.x + ux * 36} ${C.y + uy * 36} L${a.x - ux * 22} ${a.y - uy * 22}`
}

export default function AgentGraph() {
  const flow = useFlow(steps, { maxLog: 1 })
  const last = flow.log[flow.log.length - 1]
  return (
    <div className="agraph-wrap">
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

        <circle cx={C.x} cy={C.y} r="252" className="agraph__orbit" />
        <circle cx={C.x} cy={C.y} r="196" className="agraph__orbit agraph__orbit--dash" />
        <circle cx={C.x} cy={C.y} r="110" className="agraph__orbit" />

        {agents.map((a, i) => {
          const b = agents[(i + 1) % agents.length]
          return <line key={`r${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="agraph__ring" />
        })}

        {agents.map((a, i) => (
          <path key={`e${i}`} data-edge={`e${i}`} d={edgePath(a)} className="agraph__edge" />
        ))}

        {agents.map((a, i) => (
          <g key={`n${i}`} className="agraph__agent" data-node={`a${i}`}>
            <circle cx={a.x} cy={a.y} r="20" className="agraph__agent-ring" />
            <circle cx={a.x} cy={a.y} r="27" className="agraph__agent-halo" />
            <circle cx={a.x} cy={a.y} r="6" className="agraph__agent-core" />
            <text x={a.x} y={a.y + (a.y > C.y ? 44 : -34)} textAnchor="middle" className="agraph__label">
              {a.label}
            </text>
          </g>
        ))}

        <circle cx={C.x} cy={C.y} r="92" fill="url(#ag-glow)" className="agraph__glow" />
        <g data-node="hub" className="agraph__hubg">
          <circle cx={C.x} cy={C.y} r="34" className="agraph__hub" />
          <circle cx={C.x} cy={C.y} r="11" className="agraph__hub-core" />
        </g>
        <text x={C.x} y={C.y + 62} textAnchor="middle" className="agraph__label agraph__label--hub">
          orchestrator
        </text>

        <g data-packet className="agraph__packet">
          <circle r="12" fill="url(#ag-pk)" cx="-50" cy="-50" />
          <circle r="4" className="agraph__packet-head" cx="-50" cy="-50" />
          <circle r="2.4" className="agraph__packet-tail" cx="-50" cy="-50" />
        </g>
      </svg>
      <p className="agraph__trace" aria-hidden="true">
        <span className="agraph__trace-dot" />
        {last ? (
          <>
            <span className="agraph__trace-who">{last.who}</span> {last.text}
          </>
        ) : (
          <>
            <span className="agraph__trace-who">orchestrator</span> idle
          </>
        )}
      </p>
    </div>
  )
}
