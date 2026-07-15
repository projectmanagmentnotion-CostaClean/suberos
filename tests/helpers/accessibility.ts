import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'

export async function expectNoCriticalA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze()
  const seriousViolations = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''))
  expect(seriousViolations).toEqual([])
}
