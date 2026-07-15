# FUNCTIONAL_QA_SYSTEM

## Test architecture

```text
tests/
  accessibility/
  contact/
  helpers/
  labs/
  legal/
  navigation/
  performance/
  seo/
  smoke/
  visual/
```

## Helper strategy

- `tests/helpers/runtime.ts`
  - route helpers
  - viewport presets
  - metadata assertions
  - contact QA helpers
  - deterministic timing helper for the anti-bot contact mock
- `tests/helpers/accessibility.ts`
  - axe wrapper limited to serious and critical violations

## Command map

- `npm run qa:smoke`
  - fast Chromium smoke for public views, contact, legal, SEO, labs and performance
- `npm run qa:contact`
  - full contact suite with local mock server
- `npm run qa:privacy`
  - privacy and storage assertions
- `npm run qa:seo`
  - static SEO checks plus runtime metadata navigation
- `npm run qa:legal`
  - legal copy, noindex, canonical and footer exits
- `npm run qa:a11y`
  - keyboard, focus, axe and aria coverage
- `npm run qa:visual`
  - Chromium visual regression against stored baselines
- `npm run qa:cross-browser`
  - smoke matrix on Chromium, Firefox and WebKit
- `npm run qa:production`
  - build + dedicated preview + Chromium smoke
- `npm run qa:release`
  - full release gate

## Playwright runtime

- browser projects defined for Chromium, Firefox and WebKit
- default workers reduced to `6` to avoid local browser starvation on Windows
- default browser server mode: Vite dev
- configurable `PLAYWRIGHT_SERVER_MODE=dev|preview|none`
- optional contact mock via `PLAYWRIGHT_CONTACT_MOCK=1`

## Flakiness reductions implemented in Sprint 12

- removed arbitrary waits from the previous sequence and contact suites
- moved contact mock tests behind a real anti-bot timing poll
- introduced deterministic `qa-static` mode
- separated smoke, mock and production paths
- isolated preview QA on port `4184`
- filtered expected sequence-fallback abort/network noise from forced asset-fail paths only

## Current totals

- full Chromium suite: 54 tests
- full Firefox suite: 45 passed, 9 visual tests skipped by design
- full WebKit suite: 45 passed, 9 visual tests skipped by design
- cross-browser smoke matrix: 27 tests per engine
