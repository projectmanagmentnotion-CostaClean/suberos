import { expect, test } from '@playwright/test'

import {
  collectConsoleIssues,
  enableContactQaScenario,
  expectNoOverflow,
  fillValidContactForm,
  gotoContact,
  smokeViewports,
  waitForContactTimingWindow,
} from '../helpers/runtime'

for (const viewport of smokeViewports) {
  test(`contact form remains visible and accessible at ${viewport.name}`, async ({ page }) => {
    const consoleIssues = collectConsoleIssues(page)

    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await gotoContact(page)

    await expect(page.getByRole('heading', { level: 2, name: /cuentanos que necesitas/i })).toBeVisible()
    await expect(page.getByLabel('Nombre')).toBeVisible()
    await expect(page.getByLabel('Correo electronico')).toBeVisible()
    await expect(page.getByLabel('Tipo de proyecto o servicio')).toBeVisible()
    await expect(page.getByLabel('Proyecto o necesidad')).toBeVisible()
    await expect(page.getByRole('button', { name: /enviar solicitud/i })).toBeVisible()
    await expect(page.locator('.contact-alternatives').getByRole('link', { name: 'info@suberos.com' })).toBeVisible()
    await expect(page.locator('.contact-alternatives').getByRole('link', { name: '691 93 72 72' })).toBeVisible()

    await expectNoOverflow(page)
    expect(consoleIssues).toEqual([])
  })
}

test('contact form shows validation and focuses the first invalid field', async ({ page }) => {
  await gotoContact(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.getByText('Introduce tu nombre.')).toBeVisible()
  await expect(page.getByText('Introduce un correo electronico.')).toBeVisible()
  await expect(page.getByText('Selecciona el tipo de proyecto o servicio.')).toBeVisible()
  await expect(page.getByText('Describe brevemente el proyecto.')).toBeVisible()
  await expect(page.locator('#contact-name')).toBeFocused()
})

test('contact form rejects invalid email without losing the message content', async ({ page }) => {
  await gotoContact(page)
  await page.locator('[data-qa="contact-name"]').fill('Marta Soler')
  await page.locator('[data-qa="contact-email"]').fill('marta@')
  await page.locator('[data-qa="contact-service"]').selectOption('web-design-development')
  await page.locator('[data-qa="contact-message"]').fill(
    'Queremos rehacer la web y mejorar la forma de recibir solicitudes desde movil.',
  )
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.getByText('Introduce un correo electronico valido.')).toBeVisible()
  await expect(page.locator('[data-qa="contact-message"]')).toHaveValue(
    'Queremos rehacer la web y mejorar la forma de recibir solicitudes desde movil.',
  )
})

test('contact form stays honestly blocked outside QA mock mode', async ({ page }) => {
  await gotoContact(page)
  await fillValidContactForm(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-production-status"]')).toContainText(/canal online/i)
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('formulario online estara disponible proximamente')
  await expect(page).not.toHaveURL(/marta@example\.com|Marta/)
})

test('contact form succeeds against the QA mock endpoint only in explicit QA mode @qa-mock', async ({ page }) => {
  await enableContactQaScenario(page, 'success')
  await gotoContact(page)
  await fillValidContactForm(page)
  await waitForContactTimingWindow(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('Solicitud recibida')
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('entorno tecnico de SUBEROS')
})

test('contact form exposes a recoverable server error state @qa-mock', async ({ page }) => {
  await enableContactQaScenario(page, 'error')
  await gotoContact(page)
  await fillValidContactForm(page)
  await waitForContactTimingWindow(page)
  await page.locator('[data-qa="contact-submit"]').click()
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('No hemos podido completar el envio')
})

test('contact form exposes an accessible rate-limit state @qa-mock', async ({ page }) => {
  await enableContactQaScenario(page, 'rate-limit')
  await gotoContact(page)
  await fillValidContactForm(page)
  await waitForContactTimingWindow(page)
  await page.locator('[data-qa="contact-submit"]').click()
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('Envio temporalmente limitado')
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('correo o telefono')
})

test('contact form prevents double submit while the request is in flight @qa-mock', async ({ page }) => {
  await enableContactQaScenario(page, 'timeout')

  let requestCount = 0
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().includes('/api/contact')) {
      requestCount += 1
    }
  })

  await gotoContact(page)
  await fillValidContactForm(page)
  await waitForContactTimingWindow(page)

  const submitButton = page.locator('[data-qa="contact-submit"]')
  await submitButton.click()
  await expect(submitButton).toBeDisabled()
  await submitButton.click({ force: true })

  await expect.poll(() => requestCount).toBe(1)
})

test('contact form reports offline errors without leaking data into the URL @qa-mock', async ({ page, context }) => {
  await enableContactQaScenario(page, 'success')
  await gotoContact(page)
  await fillValidContactForm(page)
  await waitForContactTimingWindow(page)
  await context.setOffline(true)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('No hemos podido conectar')
  await expect(page).not.toHaveURL(/marta@example\.com|Marta/)
  await context.setOffline(false)
})

test('contact runtime stores no personal data, cookies or external trackers', async ({ page }) => {
  const requests: string[] = []

  page.on('request', (request) => {
    requests.push(request.url())
  })

  await gotoContact(page)
  await page.getByLabel('Nombre').fill('Marta Soler')
  await page.getByLabel('Correo electronico').fill('marta@example.com')
  await page.getByLabel('Proyecto o necesidad').fill(
    'Mensaje de prueba para confirmar que no se persiste contenido personal en el navegador.',
  )

  const storage = await page.evaluate(() => ({
    cookies: document.cookie,
    externalScripts: Array.from(document.querySelectorAll('script[src]')).map((script) => script.getAttribute('src') ?? ''),
    localStorageKeys: Object.keys(window.localStorage),
    sessionStorageKeys: Object.keys(window.sessionStorage),
    storedValues: {
      localStorage: Object.values(window.localStorage),
      sessionStorage: Object.values(window.sessionStorage),
    },
  }))

  expect(storage.cookies).toBe('')
  expect(storage.localStorageKeys).toEqual([])
  expect(storage.sessionStorageKeys.every((key) => key === 'suberos.preloader.seen.v1')).toBeTruthy()
  expect(storage.storedValues.localStorage.join(' ')).not.toContain('marta@example.com')
  expect(storage.storedValues.sessionStorage.join(' ')).not.toContain('marta@example.com')
  expect(storage.externalScripts.every((src) => !/^https?:\/\//.test(src))).toBeTruthy()

  const currentOrigin = new URL(page.url()).origin
  expect(requests.every((url) => new URL(url).origin === currentOrigin)).toBeTruthy()
})

test('contact values do not persist after reload', async ({ page }) => {
  await gotoContact(page)
  await page.getByLabel('Nombre').fill('Marta Soler')
  await page.getByLabel('Correo electronico').fill('marta@example.com')
  await page.reload({ waitUntil: 'domcontentloaded' })

  await expect(page.getByLabel('Nombre')).toHaveValue('')
  await expect(page.getByLabel('Correo electronico')).toHaveValue('')
})
