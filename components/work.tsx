"use client"

import { createRef, useMemo, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading, SectionShell } from "@/components/ui/section"
import { useIntersectionOnce, useIntersectionsOnce } from "@/hooks/use-intersection-once"
import { revealStyle } from "@/hooks/use-reveal-style"
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
    company: "Amazon Web Services (AWS)",
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
    title: "Software Engineer Intern",
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

  const rowRefs = useMemo(() => experiences.map(() => createRef<HTMLElement>()), [])
  const rowVisible = useIntersectionsOnce(rowRefs)

  const headingFade = (delay = 0) => revealStyle(headingVisible, "skillsFromBottom", delay)

  return (
    <SectionShell id="work" maxWidth="6xl" sectionRef={sectionRef}>
        {/* Heading */}
        <SectionHeading
          first="Where I've"
          second="been working."
          className="mb-16 sm:mb-20"
          firstStyle={headingFade(150)}
          secondStyle={headingFade(400)}
        />

        {/* Timeline */}
        <div className="relative sm:pl-32 md:pl-40">
          {/* Vertical rule — grows downward as rows reveal (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden sm:block absolute top-2 bottom-2 sm:left-28 md:left-36 w-px bg-border/70 origin-top"
            style={{
              transform: headingVisible ? "scaleY(1)" : "scaleY(0)",
              transition: headingVisible
                ? `transform ${300 + experiences.length * 70 + 200}ms cubic-bezier(0.65, 0, 0.35, 1) 250ms`
                : "none",
            }}
          />

          {experiences.map((exp, idx) => {
            const visible = rowVisible[idx] && headingVisible
            const rowStyle: React.CSSProperties = visible
              ? { animation: `workSlideUp 450ms ease-out ${300 + idx * 70}ms both` }
              : { opacity: 0 }

            return (
              <article
                key={exp.company + exp.startLabel}
                ref={rowRefs[idx]}
                className="group/row relative pb-14 sm:pb-8 last:pb-0"
                style={rowStyle}
              >
                {/* Date column — sm+: left gutter; mobile: handled inline below */}
                <div className="hidden sm:block absolute top-0 sm:-left-32 md:-left-40 sm:w-24 md:w-32 pr-4 text-right">
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
                      className="mt-2 font-[600] font-mono text-[12px] tracking-[0.13em]"
                      style={{ color: BRAND_BLUE }}
                    >
                      INCOMING
                    </div>
                  )}
                </div>

                {/* Timeline dot — sits on the rail (desktop only) */}
                <span
                  aria-hidden="true"
                  className="hidden sm:flex absolute top-[10px] -left-4 h-3 w-3 -translate-x-1/2 items-center justify-center"
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
                <div className="sm:pl-10 max-w-3xl">
                  {/* Mobile meta row — role left, date right (resume-style) */}
                  <div className="sm:hidden mb-2 flex items-start justify-between gap-3">
                    <div
                      className="font-mono font-[600] text-[11px] uppercase tracking-[0.13em] text-foreground/65 flex-1 leading-tight"
                    >
                      {exp.title}
                    </div>
                    <div className="shrink-0 text-right font-mono font-[600] text-[11px] uppercase tracking-[0.13em] text-foreground/55 leading-tight whitespace-nowrap">
                      <div>
                        <span className="text-foreground/75 tabular-nums">{yearLabel(exp)}</span>
                        <span className="mx-1.5 text-foreground/30">·</span>
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
                        <div style={{ color: BRAND_BLUE }}>Incoming</div>
                      )}
                    </div>
                  </div>

                  {/* Role eyebrow — desktop only (mobile shows it in the meta row above) */}
                  <div className="hidden sm:block font-mono font-[600] text-[12px] uppercase tracking-[0.14em] text-foreground/65">
                    {exp.title}
                  </div>

                  {/* Company headline */}
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-1 inline-flex items-baseline gap-2 sm:mt-3"
                  >
                    <h3
                      className="relative font-serif font-medium leading-[1.1] text-2xl sm:text-[28px] text-foreground transition-colors duration-300"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {exp.company}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 -bottom-1 h-px scale-x-0 origin-left transition-transform duration-500 ease-out group-hover/link:scale-x-100"
                        style={{ background: BRAND_BLUE, opacity: 0.8 }}
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

    </SectionShell>
  )
}
