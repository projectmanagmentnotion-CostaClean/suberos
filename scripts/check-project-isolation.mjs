import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const repoRoot = process.cwd()

const scanTargets = [
  'README.md',
  'index.html',
  'public/robots.txt',
  'public/sitemap.xml',
  'src',
  'docs/ASSET_PIPELINE.md',
  'docs/APP_SHELL.md',
  'docs/HERO_SYSTEM.md',
  'docs/HOME_NARRATIVE.md',
  'docs/HOME_SCENES.md',
  'docs/MOTION_QA.md',
  'docs/PROJECT_CONTENT_MODEL.md',
  'docs/ROADMAP.md',
]

const allowedUrlPatterns = [
  /^https:\/\/suberos\.com(?:\/|$)/i,
  /^https:\/\/schema\.org(?:\/|$)/i,
  /^http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9$/i,
]

const forbiddenMatchers = [
  {
    pattern: /\bLuxury Shisha\b/i,
    reason: 'Public repo content cannot expose the removed external project.',
  },
  {
    pattern: /https?:\/\/suberos\.com\/shisha\/?/i,
    reason: 'The external shisha route must not appear in public-facing source or current docs.',
  },
  {
    pattern: /(?:^|[^\w])\/shisha\/?(?:[^\w]|$)/i,
    reason: 'Legacy shisha path leaked into current content.',
  },
  {
    pattern: /\bshisha-landing\b/i,
    reason: 'Legacy project metadata leaked into current content.',
  },
  {
    pattern: /\bmalcriadobcn\b/i,
    reason: 'Detected unrelated domain or client reference.',
  },
  {
    pattern: /\bcostaclean\b/i,
    reason: 'Detected unrelated project reference.',
  },
  {
    pattern: /\bridaos\b/i,
    reason: 'Detected unrelated project reference.',
  },
  {
    pattern: /\bprojectmanagmentnotion\b/i,
    reason: 'Detected repository-owner leakage into public docs or source.',
  },
]

async function collectFiles(target) {
  const targetPath = path.join(repoRoot, target)
  const targetStat = await stat(targetPath)

  if (targetStat.isFile()) {
    return [targetPath]
  }

  const files = []
  const entries = await readdir(targetPath, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(targetPath, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path.relative(repoRoot, entryPath))))
      continue
    }

    files.push(entryPath)
  }

  return files
}

function getLineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length
}

function collectUrls(text) {
  return text.match(/https?:\/\/[^\s)"'`<>]+/gi) ?? []
}

async function main() {
  const files = []

  for (const target of scanTargets) {
    files.push(...(await collectFiles(target)))
  }

  const failures = []

  for (const filePath of files) {
    const relativePath = path.relative(repoRoot, filePath).replaceAll('\\', '/')
    const content = await readFile(filePath, 'utf8')

    for (const matcher of forbiddenMatchers) {
      const match = matcher.pattern.exec(content)
      if (!match) {
        continue
      }

      failures.push({
        file: relativePath,
        line: getLineNumber(content, match.index),
        detail: matcher.reason,
        value: match[0],
      })
    }

    for (const url of collectUrls(content)) {
      const isAllowed = allowedUrlPatterns.some((pattern) => pattern.test(url))

      if (isAllowed) {
        continue
      }

      failures.push({
        file: relativePath,
        line: getLineNumber(content, content.indexOf(url)),
        detail: 'Found an external URL outside the approved technical allowlist.',
        value: url,
      })
    }
  }

  if (failures.length > 0) {
    console.error('Project isolation check failed.\n')

    for (const failure of failures) {
      console.error(`- ${failure.file}:${failure.line} -> ${failure.detail}`)
      console.error(`  ${failure.value}`)
    }

    process.exit(1)
  }

  console.log('Project isolation check passed.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
