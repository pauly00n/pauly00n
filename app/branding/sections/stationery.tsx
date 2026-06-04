"use client"

import Image from "next/image"
import styles from "../page.module.css"
import { Panel, d } from "./_panel"

export function Stationery() {
  return (
    <Panel label="stationery" folio="10" className={styles.stationery}>
      <div className={styles.cardStack} data-reveal style={d(80)}>
        <div className={`${styles.paper} ${styles.paperBack}`} />
        <div className={`${styles.paper} ${styles.paperFront}`}>
          <Image src="/icon-light.png" alt="" width={42} height={42} />
          <p className={styles.cardName}>Paul Yoon</p>
          <p className={styles.cardRole}>Software Engineer &amp; Researcher</p>
          <p className={styles.cardMeta}>pauljy@stanford.edu</p>
          <p className={styles.cardMeta}>paulyoon.xyz · github.com/pauly00n</p>
        </div>
      </div>
    </Panel>
  )
}
