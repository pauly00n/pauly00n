'use client'

import React from 'react'
import { cn } from '@/lib/utils'

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
  return (
    <>
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="gb2-blur-filter">
            <feGaussianBlur stdDeviation={BLUR_STD} />
          </filter>
        </defs>
      </svg>
      <div
        className={cn('gb2-wrap', fill && 'gb2-wrap--fill')}
        style={{ ...(size ? { fontSize: size } : undefined), ...wrapperStyle }}
      >
        <Inner className={cn('gb2-btn', forceHover && 'gb2-btn--active', disableHover && 'gb2-btn--no-hover')} {...(href ? { href } : {})}>
          <span className="gb2-clip" aria-hidden="true">
            <span className="gb2-backdrop" />
          </span>
          <span className={cn('gb2-span', className)} style={spanStyle}>{children}</span>
        </Inner>
        <div className="gb2-shadow" />
      </div>
    </>
  )
}
