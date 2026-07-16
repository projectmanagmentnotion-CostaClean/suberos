import { expect, test } from '@playwright/test'

import { gotoReduced } from '../helpers/runtime'

const mobileNavigationViewports = [
  { height: 568, name: '320x568', width: 320 },
  { height: 800, name: '360x800', width: 360 },
  { height: 812, name: '375x812', width: 375 },
  { height: 844, name: '390x844', width: 390 },
  { height: 915, name: '412x915', width: 412 },
  { height: 390, name: '844x390', width: 844 },
  { height: 412, name: '915x412', width: 915 },
] as const

for (const viewport of mobileNavigationViewports) {
  test(`mobile menu opens, locks background and closes cleanly at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await gotoReduced(page)

    const menuButton = page.locator('.site-header__menu-button')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    const beforeScroll = await page.evaluate(() => window.scrollY)
    await menuButton.click()

    const dialog = page.getByRole('dialog', { name: 'Menu principal movil' })
    await expect(dialog).toBeVisible()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('body')).toHaveCSS('position', 'fixed')

    await dialog.getByRole('button', { name: 'Cerrar menu principal' }).click()
    await expect(dialog).toHaveCount(0)
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('body')).not.toHaveCSS('position', 'fixed')
    await expect
      .poll(async () => page.evaluate(() => window.scrollY))
      .toBe(beforeScroll)
  })
}

test('mobile menu closes on overlay click and remains absent after resize to desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoReduced(page)

  await page.getByRole('button', { name: /abrir menu principal/i }).click()
  await page.locator('.menu-drawer__overlay').click({ force: true })
  await expect(page.getByRole('dialog', { name: 'Menu principal movil' })).toHaveCount(0)

  await page.getByRole('button', { name: /abrir menu principal/i }).click()
  await expect(page.getByRole('dialog', { name: 'Menu principal movil' })).toBeVisible()
  await page.setViewportSize({ width: 1366, height: 768 })
  await expect(page.getByRole('dialog', { name: 'Menu principal movil' })).toHaveCount(0)
  await expect(page.locator('[data-qa="desktop-nav"]')).toBeVisible()
})
