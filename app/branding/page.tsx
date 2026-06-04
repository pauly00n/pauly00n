import styles from "./page.module.css"
import { DeckKeyNav } from "./keynav"
import { MobileSlideFit } from "./mobilefit"
import { Cover } from "./sections/cover"
import { Essence } from "./sections/essence"
import { Mark } from "./sections/mark"
import { Color } from "./sections/color"
import { Atmosphere } from "./sections/atmosphere"
import { Typography } from "./sections/type"
import { Motion } from "./sections/motion"
import { Glass } from "./sections/glass"
import { Template } from "./sections/template"
import { Overview } from "./sections/overview"

// Browser, Stationery, and Icons sections live under ./sections/ but are not
// mounted: browser/stationery still need real artifacts; the icons/OG panel
// was cut in favor of the slide template, which earns its place as an
// application surface alongside the website itself.

export default function BrandingPage() {
  return (
    <main className={styles.deck} data-deck aria-label="Paul Yoon brand kit">
      <DeckKeyNav />
      <MobileSlideFit />
      {/* Each slide is wrapped so mobile can render it at a fixed desktop canvas
          and scale-to-fit (display:contents on desktop = zero layout impact). */}
      <div className={styles.bSlide}><Cover /></div>
      <div className={styles.bSlide}><Essence /></div>
      <div className={styles.bSlide}><Mark /></div>
      <div className={styles.bSlide}><Color /></div>
      <div className={styles.bSlide}><Atmosphere /></div>
      <div className={styles.bSlide}><Typography /></div>
      <div className={styles.bSlide}><Motion /></div>
      <div className={styles.bSlide}><Glass /></div>
      <div className={styles.bSlide}><Template /></div>
      {/* contact sheet is a desktop-only summary; on mobile every slide is
          already a full-width mini-poster, so it's redundant there */}
      <div className={`${styles.bSlide} ${styles.bHideMobile}`}><Overview /></div>
    </main>
  )
}
