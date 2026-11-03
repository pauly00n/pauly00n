import type { Metadata, Viewport } from 'next'
import { Newsreader } from 'next/font/google'
import './globals.css'

const _newsreader = Newsreader({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-newsreader", display: "swap" });
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://paulyoon.xyz').replace(/\/$/, '')
const ogImageUrl = `${siteUrl}/og-home.png`
const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfbf7' },
    { media: '(prefers-color-scheme: dark)', color: '#151413' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Paul Yoon',
  description: 'Fourth year at Stanford studying Computer Science, Mathematics, and Music. Engineer at Numenor AI.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Paul Yoon',
    description: 'Fourth year at Stanford studying Computer Science, Mathematics, and Music. Engineer at Numenor AI.',
    url: siteUrl,
    siteName: 'Paul Yoon',
    images: [
      {
        url: ogImageUrl,
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
    description: 'Fourth year at Stanford studying Computer Science, Mathematics, and Music. Engineer at Numenor AI.',
    images: [ogImageUrl],
  },
  icons: {
    // the svg swaps ink for white on its own via prefers-color-scheme; the pngs are the same pair for browsers that skip svg
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-light.png', type: 'image/png', sizes: '180x180', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', type: 'image/png', sizes: '180x180', media: '(prefers-color-scheme: dark)' },
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
    <html lang="en" suppressHydrationWarning>

        <head>
                {/* apply a remembered theme before first paint so dark readers never see a cream flash */}
                <script
                    id="theme-init"
                    dangerouslySetInnerHTML={{
                        __html: "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}})()",
                    }}
                />
                <script
                    id="schema-person"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Paul Yoon",
                            "jobTitle": "Software Engineer & Researcher",
                            "worksFor": { "@type": "Organization", "name": "Numenor AI", "url": "https://numenor.ai/" },
                            "affiliation": {
                                "@type": "CollegeOrUniversity",
                                "name": "Stanford University"
                            },
                            "address": { "@type": "PostalAddress", "addressLocality": "Menlo Park", "addressRegion": "CA" },
                            "sameAs": [
                                "https://github.com/pauly00n",
                                "https://linkedin.com/in/pauljinyoon",
                                "https://x.com/asian1x"
                            ],
                            "url": "https://paulyoon.xyz"
                        }),
                    }}
                />
                <script
                    id="schema-website"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "Paul Yoon",
                            "alternateName": "paulyoon.xyz",
                            "url": siteUrl
                        }),
                    }}
                />
            </head>
      <body className={`${_newsreader.variable} font-sans antialiased`} style={{ background: 'transparent' }}>
        {children}
      </body>
    </html>
  )
}
