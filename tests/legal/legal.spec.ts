import { expect, test } from '@playwright/test'

import { expectMetadata, expectNoOverflow, legalRoutes, qaViewports } from '../helpers/runtime'

for (const route of legalRoutes) {
  test(`legal route ${route} renders with noindex, focus and footer exits`, async ({ page }) => {
    await page.setViewportSize(qaViewports.tablet)
    await page.goto(route, { waitUntil: 'domcontentloaded' })

    await expect(page.locator('[data-qa="legal-page"]')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toBeFocused()
    await expect(page.locator('[data-qa="site-footer"]')).toBeVisible()
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Aviso legal' })).toBeVisible()
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Privacidad' })).toBeVisible()
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Cookies' })).toBeVisible()
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Accesibilidad' })).toBeVisible()
    await expectMetadata(page, {
      robots: 'noindex,nofollow',
      canonical: `https://suberos.com${route}`,
    })

    const bodyText = (await page.locator('[data-qa="legal-page"]').textContent()) ?? ''
    expect(bodyText.trim().length > 120).toBeTruthy()
    await expectNoOverflow(page)
  })
}
