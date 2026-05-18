'use client'

import { useEffect, useRef, useState } from 'react'
import type { SnapshotStatus } from '@/hooks/use-backdrop-snapshot'

function ThumbCanvas({
  source,
  padX,
  padY,
  docWidth,
  docHeight,
}: {
  source: HTMLImageElement | HTMLCanvasElement
  padX: number
  padY: number
  docWidth: number
  docHeight: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const w = 200
    const sw = source.width || 1
    const sh = source.height || 1
    const h = Math.round((sh / sw) * w)
    c.width = w
    c.height = h
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.drawImage(source, 0, 0, w, h)
  }, [source, padX, padY, docWidth, docHeight])
  return (
    <canvas
      ref={ref}
      style={{
        marginTop: 6,
        width: 200,
        height: 'auto',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'block',
      }}
    />
  )
}

export function GlassPillDebug() {
  const [status, setStatus] = useState<SnapshotStatus>({ state: 'idle' })

  useEffect(() => {
    const handler = (e: Event) => {
      setStatus((e as CustomEvent<SnapshotStatus>).detail)
    }
    window.addEventListener('glasspill-debug', handler)
    const existing = (window as any).__glasspillDebug
    if (existing) setStatus(existing)
    return () => window.removeEventListener('glasspill-debug', handler)
  }, [])

  const color =
    status.state === 'ready' ? '#22c55e' :
    status.state === 'error' ? '#ef4444' :
    '#eab308'

  return (
    <div
      data-glasspill-snapshot-hide=""
      style={{
        position: 'fixed',
        bottom: 12,
        right: 12,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '8px 10px',
        borderRadius: 8,
        font: '12px ui-monospace, monospace',
        maxWidth: 320,
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: color, display: 'inline-block' }} />
        <strong>glasspill:</strong> {status.state}
      </div>
      {status.state === 'error' && (
        <div style={{ marginTop: 4, color: '#fca5a5', wordBreak: 'break-word' }}>
          {status.message}
        </div>
      )}
      {status.state === 'ready' && (
        <>
          <div style={{ marginTop: 4 }}>
            doc {status.data.docWidth} × {status.data.docHeight} (pad {status.data.padX})
          </div>
          <ThumbCanvas
            source={status.data.source}
            padX={status.data.padX}
            padY={status.data.padY}
            docWidth={status.data.docWidth}
            docHeight={status.data.docHeight}
          />
        </>
      )}
    </div>
  )
}
