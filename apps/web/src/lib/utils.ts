import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isServer() {
  return typeof window === 'undefined'
}

export function getInitialsFromName(name = '??') {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
}
