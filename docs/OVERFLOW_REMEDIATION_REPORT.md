# Overflow Remediation Report

Date: 2026-07-15

## Technical changes applied

- Added `minmax(0, 1fr)`-based editorial grids in the new work/process/contact layouts.
- Added `min-width: 0` and `overflow-wrap: anywhere` to text-bearing regions.
- Recalibrated `clamp()` values for major headings.
- Removed equal-card process layout that caused title collisions.
- Removed sidebar-style contact composition that encouraged cramped columns.

## Automated gate

- Script: `scripts/check-runtime-overflow.mjs`
- Command: `npm run qa:overflow`
- Current result: pass
- Output: `artifacts/reports/overflow/overflow-report.json`

## Scope of current automated check

- Home anchor checks at work, process and contact.
- Viewports: `390x844`, `768x1024`, `1366x768`
- Detects document horizontal overflow and elements exceeding the viewport bounds.
