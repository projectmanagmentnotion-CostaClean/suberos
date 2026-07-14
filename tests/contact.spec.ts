import { expect, test } from '@playwright/test'

const contactViewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 768 },
]

async function collectConsoleIssues(page: Parameters<typeof test>[0]['page']) {
  const consoleIssues: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleIssues.push(msg.text())
    }
  })
  page.on('pageerror', (error) => {
    consoleIssues.push(String(error))
  })

  return consoleIssues
}

async function gotoContact(page: Parameters<typeof test>[0]['page']) {
  await page.goto('/?reduced-motion=1', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')
  await expect(page.locator('#contacto')).toBeVisible()
  await page.locator('#contacto').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-qa="contact-form"]')).toBeVisible()
}

async function fillValidContactForm(page: Parameters<typeof test>[0]['page']) {
  await page.locator('[data-qa="contact-name"]').fill('Marta Soler')
  await page.locator('[data-qa="contact-email"]').fill('marta@example.com')
  await page.locator('[data-qa="contact-service"]').selectOption('branding')
  await page.locator('[data-qa="contact-message"]').fill(
    'Necesitamos renovar identidad visual y una web clara para una nueva etapa de marca.',
  )
}

async function enableContactQaScenario(page: Parameters<typeof test>[0]['page'], scenario: 'success' | 'error' | 'rate-limit' | 'timeout' | 'blocked') {
  await page.addInitScript((nextScenario) => {
    window.__SUBEROS_CONTACT_TEST_MODE__ = true
    window.__SUBEROS_CONTACT_TEST_SCENARIO__ = nextScenario
  }, scenario)
}

for (const viewport of contactViewports) {
  test(`contact form remains visible and accessible at ${viewport.name}`, async ({ page }) => {
    const consoleIssues = await collectConsoleIssues(page)

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

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBeFalsy()
    expect(consoleIssues).toEqual([])
  })
}

test('contact form shows required-field validation and focuses the first error', async ({ page }) => {
  await gotoContact(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.getByText('Introduce tu nombre.')).toBeVisible()
  await expect(page.getByText('Introduce un correo electronico.')).toBeVisible()
  await expect(page.getByText('Selecciona el tipo de proyecto o servicio.')).toBeVisible()
  await expect(page.getByText('Describe brevemente el proyecto.')).toBeVisible()
  await expect(page.locator('#contact-name')).toBeFocused()
})

test('contact form rejects an invalid email without losing content', async ({ page }) => {
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

test('contact form succeeds against the local mock endpoint only in QA mode', async ({ page }) => {
  await enableContactQaScenario(page, 'success')
  await gotoContact(page)
  await fillValidContactForm(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('Solicitud recibida')
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('entorno tecnico de SUBEROS')
  await expect(page).not.toHaveURL(/marta@example\.com|Marta/)
})

test('contact form shows a recoverable server error', async ({ page }) => {
  await enableContactQaScenario(page, 'error')
  await gotoContact(page)
  await fillValidContactForm(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('No hemos podido completar el envio')
  await expect(page.locator('[data-qa="contact-message"]')).toHaveValue(
    'Necesitamos renovar identidad visual y una web clara para una nueva etapa de marca.',
  )
})

test('contact form exposes rate limit feedback accessibly', async ({ page }) => {
  await enableContactQaScenario(page, 'rate-limit')
  await gotoContact(page)
  await fillValidContactForm(page)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('Envio temporalmente limitado')
  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('correo o telefono')
})

test('contact form prevents double submit while the request is in flight', async ({ page }) => {
  await enableContactQaScenario(page, 'timeout')

  let requestCount = 0
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().includes('/api/contact')) {
      requestCount += 1
    }
  })

  await gotoContact(page)
  await fillValidContactForm(page)

  const submitButton = page.locator('[data-qa="contact-submit"]')
  await submitButton.click()
  await expect(submitButton).toBeDisabled()
  await submitButton.click({ force: true })
  await page.waitForTimeout(600)
  expect(requestCount).toBe(1)
})

test('contact form reports offline errors without leaking data into the URL', async ({ page, context }) => {
  await enableContactQaScenario(page, 'success')
  await gotoContact(page)
  await fillValidContactForm(page)
  await context.setOffline(true)
  await page.locator('[data-qa="contact-submit"]').click()

  await expect(page.locator('[data-qa="contact-feedback"]')).toContainText('No hemos podido conectar')
  await expect(page).not.toHaveURL(/marta@example\.com|Marta/)
  await context.setOffline(false)
})

test('contact form keeps reduced motion and direct methods intact', async ({ page }) => {
  await gotoContact(page)

  await expect(page.getByRole('link', { name: /politica de privacidad/i })).toBeVisible()
  await expect(page.locator('.contact-alternatives').getByRole('link', { name: 'info@suberos.com' })).toHaveAttribute(
    'href',
    'mailto:info@suberos.com',
  )
  await expect(page.locator('.contact-alternatives').getByRole('link', { name: '691 93 72 72' })).toHaveAttribute(
    'href',
    'tel:+34691937272',
  )
})
