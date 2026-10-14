import { projects } from '../data/content.js'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight, GitHubIcon } from './Icons.jsx'
import { ItOpsDiagram, StelosDiagram, AstraGovDiagram, itopsSteps, stelosSteps, astraSteps } from './Diagrams.jsx'
import FlowConsole from './FlowConsole.jsx'
import { useFlow } from '../useFlow.js'

const diagrams = {
  itops: [ItOpsDiagram, itopsSteps],
  stelos: [StelosDiagram, stelosSteps],
  astragov: [AstraGovDiagram, astraSteps],
}

function Figure({ project }) {
  const [Diagram, steps] = diagrams[project.diagram]
  const flow = useFlow(steps)
  return (
    <figure className="fig" data-reveal>
      <div className="fig__frame">
        <span className="fig__corner fig__corner--tl" aria-hidden="true" />
        <span className="fig__corner fig__corner--br" aria-hidden="true" />
        <div className="fig__scroll">
          <Diagram svgRef={flow.svgRef} />
        </div>
        <FlowConsole flow={flow} />
      </div>
      <p className="fig__hint" aria-hidden="true">
        Swipe to see the full diagram →
      </p>
      <figcaption className="fig__cap">
        <span>Fig. {project.index}</span>
        Conceptual architecture with a simulated run, simplified for illustration. Components are named from the
        project description; the trace shows the intended flow, not recorded output. See the repository for the
        implementation.
      </figcaption>
    </figure>
  )
}

function Body({ project }) {
  return (
    <div className="case__body" data-reveal>
      <p className="case__summary">{project.summary}</p>
      <h4 className="case__sub">From the build</h4>
      <ul className="case__points">
        {project.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <h4 className="case__sub">Stack</h4>
      <ul className="tags" aria-label="Technologies">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <a className="case__link" href={project.repo} target="_blank" rel="noopener">
        <GitHubIcon /> View repository <ArrowUpRight />
      </a>
    </div>
  )
}

function Meta({ project }) {
  return (
    <dl className="case__meta">
      <div>
        <dt>Category</dt>
        <dd>{project.category}</dd>
      </div>
      {project.context && (
        <div>
          <dt>Context</dt>
          <dd>{project.context}</dd>
        </div>
      )}
      <div>
        <dt>Date</dt>
        <dd>{project.date}</dd>
      </div>
    </dl>
  )
}

function Case({ project, layout }) {
  const titleId = `case-${project.id}`
  return (
    <article className={`case case--${layout}`} aria-labelledby={titleId}>
      <header className="case__head" data-reveal>
        <span className="case__index" aria-hidden="true">
          {project.index}
        </span>
        <h3 className="case__title" id={titleId}>
          {project.title}
          {project.subtitle && <em className="case__subtitle">{project.subtitle}</em>}
        </h3>
        <Meta project={project} />
      </header>
      <div className="case__grid">
        <Figure project={project} />
        <Body project={project} />
      </div>
    </article>
  )
}

const layouts = ['wide', 'flip', 'stack']

export default function Projects() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead n="02" label="Selected work" id="work-title">
          Three systems where <em>agents</em> do the coordinating.
        </SectionHead>
        <div className="cases">
          {projects.map((p, i) => (
            <Case key={p.id} project={p} layout={layouts[i % layouts.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}
