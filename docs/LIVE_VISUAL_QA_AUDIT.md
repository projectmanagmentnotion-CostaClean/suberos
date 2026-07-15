# Live Visual QA Audit

Date: 2026-07-15

## Method actually used

- Local dev server kept active at `http://127.0.0.1:5173`
- HTTP 200 verified
- Production preview available at `http://127.0.0.1:4173`
- Real viewport captures generated with Playwright

## Capture folders

- `artifacts/visual-audit-static/`
- `artifacts/visual-audit-static-2/`
- `artifacts/visual-audit-scroll/`
- `artifacts/visual-audit-scroll-2/`

## Verified viewports today

- `390x844`
- `768x1024`
- `1366x768`

## Real findings

- No horizontal overflow was detected in the audited local sections after the latest CSS changes.
- `contacto` improved materially after reducing headline scale and raising the form shell.
- `proceso` improved materially after replacing the broken card grid with editorial rows.
- `trabajo` still uses intentionally large display type on desktop, but the first viewport now exposes hierarchy and explanatory copy instead of only oversized type.

## Not yet closed in this document

- Cross-browser visual confirmation for Firefox and WebKit.
- Physical-device verification.
- Landscape and 200% zoom capture set.
