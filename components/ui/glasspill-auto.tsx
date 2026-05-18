'use client'

import { useEffect, useState } from 'react'
import GlassPill, { GlassPillProps } from './glasspill'
import GlassPillSafari from './glasspill-safari2'

function isSafariBrowser() {
  if (typeof navigator === 'undefined') return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

export default function GlassPillAuto(props: GlassPillProps) {
  const [safari, setSafari] = useState(false)

  useEffect(() => {
    setSafari(isSafariBrowser())
  }, [])

  if (safari) return <GlassPillSafari {...props} />
  return <GlassPill {...props} />
}
