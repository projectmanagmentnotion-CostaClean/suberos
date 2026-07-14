import { expect, test } from '@playwright/test'

const labViewports = [
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

for (const viewport of labViewports) {
  test(`portfolio lab remains internal and noindex at ${viewport.name}`, async ({ page }) => {
    const consoleIssues = await collectConsoleIssues(page)

    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/?portfolio-lab=1')
    await expect(page).toHaveTitle(/Portfolio Lab/)
    await expect(page.getByRole('heading', { level: 1, name: 'Portfolio Lab' })).toBeVisible()
    await expect(page.locator('header nav')).not.toContainText('Portfolio Lab')
    await expect(page.locator('text=No portfolio items loaded')).toBeVisible()
    await expect(page.locator('text=Published items').locator('..')).toContainText('0')

    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    expect(robots).toBe('noindex,nofollow')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBeFalsy()
    expect(await page.locator('body').textContent()).not.toContain('Luxury Shisha')
    expect(consoleIssues).toEqual([])
  })
}

test('portfolio lab does not leak into robots or sitemap', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')

  expect(robots.ok()).toBeTruthy()
  expect(sitemap.ok()).toBeTruthy()
  expect(await robots.text()).not.toContain('portfolio-lab')
  expect(await sitemap.text()).not.toContain('portfolio-lab')
})

test('portfolio lab restores public robots when leaving the lab', async ({ page }) => {
  await page.goto('/?portfolio-lab=1')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow')

  await page.goto('/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  )
})
