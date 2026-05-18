'use client'

import { useEffect, useState } from 'react'
import { domToPng } from 'modern-screenshot'

export interface BackdropSnapshot {
  source: HTMLImageElement | HTMLCanvasElement
  width: number    // padded texture width
  height: number   // padded texture height
  padX: number
  padY: number
  docWidth: number
  docHeight: number
}

const SNAPSHOT_PAD = 96

export type SnapshotStatus =
  | { state: 'idle' }
  | { state: 'waiting-fonts' }
  | { state: 'waiting-images' }
  | { state: 'capturing' }
  | { state: 'loading-image' }
  | { state: 'ready'; data: BackdropSnapshot }
  | { state: 'error'; message: string }

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
      const body = document.body
      const html = document.documentElement
      const docWidth = Math.max(body.scrollWidth, html.scrollWidth, html.clientWidth)
      const docHeight = Math.max(body.scrollHeight, html.scrollHeight, html.clientHeight)

      pushDebug({ state: 'waiting-fonts' })
      try {
        await document.fonts.ready
      } catch {}

      pushDebug({ state: 'waiting-images' })
      // Force-eager any lazy images so they actually begin loading
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
      // hard cap: don't block forever if an image hangs
      await Promise.race([
        imgWait,
        new Promise<void>(res => setTimeout(res, 4000)),
      ])

      if (cancelled) return

      pushDebug({ state: 'capturing' })
      // Use a known-safe rgb literal that matches the injected snapshot body bg.
      // Avoid passing oklch() through here — older Safari canvas builds may not
      // accept it as fillStyle, leaving the pad area black.
      const backgroundColor = '#e8f3fb'
      let url: string
      try {
        url = await domToPng(body, {
          width: docWidth,
          height: docHeight,
          scale: 1,
          backgroundColor,
          onCloneNode(cloned) {
            if (!(cloned instanceof HTMLElement)) return
            const style = document.createElement('style')
            const vh = window.innerHeight
            style.textContent = `
              *, *::before, *::after {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
              }
              html, body {
                background-color: #e8f3fb !important;
                background-image:
                  radial-gradient(ellipse 75% 75% at 50% 50%, rgba(60, 160, 220, 0.52), transparent) !important;
                background-repeat: repeat-y !important;
                background-size: 100% ${vh}px !important;
                background-position: 0 0 !important;
                background-attachment: scroll !important;
              }
              .hero {
                min-height: ${vh}px !important;
                background-image:
                  radial-gradient(ellipse 75% 75% at 50% 50%, rgba(60, 160, 220, 0.52), transparent),
                  linear-gradient(160deg, #f5f9fd 0%, #e8f3fb 25%, #d6eaf8 50%, #c4e0f5 70%, #d8ecf9 100%) !important;
                background-repeat: no-repeat, no-repeat !important;
                background-size: 100% 100%, 100% 100% !important;
                background-position: center, center !important;
              }
              [data-glasspill-snapshot-hide] {
                visibility: hidden !important;
              }
            `
            cloned.insertBefore(style, cloned.firstChild)
          },
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        pushDebug({ state: 'error', message: 'capture: ' + msg })
        return
      }

      if (cancelled) return

      pushDebug({ state: 'loading-image' })
      const img = new Image()
      img.onload = () => {
        if (cancelled) return
        const pad = SNAPSHOT_PAD
        const W = docWidth + pad * 2
        const H = docHeight + pad * 2
        const canvas = document.createElement('canvas')
        canvas.width = W
        canvas.height = H
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          pushDebug({ state: 'error', message: '2d ctx unavailable' })
          return
        }
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, W, H)
        ctx.drawImage(img, pad, pad, docWidth, docHeight)
        const snap: BackdropSnapshot = {
          source: canvas,
          width: W,
          height: H,
          padX: pad,
          padY: pad,
          docWidth,
          docHeight,
        }
        pushDebug({ state: 'ready', data: snap })
        setData(snap)
      }
      img.onerror = () => {
        pushDebug({ state: 'error', message: 'image load failed' })
      }
      img.src = url
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
