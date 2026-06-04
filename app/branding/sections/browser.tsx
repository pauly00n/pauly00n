"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

export function Browser() {
  return (
    <Panel label="digital surface" folio="09" className={styles.browserPanel}>
      <div className={styles.chrome} data-reveal style={d(80)}>
        <div className={styles.browserBar}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={`${styles.urlbar} ${styles.mono}`}>paulyoon.xyz</span>
        </div>
        <div className={styles.heroCrop}>
          <h2>Paul Yoon</h2>
          <p className={styles.heroRole}>Software Engineer &amp; Researcher</p>
          <p className={styles.heroBio}>
            Third-year at Stanford studying Computer Science and Music. I strive to
            find meaning through my work — building, researching, learning.
          </p>
        </div>
      </div>
    </Panel>
  )
}
