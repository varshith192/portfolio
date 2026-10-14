import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { certifications, experience, nav, profile, projects } from '../data/content.js'
import { lockScroll, scrollToHash } from '../lib/smooth.js'
import { toast } from '../lib/toast.js'
import { ArrowUpRight, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons.jsx'

// ⌘K menu styled as an orchestrator routing a request to an "agent" (group).
// It is a plain keyword router over the site's own links: no model involved.

const AGENTS = [
  ['navigate', 'navigator'],
  ['projects', 'projects agent'],
  ['actions', 'actions agent'],
  ['links', 'links agent'],
  ['credentials', 'credentials agent'],
]
const agentName = Object.fromEntries(AGENTS)

const Glyph = ({ children }) => <span className="cmdk__glyph">{children}</span>
const Badge = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 3l2.4 1.8 3 .1.9 2.8 2.4 1.8-.9 2.8.9 2.8-2.4 1.8-.9 2.8-3 .1L12 21l-2.4-1.8-3-.1-.9-2.8-2.4-1.8.9-2.8-.9-2.8 2.4-1.8.9-2.8 3-.1z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
)

const openUrl = (url) => window.open(url, '_blank', 'noopener')

function buildItems() {
  return [
    ...nav.map((n) => ({
      id: `nav-${n.id}`,
      group: 'navigate',
      title: n.label,
      keywords: n.keywords,
      icon: <Glyph>{n.n}</Glyph>,
      kind: 'go',
      run: () => scrollToHash(`#${n.id}`),
    })),
    { id: 'nav-top', group: 'navigate', title: 'Back to top', keywords: 'home hero start', icon: <Glyph>00</Glyph>, kind: 'go', run: () => scrollToHash('#top') },

    ...projects.map((p) => ({
      id: `case-${p.id}`,
      group: 'projects',
      title: p.subtitle ? `${p.title}: ${p.subtitle}` : p.title,
      sub: `Case study · ${p.category} · ${p.date}`,
      keywords: [p.context, ...p.stack].filter(Boolean).join(' '),
      icon: <Glyph>◇</Glyph>,
      kind: 'go',
      run: () => scrollToHash(`#project-${p.id}`),
    })),
    ...projects.map((p) => ({
      id: `repo-${p.id}`,
      group: 'projects',
      title: `${p.short} repository`,
      sub: p.repo.replace('https://', ''),
      keywords: `github code source ${p.stack.join(' ')}`,
      icon: <GitHubIcon />,
      kind: 'open',
      run: () => openUrl(p.repo),
    })),

    {
      id: 'whatsapp',
      group: 'actions',
      title: 'Message on WhatsApp',
      sub: `${profile.phone} · freelance projects`,
      keywords: 'whatsapp chat message hire freelance contact phone project',
      icon: <WhatsAppIcon />,
      kind: 'open',
      run: () => openUrl(profile.whatsapp),
    },
    {
      id: 'call',
      group: 'actions',
      title: 'Call Varshith',
      sub: profile.phone,
      keywords: 'call phone mobile number contact hire',
      icon: <PhoneIcon />,
      kind: 'open',
      run: () => (window.location.href = profile.tel),
    },
    {
      id: 'copy-email',
      group: 'actions',
      title: 'Copy email address',
      sub: profile.email,
      keywords: 'contact mail hire reach',
      icon: <CopyIcon />,
      kind: 'copy',
      run: () =>
        navigator.clipboard
          .writeText(profile.email)
          .then(() => toast('Email copied to clipboard'))
          .catch(() => (window.location.href = `mailto:${profile.email}`)),
    },
    { id: 'mail', group: 'actions', title: 'Write an email', sub: profile.email, keywords: 'contact mail hire reach', icon: <MailIcon />, kind: 'open', run: () => (window.location.href = `mailto:${profile.email}`) },
    { id: 'resume-view', group: 'actions', title: 'View résumé', keywords: 'resume cv pdf', icon: <ArrowUpRight />, kind: 'open', run: () => openUrl(profile.resume) },
    {
      id: 'resume-dl',
      group: 'actions',
      title: 'Download résumé',
      sub: 'PDF',
      keywords: 'resume cv pdf save',
      icon: <DownloadIcon />,
      kind: 'download',
      run: () => {
        const a = document.createElement('a')
        a.href = profile.resume
        a.download = 'Dara_Sai_Varshith_Resume.pdf'
        document.body.appendChild(a)
        a.click()
        a.remove()
        toast('Résumé download started')
      },
    },

    { id: 'gh', group: 'links', title: 'GitHub', sub: 'github.com/varshith192', keywords: 'code repos profile', icon: <GitHubIcon />, kind: 'open', run: () => openUrl(profile.links.github) },
    { id: 'li', group: 'links', title: 'LinkedIn', sub: 'Dara Sai Varshith', keywords: 'profile social network', icon: <LinkedInIcon />, kind: 'open', run: () => openUrl(profile.links.linkedin) },
    { id: 'credly', group: 'links', title: 'Credly badges', keywords: 'certifications badges', icon: <Badge />, kind: 'open', run: () => openUrl(profile.links.credly) },

    ...certifications.map((c, i) => ({
      id: `cert-${i}`,
      group: 'credentials',
      title: c.name,
      sub: `${c.issuer} · ${c.date} · verify`,
      keywords: 'certification certificate verify',
      icon: <Badge />,
      kind: 'open',
      run: () => openUrl(c.url),
    })),
    ...experience.map((e) => ({
      id: `exp-cert-${e.id}`,
      group: 'credentials',
      title: `${e.short} internship certificate`,
      sub: `${e.role} · ${e.date}`,
      keywords: 'internship certificate experience',
      icon: <Badge />,
      kind: 'open',
      run: () => openUrl(e.certificate),
    })),
  ]
}

function fuzzy(text, q) {
  let i = 0
  for (const ch of text) if (ch === q[i]) i++
  return i === q.length
}

function score(item, query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!tokens.length) return 1
  const title = item.title.toLowerCase()
  const hay = `${title} ${item.sub || ''} ${item.keywords || ''} ${agentName[item.group]}`.toLowerCase()
  let s = 0
  for (const t of tokens) {
    if (title.startsWith(t)) s += 6
    else if (title.includes(t)) s += 4
    else if (hay.includes(t)) s += 2
    else if (t.length > 2 && fuzzy(title, t)) s += 1
    else return 0
  }
  return s
}

const KIND_HINT = { go: '↵', open: '↗', copy: 'copy', download: '↓' }

export default function CommandMenu() {
  const items = useMemo(buildItems, [])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const restoreRef = useRef(null)

  const results = useMemo(() => {
    const scored = items.map((it, i) => ({ it, s: score(it, query), i })).filter((r) => r.s > 0)
    if (query.trim()) scored.sort((a, b) => b.s - a.s || a.i - b.i)
    // keep groups together, ordered by their best match
    const order = []
    scored.forEach((r) => !order.includes(r.it.group) && order.push(r.it.group))
    return order.flatMap((g) => scored.filter((r) => r.it.group === g).map((r) => r.it))
  }, [items, query])

  const close = useCallback(() => {
    setOpen(false)
    lockScroll(false)
    restoreRef.current?.focus?.({ preventScroll: true })
  }, [])

  const show = useCallback(() => {
    restoreRef.current = document.activeElement
    setQuery('')
    setActive(0)
    setOpen(true)
    lockScroll(true)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName || '')
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        open ? close() : show()
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault()
        show()
      }
    }
    const onOpen = () => show()
    window.addEventListener('keydown', onKey)
    window.addEventListener('cmdk:open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('cmdk:open', onOpen)
    }
  }, [open, show, close])

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const runItem = (item) => {
    if (!item) return
    close()
    item.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (results.length ? (a + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runItem(results[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  if (!open) return null

  const top = results[active] || results[0]
  const routed = query.trim() ? (top ? agentName[top.group] : null) : null
  let lastGroup = null

  return createPortal(
    <div className="cmdk" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="cmdk__panel" role="dialog" aria-modal="true" aria-label="Command menu">
        <div className="cmdk__input">
          <svg className="cmdk__mark" viewBox="0 0 28 28" aria-hidden="true">
            <path d="M6 6 14 21M22 6 14 21" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="22" cy="6" r="3" />
            <circle cx="14" cy="21" r="4" className="cmdk__mark-core" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask the orchestrator…"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={top ? `cmdk-${results[active]?.id}` : undefined}
            aria-autocomplete="list"
            spellCheck="false"
            autoComplete="off"
          />
          <kbd className="cmdk__esc" onClick={close}>
            esc
          </kbd>
        </div>

        <div className="cmdk__route" aria-hidden="true">
          <span className="cmdk__node">orchestrator</span>
          <span className={`cmdk__wire${routed ? ' is-on' : ''}`} key={`${routed}-${query}`}>
            <i />
          </span>
          <span className={`cmdk__node${routed ? ' is-target' : ' is-idle'}`}>
            {routed || (query.trim() ? 'no agent matched' : 'try “stelos”, “resume”, “email”')}
          </span>
          <span className="cmdk__count">
            {results.length} {results.length === 1 ? 'route' : 'routes'}
          </span>
        </div>

        <ul className="cmdk__list" id="cmdk-list" role="listbox" ref={listRef} data-lenis-prevent>
          {results.length === 0 && (
            <li className="cmdk__empty">No agent handles that yet. Try “projects”, “résumé” or “linkedin”.</li>
          )}
          {results.map((item, i) => {
            const heading = item.group !== lastGroup ? agentName[item.group] : null
            lastGroup = item.group
            return [
              heading && (
                <li key={`h-${item.group}`} className="cmdk__group" role="presentation">
                  {heading}
                </li>
              ),
              <li
                key={item.id}
                id={`cmdk-${item.id}`}
                data-index={i}
                role="option"
                aria-selected={i === active}
                className={`cmdk__item${i === active ? ' is-active' : ''}`}
                onMouseMove={() => i !== active && setActive(i)}
                onClick={() => runItem(item)}
              >
                <span className="cmdk__icon">{item.icon}</span>
                <span className="cmdk__text">
                  <span className="cmdk__title">{item.title}</span>
                  {item.sub && <span className="cmdk__sub">{item.sub}</span>}
                </span>
                <span className="cmdk__hint">{KIND_HINT[item.kind]}</span>
              </li>,
            ]
          })}
        </ul>

        <div className="cmdk__foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
          <span className="cmdk__note">keyword router · no LLM</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
