import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav';
import { HeroBackground } from '@/components/hero-background';

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const viewport: Viewport = {
  themeColor: '#e0f1f9',
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: 'Paul Yoon',
  description: 'Stanford University Undergraduate studying Computer Science and Music',
  openGraph: {
    title: 'Paul Yoon',
    description: 'Stanford University Undergraduate studying Computer Science and Music',
    siteName: 'Paul Yoon',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paul Yoon',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paul Yoon',
    description: 'Stanford University Undergraduate studying Computer Science and Music',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#e0f1f9" }}>

        <head>
                <script
                    id="schema-person"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Paul Yoon",
                            "affiliation": {
                                "@type": "CollegeOrUniversity",
                                "name": "Stanford University"
                            },
                            "url": "https://paulyoon.xyz"
                        }),
                    }}
                />
            </head>
      <body className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`} style={{ background: 'transparent' }}>
        <div style={{ position: 'fixed', top: '-300px', bottom: '-300px', left: 0, right: 0, zIndex: -10, willChange: 'auto' }}>
          <HeroBackground />
        </div>
        <Nav />
        {children}
      </body>
    </html>
  )
}
