import { process, services } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight, WhatsAppIcon } from './Icons.jsx'

const waFor = (service) =>
  `https://wa.me/919154573647?text=${encodeURIComponent(`Hi Varshith, I'd like to discuss a project: ${service}.`)}`

export default function Services() {
  return (
    <section className="section svc" id="services" aria-labelledby="svc-title">
      <div className="wrap">
        <SectionHead n="06" label="Freelance services" id="svc-title">
          Need it built? I take on <em>freelance</em> projects.
        </SectionHead>

        <p className="svc__status" data-reveal>
          <span className="svc__dot" aria-hidden="true" />
          Open for freelance work · AI automation, web and mobile
        </p>

        <ol className="svc__list">
          {services.map((s, i) => (
            <li key={s.id} data-reveal>
              <a className="svc__row" href={waFor(s.title)} target="_blank" rel="noopener">
                <span className="svc__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc__main">
                  <span className="svc__title">{s.title}</span>
                  <span className="svc__blurb">{s.blurb}</span>
                </span>
                <span className="svc__tags" aria-hidden="true">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
                <span className="svc__go">
                  <WhatsAppIcon />
                  <span>Discuss</span>
                  <ArrowUpRight />
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="svc__process" data-reveal>
          <h3 className="svc__h">How it works</h3>
          <ol className="steps">
            {process.map((p) => (
              <li key={p.n} className="step">
                <span className="step__n">{p.n}</span>
                <span className="step__title">{p.title}</span>
                <span className="step__text">{p.text}</span>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}
