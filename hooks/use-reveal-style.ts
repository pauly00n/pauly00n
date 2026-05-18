import type { CSSProperties } from "react"

export function revealStyle(
  visible: boolean,
  animation: string,
  delay = 0,
  duration = 550
): CSSProperties {
  return visible
    ? { animation: `${animation} ${duration}ms ease-out ${delay}ms both` }
    : { opacity: 0 }
}

export function immediateRevealStyle(
  animation: string,
  delay = 0,
  duration = 550
): CSSProperties {
  return { animation: `${animation} ${duration}ms ease-out ${delay}ms both` }
}
