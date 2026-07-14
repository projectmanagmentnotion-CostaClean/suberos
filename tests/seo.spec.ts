import { expect, test } from '@playwright/test'

test('home metadata exposes canonical, social tags and parseable json-ld', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await expect(page).toHaveTitle(/SUBEROS - Estudio creativo/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://suberos.com/')
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

  const jsonLd = await page.locator('#suberos-jsonld').textContent()
  expect(jsonLd).not.toBeNull()
  const parsed = JSON.parse(jsonLd ?? '[]')
  expect(Array.isArray(parsed)).toBeTruthy()
  expect(parsed.some((entry: { '@type'?: string }) => entry['@type'] === 'Organization')).toBeTruthy()
})

test('labs and 404 are noindex and metadata restores when returning home', async ({ page }) => {
  await page.goto('/?motion-lab=1', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveTitle(/Motion Lab/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow')

  await page.goto('/ruta-inexistente', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveTitle(/Pagina no encontrada/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow')

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveTitle(/SUBEROS - Estudio creativo/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  )
})

test('unknown route renders a professional 404 with real exits', async ({ page }) => {
  await page.goto('/esto-no-existe', { waitUntil: 'domcontentloaded' })

  await expect(page.getByRole('heading', { level: 1, name: /no encontramos esta pagina/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /ir al inicio/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /ver servicios/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /ir a contacto/i })).toBeVisible()
})
