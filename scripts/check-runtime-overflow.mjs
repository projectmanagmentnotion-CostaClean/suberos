import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'

const repoRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const reportDir = path.join(repoRoot, 'artifacts', 'reports', 'overflow')
const outputJsonPath = path.join(reportDir, 'overflow-report.json')
const baseUrl = process.env.SUBEROS_OVERFLOW_URL ?? 'http://127.0.0.1:5173/?qa-static=1'

const scenarios = [
  { route: '/', selector: '#inicio', viewport: { width: 390, height: 844 }, label: 'home-mobile-390x844' },
  { route: '/', selector: '#trabajo', viewport: { width: 390, height: 844 }, label: 'work-mobile-390x844' },
  { route: '/', selector: '#proceso', viewport: { width: 390, height: 844 }, label: 'process-mobile-390x844' },
  { route: '/', selector: '#contacto', viewport: { width: 390, height: 844 }, label: 'contact-mobile-390x844' },
  { route: '/', selector: '#trabajo', viewport: { width: 768, height: 1024 }, label: 'work-tablet-768x1024' },
  { route: '/', selector: '#proceso', viewport: { width: 768, height: 1024 }, label: 'process-tablet-768x1024' },
  { route: '/', selector: '#contacto', viewport: { width: 768, height: 1024 }, label: 'contact-tablet-768x1024' },
  { route: '/', selector: '#trabajo', viewport: { width: 1366, height: 768 }, label: 'work-desktop-1366x768' },
  { route: '/', selector: '#proceso', viewport: { width: 1366, height: 768 }, label: 'process-desktop-1366x768' },
  { route: '/', selector: '#contacto', viewport: { width: 1366, height: 768 }, label: 'contact-desktop-1366x768' },
]

await fs.mkdir(reportDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const findings = []

for (const scenario of scenarios) {
  await page.setViewportSize(scenario.viewport)
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)
  await page.locator(scenario.selector).evaluate((element) => element.scrollIntoView({ block: 'start' }))
  await page.waitForTimeout(150)

  const evaluation = await page.evaluate(({ selector, label }) => {
    const root = document.querySelector(selector)
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const offenders = Array.from(document.querySelectorAll('body *'))
      .map((element) => {
        const rect = element.getBoundingClientRect()
        const className = typeof element.className === 'string' ? element.className : ''
        const qa = element.getAttribute('data-qa')
        const text = (element.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 120)

        return {
          selector,
          routeLabel: label,
          tag: element.tagName.toLowerCase(),
          className,
          dataQa: qa,
          text,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          scrollWidth: element.scrollWidth,
        }
      })
      .filter((item) => item.width > viewportWidth + 1 || item.left < -1 || item.right > viewportWidth + 1)
      .slice(0, 25)

    return {
      routeLabel: label,
      selector,
      hasRoot: Boolean(root),
      viewportWidth,
      viewportHeight,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      offenders,
    }
  }, { selector: scenario.selector, label: scenario.label })

  if (!evaluation.hasRoot) {
    findings.push({
      ...evaluation,
      severity: 'error',
      reason: 'Section selector was not found.',
    })
    continue
  }

  if (evaluation.horizontalOverflow || evaluation.offenders.length > 0) {
    const screenshotPath = path.join(reportDir, `${scenario.label}.png`)
    await page.screenshot({ path: screenshotPath, fullPage: false })
    findings.push({
      ...evaluation,
      severity: evaluation.horizontalOverflow ? 'error' : 'warning',
      screenshot: path.relative(repoRoot, screenshotPath).split(path.sep).join('/'),
    })
  }
}

await browser.close()
await fs.writeFile(outputJsonPath, `${JSON.stringify(findings, null, 2)}\n`, 'utf8')

if (findings.length > 0) {
  console.error(JSON.stringify({ status: 'failed', findings, output: path.relative(repoRoot, outputJsonPath) }, null, 2))
  process.exit(1)
}

console.log(
  JSON.stringify(
    {
      status: 'ok',
      scenarios: scenarios.length,
      output: path.relative(repoRoot, outputJsonPath).split(path.sep).join('/'),
    },
    null,
    2,
  ),
)
