import { Fragment, useEffect, useMemo, useRef } from 'react'
import { certifications, education, experience, projects } from '../data/content.js'

// A trace-viewer style timeline (think LangSmith / OpenTelemetry waterfall)
// of everything on the résumé. Spans have duration; events are a single month.

const START_YEAR = 2022
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const monthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return (y - START_YEAR) * 12 + (m - 1)
}
const fmt = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}
const duration = (from, to) => {
  const n = monthIndex(to) - monthIndex(from) + 1
  const y = Math.floor(n / 12)
  const m = n % 12
  return [y && `${y}y`, m && `${m}mo`].filter(Boolean).join(' ')
}

function buildGroups() {
  const sr = education.find((e) => e.from)
  const jr = education.find((e) => e.at)
  return [
    {
      name: 'Education',
      kind: 'edu',
      rows: [
        { label: jr.short, sub: jr.detail, at: jr.at, href: '#education' },
        { label: sr.short, sub: `B.Tech CSE · CGPA 8.4`, from: sr.from, to: sr.to, href: '#education' },
      ],
    },
    {
      name: 'Experience',
      kind: 'exp',
      rows: [...experience]
        .sort((a, b) => a.from.localeCompare(b.from))
        .map((e) => ({ label: e.short, sub: e.role, from: e.from, to: e.to, href: `#exp-${e.id}` })),
    },
    {
      name: 'Projects',
      kind: 'proj',
      rows: projects.map((p) => ({ label: p.short, sub: p.context || p.category, at: p.ym, href: `#project-${p.id}` })),
    },
    {
      name: 'Certifications',
      kind: 'cert',
      rows: [...certifications]
        .sort((a, b) => a.ym.localeCompare(b.ym))
        .map((c) => ({ label: c.short, sub: c.issuer, at: c.ym, href: c.url, external: true })),
    },
  ]
}

export default function CareerTrace() {
  const groups = useMemo(buildGroups, [])
  const now = new Date()
  const endYear = Math.max(2026, now.getFullYear())
  const total = (endYear - START_YEAR + 1) * 12
  const pct = (m) => (m / total) * 100
  const nowM = (now.getFullYear() - START_YEAR) * 12 + now.getMonth() + now.getDate() / 31
  const years = Array.from({ length: endYear - START_YEAR + 1 }, (_, i) => START_YEAR + i)
  const count = groups.reduce((n, g) => n + g.rows.length, 0)

  const gridRef = useRef(null)
  const cursorRef = useRef(null)
  const scrollRef = useRef(null)

  // On narrow screens the trace pans; start at the recent end, where most spans are.
  useEffect(() => {
    const el = scrollRef.current
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth
  }, [])

  const onMove = (e) => {
    const grid = gridRef.current
    const cursor = cursorRef.current
    const lane = grid?.querySelector('.trace__lane')
    if (!grid || !cursor || !lane) return
    const g = grid.getBoundingClientRect()
    const l = lane.getBoundingClientRect()
    const x = e.clientX - l.left
    if (x < 0 || x > l.width) {
      cursor.style.opacity = '0'
      return
    }
    const m = Math.min(total - 1, Math.floor((x / l.width) * total))
    cursor.style.opacity = '1'
    cursor.style.transform = `translateX(${e.clientX - g.left}px)`
    cursor.firstChild.textContent = `${MONTHS[m % 12]} ${START_YEAR + Math.floor(m / 12)}`
  }
  const onLeave = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = '0'
  }

  let row = 0
  return (
    <figure className="trace" data-reveal>
      <div className="trace__top">
        <p className="trace__title">
          <span className="trace__live" aria-hidden="true" />
          career.trace
          <span className="trace__meta">
            {count} spans · {START_YEAR} → now
          </span>
        </p>
        <ul className="trace__legend" aria-label="Legend">
          <li className="is-edu">Education</li>
          <li className="is-exp">Experience</li>
          <li className="is-proj">Project</li>
          <li className="is-cert">Certification</li>
        </ul>
      </div>

      <div className="trace__scroll" ref={scrollRef} data-lenis-prevent-wheel>
        <div className="trace__grid" ref={gridRef} onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className="trace__axis" aria-hidden="true">
            <span className="trace__axis-label">span</span>
            <span className="trace__lane trace__lane--axis">
              {years.map((y) => (
                <span key={y} className="trace__year" style={{ left: `${pct((y - START_YEAR) * 12)}%` }}>
                  {y}
                </span>
              ))}
            </span>
          </div>

          <div className="trace__rules" aria-hidden="true">
            {years.map((y) => (
              <i key={y} style={{ '--p': pct((y - START_YEAR) * 12) / 100 }} />
            ))}
            <b className="trace__now" style={{ '--p': Math.min(nowM, total) / total }}>
              <span>now</span>
            </b>
          </div>

          {groups.map((g) => (
            <Fragment key={g.name}>
              <p className="trace__group">{g.name}</p>
              {g.rows.map((r) => {
                const i = row++
                const span = !r.at
                const left = pct(span ? monthIndex(r.from) : monthIndex(r.at) + 0.5)
                const width = span ? pct(monthIndex(r.to) - monthIndex(r.from) + 1) : 0
                const when = span ? `${fmt(r.from)} – ${fmt(r.to)}` : fmt(r.at)
                const ext = r.external ? { target: '_blank', rel: 'noopener' } : {}
                return (
                  <a key={r.label} className={`trace__row is-${g.kind}`} href={r.href} style={{ '--i': i }} {...ext}>
                    <span className="trace__label">
                      <span className="trace__name">{r.label}</span>
                      <span className="trace__sub">{r.sub}</span>
                    </span>
                    <span className="trace__lane">
                      {span ? (
                        <span className="trace__bar" style={{ left: `${left}%`, width: `${width}%` }} />
                      ) : (
                        <span className="trace__pt" style={{ left: `${left}%` }} />
                      )}
                      <span
                        className="trace__when"
                        style={{ left: `calc(${left + width}% + ${span ? 10 : 14}px)` }}
                      >
                        {span ? duration(r.from, r.to) : fmt(r.at)}
                      </span>
                      <span className="sr-only">{when}</span>
                    </span>
                  </a>
                )
              })}
            </Fragment>
          ))}

          <div className="trace__cursor" ref={cursorRef} aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <p className="fig__hint" aria-hidden="true">
        ← Swipe for earlier years
      </p>
      <figcaption className="fig__cap">
        <span>Fig. 04</span>
        Career trace. Every span and event comes from the résumé. Select a row to jump to it, or to verify a
        certification.
      </figcaption>
    </figure>
  )
}
