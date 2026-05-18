import { useEffect, useState } from "react"

type Ref = { current: Element | null }

export function useIntersectionOnce(ref: Ref, threshold = 0.05): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return visible
}

export function useIntersectionsOnce(refs: Ref[], threshold = 0.05): boolean[] {
  const [visible, setVisible] = useState(() => refs.map(() => false))

  useEffect(() => {
    const observers = refs.map((ref, i) => {
      const el = ref.current
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => { const next = [...prev]; next[i] = true; return next })
            observer.disconnect()
          }
        },
        { threshold }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [refs, threshold])

  return visible
}
