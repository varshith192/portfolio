// Trace panel under a live diagram: what the simulated run is doing now,
// with pause and replay controls.
export default function FlowConsole({ flow, label = 'Simulated run' }) {
  const { log, playing, toggle, replay, stepIndex, total } = flow
  const current = stepIndex + 1
  return (
    <div className="fcon">
      <div className="fcon__bar">
        <span className={`fcon__status${playing ? ' is-on' : ''}`}>
          <span className="fcon__dot" aria-hidden="true" />
          {playing ? 'Running' : 'Paused'}
        </span>
        <span className="fcon__label">{label} · conceptual</span>
        <span className="fcon__step" aria-hidden="true">
          {String(Math.max(current, 0)).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className="fcon__track" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <i key={i} className={i < current ? 'is-done' : undefined} />
          ))}
        </span>
        <span className="fcon__ctrls">
          <button type="button" onClick={toggle} aria-label={playing ? 'Pause run' : 'Play run'}>
            {playing ? (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3h2v10H5zM9 3h2v10H9z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3l8 5-8 5z" />
              </svg>
            )}
          </button>
          <button type="button" onClick={replay} aria-label="Restart run">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 3a5 5 0 1 1-4.6 3H1.8A6.5 6.5 0 1 0 4 3.6V1.5L1 4.5l3 3V5.3A5 5 0 0 1 8 3z" />
            </svg>
          </button>
        </span>
      </div>
      <ol className="fcon__log" aria-live="off">
        {log.length === 0 && (
          <li className="fcon__empty">
            <span className="fcon__t">00.0</span>
            <span>{playing ? 'starting run…' : 'press play to trace the flow'}</span>
          </li>
        )}
        {log.map((l, i) => (
          <li key={l.key} className={i === log.length - 1 ? 'is-latest' : undefined}>
            <span className="fcon__t">{l.t}s</span>
            <span className="fcon__who">{l.who}</span>
            <span className="fcon__text">{l.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
