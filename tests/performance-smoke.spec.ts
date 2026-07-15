import { expect, test } from '@playwright/test'

test('home keeps the LCP candidate visible without waiting for motion labs', async ({ page }) => {
  await page.goto('/?reduced-motion=1', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('[data-qa="home-lcp"]')).toBeVisible()
  await expect(page.locator('h1')).toBeVisible()
})

test('asset failure mode exits the preloader and still reveals the home hero', async ({ page }) => {
  await page.goto('/?preloader=1&asset-fail=1', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('[data-preloader-root]')).toBeVisible()
  await expect(page.locator('[data-qa="home-lcp"]')).toBeVisible({ timeout: 10_000 })
  await expect(page.locator('[data-preloader-root]')).toHaveCount(0, { timeout: 12_000 })
  await expect(page.locator('h1')).toBeVisible()
})

test('mobile menu still responds under reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?reduced-motion=1', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: /abrir menu principal/i }).click()
  await expect(page.getByRole('dialog', { name: 'Menu principal movil' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Menu principal movil' })).toHaveCount(0)
})

test('contact form remains responsive after navigating to the home anchor', async ({ page }) => {
  await page.goto('/?reduced-motion=1#contacto', { waitUntil: 'domcontentloaded' })
  await page.locator('#contacto').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-qa="contact-form"]')).toBeVisible()
  await expect(page.locator('[data-qa="contact-submit"]')).toBeEnabled()
})
