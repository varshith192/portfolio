import { useEffect, useState } from 'react'

// Varshith's local time (India), so clients know when a reply is likely.
const fmt = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

export default function LocalTime({ className }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className={className}>
      <span className="ltime__dot" aria-hidden="true" />
      Local time {fmt.format(now).toUpperCase()} IST
    </span>
  )
}
