"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { useIntersectionOnce } from "@/hooks/use-intersection-once"
import { useMobileScrollLine } from "@/hooks/use-mobile-scroll-line"
import { BRAND_BLUE } from "@/lib/utils"

const projects = [
  {
    title: "AutoML-Cardiac",
    description:
      "Autonomous ML experiment framework for cardiac MRI classification on the ACDC dataset.",
    tags: ["PyTorch", "Python", "Markdown"],
    githubUrl: "https://github.com/pauly00n/AutoML-Cardiac",
    image: "/automl-cardiac.png",
  },
  {
    title: "Ask Stella",
    description:
      "Full stack web app solving radiologists' pain points with AI workflows, integrating multiple into one place.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    liveUrl: "https://paulyoon.xyz/stella",
    githubUrl: "https://github.com/pauly00n/personal-website",
    image: "/stella1.png",
  },
  {
    title: "Hidden Studios AdTech Platform",
    description:
      "Ad campaign scheduling platform with impression forecasting powered by live Fortnite player-count data",
    tags: ["Next.js", "TypeScript", "Supabase"],
    image: "/hidden-studios1.png",
  },
  {
    title: "Stanford Christian Students App",
    description:
      "Full stack web & mobile app delivering daily scripture reading(s) for Stanford students",
    tags: ["React Native", "TypeScript", "AWS"],
    liveUrl: "https://apps.apple.com/us/app/stanford-christian-students/id1606989492",
    image: "/scsapp.png",
  },
  {
    title: "Formalizing Wigner's Semicircle Law",
    description:
      "Translating random matrix theory proofs into machine-verified mathematics",
    tags: ["Lean", "Mathlib", "LaTeX"],
    liveUrl: "https://fredraj3.github.io/SemicircleLaw/",
    githubUrl: "https://github.com/FredRaj3/SemicircleLaw",
    image: "/formalizing.png",
  },
  {
    title: "Timestamping Video Game Eliminations",
    description:
      "Lightweight computer vision pipeline for splicing Brawl Stars highlights from raw footage",
    tags: ["Python", "YOLOv8", "OpenCV"],
    githubUrl: "https://github.com/pauly00n/timestamping-video-game-eliminations",
    image: "/timestamping.jpeg",
  },
  {
    title: "S1R PET/MRI Knee Pain Research",
    description:
      "Analyzed PET/MRI scans of patients with chronic knee pain. Presented at SNMMI conference. Co-author of manuscript",
    tags: ["Horos", "Excel", "Powerpoint"],
    liveUrl: "https://jnm.snmjournals.org/content/62/supplement_1/143",
    image: "/knee-pain.png",
  },
]

const NUM_PROJECTS = projects.length

const CARD_BG: React.CSSProperties = {
  background: "linear-gradient(160deg, #f5f9fd 0%, #e8f3fb 25%, #d6eaf8 50%, #c4e0f5 100%)",
}

const OVERLAY_BG: React.CSSProperties = {
  background: "linear-gradient(to bottom, transparent 25%, rgba(1, 60, 110, 0.55) 50%, rgba(0, 40, 85, 0.92) 100%)",
}
const NUM_ROWS = Math.ceil(NUM_PROJECTS / 2)

// Compute animation name + base delay for each card index (module-level, stable)
const CARD_ANIM = projects.map((_, idx) => {
  const row = Math.floor(idx / 2)
  const col = idx % 2
  const isLastRow = row === NUM_ROWS - 1
  const isOnlyInRow = isLastRow && NUM_PROJECTS % 2 === 1

  if (row === 0) {
    return col === 0
      ? { name: "projectsFadeTopLeft",  delay: 700 }
      : { name: "projectsFadeTopRight", delay: 900 }
  }

  if (isOnlyInRow) {
    // Solo card in last row (desktop only) — fade in from bottom
    return { name: "projectsFadeIn", delay: 200 }
  }

  const delay = row === 1 ? 500 : 200
  return col === 0
    ? { name: "projectsFadeLeft",  delay }
    : { name: "projectsFadeRight", delay }
})

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  // Dynamic ref array — works for any number of cards without hardcoding refs
  const cardEls = useRef<(HTMLDivElement | null)[]>(projects.map(() => null))
  // Stable RefObject-compatible wrappers for useMobileScrollLine
  const cardRefObjects = useRef(
    projects.map((_, i) => ({
      get current() { return cardEls.current[i] }
    }))
  )

  const headingVisible = useIntersectionOnce(sectionRef)
  const [isMobile, setIsMobile] = useState(false)
  const [cardVisible, setCardVisible] = useState<boolean[]>(Array(NUM_PROJECTS).fill(false))
  // Tracks when each card's observer fired — used to detect simultaneous triggers
  const cardTriggeredAt = useRef<(number | null)[]>(Array(NUM_PROJECTS).fill(null))

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Per-card observers — on desktop only even-indexed cards trigger their row pair
  useEffect(() => {
    const observers = cardEls.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cardTriggeredAt.current[i] = performance.now()
            setCardVisible(prev => { const next = [...prev]; next[i] = true; return next })
            observer.disconnect()
          }
        },
        { threshold: 0.05 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const activeIdx = useMobileScrollLine(
    cardRefObjects.current as Parameters<typeof useMobileScrollLine>[0],
    isMobile
  )
function fadeStyle(delayMs: number): React.CSSProperties {
    return headingVisible
      ? { animation: `projectsFadeIn 500ms ease-out ${delayMs}ms both` }
      : { opacity: 0 }
  }

  function cardFadeStyle(idx: number): React.CSSProperties {
    if (isMobile) {
      // Mobile: single column — each card fades in independently (unchanged)
      if (!cardVisible[idx]) return { opacity: 0 }
      return { animation: `projectsFadeLeft 550ms ease-out 0ms both` }
    }

    // Desktop: pair cards by row — left card (even idx) triggers both
    const row = Math.floor(idx / 2)
    const rowTriggerIdx = row * 2
    if (!cardVisible[rowTriggerIdx]) return { opacity: 0 }

    const { name, delay } = CARD_ANIM[idx]
    const myTime = cardTriggeredAt.current[rowTriggerIdx] ?? 0

    // If a previous row fired within 150ms of this one, they were simultaneous —
    // add 500ms stagger per such row so they cascade rather than all pop at once.
    let stagger = 0
    for (let r = 0; r < row; r++) {
      const t = cardTriggeredAt.current[r * 2]
      if (t !== null && Math.abs(myTime - t) < 150) stagger += 500
    }

    return { animation: `${name} 550ms ease-out ${delay + stagger}ms both` }
  }

  return (
    <section ref={sectionRef} id="projects" className="relative border-t border-border/50 min-h-screen" >
      <SectionTopGlow />

      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-20">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <span style={fadeStyle(200)}>
              Here&apos;s what I&apos;ve
            </span>
            <br />
            <span className="italic" style={{ color: BRAND_BLUE, ...fadeStyle(500) }}>
              worked on.
            </span>
          </h2>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const primaryUrl = project.liveUrl || project.githubUrl || "#"
            const isCardActive = isMobile && activeIdx === idx
            const isSoloLastCard = NUM_PROJECTS % 2 === 1 && idx === NUM_PROJECTS - 1
              return (
              <div
                key={project.title}
                ref={el => { cardEls.current[idx] = el }}
                className={`group${isSoloLastCard ? " md:col-span-2 md:w-1/2 md:mx-auto" : ""}`}
                style={cardFadeStyle(idx)}
              >

                {/* Image card */}
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/3] overflow-hidden rounded-2xl"
                  style={CARD_BG}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
                    style={isCardActive ? { transform: 'scale(1.03)', transition: 'transform 500ms ease-out' } : undefined}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-out"
                    style={isCardActive ? { ...OVERLAY_BG, opacity: 1 } : OVERLAY_BG}
                  />

                  {/* Overlay content */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-[opacity,translate] duration-500 ease-out"
                    style={isCardActive ? { opacity: 1, transform: 'translateY(0)' } : undefined}
                  >
                    <h3 className="font-serif text-xl font-medium text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-full border border-white/25 px-3 py-1 text-xs text-white/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>

                {/* Below-card row */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 hover:text-foreground transition-colors"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 hover:text-foreground transition-colors"
                        aria-label={`${project.title} live`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
