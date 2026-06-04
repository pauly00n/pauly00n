"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

export function Atmosphere() {
  return (
    <Panel label="image direction" folio="05" className={styles.atmosphere}>
      <div className={styles.field} />
      <div className={styles.horizon} />
      {/* same drifting radial bloom as the live page (hero-background.tsx).
          inline style references the global driftBloom keyframe directly. */}
      <div className={styles.bloomWrap}>
        <div
          style={{
            position: "absolute",
            inset: "-25%",
            background:
              "radial-gradient(ellipse 50% 50%, rgba(60, 160, 220, 0.52), transparent)",
            animation: "driftBloom 10s ease-in-out infinite",
          }}
        />
      </div>
      <p className={styles.caption} data-reveal style={d(120)}>soft field, precise type, visible grain.</p>

      <div className={styles.atmoNotes} data-reveal style={d(220)}>
        <div className={styles.atmoGroup}>
          <p className={styles.blockHead}>Atmosphere</p>
          <dl className={styles.paramList}>
            <div><dt>field</dt><dd>linear · 160°</dd></div>
            <div><dt>grain</dt><dd>noise · 700px · 10%</dd></div>
            <div><dt>bloom</dt><dd>radial · 10s drift</dd></div>
          </dl>
        </div>
        <div className={styles.atmoGroup}>
          <p className={styles.blockHead}>Photography</p>
          <ul className={styles.atmoList}>
            <li>warm, candid, natural light</li>
            <li>rounded 16px, never hard frames</li>
            <li>screenshots ride inside glass</li>
          </ul>
        </div>
      </div>
    </Panel>
  )
}
