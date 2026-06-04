"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

// the mark is drawn on a 50-unit grid; these are the real construction
// coordinates (identical to public/logo.svg).
function ConstructionFigure() {
  const units = Array.from({ length: 51 }, (_, i) => i)
  const tens = [0, 10, 20, 30, 40, 50]
  const cx = 28.5
  const cy = 17
  return (
    <svg
      viewBox="-10 -9 69 68"
      className={styles.blueprint}
      role="img"
      aria-label="Construction of the PY mark on a 50-unit grid: bowl radius 11, counter radius 4, constant 7-unit stroke, left arm meeting the stem at unit 28."
    >
      <g className={styles.bpMinor}>
        {units.map((i) => <line key={`v${i}`} x1={i} y1={0} x2={i} y2={50} />)}
        {units.map((i) => <line key={`h${i}`} x1={0} y1={i} x2={50} y2={i} />)}
      </g>
      <g className={styles.bpMajor}>
        {tens.map((i) => <line key={`V${i}`} x1={i} y1={0} x2={i} y2={50} />)}
        {tens.map((i) => <line key={`H${i}`} x1={0} y1={i} x2={50} y2={i} />)}
      </g>
      <g className={styles.bpAxis}>
        {tens.map((i) => <text key={`tx${i}`} x={i} y={-2.4} textAnchor="middle" fontSize={1.9}>{i}</text>)}
        {tens.map((i) => <text key={`ty${i}`} x={-2.6} y={i + 0.6} textAnchor="end" fontSize={1.9}>{i}</text>)}
      </g>

      <mask id="bp-mark-mask">
        <rect width="50" height="50" fill="#000" />
        <path d="M15 6 L15 14 L24.26 25.85" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M21.5 21 L28.5 21 L28.5 46 L21.5 46 Z" fill="#fff" />
        <path d="M24 6 L28.5 6 A11 11 0 0 1 28.5 28 L28.5 21 A4 4 0 0 0 28.5 13 L24 13 Z" fill="#fff" />
        <rect x={28} y={21} width={1} height={7} fill="#fff" />
      </mask>
      <rect width="50" height="50" className={styles.bpMark} mask="url(#bp-mark-mask)" />

      <g className={styles.bpGuide}>
        <circle cx={cx} cy={cy} r={11} />
        <circle cx={cx} cy={cy} r={4} />
        <polyline points="11.5,6 11.5,15.2 21.5,28" />
      </g>
      <line x1={-3} y1={28} x2={44} y2={28} className={styles.bpBase} />
      <g className={styles.bpDim}>
        <line x1={21.5} y1={48.4} x2={28.5} y2={48.4} />
        <line x1={21.5} y1={47.6} x2={21.5} y2={49.2} />
        <line x1={28.5} y1={47.6} x2={28.5} y2={49.2} />
      </g>
      <g className={styles.bpNode}>
        <circle cx={cx} cy={cy} r={0.55} />
        <circle cx={21.5} cy={28} r={0.55} />
        <circle cx={11.5} cy={6} r={0.55} />
      </g>
      <g className={styles.bpLabel}>
        <text x={40.2} y={12} fontSize={2}>R 11</text>
        <text x={31.8} y={21.4} fontSize={2}>R 4</text>
        <text x={25} y={51.4} textAnchor="middle" fontSize={2}>7u</text>
        <text x={45} y={28.7} fontSize={2}>branch · y28</text>
      </g>
    </svg>
  )
}

// clear space: glyph bbox is x[11.5,39.5] y[6,46]; the rule is one stroke (7u)
// of breathing room on every side, which the favicon respects and the nav pill
// exceeds. mask paths are identical to public/logo.svg.
function ClearspaceFigure() {
  return (
    <svg
      viewBox="-1 -7 54 64"
      className={styles.clearSvg}
      role="img"
      aria-label="Clear space rule: keep at least 7 grid units, one stroke width, clear on every side of the mark."
    >
      <rect x={4.5} y={-1} width={42} height={54} className={styles.csOuter} />
      <rect x={11.5} y={6} width={28} height={40} className={styles.csBox} />

      <mask id="cs-mark-mask">
        <rect x={-5} y={-12} width={70} height={82} fill="#000" />
        <path d="M15 6 L15 14 L24.26 25.85" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M21.5 21 L28.5 21 L28.5 46 L21.5 46 Z" fill="#fff" />
        <path d="M24 6 L28.5 6 A11 11 0 0 1 28.5 28 L28.5 21 A4 4 0 0 0 28.5 13 L24 13 Z" fill="#fff" />
        <rect x={28} y={21} width={1} height={7} fill="#fff" />
      </mask>
      <rect x={-5} y={-12} width={70} height={82} className={styles.csMark} mask="url(#cs-mark-mask)" />

      <g className={styles.csLabel}>
        <text x={25.5} y={3.6} textAnchor="middle" fontSize={3}>7u</text>
        <text x={8} y={26} textAnchor="middle" fontSize={3}>7u</text>
      </g>
    </svg>
  )
}

export function Mark() {
  return (
    <Panel label="mark logic" folio="03" className={styles.markPanel}>
      <figure className={styles.markFigure} data-reveal>
        <ConstructionFigure />
        <figcaption className={`${styles.bpCaption} ${styles.mono}`}>Construction · 50-unit grid</figcaption>
      </figure>

      <div className={styles.markText}>
        <h2 className={styles.sectionTitle} data-reveal style={d(60)}>Mark</h2>
        <p className={styles.sectionLede} data-reveal style={d(120)}>
          A “PY” monogram set on a 50-unit grid. The Y&apos;s left arm and stem carry one
          constant stroke into a circular P-bowl. The arm meets the stem exactly on the bowl&apos;s base line. 
        </p>
        <div className={styles.markUsage} data-reveal style={d(200)}>
          <div className={styles.usage}>
            <p className={styles.blockHead}>Clear space</p>
            <div className={styles.usageBody}>
              <figure className={styles.clearFig}>
                <ClearspaceFigure />
              </figure>
              <p className={styles.usageNote}>
                <b>≥ 7u</b> (one stroke) on every side. Never below <b>16px</b> —
                favicon 16, nav 20.
              </p>
            </div>
          </div>

          <div className={styles.donts}>
            <p className={styles.blockHead}>Don&apos;t</p>
            <ul>
              <li>recolor or add a gradient</li>
              <li>round corners or alter the 7u stroke</li>
              <li>rotate, skew, or stretch it</li>
              <li>crowd inside the clear space</li>
            </ul>
          </div>
        </div>
      </div>
    </Panel>
  )
}
