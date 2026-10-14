import { experience } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight } from './Icons.jsx'

export default function Experience() {
  return (
    <section className="section exp" id="experience" aria-labelledby="exp-title">
      <div className="wrap">
        <SectionHead n="03" label="Experience" id="exp-title">
          Where I&rsquo;ve <em>shipped</em> so far.
        </SectionHead>

        <ol className="exp__list">
          {experience.map((job) => (
            <li className="exp__item" key={job.org} data-reveal>
              <div className="exp__when">
                <span className="exp__date">{job.date}</span>
              </div>
              <div className="exp__what">
                <h3 className="exp__role">
                  {job.role} <span className="exp__at">at {job.org}</span>
                </h3>
                <ul className="exp__points">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="exp__foot">
                  <ul className="tags tags--quiet" aria-label="Technologies">
                    {job.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="textlink" href={job.certificate} target="_blank" rel="noopener">
                    Internship certificate <ArrowUpRight />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
