'use client'

import { useEffect, useState } from 'react'
import type { BackdropSnapshot } from './use-backdrop-snapshot'

const MANIFEST_URL = '/glasspill-snapshots/manifest.json'

interface ManifestEntry {
  docWidth: number
  docHeight: number
  width: number
  height: number
  padX: number
  padY: number
  scale: number
  heroHeight: number
  file: string
}

interface Manifest {
  snapshots: ManifestEntry[]
}

function pushDebug(state: string, extra?: object) {
  if (typeof window === 'undefined') return
  const s = { state, ...extra }
  ;(window as any).__glasspillDebug = s
  window.dispatchEvent(new CustomEvent('glasspill-debug', { detail: s }))
}

export function usePrebuiltSnapshot(): BackdropSnapshot | null {
  const [data, setData] = useState<BackdropSnapshot | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const t0 = performance.now()
      pushDebug('fetching-manifest')

      let manifest: Manifest
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'force-cache' })
        if (!res.ok) throw new Error(`manifest ${res.status}`)
        manifest = await res.json()
      } catch (err) {
        pushDebug('error', { message: 'manifest: ' + (err as Error).message })
        return
      }
      if (cancelled) return

      const viewportW = window.innerWidth
      const entry = manifest.snapshots
        .slice()
        .sort((a, b) => Math.abs(a.docWidth - viewportW) - Math.abs(b.docWidth - viewportW))[0]
      if (!entry) {
        pushDebug('error', { message: 'no snapshots in manifest' })
        return
      }

      pushDebug('loading-png', { entry })
      const img = new Image()
      img.crossOrigin = 'anonymous'
      try {
        await new Promise<void>((res, rej) => {
          img.onload = () => res()
          img.onerror = () => rej(new Error('png load failed'))
          img.src = entry.file
        })
      } catch (err) {
        pushDebug('error', { message: (err as Error).message })
        return
      }
      if (cancelled) return

      const padW = Math.floor(entry.width * entry.scale)
      const padH = Math.floor(entry.height * entry.scale)
      const canvas = document.createElement('canvas')
      canvas.width = padW
      canvas.height = padH
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        pushDebug('error', { message: '2d ctx unavailable' })
        return
      }
      ctx.drawImage(img, 0, 0, padW, padH)

      const snap: BackdropSnapshot = {
        source: canvas,
        width: entry.width,
        height: entry.height,
        padX: entry.padX,
        padY: entry.padY,
        docWidth: entry.docWidth,
        docHeight: entry.docHeight,
        scale: entry.scale,
        heroHeight: entry.heroHeight,
      }
      console.log(`[glasspill] prebuilt ready in ${(performance.now() - t0).toFixed(0)}ms`, entry.file)
      pushDebug('ready', { data: snap })
      setData(snap)
    }

    load()
    return () => { cancelled = true }
  }, [])

  return data
}
