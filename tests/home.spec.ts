import { expect, test } from '@playwright/test'

const homeViewports = [
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

for (const viewport of homeViewports) {
  test(`home keeps public narrative stable at ${viewport.name}`, async ({ page }) => {
    const consoleIssues = await collectConsoleIssues(page)

    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/')
    await expect(page).toHaveTitle(/SUBEROS/)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('#trabajo')).toBeVisible()

    if (viewport.width >= 1366) {
      await expect(page.locator('header nav a[href="#trabajo"]')).toBeVisible()
    } else {
      await expect(page.getByRole('button', { name: /abrir menu principal/i })).toBeVisible()
    }

    await expect(page.locator('body')).not.toContainText('Luxury Shisha')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBeFalsy()
    expect(consoleIssues).toEqual([])
  })
}

test('home supports reduced motion query without console errors', async ({ page }) => {
  const consoleIssues = await collectConsoleIssues(page)

  await page.goto('/?reduced-motion=1')
  await expect(page.locator('h1')).toHaveCount(1)

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBeFalsy()
  expect(consoleIssues).toEqual([])
})

test('home keyboard access exposes skip link and real anchors', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')

  const skipLink = page.locator('a[href="#main-content"]').first()
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()

  await skipLink.press('Enter')
  await expect(page.locator('#main-content')).toBeVisible()
})

test('home image assets render without broken media', async ({ page }) => {
  await page.goto('/')

  const imageHealth = await page.locator('img').evaluateAll((images) =>
    images.map((image) => ({
      src: image.getAttribute('src'),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    })),
  )

  expect(imageHealth.every((image) => image.complete && image.naturalWidth > 0)).toBeTruthy()
})
