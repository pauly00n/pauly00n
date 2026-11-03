import { Hero } from "@/components/hero"
import { Work } from "@/components/work"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { ScrollReset } from "@/components/scroll-reset"
import { GlassPillDebug } from "@/components/glasspill-debug"
import SnapshotBootstrap from "@/components/snapshot-bootstrap"

export default function Page() {
  return (
    <>
      <ScrollReset />
      <main>
        <Hero />
        <Work />
        <Projects />
        <Skills />
        <About />
      </main>
      <Footer />
      <GlassPillDebug />
      <SnapshotBootstrap />
    </>
  )
}
