"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

// the three families as they actually run on the site, consolidated to the
// roles each one carries. sizes are the real rendered values (page.module.css
// mirrors app/globals.css + the live components). Playfair scales up to ~80 at
// the hero; STIX covers the 24px role line and the small uppercase labels.
const typeScale = [
  { role: "Display", family: "Playfair Display", sample: "Paul Yoon", cls: styles.tDisplay,
    dims: [["60–80", "px"], ["500", "wt"], ["−0.03", "em"]] },
  { role: "Heading", family: "Playfair Display", sample: "Selected work", cls: styles.tH2,
    dims: [["40", "px"], ["500", "wt"], ["−0.025", "em"]] },
  { role: "Body", family: "Inter", sample: "Research notes and polished engineering.", cls: styles.tBody,
    dims: [["17", "px"], ["400", "wt"], ["1.55", "lh"]] },
  { role: "Role", family: "STIX Two Text", sample: "Software Engineer & Researcher", cls: styles.tRole,
    dims: [["24", "px"], ["450", "wt"]] },
  { role: "Label", family: "STIX Two Text", sample: "JUN – AUG · INCOMING", cls: styles.tCaption,
    dims: [["14", "px"], ["600", "wt"], ["0.14", "em"], ["caps", ""]] },
] as const

export function Typography() {
  return (
    <Panel label="typography" folio="06" className={`${styles.darkPanel} ${styles.typePanel}`}>
      <div className={styles.typeHead}>
        <h2 className={styles.sectionTitle} data-reveal>Type</h2>
        <p className={`${styles.typeLede} ${styles.ledeDark}`} data-reveal style={d(60)}>
          Playfair Display for voice, Inter for function, STIX Two Text for the role
          line and the small machine-readable labels.
        </p>
      </div>

      <div className={styles.typeScaleList}>
        {typeScale.map((t, i) => (
          <div key={t.role} className={styles.typeRow} data-reveal style={d(100 + i * 30)}>
            <p className={`${t.cls} ${styles.typeSample}`}>{t.sample}</p>
            <div className={styles.typeMeta}>
              <b>{t.role} · {t.family}</b>
              <div className={styles.specGroup}>
                {t.dims.map(([v, u]) => (
                  <span key={v + u} className={styles.spec}>
                    <span className={styles.specVal}>{v}</span>
                    {u && <span className={styles.specUnit}>{u}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
