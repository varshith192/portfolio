import { usePrefersReducedMotion } from '../hooks.js'

// Hero illustration: one orchestrator coordinating a ring of agents,
// with messages travelling along the edges. Decorative only.
const agents = [
  { x: 300, y: 92, label: 'plan' },
  { x: 470, y: 190, label: 'retrieve' },
  { x: 470, y: 386, label: 'act' },
  { x: 300, y: 484, label: 'verify' },
  { x: 130, y: 386, label: 'tools' },
  { x: 130, y: 190, label: 'memory' },
]
const C = { x: 300, y: 288 }

export default function AgentGraph() {
  const reduced = usePrefersReducedMotion()
  return (
    <svg className="agraph" viewBox="0 0 600 580" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ag-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity=".3" />
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
        <g key={`e${i}`}>
          <path id={`ag-e${i}`} d={`M${C.x} ${C.y} L${a.x} ${a.y}`} className="agraph__edge" />
          {!reduced && (
            <circle r="3.2" className="agraph__packet">
              <animateMotion
                dur={`${2.6 + i * 0.35}s`}
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                keyPoints={i % 2 ? '1;0' : '0;1'}
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#ag-e${i}`} />
              </animateMotion>
            </circle>
          )}
        </g>
      ))}

      {agents.map((a, i) => (
        <g key={`n${i}`} className="agraph__agent" style={{ '--i': i }}>
          <circle cx={a.x} cy={a.y} r="20" className="agraph__agent-ring" />
          <circle cx={a.x} cy={a.y} r="6" className="agraph__agent-core" />
          <text x={a.x} y={a.y + (a.y > C.y ? 44 : -34)} textAnchor="middle" className="agraph__label">
            {a.label}
          </text>
        </g>
      ))}

      <circle cx={C.x} cy={C.y} r="92" fill="url(#ag-glow)" />
      <circle cx={C.x} cy={C.y} r="34" className="agraph__hub" />
      <circle cx={C.x} cy={C.y} r="11" className="agraph__hub-core" />
      <text x={C.x} y={C.y + 62} textAnchor="middle" className="agraph__label agraph__label--hub">
        orchestrator
      </text>
    </svg>
  )
}
