"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import GlassPillAuto from "@/components/ui/glasspill-auto"
import { cn } from "@/lib/utils"
import styles from "./nav.module.css"

type NavLink = { label: string; href: string; sectionId?: string }

const navLinks: NavLink[] = [
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Resume", href: "/resume.pdf" },
]

export function Nav() {
  const [overProjects, setOverProjects] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    function check() {
      const projects = document.getElementById('projects')
      if (!projects) { setOverProjects(false); return }
      const { top, bottom } = projects.getBoundingClientRect()
      setOverProjects(top < 74 && bottom > 0)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    const ids = navLinks.map(l => l.sectionId).filter(Boolean) as string[]
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return

    function pick() {
      const probe = 74 + 24
      let current: string | null = null
      for (const el of els) {
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= probe && bottom > probe) { current = el.id; break }
      }
      setActiveId(current)
    }
    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [])

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center bg-transparent">
      <GlassPillAuto
        className="flex items-center gap-6 px-6 py-3"
        tintOpacity={overProjects ? 40 : 16}
      >
        <a href="#" aria-label="Home" className="flex items-center">
          <Image
              src="/icon-light.png"
              className="text-sm font-semibold tracking-tight text-foreground"
              alt="PY Logo"
              width={20}
              height={20}
          />
        </a>
        <div className="h-4 w-px bg-foreground/10" />
        {navLinks.map((link) => {
          const isActive = link.sectionId ? activeId === link.sectionId : false
          return (
            <a
              key={link.href + link.label}
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                styles.link,
                "text-sm transition-colors",
                isActive ? `text-black ${styles.active}` : "text-black/70 hover:text-black"
              )}
            >
              {link.label}
            </a>
          )
        })}
      </GlassPillAuto>
    </header>
  )
}
