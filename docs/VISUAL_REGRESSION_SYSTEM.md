# VISUAL_REGRESSION_SYSTEM

## Purpose

Sprint 12 establishes a deterministic visual regression layer for SUBEROS without shipping extra runtime libraries or exposing QA-only behaviour publicly.

## Runtime controls

- `?qa-static=1`
  - disables transitions and animations globally through `html[data-qa-static='true']`
  - forces reduced motion behaviour in the motion preference resolver
  - skips the preloader runtime
  - applies `noindex,nofollow`
  - removes canonical and JSON-LD output
- `?reduced-motion=1`
  - validates the public reduced-motion path
- `?preloader=1`
  - forces the first-session preloader path
- `?asset-fail=1`
  - validates controlled fallback states

## Snapshot coverage

Snapshots are versioned from `tests/visual/visual-regression.spec.ts` and currently cover:

- preloader first session
- home hero, studio, services, work, process, statement, contact and footer
- mobile home and open mobile menu
- legal notice, privacy, cookies, accessibility and 404
- contact blocked, success, error and rate-limit states
- Portfolio Lab, Sequence Lab, Sequence asset fail and Motion Lab

## Stability rules

- Chromium only for visual baselines
- no full-motion snapshots
- reduced-motion preloader remains static
- contact mock states use explicit QA globals only
- no legacy hotlinks, remote images or third-party iframes in snapshot paths

## Storage

- baselines: `tests/visual/visual-regression.spec.ts-snapshots/`
- failed diffs and videos: `artifacts/reports/test-results/`
- manual captures: `artifacts/reports/visual-manual/`

## Update workflow

1. Validate the app first with `npm run lint`, `npm run build`, `npm run qa:smoke`.
2. Refresh snapshots only when a reviewed UI change is intentional:
   - `node scripts/run-playwright-suite.mjs --port=4180 --contact-mock=1 tests/visual --project chromium --update-snapshots`
3. Re-run `npm run qa:visual`.
4. Review the changed PNGs before commit.
