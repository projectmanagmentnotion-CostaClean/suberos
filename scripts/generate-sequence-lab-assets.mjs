import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const root = path.resolve('public/motion/lab/suberos-sequence-lab')
const logoPath = path.resolve('public/branding/suberos-logo-symbol.webp')
const logo = await readFile(logoPath)

const profiles = [
  { count: 36, height: 900, name: 'desktop', width: 1600 },
  { count: 28, height: 720, name: 'tablet', width: 1280 },
  { count: 24, height: 540, name: 'mobile', width: 960 },
]

function buildFrameSvg({ frame, frameCount, height, width }) {
  const progress = frame / Math.max(frameCount - 1, 1)
  const orbitX = 240 + Math.cos(progress * Math.PI * 2) * width * 0.14
  const orbitY = 220 + Math.sin(progress * Math.PI * 2) * height * 0.14
  const sweep = 120 + progress * (width - 240)
  const maskWidth = 220 + progress * width * 0.28
  const lineOpacity = (0.08 + progress * 0.16).toFixed(3)
  const frameLabel = String(frame + 1).padStart(4, '0')

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
          <stop stop-color="#080808" />
          <stop offset="0.55" stop-color="#111111" />
          <stop offset="1" stop-color="#020202" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${orbitX} ${orbitY}) rotate(90) scale(${height * 0.32} ${width * 0.26})">
          <stop stop-color="rgba(255,255,255,0.18)" />
          <stop offset="1" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#glow)"/>
      <g opacity="${lineOpacity}">
        <line x1="0" y1="${height * 0.28}" x2="${width}" y2="${height * 0.28}" stroke="#F2F2EE"/>
        <line x1="0" y1="${height * 0.68}" x2="${width}" y2="${height * 0.68}" stroke="#F2F2EE"/>
        <line x1="${width * 0.2}" y1="0" x2="${width * 0.2}" y2="${height}" stroke="#F2F2EE"/>
        <line x1="${width * 0.78}" y1="0" x2="${width * 0.78}" y2="${height}" stroke="#F2F2EE"/>
      </g>
      <rect x="${width * 0.12}" y="${height * 0.21}" width="${maskWidth}" height="${height * 0.46}" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
      <rect x="${width * 0.18}" y="${height * 0.78}" width="${sweep}" height="2" fill="#F2F2EE" opacity="0.7"/>
      <text x="${width * 0.16}" y="${height * 0.2}" fill="#F2F2EE" font-size="${Math.max(18, width * 0.014)}" letter-spacing="8">SEQUENCE LAB</text>
      <text x="${width * 0.16}" y="${height * 0.58}" fill="#F2F2EE" font-size="${Math.max(86, width * 0.09)}" font-weight="700">SUBEROS</text>
      <text x="${width * 0.16}" y="${height * 0.7}" fill="rgba(242,242,238,0.64)" font-size="${Math.max(22, width * 0.02)}" letter-spacing="4">CHARCOAL / TYPO / MASK / FRAME ${frameLabel}</text>
      <text x="${width * 0.84}" y="${height * 0.2}" fill="#F2F2EE" font-size="${Math.max(46, width * 0.048)}" text-anchor="end">${frameLabel}</text>
    </svg>
  `
}

for (const profile of profiles) {
  const profileDir = path.join(root, profile.name)
  await mkdir(profileDir, { recursive: true })

  for (let frame = 0; frame < profile.count; frame += 1) {
    const svg = buildFrameSvg({
      frame,
      frameCount: profile.count,
      height: profile.height,
      width: profile.width,
    })

    const overlayScale = profile.width / 1600
    const overlayWidth = Math.round(300 * overlayScale)
    const overlayHeight = Math.round(311 * overlayScale)
    const overlayLeft = Math.round(profile.width * 0.62)
    const overlayTop = Math.round(profile.height * 0.18 + Math.sin((frame / profile.count) * Math.PI * 2) * 28)

    const output = path.join(profileDir, `frame-${String(frame + 1).padStart(4, '0')}.webp`)

    await sharp(Buffer.from(svg))
      .composite([
        {
          input: await sharp(logo).resize(overlayWidth, overlayHeight).webp({ quality: 72 }).toBuffer(),
          left: overlayLeft,
          top: overlayTop,
        },
      ])
      .webp({ quality: 72 })
      .toFile(output)
  }
}

const posterFrame = path.join(root, 'desktop/frame-0008.webp')
const fallbackFrame = path.join(root, 'mobile/frame-0003.webp')

await sharp(posterFrame).resize(1600, 900).webp({ quality: 74 }).toFile(path.join(root, 'poster.webp'))
await sharp(fallbackFrame).resize(1200, 675).webp({ quality: 74 }).toFile(path.join(root, 'fallback.webp'))

await writeFile(
  path.join(root, 'README.txt'),
  [
    'SUBEROS Sequence Lab assets',
    'Generated locally for Sprint 07.',
    'Abstract owned sequence built from local brand materials and procedural SVG layers.',
  ].join('\n'),
)

console.log(`Sequence lab assets generated in ${root}`)
