import { expect, test } from '@playwright/test'

import { collectConsoleIssues, gotoQaStatic, gotoReduced, gotoRoute, qaViewports } from '../helpers/runtime'

test('public immersive sequence sits after services and before work', async ({ page }) => {
  await page.setViewportSize(qaViewports.desktop)
  await gotoQaStatic(page, '/')

  const order = await page.locator('[data-qa="section-services"], [data-qa="section-sequence-narrative"], [data-qa="section-work"]').evaluateAll(
    (elements) => elements.map((element) => element.getAttribute('data-qa')),
  )

  expect(order).toEqual(['section-services', 'section-sequence-narrative', 'section-work'])
})

test('public immersive sequence advances and reverses without console errors', async ({ page }) => {
  const consoleIssues = collectConsoleIssues(page)

  await page.setViewportSize(qaViewports.desktop)
  await gotoRoute(page, '/')

  const scene = page.locator('.sequence-narrative .frame-sequence-scene')
  await scene.scrollIntoViewIfNeeded()

  const initialFrame = await scene.getAttribute('data-sequence-frame')

  await page.mouse.wheel(0, 1600)
  await expect
    .poll(async () => await scene.getAttribute('data-sequence-frame'))
    .not.toBe(initialFrame)

  const advancedFrame = await scene.getAttribute('data-sequence-frame')
  expect(Number(advancedFrame)).toBeGreaterThan(Number(initialFrame))

  await page.mouse.wheel(0, -1600)
  await expect
    .poll(async () => Number((await scene.getAttribute('data-sequence-frame')) ?? '0'))
    .toBeLessThanOrEqual(Number(advancedFrame))

  await expect
    .poll(async () => await scene.getAttribute('data-sequence-phase'))
    .not.toBe('error')
  expect(
    consoleIssues.filter(
      (issue) =>
        !/AbortError|signal is aborted without reason|NetworkError when attempting to fetch resource|FrameSequenceLoader\.ts/u.test(
          issue,
        ),
    ),
  ).toEqual([])
})

test('public immersive sequence falls back correctly in reduced motion and on mobile', async ({ page }) => {
  await page.setViewportSize(qaViewports.mobile)
  await gotoRoute(page, '/')

  const mobileScene = page.locator('.sequence-narrative .frame-sequence-scene')
  await mobileScene.scrollIntoViewIfNeeded()
  await expect(mobileScene).toHaveAttribute('data-sequence-profile', /mobile|tablet/)

  await page.setViewportSize(qaViewports.desktop)
  await gotoReduced(page)

  const reducedScene = page.locator('.sequence-narrative .frame-sequence-scene')
  await reducedScene.scrollIntoViewIfNeeded()
  await expect(reducedScene).toHaveAttribute('data-sequence-phase', 'fallback')
})
