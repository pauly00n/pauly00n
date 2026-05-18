export type SurfaceFnName = 'convex_squircle' | 'convex_circle' | 'concave' | 'lip'

export const SURFACE_FNS: Record<SurfaceFnName, (x: number) => number> = {
  convex_squircle: (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 0.25),
  convex_circle:   (x: number) => Math.sqrt(1 - (1 - x) * (1 - x)),
  concave:         (x: number) => 1 - Math.sqrt(1 - (1 - x) * (1 - x)),
  lip: (x: number) => {
    const convex  = Math.pow(1 - Math.pow(1 - Math.min(x * 2, 1), 4), 0.25)
    const concave = 1 - Math.sqrt(1 - (1 - x) * (1 - x)) + 0.1
    const t = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
    return convex * (1 - t) + concave * t
  },
}

export function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  heightFn: (x: number) => number,
  ior: number,
  samples = 128
): Float64Array {
  const eta = 1 / ior

  function refract(nx: number, ny: number): [number, number] | null {
    const dot = ny
    const k   = 1 - eta * eta * (1 - dot * dot)
    if (k < 0) return null
    const sq = Math.sqrt(k)
    return [-(eta * dot + sq) * nx, eta - (eta * dot + sq) * ny]
  }

  const profile = new Float64Array(samples)
  for (let i = 0; i < samples; i++) {
    const x     = i / samples
    const y     = heightFn(x)
    const dx    = x < 1 ? 0.0001 : -0.0001
    const y2    = heightFn(x + dx)
    const deriv = (y2 - y) / dx
    const mag   = Math.sqrt(deriv * deriv + 1)
    const ref   = refract(-deriv / mag, -1 / mag)
    profile[i]  = ref ? ref[0] * ((y * bezelWidth + glassThickness) / ref[1]) : 0
  }
  return profile
}

// Generates an RGBA Uint8ClampedArray matching glasspill.tsx's generateSpecularMap.
export function generateSpecularRGBA(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  angle = Math.PI / 3
): Uint8ClampedArray {
  const data = new Uint8ClampedArray(w * h * 4)
  const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2, rBSq = Math.max(r - bezelWidth, 0) ** 2
  const wB = w - r * 2, hB = h - r * 2
  const sv = [Math.cos(angle), Math.sin(angle)]

  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x   = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0
      const y   = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0
      const dSq = x * x + y * y
      if (dSq > r1Sq || dSq < rBSq) continue
      const dist     = Math.sqrt(dSq)
      const fromSide = r - dist
      const op       = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq))
      if (op <= 0 || dist === 0) continue
      const cos   = x / dist, sin = -y / dist
      const dot   = Math.abs(cos * sv[0] + sin * sv[1])
      const edge  = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2))
      const coeff = dot * edge
      const col   = Math.max(0, Math.min(255, (255 * coeff) | 0))
      const idx   = (y1 * w + x1) * 4
      data[idx]     = col
      data[idx + 1] = col
      data[idx + 2] = col
      data[idx + 3] = Math.max(0, Math.min(255, (col * coeff * op) | 0))
    }
  }
  return data
}
