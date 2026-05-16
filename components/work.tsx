"use client"

import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { useIntersectionOnce, useIntersectionsOnce } from "@/hooks/use-intersection-once"
import { BRAND_BLUE } from "@/lib/utils"

type Experience = {
  startLabel: string
  endLabel: string
  title: string
  company: string
  subtitle?: string
  url: string
  description: string
  incoming?: boolean
}

const experiences: Experience[] = [
  {
    startLabel: "Jun 2026",
    endLabel: "Aug 2026",
    title: "Software Development Engineer Intern",
    company: "Amazon Web Services",
    subtitle: "SageMaker HyperPod Team",
    url: "https://aws.amazon.com/sagemaker/hyperpod/",
    description:
      "Joining the SageMaker HyperPod team for summer 2026: distributed training infrastructure for large-scale ML workloads.",
    incoming: true,
  },
  {
    startLabel: "Jan 2026",
    endLabel: "Present",
    title: "Researcher",
    company: "Stanford Ashley Lab",
    url: "https://ashleylab.stanford.edu",
    description: "Developing a framework for agents to execute autonomous machine learning research on the UK Biobank's massive dataset.",
  },
  {
    startLabel: "Sept 2025",
    endLabel: "Mar 2026",
    title: "Researcher",
    company: "Stanford AIMI",
    subtitle: "PI: Bao Do, MD",
    url: "https://aimi.stanford.edu",
    description:
      "Built an automated radiology retrieval pipeline orchestrating 5+ external APIs (Gemini, Google Images, internal libraries), cutting ~90% of manual lookup time for clinicians. Wrote structured-text extraction to convert radiology prose into typed clinical features for downstream reasoning.",
  },
  {
    startLabel: "Jul 2024",
    endLabel: "Sept 2024",
    title: "Software Engineering Intern",
    company: "Sundial",
    url: "https://sundial.ai",
    description:
      "Shipped a Python forecasting component (Facebook Prophet) that outperformed the production model by 120% MAPE and was adopted directly into the analytics pipeline. Built a Spark SQL anomaly detector on S3-backed event logs to reduce false positives for power users.",
  },
]

function splitLabel(label: string): { month: string; year: string } {
  if (label === "Present") return { month: "Present", year: "" }
  const [month, year] = label.split(" ")
  return { month, year }
}

function isPresent(exp: Experience): boolean {
  return exp.endLabel === "Present"
}

function yearLabel(exp: Experience): string {
  const s = splitLabel(exp.startLabel).year
  const e = splitLabel(exp.endLabel).year
  if (isPresent(exp)) return s
  return s === e ? s : `${s.slice(2)}–${e.slice(2)}`
}

function monthRange(exp: Experience): string {
  return `${splitLabel(exp.startLabel).month} – ${splitLabel(exp.endLabel).month}`
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingVisible = useIntersectionOnce(sectionRef)

  const rowRefs = useRef(experiences.map(() => ({ current: null as HTMLElement | null })))
  const rowRefObjects = rowRefs.current
  const rowVisible = useIntersectionsOnce(rowRefObjects)

  function headingFade(delay = 0): React.CSSProperties {
    return headingVisible
      ? { animation: `skillsFromBottom 600ms ease-out ${delay}ms both` }
      : { opacity: 0 }
  }

  return (
    <section ref={sectionRef} id="work" className="relative border-t border-border/50">
      <SectionTopGlow />

      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">

        {/* Heading */}
        <h2 className="mb-16 sm:mb-20 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          <span style={headingFade(0)}>Where I&apos;ve</span>
          <br />
          <span className="italic" style={{ color: BRAND_BLUE, ...headingFade(300) }}>
            been working.
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative pl-20 sm:pl-32 md:pl-40">
          {/* Vertical rule — sits behind the dots */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-16 sm:left-28 md:left-36 w-px bg-border/70"
          />

          {experiences.map((exp, idx) => {
            const visible = rowVisible[idx]
            const rowStyle: React.CSSProperties = visible
              ? { animation: `workSlideUp 550ms ease-out 0ms both` }
              : { opacity: 0 }

            return (
              <article
                key={exp.company + exp.startLabel}
                ref={el => { rowRefObjects[idx].current = el }}
                className="group/row relative pb-14 sm:pb-8 last:pb-0"
                style={rowStyle}
              >
                {/* Date column — absolutely positioned to the left of the rail */}
                <div className="absolute top-0 -left-20 sm:-left-32 md:-left-40 w-16 sm:w-24 md:w-32 pr-4 text-right">
                  <div
                    className="font-mono font-[600] text-[12px] tabular-nums tracking-[0.13em] text-foreground/75"
                  >
                    {yearLabel(exp)}
                  </div>
                  <div className="mt-1 font-mono font-[600] text-[12px] uppercase tracking-[0.13em] text-foreground/50">
                    {isPresent(exp) ? (
                      <>
                        {splitLabel(exp.startLabel).month} –{" "}
                        <span style={{ color: BRAND_BLUE }}>Present</span>
                      </>
                    ) : (
                      monthRange(exp)
                    )}
                  </div>
                  {exp.incoming && (
                    <div
                      className="mt-2 font-[600] font-mono text-[12px] uppercase tracking-[0.13em]"
                      style={{ color: BRAND_BLUE }}
                    >
                      Incoming
                    </div>
                  )}
                </div>

                {/* Timeline dot — sits on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute top-[10px] -left-4 flex h-3 w-3 -translate-x-1/2 items-center justify-center"
                >
                  {exp.incoming ? (
                    <>
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping"
                        style={{ background: BRAND_BLUE }}
                      />
                      <span
                        className="relative inline-flex h-2 w-2 rounded-full"
                        style={{ background: BRAND_BLUE }}
                      />
                    </>
                  ) : isPresent(exp) ? (
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: BRAND_BLUE }}
                    />
                  ) : (
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full border bg-background"
                      style={{ borderColor: BRAND_BLUE, opacity: 0.55 }}
                    />
                  )}
                </span>

                {/* Body — sits to the right of the rail */}
                <div className="pl-6 sm:pl-10 max-w-3xl">
                  {/* Role eyebrow */}
                  <div className="font-mono font-[600] text-[12px] uppercase tracking-[0.14em] text-foreground/65">
                    {exp.title}
                  </div>

                  {/* Company headline */}
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-3 inline-flex items-baseline gap-2"
                  >
                    <h3
                      className="relative font-serif font-medium leading-[1.1] text-2xl sm:text-[28px] text-foreground transition-colors duration-300"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {exp.company}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 -bottom-1 h-px scale-x-0 origin-left transition-transform duration-500 ease-out group-hover/link:scale-x-100"
                        style={{ background: BRAND_BLUE, opacity: 0.5 }}
                      />
                    </h3>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 self-center text-foreground/30 transition-all duration-300 group-hover/link:opacity-90 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[color:var(--brand-blue)]"
                      style={{ ["--brand-blue" as string]: BRAND_BLUE }}
                    />
                  </a>

                  {exp.subtitle && (
                    <p className="mt-1.5 font-serif font-medium italic text-[15px] text-foreground/60">
                      {exp.subtitle}
                    </p>
                  )}

                  <p className="mt-5 text-[14.5px] sm:text-[15.5px] leading-[1.7] text-foreground/75">
                    {exp.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
