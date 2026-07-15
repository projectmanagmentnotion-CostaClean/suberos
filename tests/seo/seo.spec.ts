import { expect, test } from '@playwright/test'

import { expectMetadata, gotoQaStatic, gotoRoute } from '../helpers/runtime'

test('home metadata exposes canonical, social tags and parseable json-ld at runtime', async ({ page }) => {
  await gotoRoute(page, '/')

  await expectMetadata(page, {
    title: /SUBEROS - Estudio creativo/,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    canonical: 'https://suberos.com/',
  })
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/site.webmanifest')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /estudio creativo que conecta fotografia, diseno, produccion e interaccion web/i,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://suberos.com/branding/suberos-social-card.png',
  )
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    'https://suberos.com/branding/suberos-social-card.png',
  )
  await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute('href', /suberos-icon-32\.png/)

  const jsonLd = await page.locator('#suberos-jsonld').textContent()
  expect(jsonLd).not.toBeNull()
  const parsed = JSON.parse(jsonLd ?? '[]')
  expect(Array.isArray(parsed)).toBeTruthy()
  expect(parsed.some((entry: { '@type'?: string }) => entry['@type'] === 'Organization')).toBeTruthy()
})

test('labs, qa-static and 404 remain noindex and home metadata restores correctly', async ({ page }) => {
  await gotoRoute(page, '/?motion-lab=1')
  await expectMetadata(page, {
    title: /Motion Lab/,
    robots: 'noindex,nofollow',
    canonical: null,
  })

  await gotoQaStatic(page, '/')
  await expectMetadata(page, {
    title: /SUBEROS - Estudio creativo/,
    robots: 'noindex,nofollow',
    canonical: null,
  })
  await expect(page.locator('#suberos-jsonld')).toHaveCount(0)

  await gotoRoute(page, '/esto-no-existe')
  await expectMetadata(page, {
    title: /Pagina no encontrada/,
    robots: 'noindex,nofollow',
    canonical: null,
  })

  await gotoRoute(page, '/')
  await expectMetadata(page, {
    title: /SUBEROS - Estudio creativo/,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    canonical: 'https://suberos.com/',
  })
})
