import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const repoRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const reportDir = path.join(repoRoot, 'artifacts', 'reports', 'assets')
const outputJsonPath = path.join(reportDir, 'asset-inventory.json')
const outputCsvPath = path.join(reportDir, 'asset-inventory.csv')

const scanRoots = ['public', 'src', 'dist']
const assetExtensions = new Set([
  '.avif',
  '.css',
  '.gif',
  '.html',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.mjs',
  '.mp4',
  '.otf',
  '.png',
  '.svg',
  '.ttf',
  '.txt',
  '.webm',
  '.webp',
  '.woff',
  '.woff2',
  '.xml',
])
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.mjs', '.svg', '.ts', '.tsx', '.txt', '.xml'])
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp'])
const fontExtensions = new Set(['.otf', '.ttf', '.woff', '.woff2'])
const videoExtensions = new Set(['.mp4', '.webm'])

const mimeByExtension = {
  '.avif': 'image/avif',
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript',
  '.mp4': 'video/mp4',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
}

function toPosix(value) {
  return value.split(path.sep).join('/')
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function walkDirectory(rootPath) {
  const entries = await fs.readdir(rootPath, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath)))
      continue
    }

    const extension = path.extname(entry.name).toLowerCase()
    if (assetExtensions.has(extension)) {
      files.push(fullPath)
    }
  }

  return files
}

async function readTextFiles(rootPath) {
  if (!(await exists(rootPath))) {
    return []
  }

  const files = await walkDirectory(rootPath)
  const textFiles = files.filter((filePath) => textExtensions.has(path.extname(filePath).toLowerCase()))

  return Promise.all(
    textFiles.map(async (filePath) => ({
      path: toPosix(path.relative(repoRoot, filePath)),
      content: await fs.readFile(filePath, 'utf8'),
    })),
  )
}

function inferCategory(relativePath, extension) {
  if (fontExtensions.has(extension)) {
    return 'font'
  }

  if (videoExtensions.has(extension)) {
    return 'video'
  }

  if (imageExtensions.has(extension)) {
    if (relativePath.includes('/branding/')) {
      return 'branding'
    }

    if (relativePath.includes('/legal/')) {
      return 'legal'
    }

    if (relativePath.includes('/labs/')) {
      return 'lab-visual'
    }

    return 'image'
  }

  if (extension === '.xml') {
    return 'metadata'
  }

  if (extension === '.html') {
    return 'document'
  }

  if (extension === '.css') {
    return 'style'
  }

  if (extension === '.js' || extension === '.mjs') {
    return 'script'
  }

  if (extension === '.json') {
    return 'data'
  }

  return 'other'
}

function inferLoad(relativePath) {
  if (relativePath.startsWith('public/branding/')) {
    return 'eager'
  }

  if (relativePath.startsWith('dist/assets/')) {
    return 'runtime'
  }

  return 'on-demand'
}

function inferPriority(relativePath) {
  if (relativePath.includes('favicon') || relativePath.includes('logo') || relativePath.includes('syncopate')) {
    return 'high'
  }

  if (relativePath.includes('/legal/') || relativePath.includes('/labs/')) {
    return 'low'
  }

  return 'medium'
}

function inferLicense(relativePath) {
  if (relativePath.includes('syncopate')) {
    return 'Apache-2.0'
  }

  if (relativePath.includes('branding') || relativePath.includes('legal') || relativePath.includes('legacy-source')) {
    return 'SUBEROS-owned-or-verified'
  }

  return 'internal-review'
}

function inferOrigin(relativePath) {
  if (relativePath.includes('legacy-source')) {
    return 'legacy-site-download'
  }

  if (relativePath.includes('branding')) {
    return 'suberos-branding'
  }

  if (relativePath.startsWith('dist/')) {
    return 'build-output'
  }

  return 'repository'
}

function inferStatus(relativePath) {
  if (relativePath.includes('legacy-source')) {
    return 'legacy'
  }

  if (relativePath.startsWith('dist/')) {
    return 'production'
  }

  if (relativePath.includes('/labs/')) {
    return 'internal-only'
  }

  return 'approved'
}

function inferComponent(relativePath) {
  if (relativePath.includes('favicon')) {
    return 'favicon'
  }

  if (relativePath.includes('syncopate')) {
    return 'global-typography'
  }

  if (relativePath.includes('logo')) {
    return 'branding'
  }

  if (relativePath.includes('/legal/')) {
    return 'legal-pages'
  }

  if (relativePath.includes('/labs/')) {
    return 'labs'
  }

  return 'global'
}

function buildPublicWebPath(relativePath) {
  if (!relativePath.startsWith('public/')) {
    return null
  }

  return `/${toPosix(relativePath.slice('public/'.length))}`
}

async function collectAssetMetadata(filePath, sourceTexts, distFileSet) {
  const buffer = await fs.readFile(filePath)
  const stats = await fs.stat(filePath)
  const hash = createHash('sha256').update(buffer).digest('hex')
  const relativePath = toPosix(path.relative(repoRoot, filePath))
  const extension = path.extname(filePath).toLowerCase()
  const fileName = path.basename(filePath)
  const publicWebPath = buildPublicWebPath(relativePath)

  let width = null
  let height = null
  let ratio = null
  let hasAlpha = null
  let animated = null
  let metadataError = null

  if (imageExtensions.has(extension)) {
    try {
      const metadata = await sharp(buffer, { animated: true }).metadata()
      width = metadata.width ?? null
      height = metadata.height ?? null
      ratio = width && height ? Number((width / height).toFixed(4)) : null
      hasAlpha = metadata.hasAlpha ?? null
      animated = (metadata.pages ?? 1) > 1
    } catch (error) {
      metadataError = error instanceof Error ? error.message : String(error)
    }
  }

  const references = sourceTexts
    .filter(({ content }) => {
      if (publicWebPath && content.includes(publicWebPath)) {
        return true
      }

      return content.includes(fileName)
    })
    .map(({ path: sourcePath }) => sourcePath)

  const distCandidates = [
    relativePath,
    relativePath.replace(/^public\//, ''),
    relativePath.replace(/^src\//, ''),
    fileName,
  ]
  const inDist = distCandidates.some((candidate) => distFileSet.has(candidate))

  return {
    path: relativePath,
    file: fileName,
    extension,
    mime: mimeByExtension[extension] ?? 'application/octet-stream',
    bytes: stats.size,
    kilobytes: Number((stats.size / 1024).toFixed(2)),
    megabytes: Number((stats.size / (1024 * 1024)).toFixed(4)),
    width,
    height,
    ratio,
    hasAlpha,
    animated,
    sha256: hash,
    category: inferCategory(relativePath, extension),
    component: inferComponent(relativePath),
    load: inferLoad(relativePath),
    priority: inferPriority(relativePath),
    license: inferLicense(relativePath),
    origin: inferOrigin(relativePath),
    status: inferStatus(relativePath),
    inDist,
    references,
    duplicateKey: hash,
    metadataError,
  }
}

function toCsvValue(value) {
  const stringValue = Array.isArray(value) ? value.join(' | ') : value == null ? '' : String(value)
  return `"${stringValue.replaceAll('"', '""')}"`
}

export async function buildAssetInventory() {
  await fs.mkdir(reportDir, { recursive: true })

  const scanFiles = (
    await Promise.all(
      scanRoots.map(async (root) => {
        const absoluteRoot = path.join(repoRoot, root)
        return (await exists(absoluteRoot)) ? walkDirectory(absoluteRoot) : []
      }),
    )
  ).flat()

  const sourceTexts = [
    ...(await readTextFiles(path.join(repoRoot, 'src'))),
    ...(await readTextFiles(path.join(repoRoot, 'public'))),
    ...(await readTextFiles(path.join(repoRoot, 'dist'))),
    ...(await readTextFiles(repoRoot)).filter(({ path: filePath }) => filePath === 'index.html'),
  ]

  const distFiles = (await exists(path.join(repoRoot, 'dist'))) ? await walkDirectory(path.join(repoRoot, 'dist')) : []
  const distFileSet = new Set(
    distFiles.flatMap((filePath) => {
      const relativePath = toPosix(path.relative(repoRoot, filePath))
      return [relativePath, relativePath.replace(/^dist\//, ''), path.basename(relativePath)]
    }),
  )

  const assets = []
  for (const filePath of scanFiles) {
    assets.push(await collectAssetMetadata(filePath, sourceTexts, distFileSet))
  }

  const duplicatesByHash = new Map()
  for (const asset of assets) {
    const group = duplicatesByHash.get(asset.duplicateKey) ?? []
    group.push(asset.path)
    duplicatesByHash.set(asset.duplicateKey, group)
  }

  const enrichedAssets = assets.map((asset) => ({
    ...asset,
    duplicatePaths: (duplicatesByHash.get(asset.duplicateKey) ?? []).filter((entry) => entry !== asset.path),
  }))

  await fs.writeFile(outputJsonPath, `${JSON.stringify(enrichedAssets, null, 2)}\n`, 'utf8')

  const headers = [
    'path',
    'file',
    'category',
    'component',
    'extension',
    'mime',
    'width',
    'height',
    'ratio',
    'bytes',
    'kilobytes',
    'megabytes',
    'hasAlpha',
    'animated',
    'load',
    'priority',
    'license',
    'origin',
    'status',
    'inDist',
    'references',
    'duplicatePaths',
    'sha256',
    'metadataError',
  ]
  const rows = [
    headers.join(','),
    ...enrichedAssets.map((asset) => headers.map((header) => toCsvValue(asset[header])).join(',')),
  ]
  await fs.writeFile(outputCsvPath, `${rows.join('\n')}\n`, 'utf8')

  return {
    assets: enrichedAssets,
    outputCsvPath,
    outputJsonPath,
  }
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectExecution) {
  const { assets } = await buildAssetInventory()
  const duplicateGroups = assets.filter((asset) => asset.duplicatePaths.length > 0).length

  console.log(
    JSON.stringify(
      {
        totalAssets: assets.length,
        duplicateAssetEntries: duplicateGroups,
        outputJsonPath: toPosix(path.relative(repoRoot, outputJsonPath)),
        outputCsvPath: toPosix(path.relative(repoRoot, outputCsvPath)),
      },
      null,
      2,
    ),
  )
}
