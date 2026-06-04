"use client"

import { useEffect, useRef, useState } from "react"
import GlassButton2 from "@/components/ui/glassbutton2"
import styles from "../page.module.css"
import { d } from "./_panel"

// angle rotates the base (upward) arrow to point along each token's travel
// direction: fade-up / from-bottom rise (0°), from-left enters rightward (90°),
// from-right enters leftward (-90°).
const motionTokens = [
  { name: "Fade up", spec: "550ms · ease-out · 12px", note: "hero, headings, about", cls: styles.demoFade, angle: 0 },
  { name: "From left", spec: "550ms · ease-out · 20px spring", note: "skills column 1", cls: styles.demoLeft, angle: 90 },
  { name: "From bottom", spec: "550ms · ease-out · 16px spring", note: "headings, skills column 2", cls: styles.demoBottom, angle: 0 },
  { name: "From right", spec: "550ms · ease-out · 20px spring", note: "skills column 3", cls: styles.demoRight, angle: -90 },
]

function MotionArrow({ angle }: { angle: number }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.motionArrow} style={{ transform: `rotate(${angle}deg)` }} aria-hidden>
      <path
        d="M12 20 V6 M6.5 11.5 L12 5.5 L17.5 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Motion() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setPlayKey((k) => k + 1)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className={`${styles.panel} ${styles.motionPanel} ${inView ? styles.inView : ""}`}>
      <p className={styles.label} data-reveal>motion</p>

      <h2 className={styles.sectionTitle} data-reveal>Motion</h2>
      <p className={styles.sectionLede} data-reveal style={d(60)}>
        One curve, one timing scale. Everything enters once on a plain
        <code className={styles.inlineToken}> ease-out</code> at 550ms. Functional surfaces fade
        12px; skill columns spring 16–20px with a single soft overshoot.
      </p>

      <div key={playKey} className={styles.motionStage}>
        {motionTokens.map((m, i) => (
          <div
            key={m.name}
            className={`${styles.motionTile} ${m.cls}`}
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <span className={styles.motionGlyph}>
              <MotionArrow angle={m.angle} />
            </span>
            <div className={styles.motionText}>
              <b>{m.name}</b>
              <span className={styles.useNote}>{m.note}</span>
            </div>
            <code className={styles.mono}>{m.spec}</code>
          </div>
        ))}
      </div>

      <button type="button" className={styles.replay} onClick={() => setPlayKey((k) => k + 1)}>
        <GlassButton2
          size="0.82rem"
          spanStyle={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6em",
            paddingInline: "1.5em",
            paddingBlock: "0.9em",
            fontWeight: 500,
          }}
        >
          <span className={styles.replayIcon} aria-hidden>↻</span> Replay
        </GlassButton2>
      </button>

      <span className={styles.folio}>07</span>
    </section>
  )
}
