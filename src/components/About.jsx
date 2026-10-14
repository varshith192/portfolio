import SectionHead from './SectionHead.jsx'

const facts = [
  { k: 'Degree', v: 'B.Tech, Computer Science & Engineering' },
  { k: 'University', v: 'SR University · 2026 · CGPA 8.4' },
  { k: 'Focus', v: 'Multi-agent systems · RAG · Python backends' },
  { k: 'Certified', v: 'Microsoft · Oracle ×2 · Cisco' },
]

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead n="01" label="About" id="about-title">
          Engineering the layer between <em>models</em> and the real world.
        </SectionHead>

        <div className="about__body">
          <div className="about__text" data-reveal>
            <p className="about__lead">
              I&rsquo;m a computer science graduate interested in building intelligent systems, multi-agent workflows,
              and reliable backend software. I enjoy working on the engineering that connects AI models, data, APIs,
              and real-world applications.
            </p>
            <p>
              Most recently I was an Agentic AI intern at Virtusa, building and debugging Python microservices and REST
              APIs for generative-AI automation workflows. Before that, as a research intern at NIT Warangal, I deployed
              a disease-prediction web app and Telegram bot backend that served more than 200 users.
            </p>
            <p>
              My recent projects, built for the Tata Steel AI Hackathon and Canara Bank&rsquo;s SuRaksha Cyber Hackathon,
              coordinate multiple LLM agents with LangGraph, LangChain, CrewAI and retrieval-augmented generation.
            </p>
          </div>

          <dl className="facts" data-reveal>
            {facts.map((f) => (
              <div className="facts__row" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
