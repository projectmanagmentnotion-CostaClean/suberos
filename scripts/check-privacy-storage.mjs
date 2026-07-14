import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

const sourceFiles = [
  'index.html',
  'src/features/contact/ContactForm.tsx',
  'src/features/contact/contact.service.ts',
  'src/features/contact/contact.events.ts',
  'src/features/preloader/usePreloader.ts',
  'public/robots.txt',
]

const disallowedMarkers = [
  'googletagmanager',
  'google-analytics',
  'gtag(',
  'meta pixel',
  'facebook.com/tr',
  'hotjar',
  'clarity.ms',
  'mixpanel',
  'segment.com',
  'plausible.io',
]

for (const relativePath of sourceFiles) {
  const source = readFileSync(resolve(root, relativePath), 'utf8').toLowerCase()

  for (const marker of disallowedMarkers) {
    if (source.includes(marker)) {
      throw new Error(`Disallowed tracker or analytics marker found in ${relativePath}: ${marker}`)
    }
  }
}

const contactSource = readFileSync(resolve(root, 'src/features/contact/ContactForm.tsx'), 'utf8')

if (contactSource.includes('localStorage') || contactSource.includes('sessionStorage')) {
  throw new Error('The contact form must not persist personal data in browser storage.')
}

console.log('Privacy static checks passed.')
