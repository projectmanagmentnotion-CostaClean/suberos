import { expect, test } from '@playwright/test'

import { gotoReduced, gotoRoute, qaViewports } from '../helpers/runtime'

test('all hash links point to existing ids and no placeholder href is published', async ({ page }) => {
  await page.setViewportSize(qaViewports.desktop)
  await gotoReduced(page)

  const hrefs = await page.locator('a[href]').evaluateAll((links) =>
    links.map((link) => ({
      href: link.getAttribute('href') ?? '',
      text: link.textContent?.trim() ?? '',
    })),
  )

  for (const { href } of hrefs) {
    expect(href.trim()).not.toBe('#')
  }

  const hashHrefs = hrefs
    .map(({ href }) => href)
    .filter((href) => href.startsWith('/#'))

  for (const href of hashHrefs) {
    const targetId = href.replace('/#', '')
    await expect(page.locator(`#${targetId}`).first()).toBeAttached()
  }
})

test('service CTAs navigate to the correct work discipline targets', async ({ page }) => {
  await page.setViewportSize(qaViewports.desktop)
  await gotoReduced(page)

  const expectations = [
    { label: 'Ver fotografia en trabajo', hash: '#fotografia', active: 'Fotografia' },
    { label: 'Ver branding en trabajo', hash: '#branding', active: 'Branding' },
    { label: 'Ver produccion en trabajo', hash: '#produccion', active: 'Produccion' },
    { label: 'Ver web en trabajo', hash: '#web', active: 'Web' },
  ] as const

  for (const item of expectations) {
    await gotoReduced(page)
    await page.getByRole('link', { name: item.label }).click()
    await expect(page).toHaveURL(new RegExp(`${item.hash}$`))
    await expect(page.locator(`[data-work-control="${item.hash.slice(1)}"]`)).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('.work-details__title')).toHaveText(item.active)
  }
})

test('legal, navigation and footer links resolve without placeholder actions', async ({ page }) => {
  await page.setViewportSize(qaViewports.desktop)
  await gotoRoute(page, '/')

  for (const href of [
    '/legal/aviso-legal',
    '/legal/privacidad',
    '/legal/cookies',
    '/legal/accesibilidad',
  ] as const) {
    await page.locator(`a[href="${href}"]`).first().click()
    await expect(page).toHaveURL(/\/legal\//)
    await page.goBack({ waitUntil: 'domcontentloaded' })
  }
})
