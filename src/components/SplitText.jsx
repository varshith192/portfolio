import { cloneElement, isValidElement } from 'react'

// Splits a heading into words that rise out of a mask when an ancestor gets
// .is-in. Screen readers get the plain sentence; the animated copy is hidden.

function textOf(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement(node)) return textOf(node.props.children)
  return ''
}

function split(node, counter) {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part) => {
      if (!part) return null
      if (/^\s+$/.test(part)) return ' '
      const d = counter.n++
      return (
        <span className="sw" key={`w${d}`}>
          <span className="sw__i" style={{ '--d': d }}>
            {part}
          </span>
        </span>
      )
    })
  }
  if (Array.isArray(node)) return node.map((n) => split(n, counter))
  if (isValidElement(node)) return cloneElement(node, { key: `e${counter.n}` }, split(node.props.children, counter))
  return node
}

export default function SplitText({ children }) {
  const counter = { n: 0 }
  return (
    <>
      <span className="sr-only">{textOf(children)}</span>
      <span className="split" aria-hidden="true">
        {split(children, counter)}
      </span>
    </>
  )
}
