"use client"

import type { CSSProperties } from "react"
import styles from "../page.module.css"
import { Panel, d } from "./_panel"
import GlassButton2 from "@/components/ui/glassbutton2"

// tight em padding (relative to the hero-sized type from `size`) so the pill
// hugs its text and centers it vertically.
const PILL_PAD_X = "0.62em"
const PILL_SPAN: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `0.32em ${PILL_PAD_X}`,
  letterSpacing: "normal",
}

// pull the pill left by its own inner padding so "bound" aligns under the
// headline's left edge rather than sitting indented behind the rounded cap.
const PILL_WRAPPER: CSSProperties = {
  marginLeft: `-${PILL_PAD_X}`,
}

export function Essence() {
  return (
    <Panel label="brand essence" folio="02" className={styles.essence}>
      <div className={styles.essenceStack} data-reveal style={d(80)}>
        <h2 className={styles.essenceHeadline}>
          <span className={styles.essenceLine}>A research</span>
          <span className={styles.essenceLine}>notebook</span>
        </h2>
        <GlassButton2
          size="clamp(48px, 7vw, 90px)"
          wrapperStyle={PILL_WRAPPER}
          spanStyle={PILL_SPAN}
        >
          <span className={styles.essencePillText}>bound in glass.</span>
        </GlassButton2>
      </div>
    </Panel>
  )
}
