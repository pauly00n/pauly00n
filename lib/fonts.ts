// the old site's three faces. declared here so only the routes that use them load them;
// the home page uses newsreader alone (see app/layout.tsx).
import { Inter, Playfair_Display, STIX_Two_Text } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
export const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
export const stix = STIX_Two_Text({ subsets: ['latin'], variable: '--font-stix', display: 'swap' })

export const oldFontClass = `${inter.variable} ${playfair.variable} ${stix.variable}`
