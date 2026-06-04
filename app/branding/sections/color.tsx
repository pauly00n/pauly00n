"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

// real oklch design tokens — app/globals.css :root. the oklch value is
// canonical; the hex is the sRGB conversion, shown for reference only.
const tokens = [
  { token: "--accent", name: "Brand", oklch: "0.55 0.14 232", hex: "#007DB4", use: "links, focus ring, present state", className: styles.swAccent },
  { token: "--foreground", name: "Ink", oklch: "0.18 0.01 232", hex: "#0D1215", use: "primary text", className: styles.swFg },
  { token: "--muted-foreground", name: "Muted", oklch: "0.50 0.01 232", hex: "#5E6468", use: "secondary text", className: styles.swMuted },
  { token: "--border", name: "Hairline", oklch: "0.91 0.005 232", hex: "#DEE2E4", use: "borders, dividers", className: styles.swBorder },
  { token: "--background", name: "Base", oklch: "0.99 0 0", hex: "#FCFCFC", use: "raised fills, cards", className: styles.swBg },
  { token: "--destructive", name: "Destructive", oklch: "0.577 0.245 27.325", hex: "#E7000B", use: "errors, irreversible actions", className: styles.swDestructive },
]

// arch swatches: field gradient + brand, heights encode visual hierarchy.
// the field stops are literal hex authored in hero-background.tsx — NOT tokens;
// only Brand (--accent) is a real oklch design token.
const arches = [
  { id: "field-1", name: "Field top", hex: "#F5F9FD", use: "hero air, open field", className: styles.sTop, h: 125 },
  { id: "field-2", name: "Field upper", hex: "#E8F3FB", use: "default body atmosphere", className: styles.sMid, h: 112 },
  { id: "field-3", name: "Field mid", hex: "#D6EAF8", use: "lower gradient depth", className: styles.sDeep, h: 97 },
  { id: "field-4", name: "Field floor", hex: "#C4E0F5", use: "bottom anchor, horizon", className: styles.sFloor, h: 84 },
  { id: "--accent", name: "Brand", hex: "#007DB4", use: "links, present state, emphasis", className: styles.swAccent, h: 120 },
]

export function Color() {
  return (
    <Panel label="color system" folio="04" className={styles.colorPanel}>
      <div className={styles.colorHead}>
        <h2 className={styles.sectionTitle} data-reveal>Color</h2>
        <p className={styles.colorLede} data-reveal style={d(60)}>
          Ink, muted, hairline and the brand blue are <code className={styles.inlineToken}>oklch</code>
          {" "}design tokens (app/globals.css); the hexes here are sRGB conversions for reference. The
          cool-blue field beneath them is a gradient hand-authored
          in hero-background.tsx, ramped for depth.
        </p>
      </div>

      <div className={styles.arches} data-reveal style={d(120)}>
        {arches.map((c) => (
          <div key={c.id} className={styles.archCol}>
            <span className={`${styles.arch} ${c.className}`} style={{ height: c.h }} />
            <p className={styles.archName}>{c.name}</p>
            <code className={`${styles.archHex} ${styles.mono}`}>{c.hex}</code>
            <span className={styles.archUse}>{c.use}</span>
          </div>
        ))}
      </div>

      <div className={styles.subColors} data-reveal style={d(200)}>
        <div className={styles.subGroup}>
          <p className={styles.subHead}>Design tokens · oklch</p>
          <div className={styles.tokenGrid}>
            {tokens.map((c) => (
              <div key={c.token} className={styles.tokenCell}>
                <span className={`${styles.dot2} ${c.className}`} />
                <div className={styles.tokenMeta}>
                  <b>{c.name}</b>
                  <code className={styles.mono}>{c.token}</code>
                </div>
                <code className={styles.tokenHex}>{c.hex}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
