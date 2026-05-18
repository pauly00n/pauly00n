"use client"

import { useRef } from "react"
import Image from "next/image"
import TextLink from "@/components/ui/textlink"
import { SectionTopGlow } from "@/components/ui/section-top-glow"
import { useIntersectionOnce } from "@/hooks/use-intersection-once"
import { BRAND_BLUE } from "@/lib/utils"

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const visible = useIntersectionOnce(sectionRef)

  const fadeUp = (delay: number): React.CSSProperties =>
    visible
      ? { animation: `fadeUp 550ms ease-out ${delay}ms both` }
      : { opacity: 0 }

  return (
    <section ref={sectionRef} id="about" className="relative border-t border-border/50">
      <SectionTopGlow />

      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-5">
          {/* Left column */}
          <div className="flex flex-col gap-6 sm:col-span-2">
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl pb-6">
              <span style={fadeUp(0)}>A bit</span>
              <br />
              <span className="italic" style={{ color: BRAND_BLUE, ...fadeUp(300) }}>
                about me.
              </span>
            </h2>
            <div style={fadeUp(400)} className="relative w-[85%] sm:w-full mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/about-me-image.png"
                alt="Paul Yoon"
                width={300}
                height={400}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 w-[85%] mx-auto sm:w-full sm:mx-0 sm:col-span-3">
            <p style={fadeUp(520)} className="text-pretty text-sm sm:text-base leading-relaxed text-foreground/80">
              I was born in Boston, MA, lived in Houston, TX for 10 years, then moved to the Bay Area for high school. I&apos;ll be at Stanford for the next ~3 years. I plan to graduate with a degree in Computer Science and a minor in Music.
            </p>

            <p style={fadeUp(640)} className="text-pretty text-sm sm:text-base leading-relaxed text-foreground/80">
              My passion for building has existed since the first time I touched a Lego piece. I find Mathematics a
              fascinating puzzle, with its structures and patterns found in any field I could dream of studying. I&apos;ve
              also played the French Horn ever since 7th grade, and currently play in the{" "}
              <TextLink href="https://orchestras.stanford.edu/ensembles/sso" className="text-sm sm:text-base">Stanford Symphony Orchestra</TextLink>
              , studying under{" "}
              <TextLink href="https://jesseclevenger.com" className="text-sm sm:text-base">Jesse Clevenger</TextLink>.
            </p>

            <p style={fadeUp(760)} className="text-pretty text-sm sm:text-base leading-relaxed text-foreground/80">
              If I&apos;m not locked in studying or building something, you can catch me bouldering, lifting
              weights, scootering around campus, or watching a good Anime. I&apos;m also a huge big back and would
              always love to try a new place off campus — you should add{" "}
              <TextLink href="https://beliapp.co/app/asians" className="text-sm sm:text-base">@asians on Beli</TextLink>. Feel free to reach out anytime
              about my interests or for anything else!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
