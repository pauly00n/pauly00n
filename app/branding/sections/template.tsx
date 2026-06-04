"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

// inline PY mark — identical paths to public/logo.svg, used in the slide
// footer lockup and the title-slide demo.
function MarkGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden>
      <mask id="tpl-m">
        <rect width="50" height="50" fill="#000" />
        <path d="M15 6 L15 14 L24.26 25.85" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M21.5 21 L28.5 21 L28.5 46 L21.5 46 Z" fill="#fff" />
        <path d="M24 6 L28.5 6 A11 11 0 0 1 28.5 28 L28.5 21 A4 4 0 0 0 28.5 13 L24 13 Z" fill="#fff" />
        <rect x={28} y={21} width={1} height={7} fill="#fff" />
      </mask>
      <rect width="50" height="50" fill="currentColor" mask="url(#tpl-m)" />
    </svg>
  )
}

const specs = [
  { k: "frame", v: "16 : 9 · 1920 × 1080" },
  { k: "safe area", v: "96px inset all sides" },
  { k: "display font", v: "Playfair Display → Georgia" },
  { k: "body font", v: "Inter → system-ui" },
  { k: "label font", v: "STIX Two Text → Times" },
  { k: "footer mark", v: "PY · paulyoon.xyz · folio · year" },
]

export function Template() {
  return (
    <Panel label="slide template" folio="09" className={styles.tplPanel}>
      <div className={styles.tplHead}>
        <h2 className={styles.sectionTitle} data-reveal>Slides</h2>
        <p className={styles.sectionLede} data-reveal style={d(60)}>
          The same system, applied to a presentation master. Three slide types do
          all the work: a title lockup, a section divider, a body slide. Font
          fallbacks are loaded for Keynote and Google Slides, where Playfair and
          STIX don&apos;t install by default.
        </p>
      </div>

      <div className={styles.tplStage} data-reveal style={d(140)}>
        {/* title slide ------------------------------------------- */}
        <figure className={styles.tplSlide}>
          <div className={`${styles.tplFrame} ${styles.tplFrameLight}`}>
            <MarkGlyph className={styles.tplFrameMark} />
            <div className={styles.tplTitleBlock}>
              <p className={styles.tplTitleWord}>Paul Yoon</p>
              <p className={styles.tplTitleRole}>Software Engineer &amp; Researcher</p>
            </div>
            <div className={styles.tplFrameFooter}>
              <span className={`${styles.tplFrameFooterMeta} ${styles.mono}`}>01</span>
            </div>
          </div>
          <figcaption className={`${styles.tplCaption} ${styles.mono}`}>Title · 01</figcaption>
        </figure>

        {/* section divider --------------------------------------- */}
        <figure className={styles.tplSlide}>
          <div className={`${styles.tplFrame} ${styles.tplFrameDark}`}>
            <div className={styles.tplDividerBlock}>
              <p className={styles.tplDividerLabel}>section</p>
              <p className={styles.tplDividerFolio}>02</p>
              <span className={styles.tplDividerRule} aria-hidden />
              <p className={styles.tplDividerTitle}>Approach</p>
            </div>
            <div className={styles.tplFrameFooter}>
              <span className={`${styles.tplFrameFooterMeta} ${styles.tplFrameFooterMetaDark} ${styles.mono}`}>02</span>
            </div>
          </div>
          <figcaption className={`${styles.tplCaption} ${styles.mono}`}>Section · 02</figcaption>
        </figure>

        {/* body slide -------------------------------------------- */}
        <figure className={styles.tplSlide}>
          <div className={`${styles.tplFrame} ${styles.tplFrameLight}`}>
            <div className={styles.tplBodyBlock}>
              <p className={styles.tplBodyEyebrow}>research notes</p>
              <p className={styles.tplBodyTitle}>What the system tries to do</p>
              <ul className={styles.tplBodyList}>
                <li>Make ideas legible without flattening them.</li>
                <li>Defer to the work; the frame stays quiet.</li>
                <li>One accent. One curve. One held center.</li>
              </ul>
            </div>
            <div className={styles.tplFrameFooter}>
              <span className={`${styles.tplFrameFooterMeta} ${styles.mono}`}>03</span>
            </div>
          </div>
          <figcaption className={`${styles.tplCaption} ${styles.mono}`}>Body · 03</figcaption>
        </figure>
      </div>

      <div className={styles.tplAside} data-reveal style={d(220)}>
        <div>
          <p className={styles.blockHead}>Master specs</p>
          <dl className={styles.paramList}>
            {specs.map((s) => (
              <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>
            ))}
          </dl>
        </div>
        <div>
          <p className={styles.blockHead}>Rules</p>
          <ul className={styles.tplRules}>
            <li>One accent per slide. Brand blue, never both blue + a tint.</li>
            <li>Body type 24pt minimum. If it shrinks below 18, split the slide.</li>
            <li>Footer mark on every slide; folio number tracks the talk, not the file.</li>
            <li>Dark variant only for section dividers and full-bleed imagery.</li>
          </ul>
        </div>
      </div>
    </Panel>
  )
}
