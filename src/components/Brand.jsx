// Wordmark: a "V" drawn as a tiny agent graph (two agents feeding one
// orchestrating node), followed by the name.
export default function Brand() {
  return (
    <span className="brand">
      <svg className="brand__glyph" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
        <path className="brand__edge" d="M6 6 14 21M22 6 14 21" />
        <path className="brand__edge brand__edge--x" d="M6 6H22" />
        <circle className="brand__node" cx="6" cy="6" r="3.2" />
        <circle className="brand__node" cx="22" cy="6" r="3.2" />
        <circle className="brand__core" cx="14" cy="21" r="4.2" />
      </svg>
      <span className="brand__name">Varshith</span>
      <span className="brand__tag">Agentic AI</span>
    </span>
  )
}
