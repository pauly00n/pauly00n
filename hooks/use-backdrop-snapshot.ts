'use client'

import { useEffect, useState } from 'react'
import { domToCanvas } from 'modern-screenshot'

export interface BackdropSnapshot {
  source: HTMLCanvasElement
  width: number    // padded texture width (CSS px)
  height: number   // padded texture height (CSS px)
  padX: number
  padY: number
  docWidth: number
  docHeight: number
  scale: number    // capture scale; texture is doc*scale + pad*2 in real pixels
}

const SNAPSHOT_PAD = 96
const CAPTURE_SCALE = 0.25
const IMAGE_WAIT_CAP_MS = 200
const CACHE_KEY_PREFIX = 'glasspill-snapshot-v1:'

export type SnapshotStatus =
  | { state: 'idle' }
  | { state: 'waiting-fonts' }
  | { state: 'waiting-images' }
  | { state: 'capturing' }
  | { state: 'ready'; data: BackdropSnapshot }
  | { state: 'error'; message: string }

function buildPaddedSnapshot(
  captured: HTMLCanvasElement | HTMLImageElement,
  docWidth: number,
  docHeight: number
): BackdropSnapshot | null {
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
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
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

function pushDebug(s: SnapshotStatus) {
  if (typeof window === 'undefined') return
  ;(window as any).__glasspillDebug = s
  window.dispatchEvent(new CustomEvent('glasspill-debug', { detail: s }))
}

export function useBackdropSnapshot(): BackdropSnapshot | null {
  const [data, setData] = useState<BackdropSnapshot | null>(null)

  useEffect(() => {
    let cancelled = false
    let debounceTimer: number | undefined

    async function capture() {
      const t0 = performance.now()
      const body = document.body
      const html = document.documentElement
      const docWidth = Math.max(body.scrollWidth, html.scrollWidth, html.clientWidth)
      const docHeight = Math.max(body.scrollHeight, html.scrollHeight, html.clientHeight)
      const dpr = window.devicePixelRatio || 1
      const cacheKey = `${CACHE_KEY_PREFIX}${docWidth}x${docHeight}x${dpr}`

      // Try cache first — cached image IS the padded canvas already, draw it into
      // a same-size canvas and use directly (no re-padding).
      try {
        const cachedUrl = sessionStorage.getItem(cacheKey)
        if (cachedUrl) {
          const img = new Image()
          await new Promise<void>((res, rej) => {
            img.onload = () => res()
            img.onerror = () => rej(new Error('cached image load failed'))
            img.src = cachedUrl
          })
          if (cancelled) return
          const pad = SNAPSHOT_PAD
          const W = docWidth + pad * 2
          const H = docHeight + pad * 2
          const canvas = document.createElement('canvas')
          canvas.width = Math.floor(W * CAPTURE_SCALE)
          canvas.height = Math.floor(H * CAPTURE_SCALE)
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const snap: BackdropSnapshot = {
              source: canvas,
              width: W,
              height: H,
              padX: pad,
              padY: pad,
              docWidth,
              docHeight,
              scale: CAPTURE_SCALE,
            }
            console.log(`[glasspill] cache hit, ready in ${(performance.now() - t0).toFixed(0)}ms`)
            pushDebug({ state: 'ready', data: snap })
            setData(snap)
            return
          }
        }
      } catch {}

      pushDebug({ state: 'waiting-fonts' })
      try {
        await document.fonts.ready
      } catch {}
      const tFonts = performance.now()

      pushDebug({ state: 'waiting-images' })
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
      const tImgs = performance.now()

      if (cancelled) return

      // Yield to idle so we don't fight LCP
      await new Promise<void>(res => {
        if ('requestIdleCallback' in window) {
          ;(window as any).requestIdleCallback(() => res(), { timeout: 200 })
        } else {
          setTimeout(res, 0)
        }
      })

      if (cancelled) return

      pushDebug({ state: 'capturing' })
      const tCaptureStart = performance.now()

      // Suppress any active :hover/:active state during capture
      const prevPe = html.style.pointerEvents
      html.style.pointerEvents = 'none'
      // force a style flush so :hover stops matching before getComputedStyle runs
      void html.offsetHeight
      const backgroundColor = '#e8f3fb'

      let captured: HTMLCanvasElement
      try {
        captured = await domToCanvas(body, {
          width: docWidth,
          height: docHeight,
          scale: CAPTURE_SCALE,
          backgroundColor,
          font: false,
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
              /* Force only inline opacity:0 (used by revealStyle fade-ins) to be visible,
                 without touching class-based .opacity-0 elements like hover overlays. */
              [style*="opacity: 0;"],
              [style*="opacity:0;"],
              [style$="opacity: 0"],
              [style$="opacity:0"] {
                opacity: 1 !important;
              }
              /* Defeat any hover-driven opacity reveal that modern-screenshot may have
                 baked in (pointer-events:none doesn't always clear :hover in safari).
                 Any element tagged with an opacity-0 utility class stays invisible. */
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
      } catch (err) {
        html.style.pointerEvents = prevPe
        const msg = err instanceof Error ? err.message : String(err)
        pushDebug({ state: 'error', message: 'capture: ' + msg })
        return
      } finally {
        html.style.pointerEvents = prevPe
      }

      if (cancelled) return
      const tCaptureEnd = performance.now()

      const snap = buildPaddedSnapshot(captured, docWidth, docHeight)
      if (!snap) {
        pushDebug({ state: 'error', message: '2d ctx unavailable' })
        return
      }
      const tDone = performance.now()
      console.log(
        `[glasspill] capture done in ${(tDone - t0).toFixed(0)}ms ` +
          `(fonts:${(tFonts - t0).toFixed(0)} imgs:${(tImgs - tFonts).toFixed(0)} ` +
          `dom:${(tCaptureEnd - tCaptureStart).toFixed(0)} pad:${(tDone - tCaptureEnd).toFixed(0)})`
      )

      // Persist to cache (best-effort, async-ish)
      try {
        const url = snap.source.toDataURL('image/jpeg', 0.75)
        sessionStorage.setItem(cacheKey, url)
      } catch {}

      pushDebug({ state: 'ready', data: snap })
      setData(snap)
    }

    debounceTimer = window.setTimeout(capture, 150)

    const onResize = () => {
      if (debounceTimer) window.clearTimeout(debounceTimer)
      debounceTimer = window.setTimeout(() => {
        setData(null)
        capture()
      }, 300)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      if (debounceTimer) window.clearTimeout(debounceTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return data
}
