import { readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const args = new Map()

for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1])
}

const root = args.get('--root') ? path.resolve(args.get('--root')) : path.resolve('public/motion/lab/suberos-sequence-lab')
const output = args.get('--output')
  ? path.resolve(args.get('--output'))
  : path.resolve('src/motion/sequences/manifests/suberos-sequence-lab.manifest.json')
const id = args.get('--id') ?? 'suberos-sequence-lab'
const title = args.get('--title') ?? 'SUBEROS Sequence Lab'
const reducedMotionDisabled = args.get('--reduced-motion-disabled') !== '0'
const ownershipConfirmed = args.get('--ownership-confirmed') !== '0'
const publicationApproved = args.get('--publication-approved') === '1'
const preloadRadius = Number(args.get('--preload-radius') ?? 4)
const priorityFrames = (args.get('--priority-frames') ?? '1,2,3,4')
  .split(',')
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isFinite(value) && value > 0)

const publicRoot = path.resolve('public')

function toPublicPath(filePath) {
  return `/${path.relative(publicRoot, filePath).replaceAll('\\', '/')}`
}

async function getFrameSet(profile) {
  const profileDir = path.join(root, profile)
  const files = (await readdir(profileDir))
    .filter((file) => /\.(avif|webp|jpg|png)$/i.test(file))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))

  if (files.length === 0) {
    return null
  }

  const first = files[0]
  const match = first.match(/^(.*?)(\d+)\.(avif|webp|jpg|png)$/i)

  if (!match) {
    throw new Error(`Invalid frame naming in ${profileDir}: ${first}`)
  }

  const prefix = match[1]
  const extension = match[3].toLowerCase()
  const startIndex = Number(match[2])
  const expectedDigits = match[2].length
  let totalBytes = 0

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    const expectedIndex = startIndex + index
    const expectedSuffix = `${prefix}${String(expectedIndex).padStart(expectedDigits, '0')}.${extension}`

    if (file !== expectedSuffix) {
      throw new Error(`Missing or invalid frame sequence in ${profileDir}. Expected "${expectedSuffix}" but found "${file}".`)
    }

    totalBytes += (await stat(path.join(profileDir, file))).size
  }

  const metadata = await sharp(path.join(profileDir, first)).metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error(`Cannot read frame dimensions for ${path.join(profileDir, first)}`)
  }

  return {
    basePath: toPublicPath(profileDir),
    estimatedTotalBytes: totalBytes,
    extension,
    filenamePattern: `${prefix}{index}`,
    frameCount: files.length,
    height: metadata.height,
    profile,
    startIndex,
    width: metadata.width,
  }
}

const posterPath = path.join(root, 'poster.webp')
const fallbackPath = path.join(root, 'fallback.webp')
const posterMeta = await sharp(posterPath).metadata()

if (!posterMeta.width || !posterMeta.height) {
  throw new Error('Poster dimensions are required.')
}

const sets = (await Promise.all(['desktop', 'tablet', 'mobile'].map((profile) => getFrameSet(profile)))).filter(Boolean)

if (sets.length === 0) {
  throw new Error(`No frame sets found in ${root}`)
}

const manifest = {
  aspectRatio: Number((posterMeta.width / posterMeta.height).toFixed(10)),
  fallbackImage: toPublicPath(fallbackPath),
  id,
  loop: false,
  ownershipConfirmed,
  poster: toPublicPath(posterPath),
  preloadRadius,
  priorityFrames,
  publicationApproved,
  reducedMotionDisabled,
  sets,
  title,
}

await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Sequence manifest written to ${output}`)
