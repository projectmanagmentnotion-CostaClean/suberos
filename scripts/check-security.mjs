import { existsSync, readFileSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const failures = []
const warnings = []

const requiredHeaders = [
  'X-Content-Type-Options "nosniff"',
  'Referrer-Policy "strict-origin-when-cross-origin"',
  'X-Frame-Options "DENY"',
  'Cross-Origin-Opener-Policy "same-origin"',
  'Cross-Origin-Resource-Policy "same-origin"',
  'Content-Security-Policy "default-src \'self\'',
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
]

const publicSensitiveExtensions = new Set(['.zip', '.sql', '.bak', '.log', '.pem', '.key', '.env'])
const productionSourceRoots = ['src', 'index.html']
const allowedProductionMarkers = ['https://suberos.com', 'https://schema.org']
const localhostAllowList = new Set([
  'src/features/contact/contact.constants.ts',
  'src/features/contact/contact.service.ts',
])
const distForbiddenMarkers = [
  { label: 'localhost', pattern: /\blocalhost\b|\b127\.0\.0\.1\b/u },
  { label: 'contact QA globals', pattern: /__SUBEROS_CONTACT_TEST_(?:MODE|SCENARIO)__/u },
  { label: 'contact QA query flag', pattern: /contact-debug/u },
  { label: 'contact mock port', pattern: /\b8787\b/u },
  { label: 'inline source map', pattern: /sourceMappingURL=data:/u },
]

function read(relativePath) {
  return readFileSync(path.resolve(root, relativePath), 'utf8')
}

async function walk(relativePath) {
  const absolutePath = path.resolve(root, relativePath)
  const entries = await readdir(absolutePath, { withFileTypes: true })
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

function scanText(relativePath, source) {
  const lowered = source.toLowerCase()

  if (lowered.includes('unsafe-eval')) {
    failures.push(`${relativePath}: CSP or runtime references unsafe-eval.`)
  }

  if (lowered.includes('<script src="http://') || lowered.includes('<script src="https://')) {
    failures.push(`${relativePath}: remote script tag detected.`)
  }

  if (lowered.includes('<iframe')) {
    warnings.push(`${relativePath}: iframe markup present, verify it remains intentional.`)
  }
}

const htaccess = read('public/.htaccess')
for (const marker of requiredHeaders) {
  if (!htaccess.includes(marker)) {
    failures.push(`public/.htaccess is missing required security header rule: ${marker}`)
  }
}

if (htaccess.includes('unsafe-eval')) {
  failures.push('public/.htaccess must not allow unsafe-eval in CSP.')
}

const contactConstants = read('src/features/contact/contact.constants.ts')
const companyProfile = read('src/data/companyProfile.ts')
const contactEndpoint = read('public/api/contact.php')
const formEnabledInProfile =
  companyProfile.includes('endpointEnabled: true') &&
  companyProfile.includes('El formulario online de SUBEROS ya esta activo')
const endpointSecurityMarkers = [
  'Reply-To:',
  'SUBEROS_CONTACT_RATE_LIMIT_MAX_REQUESTS',
  'SUBEROS_CONTACT_MIN_SUBMIT_DELAY_MS',
  "reason' => 'rate-limited'",
  'mail(',
]

if (!formEnabledInProfile || !contactConstants.includes('runtimeStatus.form.endpointEnabled')) {
  failures.push('Public contact endpoint must be enabled in the published runtime state.')
}

for (const marker of endpointSecurityMarkers) {
  if (!contactEndpoint.includes(marker)) {
    failures.push(`public/api/contact.php is missing required contact security marker: ${marker}`)
  }
}

const envCandidates = ['.env', '.env.production', '.env.local']
for (const candidate of envCandidates) {
  if (existsSync(path.resolve(root, candidate))) {
    warnings.push(`${candidate}: local environment file present in workspace. Confirm it stays untracked.`)
  }
}

for (const relativePath of productionSourceRoots) {
  const absolutePath = path.resolve(root, relativePath)
  const fileStat = await stat(absolutePath)

  if (fileStat.isDirectory()) {
    const files = await walk(relativePath)

    for (const file of files) {
      if (!/\.(?:ts|tsx|js|jsx|css|html|svg|json|txt|xml|webmanifest)$/u.test(file)) {
        continue
      }

      const source = read(file)
      scanText(file, source)

      const lowered = source.toLowerCase()
      const normalizedFile = file.replace(/\\/gu, '/')
      if ((lowered.includes('localhost') || lowered.includes('127.0.0.1')) && !localhostAllowList.has(normalizedFile)) {
        failures.push(`${file}: localhost reference found in production source.`)
      }
    }

    continue
  }

  const source = readFileSync(absolutePath, 'utf8')
  scanText(relativePath, source)
}

const publicFiles = await walk('public')
for (const relativePath of publicFiles) {
  const extension = path.extname(relativePath).toLowerCase()
  const fileStat = await stat(path.resolve(root, relativePath))

  if (publicSensitiveExtensions.has(extension)) {
    failures.push(`${relativePath}: sensitive file type must not be public.`)
  }

  if (fileStat.size > 0 && /\.(?:html|txt|xml|svg|css|js|json|webmanifest|php)$/u.test(relativePath)) {
    scanText(relativePath, read(relativePath))
  }
}

if (existsSync(path.resolve(root, 'dist'))) {
  const distFiles = await walk('dist')
  for (const relativePath of distFiles) {
    if (!/\.(?:html|js|css|txt|xml|json|webmanifest|svg)$/u.test(relativePath)) {
      continue
    }

    const source = read(relativePath)
    for (const marker of distForbiddenMarkers) {
      if (marker.pattern.test(source)) {
        failures.push(`${relativePath}: forbidden ${marker.label} marker leaked into dist.`)
      }
    }

    scanText(relativePath, source)
  }
} else {
  warnings.push('dist/: build output not found, so bundle leak checks were skipped.')
}

const indexHtml = read('index.html')
const externalMatches = indexHtml.match(/https:\/\/[^"'\s)]+/gu) ?? []
for (const value of externalMatches) {
  if (!allowedProductionMarkers.some((allowed) => value.startsWith(allowed))) {
    warnings.push(`index.html: external URL found (${value}). Confirm it is required and self-hosted where possible.`)
  }
}

if (failures.length > 0) {
  console.error('Security checks failed.\n')
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

console.log('Security checks passed.')

if (warnings.length > 0) {
  console.log('\nWarnings:')
  for (const warning of warnings) {
    console.log(`- ${warning}`)
  }
}
