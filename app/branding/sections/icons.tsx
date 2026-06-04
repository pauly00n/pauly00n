"use client"

import Image from "next/image"
import styles from "../page.module.css"
import { Panel, d } from "./_panel"

// real assets shipping in /public + the metadata in app/layout.tsx.
// sizes are the actual rendered targets; the file column is what next/metadata
// links to. Open Graph dims come from layout.tsx openGraph.images[].
const iconSizes = [
  { px: 16, label: "Tab favicon", file: "favicon.svg" },
  { px: 32, label: "Browser bar", file: "favicon.png" },
  { px: 64, label: "Bookmark / PWA", file: "icon-light.png" },
  { px: 180, label: "Apple touch", file: "apple-touch-icon.png" },
]

const specs = [
  { k: "favicon (vector)", v: "favicon.svg · scales everywhere" },
  { k: "favicon (raster)", v: "favicon.png · 32 × 32" },
  { k: "apple touch", v: "apple-touch-icon.png · 180 × 180" },
  { k: "open graph", v: "og-image.png · 1200 × 630" },
  { k: "twitter card", v: "summary_large_image · same OG asset" },
  { k: "social avatar", v: "icon-light.png · 1:1, full-bleed, no padding" },
]

export function Icons() {
  return (
    <Panel label="icon system" folio="04" className={styles.iconsPanel}>
      <div className={styles.iconsHead}>
        <h2 className={styles.sectionTitle} data-reveal>Icons</h2>
        <p className={styles.sectionLede} data-reveal style={d(60)}>
          The mark, applied. One SVG drives the favicon; raster fallbacks cover the
          places browsers still demand pixels. The Open Graph card is the wordmark on
          the field, not the glyph alone — small monograms vanish in social previews.
        </p>
      </div>

      <div className={styles.iconLadder} data-reveal style={d(140)}>
        {iconSizes.map((s) => (
          <div key={s.px} className={styles.iconStep}>
            <div
              className={styles.iconChip}
              style={{ width: s.px, height: s.px }}
            >
              <Image
                src="/icon-light.png"
                alt=""
                width={s.px}
                height={s.px}
                priority={s.px <= 32}
              />
            </div>
            <code className={`${styles.iconPx} ${styles.mono}`}>{s.px}px</code>
            <span className={styles.iconUse}>{s.label}</span>
            <code className={`${styles.iconFile} ${styles.mono}`}>{s.file}</code>
          </div>
        ))}
      </div>

      <div className={styles.iconAside} data-reveal style={d(220)}>
        <div className={styles.ogPreview}>
          <p className={styles.blockHead}>Open Graph · 1200 × 630</p>
          <div className={styles.ogCard}>
            <Image src="/og-image.png" alt="Open Graph preview" width={640} height={336} />
          </div>
          <p className={styles.iconUse}>linked from layout.tsx · twitter summary_large_image</p>
        </div>

        <div className={styles.specsBlock}>
          <p className={styles.blockHead}>Asset registry</p>
          <dl className={styles.paramList}>
            {specs.map((s) => (
              <div key={s.k}><dt>{s.k}</dt><dd>{s.v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </Panel>
  )
}
