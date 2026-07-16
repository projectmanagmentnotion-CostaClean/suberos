import { expect, test } from '@playwright/test'

import { enableContactQaScenario, gotoQaStatic, gotoRoute, qaViewports } from '../helpers/runtime'

test.describe('visual regression baselines', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Visual baselines run only on Chromium.')

  test('preloader first session remains visually stable', async ({ page }) => {
    await page.setViewportSize(qaViewports.desktop)
    await gotoRoute(page, '/?preloader=1&reduced-motion=1')
    await expect(page.locator('[data-preloader-root]')).toHaveScreenshot('preloader-first-session-desktop.png')
  })

  test('home sections keep stable baselines in qa-static mode', async ({ page }) => {
    await page.setViewportSize(qaViewports.wide)
    await gotoQaStatic(page, '/')

    await expect(page.locator('[data-qa="hero-ready"]')).toHaveScreenshot('home-hero-wide.png')
    await expect(page.locator('[data-qa="section-studio"]')).toHaveScreenshot('home-studio-wide.png')
    await expect(page.locator('[data-qa="section-services"]')).toHaveScreenshot('home-services-wide.png')
    await expect(page.locator('[data-qa="section-work"]')).toHaveScreenshot('home-work-wide.png')
    await expect(page.locator('[data-qa="section-process"]')).toHaveScreenshot('home-process-wide.png')
    await expect(page.locator('[data-qa="section-statement"]')).toHaveScreenshot('home-statement-wide.png')
    await expect(page.locator('[data-qa="section-contact"]')).toHaveScreenshot('home-contact-wide.png')
    await expect(page.locator('[data-qa="site-footer"]')).toHaveScreenshot('home-footer-wide.png')
  })

  test('mobile menu and reduced home states keep stable baselines', async ({ page }) => {
    await page.setViewportSize(qaViewports.mobile)
    await gotoQaStatic(page, '/')
    await expect(page).toHaveScreenshot('home-mobile-qa-static.png', { fullPage: true })

    await page.getByRole('button', { name: /abrir menu principal/i }).click()
    await expect(page.locator('[data-qa="mobile-menu"]')).toHaveScreenshot('mobile-menu-open.png')

    await gotoRoute(page, '/?reduced-motion=1')
    await expect(page).toHaveScreenshot('home-mobile-reduced.png', { fullPage: true })
  })

  test('legal views and 404 keep stable baselines', async ({ page }) => {
    await page.setViewportSize(qaViewports.tablet)

    for (const [path, name] of [
      ['/legal/aviso-legal', 'legal-aviso-tablet.png'],
      ['/legal/privacidad', 'legal-privacidad-tablet.png'],
      ['/legal/cookies', 'legal-cookies-tablet.png'],
      ['/legal/accesibilidad', 'legal-accesibilidad-tablet.png'],
      ['/ruta-inexistente', 'not-found-tablet.png'],
    ] as const) {
      await gotoQaStatic(page, path)
      await expect(page).toHaveScreenshot(name, { fullPage: true })
    }
  })

  test('contact default state keeps a stable baseline in tablet QA mode', async ({ page }) => {
    await page.setViewportSize(qaViewports.tablet)

    await gotoQaStatic(page, '/#contacto')
    await page.locator('#contacto').scrollIntoViewIfNeeded()
    await expect(page.locator('[data-qa="section-contact"]')).toHaveScreenshot('contact-default-tablet.png')
  })

  test('contact success state keeps a stable baseline in tablet QA mode', async ({ page }) => {
    await page.setViewportSize(qaViewports.tablet)
    await enableContactQaScenario(page, 'success')
    await gotoRoute(page, '/?qa-static=1&reduced-motion=1#contacto')
    await page.locator('#contacto').scrollIntoViewIfNeeded()
    await page.locator('[data-qa="contact-name"]').fill('Marta Soler')
    await page.locator('[data-qa="contact-email"]').fill('marta@example.com')
    await page.locator('[data-qa="contact-service"]').selectOption('branding')
    await page.locator('[data-qa="contact-message"]').fill('Solicitud de prueba para baseline visual de exito.')
    await page.locator('[data-qa="contact-submit"]').click()
    await expect(page.locator('.contact-form-panel')).toHaveScreenshot('contact-success-tablet.png')
  })

  test('contact error state keeps a stable baseline in tablet QA mode', async ({ page }) => {
    await page.setViewportSize(qaViewports.tablet)
    await enableContactQaScenario(page, 'error')
    await gotoRoute(page, '/?qa-static=1&reduced-motion=1#contacto')
    await page.locator('#contacto').scrollIntoViewIfNeeded()
    await page.locator('[data-qa="contact-name"]').fill('Marta Soler')
    await page.locator('[data-qa="contact-email"]').fill('marta@example.com')
    await page.locator('[data-qa="contact-service"]').selectOption('branding')
    await page.locator('[data-qa="contact-message"]').fill('Solicitud de prueba para baseline visual de error.')
    await page.locator('[data-qa="contact-submit"]').click()
    await expect(page.locator('.contact-form-panel')).toHaveScreenshot('contact-error-tablet.png')
  })

  test('contact rate-limit state keeps a stable baseline in tablet QA mode', async ({ page }) => {
    await page.setViewportSize(qaViewports.tablet)
    await enableContactQaScenario(page, 'rate-limit')
    await gotoRoute(page, '/?qa-static=1&reduced-motion=1#contacto')
    await page.locator('#contacto').scrollIntoViewIfNeeded()
    await page.locator('[data-qa="contact-name"]').fill('Marta Soler')
    await page.locator('[data-qa="contact-email"]').fill('marta@example.com')
    await page.locator('[data-qa="contact-service"]').selectOption('branding')
    await page.locator('[data-qa="contact-message"]').fill('Solicitud de prueba para baseline visual de rate limit.')
    await page.locator('[data-qa="contact-submit"]').click()
    await expect(page.locator('.contact-form-panel')).toHaveScreenshot('contact-rate-limit-tablet.png')
  })

  test('labs and sequence fallback states keep stable baselines', async ({ page }) => {
    await page.setViewportSize(qaViewports.desktop)

    await gotoQaStatic(page, '/?portfolio-lab=1')
    await expect(page).toHaveScreenshot('portfolio-lab-desktop.png', { fullPage: true })

    await gotoQaStatic(page, '/?sequence-lab=1')
    await expect(page).toHaveScreenshot('sequence-lab-desktop.png', { fullPage: true })

    await gotoRoute(page, '/?sequence-lab=1&asset-fail=1&qa-static=1')
    await expect(page).toHaveScreenshot('sequence-lab-asset-fail-desktop.png', { fullPage: true })

    await gotoQaStatic(page, '/?motion-lab=1')
    await expect(page).toHaveScreenshot('motion-lab-desktop.png', { fullPage: true })
  })
})
