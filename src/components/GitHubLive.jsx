import { useEffect, useState } from 'react'
import { profile } from '../data/content.js'
import { ArrowUpRight, GitHubIcon } from './Icons.jsx'

// Live snapshot of the public GitHub profile: repo count and the most
// recently pushed repositories. Cached for 15 minutes; falls back to a link.
const USER = 'varshith192'
const KEY = 'gh-live-v1'
const TTL = 15 * 60 * 1000

function ago(iso) {
  const s = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000)
  const units = [
    ['y', 31536000],
    ['mo', 2592000],
    ['d', 86400],
    ['h', 3600],
    ['m', 60],
  ]
  for (const [u, n] of units) if (s >= n) return `${Math.floor(s / n)}${u} ago`
  return 'just now'
}

async function load() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(KEY) || 'null')
    if (cached && Date.now() - cached.at < TTL) return cached.data
  } catch {
    /* storage unavailable */
  }
  const [user, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12`).then((r) =>
      r.ok ? r.json() : Promise.reject(r.status),
    ),
  ])
  const data = {
    repos: user.public_repos,
    recent: repos
      .filter((r) => !r.fork)
      .slice(0, 3)
      .map((r) => ({ name: r.name, url: r.html_url, lang: r.language, pushed: r.pushed_at })),
  }
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* ignore */
  }
  return data
}

export default function GitHubLive() {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    load()
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="ghl" data-reveal>
      <div className="ghl__head">
        <span className={`ghl__live${data ? ' is-on' : ''}`} aria-hidden="true" />
        <span className="ghl__title">Live from GitHub</span>
        <a className="ghl__user" href={profile.links.github} target="_blank" rel="noopener">
          <GitHubIcon /> @{USER}
        </a>
      </div>

      {failed ? (
        <p className="ghl__empty">
          Couldn&rsquo;t reach GitHub right now.{' '}
          <a href={profile.links.github} target="_blank" rel="noopener">
            See the profile ↗
          </a>
        </p>
      ) : (
        <>
          <p className="ghl__stat">
            <span className="ghl__num">{data ? data.repos : '—'}</span>
            <span className="ghl__label">public repositories</span>
          </p>
          <p className="ghl__sub">Recently pushed</p>
          <ul className="ghl__list" aria-busy={!data}>
            {(data ? data.recent : [0, 1, 2]).map((r, i) =>
              data ? (
                <li key={r.name}>
                  <a href={r.url} target="_blank" rel="noopener">
                    <span className="ghl__repo">{r.name}</span>
                    <span className="ghl__meta">
                      {r.lang && <span>{r.lang}</span>}
                      <span>{ago(r.pushed)}</span>
                      <ArrowUpRight />
                    </span>
                  </a>
                </li>
              ) : (
                <li key={i} className="ghl__skeleton" aria-hidden="true" />
              ),
            )}
          </ul>
        </>
      )}
    </div>
  )
}
