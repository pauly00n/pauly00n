"use client"

import { useEffect, useRef, useState } from "react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { SectionLabel } from "@/components/ui/section-label"
import { useIntersectionOnce, useIntersectionsOnce } from "@/hooks/use-intersection-once"
import { useMobileScrollLine } from "@/hooks/use-mobile-scroll-line"
import GlassButton2 from "@/components/ui/glassbutton2"
import { BRAND_BLUE } from "@/lib/utils"
import { FaPython, FaReact, FaAws } from "react-icons/fa"
import {
  SiGit, SiLatex, SiTypescript, SiJavascript, SiPandas,
  SiScikitlearn, SiPytorch, SiCplusplus, SiApachespark,
  SiJupyter, SiQt, SiFlask, SiExpress, SiFastapi, SiTailwindcss, SiC, SiGooglecloud,
} from "react-icons/si"
import { PiFileHtmlDuotone } from "react-icons/pi"
import { TbBrandReactNative, TbMath } from "react-icons/tb"
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri"
import { VscVscode } from "react-icons/vsc"

const columns = [
  {
    heading: "Languages",
    skills: [
      { label: "Python",      Icon: FaPython },
      { label: "JavaScript",  Icon: SiJavascript },
      { label: "TypeScript",  Icon: SiTypescript },
      { label: "HTML / CSS",  Icon: PiFileHtmlDuotone },
      { label: "LaTeX",       Icon: SiLatex },
      { label: "Lean",        Icon: TbMath },
      { label: "C++",         Icon: SiCplusplus },
      { label: "C",           Icon: SiC },
    ],
  },
  {
    heading: "Frameworks / Libraries",
    skills: [
      { label: "React",        Icon: FaReact },
      { label: "React Native", Icon: TbBrandReactNative },
      { label: "Next.js",      Icon: RiNextjsFill },
      { label: "Tailwind CSS", Icon: SiTailwindcss },
      { label: "FastAPI",      Icon: SiFastapi },
      { label: "Express",      Icon: SiExpress },
      { label: "Pandas",       Icon: SiPandas },
      { label: "Scikit-Learn", Icon: SiScikitlearn },
      { label: "PyTorch",      Icon: SiPytorch },
    ],
  },
  {
    heading: "Developer Tools",
    skills: [
      { label: "Git / Github",     Icon: SiGit },
      { label: "Supabase",         Icon: RiSupabaseFill },
      { label: "AWS",              Icon: FaAws },
      { label: "Google Cloud",     Icon: SiGooglecloud },
      { label: "Apache Spark",     Icon: SiApachespark },
      { label: "Jupyter Notebook", Icon: SiJupyter },
      { label: "VS Code",          Icon: VscVscode },
      { label: "Qt Creator",       Icon: SiQt },
    ],
  },
]

// animation name per column index: left bounces from left, middle from bottom, right from right
const COL_ANIM = ["skillsFromLeft", "skillsFromBottom", "skillsFromRight"]

const SKILL_CARD_WRAPPER: React.CSSProperties = {
  '--gb2-radius': '1rem',
  '--gb2-sheen-tx': '17%',
  '--gb2-sheen-ty': '17%',
  '--gb2-sheen-hover-tx': '8%',
  '--gb2-sheen-hover-ty': '8%',
  '--gb2-sheen-hover-angle': '-35deg',
  height: '100%',
} as React.CSSProperties

const SKILL_CARD_SPAN: React.CSSProperties = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '1.5rem 1.75rem',
  letterSpacing: 'normal',
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const colRef0 = useRef<HTMLDivElement>(null)
  const colRef1 = useRef<HTMLDivElement>(null)
  const colRef2 = useRef<HTMLDivElement>(null)
  const colRefs = [colRef0, colRef1, colRef2]

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const headingVisible = useIntersectionOnce(sectionRef)
  const colVisible = useIntersectionsOnce(colRefs)
  const activeColIdx = useMobileScrollLine(colRefs, isMobile)

  function headingFade(delay = 0): React.CSSProperties {
    return headingVisible
      ? { animation: `skillsFromBottom 600ms ease-out ${delay}ms both` }
      : { opacity: 0 }
  }

  function colFade(col: number): React.CSSProperties {
    if (!colVisible[col]) return { opacity: 0 }
    return { animation: `${COL_ANIM[col]} 550ms ease-out 300ms both` }
  }

  return (
    <section ref={sectionRef} id="skills" className="relative border-t border-border/50">
      <SectionTopGlow />

      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">

        <h2 className="mb-16 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          <span style={headingFade(0)}>Skills: Things I</span>
          <br />
          <span className="italic" style={{ color: BRAND_BLUE, ...headingFade(300) }}>
            Build With.
          </span>
        </h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {columns.map((col, ci) => (
            <div
              key={col.heading}
              ref={colRefs[ci]}
              style={colFade(ci)}
              className="h-full"
            >
              <GlassButton2
                fill
                forceHover={isMobile && activeColIdx === ci}
                disableHover={isMobile}
                wrapperStyle={SKILL_CARD_WRAPPER}
                spanStyle={SKILL_CARD_SPAN}
              >
                <h3 className="mb-5 text-sm font-medium uppercase tracking-widest text-foreground/90">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-4">
                  {col.skills.map(({ label, Icon }) => (
                    <li key={label} className="flex items-center gap-3.5">
                      <Icon className="h-5 w-5 shrink-0 text-foreground/50" style={{ filter: 'drop-shadow(0 0.15em 0.05em rgba(0,0,0,0.12))' }} />
                      <span className="text-base text-foreground/80">{label}</span>
                    </li>
                  ))}
                </ul>
              </GlassButton2>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
