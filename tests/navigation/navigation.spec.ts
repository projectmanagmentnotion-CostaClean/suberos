import { expect, test } from '@playwright/test'

import { expectMetadata, expectNoOverflow, gotoReduced, gotoRoute, qaViewports } from '../helpers/runtime'

test('skip link sends focus to main content', async ({ page }) => {
  await gotoRoute(page, '/')

  const skipLink = page.locator('a[href="#main-content"]').first()
  await skipLink.focus()
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()

  await skipLink.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('desktop navigation keeps real anchors and no placeholder hrefs', async ({ page }) => {
  await page.setViewportSize(qaViewports.desktop)
  await gotoReduced(page)

  await expect(page.locator('[data-qa="desktop-nav"]')).toBeVisible()

  const hrefs = await page.locator('a[href]').evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))
  expect(hrefs.some((href) => href.trim() === '#')).toBeFalsy()
})

test('mobile menu traps focus, closes with Escape and restores trigger focus', async ({ page }) => {
  await page.setViewportSize(qaViewports.mobile)
  await gotoReduced(page)

  const menuButton = page.getByRole('button', { name: 'Abrir menu principal' })
  await menuButton.focus()
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog', { name: 'Menu principal movil' })
  const closeButton = dialog.getByRole('button', { name: 'Cerrar menu principal' })

  await expect(closeButton).toBeFocused()
  await expect(page.locator('#main-content')).toHaveJSProperty('inert', true)

  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press('Tab')
  }

  const focusInsideDialog = await page.evaluate(
    () => document.activeElement instanceof HTMLElement && document.activeElement.closest('[role="dialog"]') !== null,
  )
  expect(focusInsideDialog).toBeTruthy()

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(menuButton).toBeFocused()
})

test('mobile menu closes when a navigation link is activated', async ({ page }) => {
  await page.setViewportSize(qaViewports.mobile)
  await gotoReduced(page)

  await page.getByRole('button', { name: /abrir menu principal/i }).click()
  const dialog = page.getByRole('dialog', { name: 'Menu principal movil' })
  await dialog.getByRole('link', { name: 'Servicios' }).click()

  await expect(dialog).toHaveCount(0)
  await expect(page).toHaveURL(/#servicios$/)
})

test('legal routes, history navigation and 404 restore metadata correctly', async ({ page }) => {
  await gotoRoute(page, '/legal/privacidad')
  await expectMetadata(page, {
    title: /privacidad provisional/i,
    robots: 'noindex,nofollow',
    canonical: 'https://suberos.com/legal/privacidad',
  })

  await page.goto('/ruta-inexistente', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1, name: /no encontramos esta pagina/i })).toBeVisible()
  await expectMetadata(page, {
    title: /Pagina no encontrada/,
    robots: 'noindex,nofollow',
    canonical: null,
  })

  await page.goBack({ waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1, name: /privacidad/i })).toBeFocused()
  await page.goForward({ waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1, name: /no encontramos esta pagina/i })).toBeFocused()

  await page.getByRole('link', { name: /ir al inicio/i }).click()
  await expectMetadata(page, {
    title: /SUBEROS - Estudio creativo/,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    canonical: 'https://suberos.com/',
  })
  await expectNoOverflow(page)
})
