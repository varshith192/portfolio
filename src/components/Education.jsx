import { certifications, education, profile } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight } from './Icons.jsx'

export default function Education() {
  return (
    <section className="section edu" id="education" aria-labelledby="edu-title">
      <div className="wrap">
        <SectionHead n="06" label="Education & certifications" id="edu-title">
          Grounded in <em>fundamentals</em>, verified by credentials.
        </SectionHead>

        <div className="edu__grid">
          <div className="edu__col" data-reveal>
            <h3 className="edu__h">Education</h3>
            <ol className="edu__list">
              {education.map((e) => (
                <li key={e.school} className="edu__item">
                  <p className="edu__date">{e.date}</p>
                  <h4 className="edu__school">{e.school}</h4>
                  <p className="edu__degree">{e.degree}</p>
                  <p className="edu__detail">{e.detail}</p>
                  {e.note && <p className="edu__note">{e.note}</p>}
                </li>
              ))}
            </ol>
          </div>

          <div className="edu__col" data-reveal>
            <h3 className="edu__h">Certifications</h3>
            <ol className="certs">
              {certifications.map((c) => (
                <li key={c.name}>
                  <a className="cert" href={c.url} target="_blank" rel="noopener">
                    <span className="cert__issuer">
                      {c.issuer} · {c.date}
                    </span>
                    <span className="cert__name">{c.name}</span>
                    <span className="cert__verify">
                      Verify <ArrowUpRight />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <a className="textlink edu__credly" href={profile.links.credly} target="_blank" rel="noopener">
              All badges on Credly <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
