import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const failures = []

function resolveFromRoot(relativePath) {
  return path.resolve(root, relativePath)
}

function read(relativePath) {
  return readFileSync(resolveFromRoot(relativePath), 'utf8')
}

async function walk(relativePath) {
  const entries = await readdir(resolveFromRoot(relativePath), { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryRelativePath = path.join(relativePath, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(entryRelativePath)))
      continue
    }

    files.push(entryRelativePath)
  }

  return files
}

const publicFonts = [
  'public/branding/fonts/syncopate/Syncopate-Regular.woff2',
  'public/branding/fonts/syncopate/Syncopate-Bold.woff2',
  'public/branding/fonts/syncopate/OFL.txt',
]

for (const relativePath of publicFonts) {
  if (!existsSync(resolveFromRoot(relativePath))) {
    failures.push(`Missing required public font asset: ${relativePath}`)
  }
}

for (const blockedPath of [
  'public/branding/fonts/StretchPro.otf',
  'public/legacy-source/fonts/StretchPro.otf',
  'public/legacy-source/fonts/couture-bld.otf',
  'public/legacy-source/fonts/Oswald-VariableFont_wght.ttf',
]) {
  if (existsSync(resolveFromRoot(blockedPath))) {
    failures.push(`Blocked legacy font still exists in public build scope: ${blockedPath}`)
  }
}

const publicFiles = await walk('public')
const unexpectedPublicFonts = publicFiles.filter((relativePath) =>
  /\.(?:otf|ttf|woff|woff2)$/iu.test(relativePath) &&
  !publicFonts.some((allowed) => allowed.replace(/\\/gu, '/') === relativePath.replace(/\\/gu, '/')),
)

if (unexpectedPublicFonts.length > 0) {
  failures.push(`Unexpected public fonts found: ${unexpectedPublicFonts.join(', ')}`)
}

const sourceFiles = ['index.html', ...(await walk('src')), ...(await walk('public'))]
for (const relativePath of sourceFiles) {
  if (!/\.(?:ts|tsx|css|html|svg|txt|md|json|webmanifest)$/iu.test(relativePath)) {
    continue
  }

  const source = read(relativePath)
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/iu.test(source)) {
    failures.push(`Remote Google Fonts reference found in source file: ${relativePath}`)
  }
}

if (existsSync(resolveFromRoot('dist'))) {
  const distFiles = await walk('dist')
  for (const relativePath of distFiles) {
    if (!/\.(?:html|js|css|svg|txt|json|webmanifest)$/iu.test(relativePath)) {
      continue
    }

    const source = read(relativePath)
    if (/StretchPro|couture-bld|fonts\.googleapis\.com|fonts\.gstatic\.com/iu.test(source)) {
      failures.push(`Blocked font marker leaked into dist: ${relativePath}`)
    }
  }

  const distFontFiles = distFiles.filter((relativePath) => /\.(?:otf|ttf|woff|woff2)$/iu.test(relativePath))
  const invalidDistFonts = distFontFiles.filter((relativePath) => !/branding[\\/]fonts[\\/]syncopate[\\/](Syncopate-Regular|Syncopate-Bold)\.woff2$/iu.test(relativePath))
  if (invalidDistFonts.length > 0) {
    failures.push(`Unexpected font files published in dist: ${invalidDistFonts.join(', ')}`)
  }
}

for (const docPath of [
  'docs/licenses/SYNCOPATE_LICENSE.md',
  'docs/licenses/SYNCOPATE_CHECKSUMS.txt',
  'docs/ASSET_LICENSE_STATUS.md',
  'docs/SUBEROS_VISUAL_ASSET_INVENTORY.md',
]) {
  if (!existsSync(resolveFromRoot(docPath))) {
    failures.push(`Missing font licence evidence file: ${docPath}`)
  }
}

if (existsSync(resolveFromRoot('docs/licenses/SYNCOPATE_CHECKSUMS.txt'))) {
  const checksums = read('docs/licenses/SYNCOPATE_CHECKSUMS.txt')
  for (const marker of ['Syncopate-Regular.woff2', 'Syncopate-Bold.woff2', 'OFL.txt']) {
    if (!checksums.includes(marker)) {
      failures.push(`Checksum document is missing ${marker}.`)
    }
  }
}

if (failures.length > 0) {
  console.error('Font licence checks failed.\n')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Font licence checks passed.')
