"use client"

import styles from "../page.module.css"
import { Panel, d } from "./_panel"

export function Cover() {
  return (
    <Panel label="brand kit" folio="01" className={styles.cover}>
      <div className={styles.coverLockup}>
        <h1 className={styles.wordmark} data-reveal style={d(80)}>Paul Yoon</h1>
        <p className={styles.subtitle} data-reveal style={d(160)}>Software Engineer &amp; Researcher</p>
      </div>
      <p className={`${styles.url} ${styles.mono}`} data-reveal style={d(240)}>paulyoon.xyz</p>
    </Panel>
  )
}
