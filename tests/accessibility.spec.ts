import { expect, test } from '@playwright/test'

const viewports = [
  { height: 844, name: 'mobile', width: 390 },
  { height: 1024, name: 'tablet', width: 768 },
  { height: 768, name: 'desktop', width: 1366 },
]

for (const viewport of viewports) {
  test(`home remains keyboard-safe at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/?reduced-motion=1', { waitUntil: 'domcontentloaded' })

    const skipLink = page.locator('a[href="#main-content"]').first()
    await skipLink.focus()
    await expect(skipLink).toBeFocused()

    await skipLink.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBeFalsy()
  })
}

test('preloader traps focus while the initial overlay is active', async ({ page }) => {
  await page.goto('/?preloader=reset', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('[data-preloader-root]')).toBeVisible()

  await page.keyboard.press('Tab')

  const focusInsidePreloader = await page.evaluate(
    () => document.activeElement instanceof HTMLElement && document.activeElement.closest('[data-preloader-root]') !== null,
  )

  expect(focusInsidePreloader).toBeTruthy()
})

test('mobile menu moves focus into the dialog and keeps it trapped', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?reduced-motion=1', { waitUntil: 'domcontentloaded' })

  const menuButton = page.getByRole('button', { name: 'Abrir menu principal' })
  await menuButton.focus()
  await expect(menuButton).toBeFocused()

  await page.keyboard.press('Enter')
  const drawerCloseButton = page.getByRole('dialog', { name: 'Menu principal movil' }).getByRole('button', {
    name: 'Cerrar menu principal',
  })
  await expect(drawerCloseButton).toBeFocused()

  const mainInert = await page.locator('#main-content').evaluate((element) => element.inert)
  expect(mainInert).toBeTruthy()

  for (let index = 0; index < 7; index += 1) {
    await page.keyboard.press('Tab')
  }

  const focusStillInsideDialog = await page.evaluate(
    () => document.activeElement instanceof HTMLElement && document.activeElement.closest('[role="dialog"]') !== null,
  )
  expect(focusStillInsideDialog).toBeTruthy()

  await page.keyboard.press('Escape')
  await expect(menuButton).toBeFocused()
})

test('non-home routes focus the primary heading on load', async ({ page }) => {
  await page.goto('/legal/accesibilidad', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1, name: 'Informacion de accesibilidad' })).toBeFocused()

  await page.goto('/?sequence-lab=1', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1, name: 'Sequence Lab' })).toBeFocused()
})

test('contact service field exposes its helper text through aria-describedby', async ({ page }) => {
  await page.goto('/?reduced-motion=1', { waitUntil: 'domcontentloaded' })
  await page.locator('#contacto').scrollIntoViewIfNeeded()

  await expect(page.locator('#contact-service')).toHaveAttribute('aria-describedby', /contact-hint-service/)
})
