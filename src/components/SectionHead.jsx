export default function SectionHead({ n, label, id, children }) {
  return (
    <header className="shead" data-reveal>
      <p className="shead__meta">
        <span className="shead__n">{n}</span>
        <span className="shead__rule" aria-hidden="true" />
        <span className="shead__label">{label}</span>
      </p>
      <h2 className="shead__title" id={id}>
        {children}
      </h2>
    </header>
  )
}
