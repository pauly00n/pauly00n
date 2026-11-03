import type { Metadata, Viewport } from 'next'
import { Nav } from '@/components/nav'
import { HeroBackground } from '@/components/hero-background'

// the site as it was before november 2026, kept whole at /old-site.
// everything that used to live in the root layout (sky background, glass nav,
// the pale blue page colour) is scoped here so the new home page stays plain.

export const viewport: Viewport = {
  themeColor: '#e0f1f9',
}

// the old site keeps its old link preview
export const metadata: Metadata = {
  openGraph: { images: [{ url: '/og-image2.png', width: 1200, height: 630, alt: 'Paul Yoon' }] },
  twitter: { images: ['/og-image2.png'] },
}

export default function OldSiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="font-sans" style={{ minHeight: '100svh' }}>
      <style>{`html{background:#e0f1f9 !important}`}</style>
      <div style={{ position: 'fixed', top: '-300px', bottom: '-300px', left: 0, right: 0, zIndex: -10, willChange: 'auto' }}>
        <HeroBackground />
      </div>
      <Nav />
      {children}
    </div>
  )
}
