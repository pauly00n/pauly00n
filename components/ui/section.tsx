import type { CSSProperties, ReactNode, Ref } from "react"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { BRAND_BLUE, cn } from "@/lib/utils"

type SectionWidth = "4xl" | "5xl" | "6xl"

const maxWidthClass: Record<SectionWidth, string> = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
}

export function SectionShell({
  id,
  children,
  maxWidth = "5xl",
  className,
  containerClassName,
  sectionRef,
}: {
  id: string
  children: ReactNode
  maxWidth?: SectionWidth
  className?: string
  containerClassName?: string
  sectionRef?: Ref<HTMLElement>
}) {
  return (
    <section ref={sectionRef} id={id} className={cn("relative border-t border-border/50", className)}>
      <SectionTopGlow />
      <div className={cn("mx-auto px-6 py-24 lg:px-8 lg:py-24", maxWidthClass[maxWidth], containerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  first,
  second,
  className,
  firstStyle,
  secondStyle,
}: {
  first: ReactNode
  second: ReactNode
  className?: string
  firstStyle?: CSSProperties
  secondStyle?: CSSProperties
}) {
  return (
    <h2 className={cn("font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl", className)}>
      <span style={firstStyle}>{first}</span>
      <br />
      <span className="italic" style={{ color: BRAND_BLUE, ...secondStyle }}>
        {second}
      </span>
    </h2>
  )
}
