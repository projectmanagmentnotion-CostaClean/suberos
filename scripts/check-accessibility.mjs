import { spawn } from 'node:child_process'

import AxeBuilder from '@axe-core/playwright'
import { chromium } from 'playwright'

const port = Number(process.env.PLAYWRIGHT_PORT ?? String(4500 + (process.pid % 200)))
const baseUrl = `http://127.0.0.1:${port}`

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForHttpOk(url, attempts = 120) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url)

      if (response.ok) {
        return
      }
    } catch {
      // Retry until the dev server is ready.
    }

    await wait(1000)
  }

  throw new Error(`Timed out waiting for ${url}`)
}

function startDevServer() {
  if (process.platform === 'win32') {
    return spawn('cmd.exe', ['/d', '/s', '/c', `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort`], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        BROWSER: 'none',
      },
      stdio: 'inherit',
    })
  }

  return spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      BROWSER: 'none',
    },
    stdio: 'inherit',
  })
}

function formatViolation(violation) {
  return `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`
}

async function run() {
  const server = startDevServer()

  try {
    await waitForHttpOk(`${baseUrl}/`)

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()
    const checks = [
      { route: '/?reduced-motion=1', label: 'home reduced-motion' },
      { route: '/legal/accesibilidad', label: 'legal accessibility page' },
      { route: '/?sequence-lab=1', label: 'sequence lab' },
    ]
    const failures = []

    for (const check of checks) {
      await page.goto(`${baseUrl}${check.route}`, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor({ state: 'visible', timeout: 30000 })

      const result = await new AxeBuilder({ page }).analyze()

      if (result.violations.length > 0) {
        failures.push(`${check.label}\n${result.violations.map((violation) => `  - ${formatViolation(violation)}`).join('\n')}`)
      }
    }

    await browser.close()

    if (failures.length > 0) {
      throw new Error(`Axe accessibility audit failed:\n${failures.join('\n')}`)
    }

    console.log(`Axe accessibility audit passed across ${checks.length} routes.`)
  } finally {
    server.kill()
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
