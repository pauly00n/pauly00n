'use client'

import { useEffect, useState } from 'react'

// the page follows the system by default. this is the override: one grey word,
// remembered in localStorage, applied before paint by the script in the root layout.

type Theme = 'light' | 'dark'

function current(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'dark' || set === 'light') return set
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null)
  useEffect(() => { setTheme(current()) }, [])

  function flip() {
    const next: Theme = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
    setTheme(next)
  }

  const label = theme === 'dark' ? 'light' : 'dark'
  return (
    <button type="button" className={className} onClick={flip} aria-label={`switch to ${label} mode`} style={{ visibility: theme ? 'visible' : 'hidden' }}>
      {label}
    </button>
  )
}
