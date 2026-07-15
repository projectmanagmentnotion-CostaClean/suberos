import { expect, test } from '@playwright/test'

import { collectConsoleIssues, expectNoOverflow, gotoReduced, gotoRoute, smokeViewports } from '../helpers/runtime'

for (const viewport of smokeViewports) {
  test(`home keeps the public baseline stable at ${viewport.name}`, async ({ page }) => {
    const consoleIssues = collectConsoleIssues(page)

    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await gotoRoute(page, '/')

    await expect(page).toHaveTitle(/SUBEROS/)
    await expect(page.locator('[data-qa="hero-ready"]')).toBeVisible()
    await expect(page.locator('[data-qa="section-work"]')).toBeVisible()
    await expect(page.locator('[data-qa="site-footer"]')).toBeVisible()

    if (viewport.width >= 1366) {
      await expect(page.locator('[data-qa="desktop-nav"]')).toBeVisible()
    } else {
      await expect(page.getByRole('button', { name: /abrir menu principal/i })).toBeVisible()
    }

    await expect(page.locator('body')).not.toContainText('Luxury Shisha')
    await expectNoOverflow(page)
    expect(consoleIssues).toEqual([])
  })
}

test('home supports reduced motion without runtime errors', async ({ page }) => {
  const consoleIssues = collectConsoleIssues(page)

  await gotoReduced(page)

  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('[data-qa="contact-form"]')).toBeVisible()
  await expectNoOverflow(page)
  expect(consoleIssues).toEqual([])
})

test('home assets render without broken images', async ({ page }) => {
  await gotoRoute(page, '/')

  const imageHealth = await page.locator('img').evaluateAll((images) =>
    images.map((image) => ({
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      src: image.getAttribute('src'),
    })),
  )

  expect(imageHealth.every((image) => image.complete && image.naturalWidth > 0)).toBeTruthy()
})
