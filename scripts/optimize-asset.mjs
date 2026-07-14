import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const args = new Map()

for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index]
  const value = process.argv[index + 1]
  args.set(key, value)
}

const input = args.get('--input')
const output = args.get('--output')
const format = args.get('--format') ?? 'webp'
const width = args.get('--width')
const height = args.get('--height')

if (!input || !output) {
  console.error('Usage: node scripts/optimize-asset.mjs --input <file> --output <file> [--format webp|avif|png] [--width n] [--height n]')
  process.exit(1)
}

const transformer = sharp(path.resolve(input), { animated: false }).rotate().withMetadata(false)

if (width || height) {
  transformer.resize({
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
    fit: 'inside',
    withoutEnlargement: true,
  })
}

if (format === 'avif') {
  transformer.avif({ quality: 60 })
} else if (format === 'png') {
  transformer.png()
} else {
  transformer.webp({ quality: 72 })
}

await mkdir(path.dirname(path.resolve(output)), { recursive: true })
await transformer.toFile(path.resolve(output))
console.log(`Optimized asset written to ${path.resolve(output)}`)
