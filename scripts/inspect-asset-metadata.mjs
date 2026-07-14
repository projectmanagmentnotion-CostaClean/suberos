import { stat } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const input = process.argv[2]

if (!input) {
  console.error('Usage: node scripts/inspect-asset-metadata.mjs <relative-or-absolute-file>')
  process.exit(1)
}

const resolved = path.resolve(input)
const fileStat = await stat(resolved)
const metadata = await sharp(resolved).metadata()

console.log(
  JSON.stringify(
    {
      file: resolved,
      format: metadata.format ?? null,
      width: metadata.width ?? null,
      height: metadata.height ?? null,
      bytes: fileStat.size,
      density: metadata.density ?? null,
      hasAlpha: metadata.hasAlpha ?? null,
    },
    null,
    2,
  ),
)
