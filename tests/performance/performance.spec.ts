import { expect, test } from '@playwright/test'

import { gotoReduced, gotoRoute, qaViewports } from '../helpers/runtime'

test('home keeps the LCP candidate visible without loading labs in the initial route', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (request) => {
    requests.push(request.url())
  })

  await gotoReduced(page)

  await expect(page.locator('[data-qa="home-lcp"]')).toBeVisible()
  await expect(page.locator('h1')).toBeVisible()
  expect(requests.some((url) => /PortfolioLabPage|SequenceLabPage|MotionLabPage/.test(url))).toBeFalsy()
})

test('asset failure mode exits the preloader and still reveals the home hero', async ({ page }) => {
  await gotoRoute(page, '/?preloader=1&asset-fail=1')
  await expect(page.locator('[data-preloader-root]')).toBeVisible()
  await expect(page.locator('[data-qa="home-lcp"]')).toBeVisible({ timeout: 10_000 })
  await expect(page.locator('[data-preloader-root]')).toHaveCount(0, { timeout: 12_000 })
  await expect(page.locator('[data-qa="hero-ready"]')).toBeVisible()
})

test('preloader appears on first session and is skipped on second load', async ({ page }) => {
  await page.setViewportSize(qaViewports.desktop)
  await gotoRoute(page, '/?preloader=reset')
  await expect(page.locator('[data-preloader-root]')).toBeVisible()
  await expect(page.locator('[data-preloader-root]')).toHaveCount(0, { timeout: 12_000 })

  await gotoRoute(page, '/')
  await expect(page.locator('[data-preloader-root]')).toHaveCount(0, { timeout: 12_000 })

  const sessionKeys = await page.evaluate(() => Object.keys(window.sessionStorage))
  expect(sessionKeys).toContain('suberos.preloader.seen.v1')
})
