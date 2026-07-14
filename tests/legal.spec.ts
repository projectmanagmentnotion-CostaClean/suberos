import { expect, test } from '@playwright/test'

const legalRoutes = [
  '/legal/aviso-legal',
  '/legal/privacidad',
  '/legal/cookies',
  '/legal/accesibilidad',
]

for (const route of legalRoutes) {
  test(`legal route ${route} renders with noindex and footer links`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' })

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow')
    const footer = page.getByRole('contentinfo')
    await expect(footer.getByRole('link', { name: 'Aviso legal' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Privacidad' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Cookies' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Accesibilidad' })).toBeVisible()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBeFalsy()
  })
}
