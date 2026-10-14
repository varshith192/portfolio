import Scramble from './Scramble.jsx'
import SplitText from './SplitText.jsx'

export default function SectionHead({ n, label, id, children }) {
  return (
    <header className="shead" data-reveal="split">
      <p className="shead__meta">
        <span className="shead__n">{n}</span>
        <span className="shead__rule" aria-hidden="true" />
        <Scramble className="shead__label" text={label} />
      </p>
      <h2 className="shead__title" id={id}>
        <SplitText>{children}</SplitText>
      </h2>
    </header>
  )
}
