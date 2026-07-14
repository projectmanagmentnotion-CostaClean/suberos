import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

const indexHtml = read('index.html')
const robots = read('public/robots.txt')
const sitemap = read('public/sitemap.xml')
const manifest = read('public/site.webmanifest')
const routeMetadata = read('src/data/seoPageMetadata.ts')
const routeSource = read('src/app/routes.ts')

const requiredIndexMarkers = [
  'lang="es"',
  '<title>SUBEROS - Estudio creativo de fotografia, diseno, produccion y web</title>',
  'name="description"',
  'rel="canonical"',
  'rel="manifest"',
  'property="og:title"',
  'property="og:description"',
  'property="og:image"',
  'property="og:image:width"',
  'property="og:image:height"',
  'name="twitter:card"',
  'name="twitter:title"',
  'name="twitter:description"',
  'name="twitter:image"',
  'application/ld+json',
]

for (const marker of requiredIndexMarkers) {
  if (!indexHtml.includes(marker)) {
    throw new Error(`Missing SEO marker in index.html: ${marker}`)
  }
}

const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/u)

if (!jsonLdMatch) {
  throw new Error('JSON-LD block missing in index.html')
}

JSON.parse(jsonLdMatch[1])

if (!robots.includes('Sitemap: https://suberos.com/sitemap.xml')) {
  throw new Error('robots.txt must reference the public sitemap.')
}

if (!sitemap.includes('<loc>https://suberos.com/</loc>')) {
  throw new Error('sitemap.xml must list the home canonical URL.')
}

const sitemapLocs = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/gu), (match) => match[1])

const forbiddenSitemapMarkers = ['portfolio-lab', 'sequence-lab', 'motion-lab', '?', '/legal/']

for (const marker of forbiddenSitemapMarkers) {
  if (sitemapLocs.some((loc) => loc.includes(marker))) {
    throw new Error(`sitemap.xml contains a non-indexable or unsupported route: ${marker}`)
  }
}

if (!manifest.includes('"src": "/branding/suberos-icon-192.png"') || !manifest.includes('"src": "/branding/suberos-icon-512.png"')) {
  throw new Error('site.webmanifest must include the approved brand icons.')
}

const forbiddenMarkers = ['localhost', '127.0.0.1', 'luxury', 'shisha', 'costaclean', 'ridaos']

for (const source of [indexHtml, robots, sitemap]) {
  const lowered = source.toLowerCase()
  for (const marker of forbiddenMarkers) {
    if (lowered.includes(marker)) {
      throw new Error(`Forbidden SEO marker found: ${marker}`)
    }
  }
}

const requiredMetadataPolicies = ['noindex,nofollow', "SUBEROS - Pagina no encontrada", "SUBEROS Motion Lab", "SUBEROS Sequence Lab", "SUBEROS Portfolio Lab"]

for (const marker of requiredMetadataPolicies) {
  if (!routeMetadata.includes(marker)) {
    throw new Error(`Missing route metadata rule: ${marker}`)
  }
}

for (const legalRoute of ['/legal/aviso-legal', '/legal/privacidad', '/legal/cookies', '/legal/accesibilidad']) {
  if (!routeSource.includes(legalRoute)) {
    throw new Error(`Missing legal route in app routing: ${legalRoute}`)
  }
}

console.log('SEO static checks passed.')
