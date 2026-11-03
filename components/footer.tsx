import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/5">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 sm:flex-row lg:px-8">
        <p className="text-xs text-foreground/70">
          {"\u00A9 2026 Paul Yoon."}
        </p>
        <p className="text-xs text-foreground/70">
          This is the old site. The current one is at{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-foreground">paulyoon.xyz</Link>.
        </p>
      </div>
    </footer>
  )
}
