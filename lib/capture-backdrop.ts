'use client'

import { domToCanvas } from 'modern-screenshot'

export interface CapturedSnapshot {
  source: HTMLCanvasElement
  width: number
  height: number
  padX: number
  padY: number
  docWidth: number
  docHeight: number
  scale: number
}

export const SNAPSHOT_PAD = 96
export const CAPTURE_SCALE = 0.25
const IMAGE_WAIT_CAP_MS = 200

export async function captureBackdropSnapshot(): Promise<CapturedSnapshot> {
  const body = document.body
  const html = document.documentElement
  const docWidth = Math.max(body.scrollWidth, html.scrollWidth, html.clientWidth)
  const docHeight = Math.max(body.scrollHeight, html.scrollHeight, html.clientHeight)

  try { await document.fonts.ready } catch {}

  const allImgs = Array.from(document.images)
  for (const i of allImgs) {
    if (i.loading === 'lazy') i.loading = 'eager'
  }
  const pendingImgs = allImgs.filter(i => !i.complete)
  const imgWait = Promise.all(
    pendingImgs.map(
      i =>
        new Promise<void>(res => {
          i.addEventListener('load', () => res(), { once: true })
          i.addEventListener('error', () => res(), { once: true })
        })
    )
  )
  await Promise.race([
    imgWait,
    new Promise<void>(res => setTimeout(res, IMAGE_WAIT_CAP_MS)),
  ])

  const prevPe = html.style.pointerEvents
  html.style.pointerEvents = 'none'
  void html.offsetHeight

  let captured: HTMLCanvasElement
  try {
    captured = await domToCanvas(body, {
      width: docWidth,
      height: docHeight,
      scale: CAPTURE_SCALE,
      backgroundColor: '#e8f3fb',
      font: false,
      filter: (node) => {
        if (!(node instanceof HTMLElement)) return true
        const bg = node.style.backgroundImage
        if (bg && bg.includes('noise.png')) return false
        return true
      },
      onCloneNode(cloned) {
        if (!(cloned instanceof HTMLElement)) return
        const style = document.createElement('style')
        const liveHero = document.querySelector('.hero') as HTMLElement | null
        const liveProj = document.querySelector('#projects') as HTMLElement | null
        const heroH = liveHero ? liveHero.offsetHeight : window.innerHeight
        const projH = liveProj ? liveProj.offsetHeight : window.innerHeight
        style.textContent = `
          *, *::before, *::after {
            transform: none !important;
            transition: none !important;
          }
          [style*="opacity: 0;"],
          [style*="opacity:0;"],
          [style$="opacity: 0"],
          [style$="opacity:0"] {
            opacity: 1 !important;
          }
          [class~="opacity-0"],
          [class*=" opacity-0"],
          [class^="opacity-0"] {
            opacity: 0 !important;
          }
          html, body {
            background-color: #e8f3fb !important;
            background-image:
              radial-gradient(ellipse 75% 75% at 50% 50%, rgba(60, 160, 220, 0.52), transparent) !important;
            background-repeat: repeat-y !important;
            background-size: 100% ${heroH}px !important;
            background-position: 0 0 !important;
            background-attachment: scroll !important;
          }
          .hero {
            min-height: ${heroH}px !important;
            height: ${heroH}px !important;
            background-image:
              radial-gradient(ellipse 75% 75% at 50% 50%, rgba(60, 160, 220, 0.52), transparent),
              linear-gradient(160deg, #f5f9fd 0%, #e8f3fb 25%, #d6eaf8 50%, #c4e0f5 70%, #d8ecf9 100%) !important;
            background-repeat: no-repeat, no-repeat !important;
            background-size: 100% 100%, 100% 100% !important;
            background-position: center, center !important;
          }
          #projects {
            min-height: ${projH}px !important;
          }
          [data-glasspill-snapshot-hide] {
            visibility: hidden !important;
          }
        `
        cloned.insertBefore(style, cloned.firstChild)
      },
    })
  } finally {
    html.style.pointerEvents = prevPe
  }

  const pad = SNAPSHOT_PAD
  const W = docWidth + pad * 2
  const H = docHeight + pad * 2
  const padW = Math.floor(W * CAPTURE_SCALE)
  const padH = Math.floor(H * CAPTURE_SCALE)
  const docDrawW = Math.floor(docWidth * CAPTURE_SCALE)
  const docDrawH = Math.floor(docHeight * CAPTURE_SCALE)
  const padDrawX = Math.floor(pad * CAPTURE_SCALE)
  const padDrawY = Math.floor(pad * CAPTURE_SCALE)

  const canvas = document.createElement('canvas')
  canvas.width = padW
  canvas.height = padH
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#e8f3fb'
  ctx.fillRect(0, 0, padW, padH)
  ctx.drawImage(captured, padDrawX, padDrawY, docDrawW, docDrawH)

  return {
    source: canvas,
    width: W,
    height: H,
    padX: pad,
    padY: pad,
    docWidth,
    docHeight,
    scale: CAPTURE_SCALE,
  }
}

declare global {
  interface Window {
    __captureGlasspill?: () => Promise<{ pngDataUrl: string; meta: Omit<CapturedSnapshot, 'source'> }>
  }
}

if (typeof window !== 'undefined') {
  window.__captureGlasspill = async () => {
    const snap = await captureBackdropSnapshot()
    const pngDataUrl = snap.source.toDataURL('image/png')
    return {
      pngDataUrl,
      meta: {
        width: snap.width,
        height: snap.height,
        padX: snap.padX,
        padY: snap.padY,
        docWidth: snap.docWidth,
        docHeight: snap.docHeight,
        scale: snap.scale,
      },
    }
  }
}
