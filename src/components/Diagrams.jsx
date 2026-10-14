// Conceptual architecture figures for the three case studies.
// Shapes only name components that appear in each project's description.

function Defs({ id }) {
  return (
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 9 5 0 9z" className="dg-head" />
      </marker>
      <pattern id={`${id}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r=".9" className="dg-dot" />
      </pattern>
    </defs>
  )
}

function Box({ x, y, w, h, title, sub, step, accent, dashed }) {
  return (
    <g className={`dg-box${accent ? ' dg-box--accent' : ''}${dashed ? ' dg-box--dashed' : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx="10" />
      {step && (
        <text x={x + 14} y={y + 22} className="dg-step">
          {step}
        </text>
      )}
      <text x={x + 14} y={y + (step ? 44 : 28)} className="dg-title">
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + (step ? 62 : 46)} className="dg-sub">
          {sub}
        </text>
      )}
    </g>
  )
}

function Edge({ d, id, label, lx, ly, flow, both, anchor = 'middle' }) {
  return (
    <g>
      <path
        d={d}
        className={`dg-edge${flow ? ' dg-flow' : ''}`}
        markerEnd={`url(#${id}-arrow)`}
        markerStart={both ? `url(#${id}-arrow)` : undefined}
      />
      {label && (
        <text x={lx} y={ly} textAnchor={anchor} className="dg-edge-label">
          {label}
        </text>
      )}
    </g>
  )
}

export function ItOpsDiagram() {
  const id = 'itops'
  return (
    <svg viewBox="0 0 660 360" className="dg" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        Event-driven loop: AWS infrastructure is monitored, anomalies are detected as events, an orchestrator decides,
        and a self-healing workflow remediates the infrastructure.
      </title>
      <Defs id={id} />
      <rect x="0" y="0" width="660" height="360" fill={`url(#${id}-dots)`} />

      <g className="dg-group">
        <rect x="20" y="40" width="160" height="280" rx="14" />
        <text x="36" y="68" className="dg-step">AWS</text>
        <text x="36" y="88" className="dg-title">Cloud infra</text>
      </g>
      {[120, 182, 244].map((y, i) => (
        <g className="dg-node" key={y}>
          <rect x="40" y={y} width="120" height="44" rx="8" />
          <circle cx="58" cy={y + 22} r="4" className={i === 1 ? 'dg-alert' : 'dg-ok'} />
          <text x="72" y={y + 27} className="dg-sub">
            resource {String.fromCharCode(97 + i)}
          </text>
        </g>
      ))}

      <Box x={230} y={52} w={180} h={78} step="01" title="Monitor" sub="AI agent · Python" />
      <Box x={460} y={52} w={180} h={78} step="02" title="Detect" sub="anomaly detection" />
      <Box x={460} y={230} w={180} h={78} step="03" title="Orchestrate" sub="triggers workflows" accent />
      <Box x={230} y={230} w={180} h={78} step="04" title="Remediate" sub="self-healing" />

      <Edge id={id} d="M180 91 H226" flow label="signals" lx={203} ly={82} />
      <Edge id={id} d="M410 91 H456" flow />
      <Edge id={id} d="M550 130 V226" flow label="event" lx={562} ly={183} anchor="start" />
      <Edge id={id} d="M460 269 H414" flow />
      <Edge id={id} d="M230 269 H184" flow label="heal" lx={207} ly={260} />

      <g className="dg-center">
        <circle cx="435" cy="180" r="26" />
        <path d="M424 172a13 13 0 1 1-1 13" className="dg-cycle" markerEnd={`url(#${id}-arrow)`} />
      </g>
      <text x="380" y="184" textAnchor="end" className="dg-edge-label">REST APIs</text>
    </svg>
  )
}

export function StelosDiagram() {
  const id = 'stelos'
  const cx = 320
  const cy = 210
  const r = 92
  const agents = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 - Math.PI / 2
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 660 420" className="dg" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        Requests enter through Flask and FastAPI REST APIs to a LangGraph graph of nine agents, which retrieve context
        from a FAISS index, call an XGBoost predictive model, and pass results to human-in-the-loop validation.
      </title>
      <Defs id={id} />
      <rect x="0" y="0" width="660" height="420" fill={`url(#${id}-dots)`} />

      <Box x={16} y={168} w={150} h={84} step="API" title="REST APIs" sub="Flask / FastAPI" />

      <circle cx={cx} cy={cy} r={r + 34} className="dg-orbit" />
      <circle cx={cx} cy={cy} r={r} className="dg-orbit dg-orbit--dash" />
      {agents.map((a, i) => (
        <line key={`l${i}`} x1={cx} y1={cy} x2={a.x} y2={a.y} className="dg-spoke" />
      ))}
      {agents.map((a, i) => (
        <g key={`a${i}`} className="dg-agent" style={{ '--i': i }}>
          <circle cx={a.x} cy={a.y} r="13" />
          <text x={a.x} y={a.y + 4} textAnchor="middle" className="dg-agent-n">
            {i + 1}
          </text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="40" className="dg-hub" />
      <text x={cx} y={cy - 2} textAnchor="middle" className="dg-hub-t">LangGraph</text>
      <text x={cx} y={cy + 15} textAnchor="middle" className="dg-hub-s">9 agents</text>

      <Box x={494} y={34} w={150} h={84} step="RAG" title="FAISS index" sub="retrieval" />
      <Box x={494} y={168} w={150} h={84} step="ML" title="XGBoost" sub="predictive model" />
      <Box x={494} y={302} w={150} h={84} step="HITL" title="Human review" sub="validation layer" accent />

      <Edge id={id} d="M166 210 H222" flow both />
      <Edge id={id} d="M402 150 L490 92" flow both label="context" lx={452} ly={108} />
      <Edge id={id} d="M418 210 H490" flow both label="predict" lx={454} ly={202} />
      <Edge id={id} d="M402 270 L490 330" flow label="review" lx={452} ly={318} />
      <text x={cx} y="402" textAnchor="middle" className="dg-edge-label">
        LLM-powered agents · predictive maintenance
      </text>
    </svg>
  )
}

export function AstraGovDiagram() {
  const id = 'astra'
  const crew = [0, 1, 2, 3, 4].map((i) => ({ x: 316 + i * 30, y: 280 }))
  return (
    <svg viewBox="0 0 680 380" className="dg" role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>
        A Next.js frontend talks to Flask REST APIs and receives live updates over WebSockets. The API drives a crew of
        five LangChain and CrewAI agents that read and write MongoDB and feed the compliance and risk monitoring workflow.
      </title>
      <Defs id={id} />
      <rect x="0" y="0" width="680" height="380" fill={`url(#${id}-dots)`} />

      <g className="dg-group">
        <rect x="16" y="30" width="172" height="320" rx="14" />
        <text x="32" y="58" className="dg-step">CLIENT</text>
        <text x="32" y="80" className="dg-title">Frontend</text>
      </g>
      {['Next.js', 'TypeScript', 'Redux', 'Tailwind CSS'].map((t, i) => (
        <g className="dg-node" key={t}>
          <rect x="32" y={102 + i * 56} width="140" height="42" rx="8" />
          <text x="48" y={128 + i * 56} className="dg-sub">
            {t}
          </text>
        </g>
      ))}

      <Box x={276} y={30} w={170} h={84} step="SERVER" title="REST APIs" sub="Flask" />

      <g className="dg-group dg-group--soft">
        <rect x="276" y="168" width="170" height="182" rx="14" />
        <text x="292" y="196" className="dg-step">AGENTS</text>
        <text x="292" y="218" className="dg-title">Agent crew</text>
        <text x="292" y="236" className="dg-sub">LangChain · CrewAI</text>
      </g>
      {crew.map((c, i) => (
        <g key={i} className="dg-agent" style={{ '--i': i }}>
          <circle cx={c.x} cy={c.y} r="11" />
          <text x={c.x} y={c.y + 4} textAnchor="middle" className="dg-agent-n">
            {i + 1}
          </text>
        </g>
      ))}
      <text x="292" y="326" className="dg-sub">LLM-driven, 5 agents</text>

      <Box x={500} y={30} w={166} h={84} step="WORKFLOW" title="Compliance" sub="& risk monitoring" accent />

      <g className="dg-db">
        <path d="M500 200 v100 a83 16 0 0 0 166 0 v-100" />
        <ellipse cx="583" cy="200" rx="83" ry="16" />
        <text x="583" y="262" textAnchor="middle" className="dg-title">MongoDB</text>
      </g>

      <Edge id={id} d="M188 60 H272" flow label="REST" lx={230} ly={52} />
      <Edge id={id} d="M272 96 H192" flow label="WebSockets" lx={230} ly={116} />
      <Edge id={id} d="M361 114 V164" flow both />
      <Edge id={id} d="M446 260 H496" flow both label="read / write" lx={472} ly={250} />
      <Edge id={id} d="M446 190 L540 118" flow label="signals" lx={500} ly={172} anchor="start" />
      <Edge id={id} d="M500 72 H450" flow label="alerts" lx={475} ly={64} />
    </svg>
  )
}
