# Sprint 14.2 Report

Date: 2026-07-15

## Goal

Editorial polish of portfolio, process and contact plus real visual QA and stronger asset/overflow automation.

## Work completed in this block

- Audited the current local repo state and kept the local dev server active on `127.0.0.1:5173`.
- Verified HTTP 200 for local dev and local preview.
- Reworked the home to use:
  - `src/features/work/`
  - `src/features/process/`
  - refactored `src/features/contact/`
- Added runtime automation:
  - `scripts/check-runtime-overflow.mjs`
  - `scripts/inspect-all-assets.mjs`
  - `scripts/check-assets.mjs`
- Added `qa:assets` and `qa:overflow` to `package.json` and `qa:release`.
- Generated asset inventory artifacts under `artifacts/reports/assets/`.
- Generated local visual evidence under `artifacts/visual-audit-*`.

## Real findings

- The previous portfolio/process/contact compositions matched the problems listed in Sprint 14.2: panel-heavy layout, broken process grid, sidebar-like contact, and inconsistent hierarchy.
- Current local visual captures show no horizontal overflow in the audited sections at `390x844`, `768x1024` and `1366x768`.
- Public production still serves the old WordPress-era `Subero Shoot` content and does not match the local editorial build.

## Commands executed and current results

| Command | Result |
| --- | --- |
| `npm install` | pass |
| `npm run lint` | pass after removing one unused import |
| `npm run build` | pass |
| `npm run qa:assets` | pass with warnings |
| `npm run qa:overflow` | pass |

## Open items before sprint closure

- Run the remaining heavier QA suites after the visual/layout block stabilizes.
- Update SiteGround so production matches the current local build.
- Regenerate the public verification docs after deployment.
- Capture the broader viewport matrix, zoom checks and cross-browser evidence required by the sprint.
