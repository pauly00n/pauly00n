import { useEffect, useState, RefObject } from "react"

/**
 * On mobile, tracks which element in `refs` is intersected by a horizontal
 * "scroll line" at `lineRatio` of the viewport height (default 45%).
 * Returns null when disabled (desktop).
 */
export function useMobileScrollLine(
  refs: RefObject<Element | null>[],
  enabled: boolean,
  lineRatio = 0.45
): number | null {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActiveIdx(null)
      return
    }

    function check() {
      const lineY = window.innerHeight * lineRatio
      let found: number | null = null
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i].current
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= lineY && rect.bottom >= lineY) {
          found = i
          break
        }
      }
      setActiveIdx(found)
    }

    check()
    window.addEventListener("scroll", check, { passive: true })
    window.addEventListener("resize", check, { passive: true })
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [enabled, lineRatio, refs])

  return activeIdx
}
