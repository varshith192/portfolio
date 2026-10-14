// Single source for site copy. Everything here is taken from the resume
// (public/resume/Dara_Sai_Varshith_Resume.pdf) and its embedded links.

const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Dara Sai Varshith',
  short: 'varshith',
  role: 'Agentic AI Engineer',
  roles: ['Agentic AI Engineer', 'AI Developer', 'Software Engineer'],
  email: 'varshithdhara@gmail.com',
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
  { id: 'contact', n: '06', label: 'Contact' },
]

export const projects = [
  {
    id: 'itops',
    index: '01',
    title: 'Dynamic IT Operations Orchestrator',
    category: 'Agentic AI / Distributed Systems',
    context: null,
    date: 'March 2026',
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
    subtitle: 'Maintenance Intelligence Platform',
    category: 'Agentic AI / Predictive Maintenance',
    context: 'Tata Steel AI Hackathon 2026',
    date: 'June 2026',
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
    category: 'Agentic AI / Banking Compliance',
    context: 'Canara Bank SuRaksha Cyber Hackathon 2.0',
    date: 'June 2026',
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
    org: 'Virtusa Consulting Services',
    role: 'Agentic AI Intern',
    date: 'Mar 2026 – May 2026',
    certificate: 'https://drive.google.com/file/d/1Fd_M5dTUoE2IYTYII81GhZr-SO8e91-C/view?usp=sharing',
    points: [
      'Built and debugged Python microservices and REST APIs for Generative AI-driven automation workflows, applying object-oriented design within Agile sprints.',
      'Shipped fixes to production through Git-based CI/CD pipelines.',
      'Queried and integrated SQL databases to support AI agent backend automation, troubleshooting integration issues with engineering teams.',
    ],
    tags: ['Python', 'Microservices', 'REST APIs', 'GenAI automation', 'SQL', 'Agile', 'CI/CD'],
  },
  {
    org: 'NIT Warangal',
    role: 'Summer Research Intern',
    date: 'Jun 2024 – Jul 2024',
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
    detail: 'CGPA 8.4',
    note: 'Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Object Oriented Programming (Java, Python), Machine Learning',
  },
  {
    school: 'Narayana Junior College',
    degree: 'Intermediate, Physics, Chemistry & Mathematics',
    date: 'May 2022',
    detail: '965 / 1000 (96.5%)',
  },
]

export const certifications = [
  {
    name: 'Microsoft Certified: Fabric Data Engineer Associate',
    issuer: 'Microsoft',
    date: 'Sep 2026',
    url: 'https://learn.microsoft.com/en-us/users/darasaivarshith-3923/credentials/27afe172b789edc1',
  },
  {
    name: 'OCI Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Aug 2026',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=C7781B74B08CF7153A3B4B4793F1098E5B7F684582F9A0FF4CB8F65A83D77F41',
  },
  {
    name: 'Oracle Certified Foundations Associate, Agentic AI',
    issuer: 'Oracle',
    date: 'Jul 2026',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=9FCBB74EB60504B7272F5755873D9A11FC6E552F424B561B4D2323EEDDF4155A',
  },
  {
    name: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Jun 2025',
    url: 'https://www.credly.com/badges/267ae4b7-6e00-4cd1-a200-9b27aad43f1b',
  },
]
