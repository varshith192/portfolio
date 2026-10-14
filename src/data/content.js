// Single source for site copy. Everything here is taken from the resume
// (public/resume/Dara_Sai_Varshith_Resume.pdf) and its embedded links.

const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Dara Sai Varshith',
  short: 'varshith',
  role: 'Agentic AI Engineer',
  roles: ['Agentic AI Engineer', 'AI Developer', 'Software Engineer'],
  email: 'varshithdhara@gmail.com',
  phone: '+91 91545 73647',
  tel: 'tel:+919154573647',
  whatsapp: `https://wa.me/919154573647?text=${encodeURIComponent("Hi Varshith, I found your portfolio and would like to discuss a project.")}`,
  resume: `${BASE}resume/Dara_Sai_Varshith_Resume.pdf`,
  links: {
    github: 'https://github.com/varshith192',
    linkedin: 'https://www.linkedin.com/in/varshith-dhara-0a486b262/',
    credly: 'https://www.credly.com/users/dara-sai-varshith',
  },
}

export const nav = [
  { id: 'about', n: '01', label: 'About' },
  { id: 'work', n: '02', label: 'Work' },
  { id: 'experience', n: '03', label: 'Experience' },
  { id: 'skills', n: '04', label: 'Skills' },
  { id: 'education', n: '05', label: 'Education' },
  { id: 'services', n: '06', label: 'Services', keywords: 'freelance hire android ios app website automation' },
  { id: 'contact', n: '07', label: 'Contact' },
]

export const projects = [
  {
    id: 'itops',
    index: '01',
    title: 'Dynamic IT Operations Orchestrator',
    short: 'Dynamic IT Ops Orchestrator',
    category: 'Agentic AI / Distributed Systems',
    context: null,
    date: 'March 2026',
    ym: '2026-03',
    summary:
      'An event-driven AI agent system in Python and REST APIs that monitors distributed cloud infrastructure on AWS, applying anomaly-detection logic to trigger self-healing workflows and reduce manual intervention.',
    points: [
      'Event-driven agent loop: signals from cloud infrastructure become events the system reasons over.',
      'Anomaly-detection logic decides when a signal warrants action.',
      'Self-healing workflows are triggered automatically to cut manual intervention.',
    ],
    stack: ['Python', 'REST APIs', 'AWS', 'Event-driven agents', 'Anomaly detection'],
    repo: 'https://github.com/varshith192/Dynamic-IT-Operations-Agentic-Ai-Virtusa',
    diagram: 'itops',
  },
  {
    id: 'stelos',
    index: '02',
    title: 'STELOS',
    short: 'STELOS',
    subtitle: 'Maintenance Intelligence Platform',
    category: 'Agentic AI / Predictive Maintenance',
    context: 'Tata Steel AI Hackathon 2026',
    date: 'June 2026',
    ym: '2026-06',
    summary:
      'A nine-agent LangGraph backend implementing RAG with FAISS and LLM-powered agents over Flask/FastAPI REST APIs for predictive maintenance, using an XGBoost model with human-in-the-loop validation.',
    points: [
      'Nine LLM-powered agents coordinated as a LangGraph graph.',
      'Retrieval-augmented generation over a FAISS vector index.',
      'XGBoost model for predictive maintenance, with a human-in-the-loop validation layer.',
    ],
    stack: ['LangGraph', 'RAG', 'FAISS', 'XGBoost', 'Flask', 'FastAPI', 'Python'],
    repo: 'https://github.com/varshith192/tata_steel_ai_hacakthon2026',
    diagram: 'stelos',
  },
  {
    id: 'astragov',
    index: '03',
    title: 'AstraGov AI',
    short: 'AstraGov AI',
    category: 'Agentic AI / Banking Compliance',
    context: 'Canara Bank SuRaksha Cyber Hackathon 2.0',
    date: 'June 2026',
    ym: '2026-06',
    summary:
      'A five-agent AI backend using LangChain, CrewAI, Flask REST APIs and MongoDB, paired with a JavaScript/TypeScript frontend in Next.js, Redux, Tailwind CSS and WebSockets for LLM-driven banking compliance and risk monitoring.',
    points: [
      'Five LLM-driven agents built with LangChain and CrewAI.',
      'Flask REST APIs over MongoDB on the backend.',
      'Next.js, Redux and Tailwind CSS frontend kept live over WebSockets.',
    ],
    stack: ['LangChain', 'CrewAI', 'Flask', 'MongoDB', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'WebSockets'],
    repo: 'https://github.com/varshith192/astragov_ai_hackathon',
    diagram: 'astragov',
  },
]

export const experience = [
  {
    id: 'virtusa',
    org: 'Virtusa Consulting Services',
    short: 'Virtusa',
    role: 'Agentic AI Intern',
    date: 'Mar 2026 – May 2026',
    from: '2026-03',
    to: '2026-05',
    certificate: 'https://drive.google.com/file/d/1Fd_M5dTUoE2IYTYII81GhZr-SO8e91-C/view?usp=sharing',
    points: [
      'Built and debugged Python microservices and REST APIs for Generative AI-driven automation workflows, applying object-oriented design within Agile sprints.',
      'Shipped fixes to production through Git-based CI/CD pipelines.',
      'Queried and integrated SQL databases to support AI agent backend automation, troubleshooting integration issues with engineering teams.',
    ],
    tags: ['Python', 'Microservices', 'REST APIs', 'GenAI automation', 'SQL', 'Agile', 'CI/CD'],
  },
  {
    id: 'nitw',
    org: 'NIT Warangal',
    short: 'NIT Warangal',
    role: 'Summer Research Intern',
    date: 'Jun 2024 – Jul 2024',
    from: '2024-06',
    to: '2024-07',
    certificate: 'https://drive.google.com/file/d/1WH8-jlb0JtjA_IP9B-q3eszKnVQg_gdi/view?usp=sharing',
    points: [
      'Deployed a real-time disease-prediction web app and Telegram bot backend built with Python, REST APIs, SQL and a machine learning model, serving 200+ users in a live healthcare setting.',
      'Built Power BI dashboards to analyse prediction trends and debug data pipeline issues, learning Power BI on the job to inform follow-up model tuning.',
    ],
    tags: ['Python', 'REST APIs', 'SQL', 'Machine Learning', 'Telegram Bot', 'Power BI'],
  },
]

export const skills = [
  { group: 'AI & GenAI', items: ['LangGraph', 'LangChain', 'RAG', 'Prompt Engineering', 'TensorFlow', 'Scikit-learn', 'XGBoost'] },
  { group: 'Backend & Web', items: ['Python', 'Java', 'Flask', 'React', 'REST APIs'] },
  { group: 'Databases & Infrastructure', items: ['SQL', 'MongoDB', 'Docker'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Unit Testing', 'Debugging', 'Automation'] },
]

export const education = [
  {
    school: 'SR University, Warangal',
    degree: 'B.Tech, Computer Science & Engineering',
    date: 'Nov 2022 – May 2026',
    short: 'SR University',
    from: '2022-11',
    to: '2026-05',
    detail: 'CGPA 8.4',
    note: 'Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Object Oriented Programming (Java, Python), Machine Learning',
  },
  {
    school: 'Narayana Junior College',
    degree: 'Intermediate, Physics, Chemistry & Mathematics',
    date: 'May 2022',
    short: 'Narayana Jr College',
    at: '2022-05',
    detail: '965 / 1000 (96.5%)',
  },
]

export const certifications = [
  {
    name: 'Microsoft Certified: Fabric Data Engineer Associate',
    issuer: 'Microsoft',
    date: 'Sep 2026',
    short: 'Fabric Data Engineer',
    ym: '2026-09',
    url: 'https://learn.microsoft.com/en-us/users/darasaivarshith-3923/credentials/27afe172b789edc1',
  },
  {
    name: 'OCI Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Aug 2026',
    short: 'OCI AI Foundations',
    ym: '2026-08',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=C7781B74B08CF7153A3B4B4793F1098E5B7F684582F9A0FF4CB8F65A83D77F41',
  },
  {
    name: 'Oracle Certified Foundations Associate, Agentic AI',
    issuer: 'Oracle',
    date: 'Jul 2026',
    short: 'Agentic AI Foundations',
    ym: '2026-07',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=9FCBB74EB60504B7272F5755873D9A11FC6E552F424B561B4D2323EEDDF4155A',
  },
  {
    name: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Jun 2025',
    short: 'Python Essentials',
    ym: '2025-06',
    url: 'https://www.credly.com/badges/267ae4b7-6e00-4cd1-a200-9b27aad43f1b',
  },
]

// Hover notes for diagram nodes. Each restates the project description.
export const diagramTips = {
  itops: {
    infra: 'AWS cloud infrastructure: the distributed resources being monitored.',
    monitor: 'Event-driven AI agent in Python that watches infrastructure signals.',
    detect: 'Anomaly-detection logic that decides when a signal needs action.',
    orch: 'Turns detected events into the matching self-healing workflow.',
    remed: 'Self-healing workflow that reduces manual intervention.',
  },
  stelos: {
    api: 'Flask / FastAPI REST APIs: the entry point for requests.',
    hub: 'LangGraph backend coordinating nine LLM-powered agents.',
    faiss: 'FAISS vector index used for retrieval-augmented generation.',
    xgb: 'XGBoost model behind the predictive-maintenance predictions.',
    hitl: 'Human-in-the-loop layer where results are validated.',
  },
  astragov: {
    fe: 'Next.js and TypeScript frontend with Redux and Tailwind CSS.',
    api: 'Flask REST APIs between the frontend and the agents.',
    crew: 'Five LLM-driven agents built with LangChain and CrewAI.',
    mongo: 'MongoDB storage the agents read from and write to.',
    mon: 'Banking compliance and risk-monitoring workflow.',
  },
}

// Freelance offering (as stated by Varshith). Describes what he takes on,
// not past client work.
export const services = [
  {
    id: 'ai',
    title: 'AI automations & agents',
    blurb:
      'Multi-agent workflows, LLM integrations, RAG assistants and automations that take repetitive work off your team.',
    tags: ['LangGraph', 'LangChain', 'RAG', 'Python', 'APIs'],
  },
  {
    id: 'web',
    title: 'Full-stack websites',
    blurb: 'Fast, responsive websites and web apps, from the interface to the backend, database and APIs behind it.',
    tags: ['React', 'Next.js', 'Flask', 'REST APIs', 'SQL / MongoDB'],
  },
  {
    id: 'android',
    title: 'Android apps',
    blurb: 'Android apps designed around your users, connected to your backend and ready for the Play Store.',
    tags: ['Android', 'Play Store', 'API integration'],
  },
  {
    id: 'ios',
    title: 'iOS apps',
    blurb: 'iPhone and iPad apps with a clean, native feel, connected to your backend and ready for the App Store.',
    tags: ['iOS', 'App Store', 'API integration'],
  },
]

export const process = [
  { n: '01', title: 'Say hello', text: 'Message or call on WhatsApp, or send an email, with a short note on what you need.' },
  { n: '02', title: 'Scope & quote', text: 'We agree on features, timeline and price before any work starts.' },
  { n: '03', title: 'Build', text: 'Regular updates and working previews while it comes together.' },
  { n: '04', title: 'Launch & handover', text: 'Deployment, source code and a walkthrough so you own everything.' },
]
