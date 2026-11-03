import { oldFontClass } from '@/lib/fonts'

// the brand deck is set in the old site's faces
export default function BrandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${oldFontClass} font-sans`}>{children}</div>
}
