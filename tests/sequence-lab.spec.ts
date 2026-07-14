import { expect, test } from '@playwright/test'

const sequenceViewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1366, height: 768 },
]

async function collectConsoleIssues(page: Parameters<typeof test>[0]['page']) {
  const consoleIssues: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleIssues.push(msg.text())
    }
  })
  page.on('pageerror', (error) => {
    consoleIssues.push(String(error))
  })

  return consoleIssues
}

for (const viewport of sequenceViewports) {
  test(`sequence lab stays internal at ${viewport.name}`, async ({ page }) => {
    const consoleIssues = await collectConsoleIssues(page)

    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/?sequence-lab=1', { waitUntil: 'domcontentloaded' })
    await page.waitForLoadState('domcontentloaded')

    await expect(page).toHaveTitle(/Sequence Lab/)
    await expect(page.getByRole('heading', { level: 1, name: 'Sequence Lab' })).toBeVisible()
    await expect(page.locator('header nav')).not.toContainText('Sequence Lab')
    await expect(page.locator('[data-qa="frame-sequence-media"]')).toBeVisible()
    await expect(page.locator('[data-qa="sequence-debug"]')).toContainText('Phase')

    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    expect(robots).toBe('noindex,nofollow')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBeFalsy()
    expect(consoleIssues).toEqual([])
  })
}

test('sequence lab progresses frames with scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 })
  await page.goto('/?sequence-lab=1', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')

  const framePanel = page.locator('[data-qa="sequence-debug"]')
  await expect(framePanel).toContainText('Frame')

  const before = await framePanel.textContent()
  await page.locator('#sequence-lab-scene').scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.4, behavior: 'instant' }))
  await page.waitForTimeout(400)
  await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.4, behavior: 'instant' }))
  await page.waitForTimeout(400)
  const after = await framePanel.textContent()

  expect(before).not.toEqual(after)
})

test('sequence lab reduced motion avoids active canvas work', async ({ page }) => {
  await page.goto('/?sequence-lab=1&reduced-motion=1', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')
  await expect(page.locator('#sequence-lab-root')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1, name: 'Sequence Lab' })).toBeVisible()
  await expect(page.locator('[data-qa="sequence-debug"]')).toBeVisible()
  await expect(page.locator('[data-qa="sequence-debug"]')).toContainText('Fallback')
  await expect(page.locator('[data-qa="sequence-debug"]')).toContainText('off')
})

test('sequence lab asset failure falls back safely', async ({ page }) => {
  await page.goto('/?sequence-lab=1&asset-fail=1', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')
  await expect(page.locator('[data-qa="sequence-debug"]')).toContainText('error')
  await expect(page.locator('[data-qa="sequence-debug"]')).toContainText('yes')
})

test('sequence lab does not leak into robots or sitemap', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')

  expect(await robots.text()).not.toContain('sequence-lab')
  expect(await sitemap.text()).not.toContain('sequence-lab')
})

test('sequence lab restores robots after leaving the lab', async ({ page }) => {
  await page.goto('/?sequence-lab=1', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow')

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  )
})
