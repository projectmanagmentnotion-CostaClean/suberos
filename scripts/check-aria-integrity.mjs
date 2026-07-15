import { spawn } from 'node:child_process'

import { chromium } from 'playwright'

const port = Number(process.env.PLAYWRIGHT_PORT ?? String(4300 + (process.pid % 200)))
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

function formatIssue(issue) {
  const suffix = issue.target ? ` [${issue.target}]` : ''
  return `${issue.type}: ${issue.message}${suffix}`
}

async function collectAriaIssues(page) {
  return page.evaluate(() => {
    const issues = []
    const ids = new Map()
    const refAttributes = ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'for']

    for (const element of document.querySelectorAll('[id]')) {
      const id = element.getAttribute('id')

      if (!id) {
        continue
      }

      ids.set(id, (ids.get(id) ?? 0) + 1)
    }

    for (const [id, count] of ids.entries()) {
      if (count > 1) {
        issues.push({
          message: `Duplicate id "${id}"`,
          target: `[id="${id}"]`,
          type: 'duplicate-id',
        })
      }
    }

    for (const element of document.querySelectorAll('*')) {
      for (const attribute of refAttributes) {
        const rawValue = element.getAttribute(attribute)

        if (!rawValue) {
          continue
        }

        const tokens = rawValue.split(/\s+/).filter(Boolean)

        for (const token of tokens) {
          if (!document.getElementById(token)) {
            issues.push({
              message: `Missing reference "${token}" in ${attribute}`,
              target: element.outerHTML.slice(0, 120),
              type: 'broken-reference',
            })
          }
        }
      }
    }

    const hiddenFocusable = Array.from(document.querySelectorAll('[aria-hidden="true"] a, [aria-hidden="true"] button, [aria-hidden="true"] input, [aria-hidden="true"] select, [aria-hidden="true"] textarea, [aria-hidden="true"] [tabindex]'))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) {
          return false
        }

        return element.tabIndex >= 0 && !element.hasAttribute('disabled')
      })
      .map((element) => ({
        message: 'Focusable element inside aria-hidden subtree',
        target: element.outerHTML.slice(0, 120),
        type: 'hidden-focusable',
      }))

    issues.push(...hiddenFocusable)

    return issues
  })
}

async function run() {
  const server = startDevServer()

  try {
    await waitForHttpOk(`${baseUrl}/`)

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()
    const routes = ['/?reduced-motion=1', '/legal/accesibilidad', '/?motion-lab=1', '/?portfolio-lab=1', '/?sequence-lab=1']
    const failures = []

    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' })
      const routeIssues = await collectAriaIssues(page)

      if (routeIssues.length > 0) {
        failures.push(`${route}\n${routeIssues.map((issue) => `  - ${formatIssue(issue)}`).join('\n')}`)
      }
    }

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${baseUrl}/?reduced-motion=1`, { waitUntil: 'domcontentloaded' })
    await page.getByRole('button', { name: 'Abrir menu principal' }).click()
    await page.waitForTimeout(100)

    const menuIssues = await collectAriaIssues(page)

    if (menuIssues.length > 0) {
      failures.push(`mobile menu\n${menuIssues.map((issue) => `  - ${formatIssue(issue)}`).join('\n')}`)
    }

    await browser.close()

    if (failures.length > 0) {
      throw new Error(`ARIA integrity failed:\n${failures.join('\n')}`)
    }

    console.log(`ARIA integrity passed across ${routes.length + 1} checked states.`)
  } finally {
    server.kill()
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
