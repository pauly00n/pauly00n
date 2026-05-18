'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import styles from './glassbutton2.module.css'

const BLUR_STD = 2

interface GlassButton2Props {
  children?: React.ReactNode
  size?: string
  className?: string
  spanStyle?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
  href?: string
  fill?: boolean
  forceHover?: boolean
  disableHover?: boolean
}

export default function GlassButton2({
  children,
  size,
  className,
  spanStyle,
  wrapperStyle,
  href,
  fill,
  forceHover,
  disableHover,
}: GlassButton2Props) {
  const Inner = href ? 'a' : 'div'
  const reactId = useId()
  const filterId = `gb2-blur-filter-${reactId.replace(/[:]/g, '')}`

  return (
    <>
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation={BLUR_STD} />
          </filter>
        </defs>
      </svg>
      <div
        className={cn(styles.wrap, fill && styles.fill)}
        style={{ ...(size ? { fontSize: size } : undefined), ...wrapperStyle }}
      >
        <Inner className={cn(styles.btn, forceHover && styles.active, disableHover && styles.noHover)} {...(href ? { href } : {})}>
          <span className={styles.clip} aria-hidden="true">
            <span
              className={styles.backdrop}
              style={{
                backdropFilter: `url(#${filterId})`,
                WebkitBackdropFilter: `url(#${filterId})`,
              }}
            />
          </span>
          <span className={cn(styles.span, className)} style={spanStyle}>{children}</span>
        </Inner>
        <div className={styles.shadow} />
      </div>
    </>
  )
}
