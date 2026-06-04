"use client"

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import GlassPillAuto from "@/components/ui/glasspill-auto"
import { ButtonRow } from "@/components/buttonrow"
import styles from "../page.module.css"
import { Panel, d } from "./_panel"

// the pill is draggable inside the stage. it MUST move via left/top, never a
// transform — transform on the pill or any ancestor forms a backdrop root and
// blanks the refraction. drag updates the DOM style directly (no React state
// per move) so GlassPill never re-measures or regenerates its maps.
function DraggablePill() {
  const stageRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)

  // center on mount, and re-center on resize while not being dragged
  useEffect(() => {
    const stage = stageRef.current
    const pill = pillRef.current
    if (!stage || !pill) return
    const center = () => {
      if (drag.current) return
      pill.style.left = `${Math.round((stage.clientWidth - pill.offsetWidth) / 2)}px`
      pill.style.top = `${Math.round((stage.clientHeight - pill.offsetHeight) / 2)}px`
    }
    center()
    const ro = new ResizeObserver(center)
    ro.observe(stage)
    ro.observe(pill)
    return () => ro.disconnect()
  }, [])

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const pill = pillRef.current
    if (!pill) return
    pill.setPointerCapture(e.pointerId)
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: parseFloat(pill.style.left) || 0,
      oy: parseFloat(pill.style.top) || 0,
    }
  }

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const stage = stageRef.current
    const pill = pillRef.current
    if (!d || !stage || !pill) return
    const maxX = stage.clientWidth - pill.offsetWidth
    const maxY = stage.clientHeight - pill.offsetHeight
    const nx = Math.max(0, Math.min(d.ox + e.clientX - d.sx, maxX))
    const ny = Math.max(0, Math.min(d.oy + e.clientY - d.sy, maxY))
    pill.style.left = `${nx}px`
    pill.style.top = `${ny}px`
  }

  const onUp = () => {
    drag.current = null
  }

  return (
    <div ref={stageRef} className={styles.glassStage}>
      <span className={`${styles.glassHint} ${styles.mono}`} aria-hidden>click + hold to drag</span>
      <p className={styles.glassWord}>refract</p>
      <div
        ref={pillRef}
        className={styles.glassPillSlot}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <GlassPillAuto className="flex items-center gap-6 px-6 py-3" tintOpacity={40}>
          <span className="flex items-center">
            <Image src="/icon-light.png" alt="PY logo" width={24} height={24} />
          </span>
          <div className="h-4 w-px bg-foreground/10" />
          <span className="text-base text-black/70">Work</span>
          <span className="text-base text-black/70">Projects</span>
          <span className="text-base text-black/70">Resume</span>
        </GlassPillAuto>
      </div>
    </div>
  )
}

export function Glass() {
  return (
    <Panel label="material" folio="08" className={styles.glassPanel}>
      <div className={styles.glassHead}>
        <h2 className={styles.sectionTitle} data-reveal>Glass</h2>
        <p className={styles.glassLede} data-reveal style={d(60)}>
          The signature surface. A real-time filter samples whatever sits behind it, then bends and refracts
          it through a simulated lens. Two implementations:
          a heavy pill for the nav, a light button for actions.
        </p>
      </div>

      <div className={styles.glassBody}>
        {/* live, untransformed: the pill warps the word behind it. NO transform /
            filter / opacity<1 on this chain or any ancestor — each spawns a backdrop
            root and blanks the refraction. */}
        <div className={styles.glassDemos}>
          <DraggablePill />

          <div className={styles.glassBtnDemo}>
            <ButtonRow />
          </div>
        </div>

        <div className={styles.glassDocs}>
          <div className={styles.glassCard} data-reveal style={d(120)}>
            <p className={styles.blockHead}>GlassPill · glasspill.tsx</p>
            <p className={styles.glassDesc}>
              A per-size displacement + specular map drives an SVG <code>feDisplacementMap</code>
              {" "}on <code>backdrop-filter</code>, bending the live page through the lens.
              <code> GlassPillAuto</code> falls back to CSS blur on Safari.
            </p>
            <dl className={styles.paramList}>
              <div><dt>thickness</dt><dd>80u</dd></div>
              <div><dt>bezel</dt><dd>20px</dd></div>
              <div><dt>blur</dt><dd>2px</dd></div>
              <div><dt>tint</dt><dd>white · 40%</dd></div>
            </dl>
          </div>

          <div className={styles.glassCard} data-reveal style={d(180)}>
            <p className={styles.blockHead}>GlassButton2 · glassbutton2.tsx</p>
            <p className={styles.glassDesc}>
              Lighter glass for actions: a clipped <code>feGaussianBlur</code> backdrop with
              layered specular and shadow, composited in CSS.
            </p>
            <dl className={styles.paramList}>
              <div><dt>blur</dt><dd>2px</dd></div>
              <div><dt>finish</dt><dd>specular + shadow</dd></div>
            </dl>
          </div>
        </div>
      </div>

      <p className={`${styles.glassDemoCaption} ${styles.mono}`}>
        Drag the pill · live Chrome refraction
      </p>

      <p className={styles.glassRule} data-reveal style={d(240)}>
        <b>Rule:</b> never put a <code>transform</code>, <code>filter</code>, or
        {" "}<code>opacity &lt; 1</code> on the pill or any ancestor — each forms a backdrop
        root that blanks the refraction. Position with layout, never transforms.
      </p>
    </Panel>
  )
}
