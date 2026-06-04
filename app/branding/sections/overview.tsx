"use client"

import styles from "../page.module.css"
import { Cover } from "./cover"
import { Essence } from "./essence"
import { Mark } from "./mark"
import { Color } from "./color"
import { Atmosphere } from "./atmosphere"
import { Typography } from "./type"
import { Motion } from "./motion"
import { Glass } from "./glass"
import { Template } from "./template"

// the contact sheet: occupies one slide's worth of scroll-snap real estate
// (no Panel chrome of its own), and renders the nine REAL slide components
// inside it. each tile contains an absolutely-positioned wrapper sized to a
// full slide; a uniform transform: scale shrinks it to fit the tile's width.
// the math:
//   slide_w = min(92vw, 1280px)
//   tile_w  = (slide_w - 2 * 16px gap) / 3
//   scale   = tile_w / slide_w
// CSS does this via container-query units so each tile re-derives its own scale.
const slides = [
  Cover, Essence, Mark, Color, Atmosphere,
  Typography, Motion, Glass, Template,
]

export function Overview() {
  return (
    <section className={styles.ovSection} aria-label="Brand kit contact sheet">
      {slides.map((Slide, i) => (
        <div key={i} className={styles.ovTile}>
          <div className={styles.ovInner} aria-hidden>
            <Slide />
          </div>
        </div>
      ))}
    </section>
  )
}
