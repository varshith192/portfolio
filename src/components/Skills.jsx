import { skills } from '../data/content.js'
import SectionHead from './SectionHead.jsx'

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead n="05" label="Technical skills" id="skills-title">
          The <em>toolkit</em>, grouped by layer.
        </SectionHead>

        <div className="skills__rows">
          {skills.map((g, i) => (
            <div className="skills__row" key={g.group} data-reveal>
              <p className="skills__group">
                <span className="skills__n">{String(i + 1).padStart(2, '0')}</span>
                {g.group}
              </p>
              <ul className="skills__items">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
