import { expect, test } from '@playwright/test'

import { collectConsoleIssues, expectMetadata, expectNoOverflow, gotoReduced, gotoRoute, qaViewports, waitForTextToChange } from '../helpers/runtime'

test('portfolio lab remains internal, noindex and restores home metadata on exit', async ({ page, request }) => {
  const consoleIssues = collectConsoleIssues(page)

  await page.setViewportSize(qaViewports.desktop)
  await gotoRoute(page, '/?portfolio-lab=1')

  await expect(page.locator('[data-qa="portfolio-lab-page"]')).toBeVisible()
  await expect(page.locator('header nav')).not.toContainText('Portfolio Lab')
  await expect(page.locator('text=No portfolio items loaded')).toBeVisible()
  await expect(page.locator('text=Published items').locator('..')).toContainText('0')
  await expectMetadata(page, {
    title: /Portfolio Lab/,
    robots: 'noindex,nofollow',
    canonical: null,
  })

  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')
  expect(await robots.text()).not.toContain('portfolio-lab')
  expect(await sitemap.text()).not.toContain('portfolio-lab')

  await gotoRoute(page, '/')
  await expectMetadata(page, {
    title: /SUBEROS - Estudio creativo/,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    canonical: 'https://suberos.com/',
  })
  await expectNoOverflow(page)
  expect(consoleIssues).toEqual([])
})

test('sequence lab keeps internal metadata and responds to scroll, reduced motion and asset fallback', async ({ page, request }) => {
  const consoleIssues = collectConsoleIssues(page)

  await page.setViewportSize(qaViewports.desktop)
  await gotoRoute(page, '/?sequence-lab=1')

  const framePanel = page.locator('[data-qa="sequence-debug"]')
  await expect(page.locator('[data-qa="sequence-lab-page"]')).toBeVisible()
  await expect(page.locator('[data-qa="frame-sequence-media"]')).toBeVisible()
  await expect(framePanel).toContainText('Phase')
  await expectMetadata(page, {
    title: /Sequence Lab/,
    robots: 'noindex,nofollow',
    canonical: null,
  })

  const before = await framePanel.textContent()
  await page.locator('#sequence-lab-scene').scrollIntoViewIfNeeded()
  await page.mouse.wheel(0, 1800)
  await waitForTextToChange(framePanel, before)

  await gotoReduced(page, '/?sequence-lab=1')
  await expect(framePanel).toContainText('Fallback')
  await expect(framePanel).toContainText('off')

  await gotoRoute(page, '/?sequence-lab=1&asset-fail=1')
  await expect(framePanel).toContainText('error')
  await expect(framePanel).toContainText('yes')

  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')
  expect(await robots.text()).not.toContain('sequence-lab')
  expect(await sitemap.text()).not.toContain('sequence-lab')
  expect(
    consoleIssues.filter(
      (issue) =>
        !/AbortError|signal is aborted without reason|NetworkError when attempting to fetch resource|access control checks|FrameSequenceLoader\.ts/u.test(
          issue,
        ),
    ),
  ).toEqual([])
})

test('motion lab stays internal, supports reduced motion and restores metadata on exit', async ({ page }) => {
  const consoleIssues = collectConsoleIssues(page)

  await page.setViewportSize(qaViewports.desktop)
  await gotoRoute(page, '/?motion-lab=1')

  await expect(page.locator('[data-qa="motion-lab-page"]')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1, name: 'Motion Lab' })).toBeVisible()
  await expectMetadata(page, {
    title: /Motion Lab/,
    robots: 'noindex,nofollow',
    canonical: null,
  })

  await gotoReduced(page, '/?motion-lab=1')
  await expect(page.locator('[data-qa="motion-lab-page"]')).toBeVisible()

  await gotoRoute(page, '/')
  await expectMetadata(page, {
    title: /SUBEROS - Estudio creativo/,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    canonical: 'https://suberos.com/',
  })
  expect(consoleIssues).toEqual([])
})
