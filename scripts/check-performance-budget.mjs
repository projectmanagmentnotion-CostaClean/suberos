import { existsSync, readFileSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const root = process.cwd()
const failures = []
const warnings = []

const budgets = {
  heroImageBytes: 120_000,
  heroImageWarningBytes: 90_000,
  mainCssGzipBytes: 10_240,
  mainJsGzipBytes: 160_000,
  mainJsWarningBytes: 150_000,
  syncopateTotalBytes: 55_000,
  syncopateWarningBytes: 50_000,
  syncopateBoldBytes: 20_000,
}

function resolveFromRoot(relativePath) {
  return path.resolve(root, relativePath)
}

function read(relativePath) {
  return readFileSync(resolveFromRoot(relativePath))
}

function parseAssetRefs(indexHtml, tagName, attributeName) {
  const pattern = new RegExp(`<${tagName}[^>]*${attributeName}="([^"]+)"`, 'gu')
  return Array.from(indexHtml.matchAll(pattern), (match) => match[1])
}

if (!existsSync(resolveFromRoot('dist/index.html'))) {
  throw new Error('dist/index.html is required. Run npm run build before qa:performance.')
}

const distIndexHtml = read('dist/index.html').toString('utf8')
const scriptRefs = parseAssetRefs(distIndexHtml, 'script', 'src')
const cssRefs = parseAssetRefs(distIndexHtml, 'link', 'href').filter((ref) => ref.endsWith('.css'))

if (scriptRefs.length !== 1) {
  failures.push(`Expected exactly one initial JS entry in dist/index.html, found ${scriptRefs.length}.`)
}

if (cssRefs.length !== 1) {
  failures.push(`Expected exactly one initial CSS entry in dist/index.html, found ${cssRefs.length}.`)
}

if (scriptRefs[0]) {
  const jsBuffer = read(`dist${scriptRefs[0]}`)
  const gzipBytes = gzipSync(jsBuffer).length

  if (gzipBytes > budgets.mainJsGzipBytes) {
    failures.push(`Initial JS gzip budget exceeded: ${gzipBytes} B > ${budgets.mainJsGzipBytes} B.`)
  } else if (gzipBytes > budgets.mainJsWarningBytes) {
    warnings.push(`Initial JS gzip is close to the blocking budget: ${gzipBytes} B.`)
  }
}

if (cssRefs[0]) {
  const cssBuffer = read(`dist${cssRefs[0]}`)
  const gzipBytes = gzipSync(cssBuffer).length

  if (gzipBytes > budgets.mainCssGzipBytes) {
    failures.push(`Initial CSS gzip budget exceeded: ${gzipBytes} B > ${budgets.mainCssGzipBytes} B.`)
  }
}

const heroImageStat = await stat(resolveFromRoot('public/branding/suberos-logo-symbol.webp'))
if (heroImageStat.size > budgets.heroImageBytes) {
  failures.push(`Hero visual is too heavy for the baseline budget: ${heroImageStat.size} B > ${budgets.heroImageBytes} B.`)
} else if (heroImageStat.size > budgets.heroImageWarningBytes) {
  warnings.push(`Hero visual is approaching the budget: ${heroImageStat.size} B.`)
}

const syncopateRegularStat = await stat(resolveFromRoot('public/branding/fonts/syncopate/Syncopate-Regular.woff2'))
const syncopateBoldStat = await stat(resolveFromRoot('public/branding/fonts/syncopate/Syncopate-Bold.woff2'))
const syncopateTotalBytes = syncopateRegularStat.size + syncopateBoldStat.size

if (syncopateTotalBytes > budgets.syncopateTotalBytes) {
  failures.push(`Syncopate total font payload exceeds budget: ${syncopateTotalBytes} B > ${budgets.syncopateTotalBytes} B.`)
} else if (syncopateTotalBytes > budgets.syncopateWarningBytes) {
  warnings.push(`Syncopate total font payload is close to budget: ${syncopateTotalBytes} B.`)
}

if (syncopateBoldStat.size > budgets.syncopateBoldBytes) {
  failures.push(`Critical Syncopate Bold preload exceeds budget: ${syncopateBoldStat.size} B > ${budgets.syncopateBoldBytes} B.`)
}

const fontsCss = read('src/styles/fonts.css').toString('utf8')
if (fontsCss.includes('/legacy-source/')) {
  failures.push('Runtime fonts.css must not reference legacy-source assets.')
}

const appSource = read('src/app/App.tsx').toString('utf8')
for (const marker of ['lazy(() =>', "import('../features/portfolio-lab/PortfolioLabPage')", "import('../features/motion-lab/MotionLabPage')", "import('../features/sequence-lab/SequenceLabPage')"]) {
  if (!appSource.includes(marker)) {
    failures.push(`Lazy lab loading guard missing in App.tsx: ${marker}`)
  }
}

const preloaderSource = read('src/features/preloader/Preloader.tsx').toString('utf8')
if (preloaderSource.includes('suberos-icon-32.png') || preloaderSource.includes('suberos-icon-192.png')) {
  failures.push('Preloader must not wait on favicon or icon files in the critical asset list.')
}

const indexSource = read('index.html').toString('utf8')
if (!indexSource.includes('rel="preload" as="image" href="/branding/suberos-logo-symbol.webp"')) {
  failures.push('index.html must preload the approved hero visual.')
}

if (!indexSource.includes('/branding/fonts/syncopate/Syncopate-Bold.woff2')) {
  failures.push('index.html must preload the critical Syncopate Bold font.')
}

console.log('Performance budget summary:')
console.log(`- Main JS entry: ${scriptRefs[0] ?? 'missing'}`)
console.log(`- Main CSS entry: ${cssRefs[0] ?? 'missing'}`)
console.log(`- Hero visual: ${heroImageStat.size} B`)
console.log(`- Syncopate Regular: ${syncopateRegularStat.size} B`)
console.log(`- Syncopate Bold: ${syncopateBoldStat.size} B`)
console.log(`- Syncopate total: ${syncopateTotalBytes} B`)

if (failures.length > 0) {
  console.error('\nPerformance budget checks failed.\n')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }

  if (warnings.length > 0) {
    console.error('\nWarnings:')
    for (const warning of warnings) {
      console.error(`- ${warning}`)
    }
  }

  process.exit(1)
}

console.log('\nPerformance budget checks passed.')

if (warnings.length > 0) {
  console.log('\nWarnings:')
  for (const warning of warnings) {
    console.log(`- ${warning}`)
  }
}
