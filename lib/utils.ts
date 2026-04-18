import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BRAND_BLUE = "#017bb9"

export function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  const full  = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  return `${parseInt(full.slice(0, 2), 16)}, ${parseInt(full.slice(2, 4), 16)}, ${parseInt(full.slice(4, 6), 16)}`
}
