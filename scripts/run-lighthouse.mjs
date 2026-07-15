import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { spawn } from 'node:child_process'

import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'

const root = process.cwd()
const previewPort = Number(process.env.LIGHTHOUSE_PORT ?? '4173')
const previewOrigin = `http://127.0.0.1:${previewPort}`
const outputDir = path.resolve(root, '.tmp-qa/lighthouse')
const summaryPath = path.join(outputDir, 'summary.json')

if (!existsSync(path.resolve(root, 'dist/index.html'))) {
  throw new Error('dist/index.html is required. Run npm run build before qa:lighthouse.')
}

mkdirSync(outputDir, { recursive: true })

async function canReach(url) {
  try {
    const response = await fetch(url)
    return response.ok
  } catch {
    return false
  }
}

function startPreview() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(previewPort), '--strictPort'], {
    cwd: root,
    shell: true,
    stdio: 'ignore',
  })
}

async function waitForPreview(url) {
  const attempts = 60

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (await canReach(url)) {
      return true
    }

    await delay(1_000)
  }

  return false
}

async function safeKill(processLike) {
  if (!processLike) {
    return
  }

  try {
    await processLike.kill()
  } catch (error) {
    console.warn(`Warning: failed to close Chrome cleanly (${error instanceof Error ? error.message : String(error)}).`)
  }
}

const ownedPreview = !(await canReach(previewOrigin))
const previewProcess = ownedPreview ? startPreview() : null

if (!(await waitForPreview(previewOrigin))) {
  if (previewProcess) {
    previewProcess.kill()
  }

  throw new Error(`Preview server did not respond on ${previewOrigin}.`)
}

const routes = [
  { id: 'home', path: '/' },
  { id: 'contact', path: '/#contacto' },
  { id: 'privacy', path: '/legal/privacidad' },
  { id: 'not-found', path: '/404-suberos-check' },
]

const profiles = [
  {
    id: 'mobile',
    config: undefined,
    settings: {
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        disabled: false,
      },
    },
  },
  {
    id: 'desktop',
    config: desktopConfig,
    settings: {
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
        disabled: false,
      },
    },
  },
]

const runs = []

for (const profile of profiles) {
  const chrome = await launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    for (const route of routes) {
      const targetUrl = `${previewOrigin}${route.path}`
      const runnerResult = await lighthouse(
        targetUrl,
        {
          port: chrome.port,
          logLevel: 'error',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          disableStorageReset: false,
          ...profile.settings,
        },
        profile.config,
      )

      const report = JSON.parse(runnerResult.report)
      const categories = report.categories
      const audits = report.audits

      runs.push({
        profile: profile.id,
        route: route.id,
        url: targetUrl,
        scores: {
          performance: categories.performance.score,
          accessibility: categories.accessibility.score,
          bestPractices: categories['best-practices'].score,
          seo: categories.seo.score,
        },
        metrics: {
          lcpMs: audits['largest-contentful-paint'].numericValue,
          cls: audits['cumulative-layout-shift'].numericValue,
          tbtMs: audits['total-blocking-time'].numericValue,
          speedIndexMs: audits['speed-index'].numericValue,
          fcpMs: audits['first-contentful-paint'].numericValue,
          interactiveMs: audits.interactive.numericValue,
        },
      })
    }
  } finally {
    await safeKill(chrome)
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  previewOrigin,
  runs,
}

writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

if (previewProcess) {
  previewProcess.kill()
}

console.log(`Lighthouse summary written to ${path.relative(root, summaryPath)}`)

for (const run of runs) {
  const readout = [
    `${run.profile}/${run.route}`,
    `P ${Math.round(run.scores.performance * 100)}`,
    `A ${Math.round(run.scores.accessibility * 100)}`,
    `BP ${Math.round(run.scores.bestPractices * 100)}`,
    `SEO ${Math.round(run.scores.seo * 100)}`,
    `LCP ${Math.round(run.metrics.lcpMs)}ms`,
    `CLS ${run.metrics.cls.toFixed(3)}`,
    `TBT ${Math.round(run.metrics.tbtMs)}ms`,
  ]

  console.log(`- ${readout.join(' | ')}`)
}

const summaryJson = JSON.parse(await readFile(summaryPath, 'utf8'))
if (!summaryJson.runs.length) {
  throw new Error('Lighthouse did not record any runs.')
}
