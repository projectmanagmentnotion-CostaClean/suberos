import { expect, test } from '@playwright/test'

const allowedSessionKeys = new Set(['suberos.preloader.seen.v1'])

test('privacy runtime audit shows no trackers, cookies or contact persistence', async ({ page }) => {
  const requests: string[] = []

  page.on('request', (request) => {
    requests.push(request.url())
  })

  await page.goto('/?reduced-motion=1#contacto', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')
  await page.locator('#contacto').scrollIntoViewIfNeeded()
  await page.getByLabel('Nombre').fill('Marta Soler')
  await page.getByLabel('Correo electronico').fill('marta@example.com')
  await page.getByLabel('Proyecto o necesidad').fill(
    'Mensaje de prueba para confirmar que no se persiste contenido personal en el navegador.',
  )

  const storage = await page.evaluate(() => ({
    cookies: document.cookie,
    localStorageKeys: Object.keys(window.localStorage),
    sessionStorageKeys: Object.keys(window.sessionStorage),
    storedValues: {
      localStorage: Object.values(window.localStorage),
      sessionStorage: Object.values(window.sessionStorage),
    },
    externalScripts: Array.from(document.querySelectorAll('script[src]')).map((script) => script.getAttribute('src') ?? ''),
  }))

  expect(storage.cookies).toBe('')
  expect(storage.localStorageKeys).toEqual([])
  expect(storage.sessionStorageKeys.every((key) => allowedSessionKeys.has(key))).toBeTruthy()
  expect(storage.storedValues.localStorage.join(' ')).not.toContain('marta@example.com')
  expect(storage.storedValues.sessionStorage.join(' ')).not.toContain('marta@example.com')
  expect(storage.externalScripts.every((src) => !/^https?:\/\//.test(src))).toBeTruthy()
  const currentOrigin = new URL(page.url()).origin
  expect(requests.every((url) => new URL(url).origin === currentOrigin)).toBeTruthy()
})

test('contact values do not survive a reload through browser storage', async ({ page }) => {
  await page.goto('/?reduced-motion=1#contacto', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')
  await page.locator('#contacto').scrollIntoViewIfNeeded()
  await page.getByLabel('Nombre').fill('Marta Soler')
  await page.getByLabel('Correo electronico').fill('marta@example.com')
  await page.reload({ waitUntil: 'domcontentloaded' })

  await expect(page.getByLabel('Nombre')).toHaveValue('')
  await expect(page.getByLabel('Correo electronico')).toHaveValue('')
})
