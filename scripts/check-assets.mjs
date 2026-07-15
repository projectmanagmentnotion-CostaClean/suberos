import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { buildAssetInventory } from './inspect-all-assets.mjs'

const repoRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const requiredPublicAssets = [
  'public/branding/suberos-icon-32.png',
  'public/branding/suberos-logo-symbol.webp',
  'public/branding/fonts/syncopate/Syncopate-Regular.woff2',
  'public/branding/fonts/syncopate/Syncopate-Bold.woff2',
  'public/branding/fonts/syncopate/LICENSE.txt',
]
const sourceRoots = ['src', 'public', 'index.html']
const remoteAssetPattern = /https?:\/\/[^"'`\s)]+\.(?:avif|css|gif|ico|jpe?g|js|mp4|png|svg|ttf|webm|webp|woff2?)(?:\?[^"'`\s)]*)?/gi

async function exists(targetPath) {
  try {
    await fs.access(path.join(repoRoot, targetPath))
    return true
  } catch {
    return false
  }
}

async function readTextFiles(rootPath) {
  const absolutePath = path.join(repoRoot, rootPath)
  const stats = await fs.stat(absolutePath)

  if (stats.isFile()) {
    return [
      {
        path: rootPath,
        content: await fs.readFile(absolutePath, 'utf8'),
      },
    ]
  }

  const results = []
  const entries = await fs.readdir(absolutePath, { withFileTypes: true })
  for (const entry of entries) {
    const relativePath = path.join(rootPath, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await readTextFiles(relativePath)))
      continue
    }

    const extension = path.extname(entry.name).toLowerCase()
    if (!['.css', '.html', '.js', '.json', '.mjs', '.ts', '.tsx'].includes(extension)) {
      continue
    }

    results.push({
      path: relativePath.split(path.sep).join('/'),
      content: await fs.readFile(path.join(repoRoot, relativePath), 'utf8'),
    })
  }

  return results
}

function isAllowedRemoteAsset(url) {
  if (url.includes('react.dev/link/react-devtools')) {
    return true
  }

  return url.startsWith('https://suberos.com/')
}

const problems = []
const warnings = []

for (const assetPath of requiredPublicAssets) {
  if (!(await exists(assetPath))) {
    problems.push(`Missing required asset: ${assetPath}`)
  }
}

const sourceTexts = (await Promise.all(sourceRoots.map((rootPath) => readTextFiles(rootPath)))).flat()
for (const { path: sourcePath, content } of sourceTexts) {
  const matches = content.match(remoteAssetPattern) ?? []
  for (const match of matches) {
    if (!isAllowedRemoteAsset(match)) {
      problems.push(`Remote asset detected in ${sourcePath}: ${match}`)
    }
  }
}

const { assets } = await buildAssetInventory()
const duplicateGroups = new Map()

for (const asset of assets) {
  if (asset.status === 'approved' && !asset.inDist && asset.path.startsWith('public/')) {
    warnings.push(`Approved public asset is not present in dist: ${asset.path}`)
  }

  if (
    asset.path.startsWith('public/') &&
    asset.references.length === 0 &&
    !asset.path.includes('legacy-source') &&
    !asset.path.includes('/motion/lab/')
  ) {
    warnings.push(`Public asset has no detected source reference: ${asset.path}`)
  }

  const group = duplicateGroups.get(asset.sha256) ?? []
  group.push(asset.path)
  duplicateGroups.set(asset.sha256, group)
}

for (const [, group] of duplicateGroups) {
  if (group.length > 1) {
    const onlyPublicToDistCopies = group.every((entry) => entry.startsWith('public/') || entry.startsWith('dist/'))
    if (onlyPublicToDistCopies) {
      continue
    }

    warnings.push(`Duplicate asset hash detected: ${group.join(', ')}`)
  }
}

if (warnings.length > 0) {
  console.warn('Asset QA warnings:')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

if (problems.length > 0) {
  console.error('Asset QA failed:')
  for (const problem of problems) {
    console.error(`- ${problem}`)
  }
  process.exit(1)
}

console.log(
  JSON.stringify(
    {
      totalAssets: assets.length,
      warnings: warnings.length,
      status: 'ok',
    },
    null,
    2,
  ),
)
