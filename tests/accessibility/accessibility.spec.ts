import { expect, test } from '@playwright/test'

import { expectNoCriticalA11yViolations } from '../helpers/accessibility'
import { expectNoOverflow, gotoContact, gotoReduced, gotoRoute, qaViewports, smokeViewports } from '../helpers/runtime'

for (const viewport of smokeViewports) {
  test(`home remains keyboard-safe at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await gotoReduced(page)

    const skipLink = page.locator('a[href="#main-content"]').first()
    await skipLink.focus()
    await expect(skipLink).toBeFocused()

    await skipLink.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()
    await expectNoOverflow(page)
  })
}

test('home passes axe without serious or critical violations', async ({ page }) => {
  await gotoReduced(page)
  await expectNoCriticalA11yViolations(page)
})

test('contact section passes axe without serious or critical violations', async ({ page }) => {
  await gotoContact(page)
  await expectNoCriticalA11yViolations(page)
})

test('legal accessibility route passes axe and focuses the H1', async ({ page }) => {
  await gotoRoute(page, '/legal/accesibilidad')
  await expect(page.getByRole('heading', { level: 1, name: 'Informacion de accesibilidad' })).toBeFocused()
  await expectNoCriticalA11yViolations(page)
})

test('preloader traps focus while the initial overlay is active', async ({ page }) => {
  await gotoRoute(page, '/?preloader=reset')
  await expect(page.locator('[data-preloader-root]')).toBeVisible()
  await page.keyboard.press('Tab')

  const focusInsidePreloader = await page.evaluate(
    () => document.activeElement instanceof HTMLElement && document.activeElement.closest('[data-preloader-root]') !== null,
  )

  expect(focusInsidePreloader).toBeTruthy()
})

test('mobile menu moves focus into the dialog and keeps it trapped', async ({ page }) => {
  await page.setViewportSize(qaViewports.mobile)
  await gotoReduced(page)

  const menuButton = page.getByRole('button', { name: 'Abrir menu principal' })
  await menuButton.focus()
  await page.keyboard.press('Enter')

  const drawerCloseButton = page.getByRole('dialog', { name: 'Menu principal movil' }).getByRole('button', {
    name: 'Cerrar menu principal',
  })
  await expect(drawerCloseButton).toBeFocused()

  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press('Tab')
  }

  const focusInsideDialog = await page.evaluate(
    () => document.activeElement instanceof HTMLElement && document.activeElement.closest('[role="dialog"]') !== null,
  )
  expect(focusInsideDialog).toBeTruthy()

  await page.keyboard.press('Escape')
  await expect(menuButton).toBeFocused()
})

test('non-home routes focus the primary heading on load', async ({ page }) => {
  await gotoRoute(page, '/legal/accesibilidad')
  await expect(page.getByRole('heading', { level: 1, name: 'Informacion de accesibilidad' })).toBeFocused()

  await gotoRoute(page, '/?sequence-lab=1')
  await expect(page.getByRole('heading', { level: 1, name: 'Sequence Lab' })).toBeFocused()
})

test('contact service field exposes its helper text through aria-describedby', async ({ page }) => {
  await gotoContact(page)
  await expect(page.locator('#contact-service')).toHaveAttribute('aria-describedby', /contact-hint-service/)
})
