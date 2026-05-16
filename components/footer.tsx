export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/5">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 sm:flex-row lg:px-8">
        <p className="text-xs text-foreground/70">
          {"\u00A9 2026 Paul Yoon."}
        </p>
        <p className="text-xs text-foreground/70">
          Designed & built with care.
        </p>
      </div>
    </footer>
  )
}
