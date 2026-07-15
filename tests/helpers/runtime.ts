import { expect, type Locator, type Page } from '@playwright/test'

declare global {
  interface Window {
    __SUBEROS_CONTACT_TEST_MODE__?: boolean
    __SUBEROS_CONTACT_TEST_SCENARIO__?: string
  }
}

export const qaViewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1366, height: 768 },
  wide: { width: 1440, height: 900 },
  landscape: { width: 844, height: 390 },
} as const

export const smokeViewports = [
  { name: 'mobile', ...qaViewports.mobile },
  { name: 'tablet', ...qaViewports.tablet },
  { name: 'desktop', ...qaViewports.desktop },
] as const

export const legalRoutes = [
  '/legal/aviso-legal',
  '/legal/privacidad',
  '/legal/cookies',
  '/legal/accesibilidad',
] as const

export type ContactScenario = 'success' | 'error' | 'rate-limit' | 'timeout' | 'blocked'

export function collectConsoleIssues(page: Page) {
  const consoleIssues: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleIssues.push(message.text())
    }
  })

  page.on('pageerror', (error) => {
    consoleIssues.push(String(error))
  })

  return consoleIssues
}

export async function expectNoOverflow(page: Page) {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(hasOverflow).toBeFalsy()
}

export async function gotoRoute(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('domcontentloaded')
}

function appendQueryFlag(path: string, flag: string) {
  const [withoutHash, hash = ''] = path.split('#')
  const separator = withoutHash.includes('?') ? '&' : '?'
  return `${withoutHash}${separator}${flag}${hash ? `#${hash}` : ''}`
}

export async function gotoQaStatic(page: Page, path: string) {
  await gotoRoute(page, appendQueryFlag(path, 'qa-static=1'))
  await expect(page.locator('html')).toHaveAttribute('data-qa-static', 'true')
}

export async function gotoReduced(page: Page, path = '/') {
  await gotoRoute(page, appendQueryFlag(path, 'reduced-motion=1'))
}

export async function gotoContact(page: Page, path = '/?reduced-motion=1#contacto') {
  await gotoRoute(page, path)
  await page.locator('#contacto').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-qa="contact-form"]')).toBeVisible()
}

export async function fillValidContactForm(page: Page) {
  await page.locator('[data-qa="contact-name"]').fill('Marta Soler')
  await page.locator('[data-qa="contact-email"]').fill('marta@example.com')
  await page.locator('[data-qa="contact-service"]').selectOption('branding')
  await page.locator('[data-qa="contact-message"]').fill(
    'Necesitamos renovar identidad visual y una web clara para una nueva etapa de marca.',
  )
}

export async function waitForContactTimingWindow(page: Page, minimumDelayMs = 1_500) {
  await expect
    .poll(
      async () =>
        page.evaluate(() => {
          const input = document.querySelector<HTMLInputElement>('input[name="startedAt"]')
          return input ? Date.now() - Number(input.value) : 0
        }),
      {
        message: 'Expected contact anti-bot timing window to be satisfied before submitting the QA mock form.',
        timeout: 5_000,
      },
    )
    .toBeGreaterThan(minimumDelayMs)
}

export async function enableContactQaScenario(page: Page, scenario: ContactScenario) {
  await page.addInitScript((nextScenario: ContactScenario) => {
    window.__SUBEROS_CONTACT_TEST_MODE__ = true
    window.__SUBEROS_CONTACT_TEST_SCENARIO__ = nextScenario
  }, scenario)
}

export async function expectMetadata(page: Page, expected: { title?: RegExp | string; robots?: string; canonical?: string | null }) {
  if (expected.title) {
    await expect(page).toHaveTitle(expected.title)
  }

  if (expected.robots) {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', expected.robots)
  }

  if (expected.canonical === null) {
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
  } else if (expected.canonical) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', expected.canonical)
  }
}

export async function waitForTextToChange(locator: Locator, previousText: string | null) {
  await expect
    .poll(async () => locator.textContent(), {
      message: 'Expected the locator text to change after user interaction.',
      timeout: 8_000,
    })
    .not.toBe(previousText)
}
