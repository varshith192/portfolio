import { useEffect, useState } from 'react'

export default function Toaster() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const onToast = (e) => {
      const id = `${Date.now()}-${Math.random()}`
      setItems((t) => [...t, { id, message: e.detail }].slice(-3))
      setTimeout(() => setItems((t) => t.filter((x) => x.id !== id)), 2600)
    }
    window.addEventListener('app:toast', onToast)
    return () => window.removeEventListener('app:toast', onToast)
  }, [])

  return (
    <div className="toasts" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="toast">
          <span className="toast__dot" aria-hidden="true" />
          {t.message}
        </div>
      ))}
    </div>
  )
}
