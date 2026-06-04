"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import styles from "../page.module.css"

// stagger helper for scroll-reveal delays
export const d = (ms: number) => ({ "--d": `${ms}ms` } as CSSProperties)

export function Panel({
  label,
  folio,
  className,
  children,
}: {
  label: string
  folio: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`${styles.panel} ${className ?? ""} ${inView ? styles.inView : ""}`}
    >
      <p className={styles.label} data-reveal>{label}</p>
      {children}
      <span className={styles.folio}>{folio}</span>
    </section>
  )
}
