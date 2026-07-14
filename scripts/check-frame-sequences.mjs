import { access, readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const manifestsDir = path.resolve('src/motion/sequences/manifests')
const manifestFiles = (await readdir(manifestsDir)).filter((file) => file.endsWith('.json'))
const failures = []
const allowedExtensions = new Set(['avif', 'webp', 'jpg', 'png'])

function isLocalPath(value) {
  return typeof value === 'string' && value.startsWith('/')
}

for (const file of manifestFiles) {
  const manifestPath = path.join(manifestsDir, file)
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

  if (!manifest.id) {
    failures.push(`${file}: missing id`)
  }

  if (!Array.isArray(manifest.sets) || manifest.sets.length === 0) {
    failures.push(`${file}: missing frame sets`)
    continue
  }

  if (!manifest.ownershipConfirmed) {
    failures.push(`${file}: ownershipConfirmed must be true`)
  }

  if (!isLocalPath(manifest.poster) || !isLocalPath(manifest.fallbackImage)) {
    failures.push(`${file}: poster and fallback must be local paths`)
  }

  const posterPath = path.resolve(`public${manifest.poster}`)
  const fallbackPath = path.resolve(`public${manifest.fallbackImage}`)

  try {
    await access(posterPath)
    await access(fallbackPath)
  } catch {
    failures.push(`${file}: poster or fallback file missing`)
  }

  if (manifest.publicationApproved === false && !manifest.poster.includes('/motion/lab/')) {
    failures.push(`${file}: private sequences must remain under /motion/lab/`)
  }

  for (const set of manifest.sets) {
    if (!allowedExtensions.has(set.extension)) {
      failures.push(`${file}: invalid extension "${set.extension}" in ${set.profile}`)
    }

    if (!isLocalPath(set.basePath)) {
      failures.push(`${file}: non-local basePath in ${set.profile}`)
      continue
    }

    const baseDir = path.resolve(`public${set.basePath}`)
    const files = (await readdir(baseDir))
      .filter((entry) => entry.endsWith(`.${set.extension}`))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))

    if (files.length !== set.frameCount) {
      failures.push(`${file}: frameCount mismatch in ${set.profile}`)
    }

    const totalBytes = []

    for (let index = 0; index < files.length; index += 1) {
      const expected = `${set.filenamePattern.replace('{index}', String(set.startIndex + index).padStart(4, '0'))}.${set.extension}`

      if (files[index] !== expected) {
        failures.push(`${file}: invalid sequence ordering in ${set.profile}, expected ${expected}`)
        break
      }

      const filePath = path.join(baseDir, files[index])
      const metadata = await sharp(filePath).metadata()

      if (metadata.width !== set.width || metadata.height !== set.height) {
        failures.push(`${file}: inconsistent frame dimensions in ${set.profile} (${files[index]})`)
        break
      }

      totalBytes.push((await stat(filePath)).size)
    }

    const bytes = totalBytes.reduce((sum, value) => sum + value, 0)

    if (set.estimatedTotalBytes && bytes !== set.estimatedTotalBytes) {
      failures.push(`${file}: estimatedTotalBytes mismatch in ${set.profile}`)
    }
  }
}

if (failures.length > 0) {
  console.error('Frame sequence validation failed.\n')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Frame sequence validation passed.')
