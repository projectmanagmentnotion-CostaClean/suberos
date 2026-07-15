# QA_RELEASE_GATE

## Mandatory command

`npm run qa:release`

## Execution order

1. `npm run qa:isolation`
2. `npm run qa:portfolio`
3. `npm run qa:sequences`
4. `npm run qa:contact`
5. `npm run qa:privacy`
6. `npm run qa:seo`
7. `npm run qa:legal`
8. `npm run qa:aria`
9. `npm run qa:a11y`
10. `npm run qa:security`
11. `npm run qa:performance`
12. `npm run qa:production`
13. `npm run qa:visual`
14. `npm run lint`
15. `npm run build`

## Blocking rules

- any failing command blocks release
- no preview reuse inside `qa:production`
- no visual baseline update during `qa:visual`
- no public contact submission path without explicit QA mock
- no launch approval with unresolved legal-owner placeholders

## Manual companion checks

- local dev visual review on `http://127.0.0.1:5173`
- local production preview check on `http://127.0.0.1:4173`
- responsive spot checks at `390x844`, `768x1024`, `1366x768`
- keyboard pass on home, menu, contact and legal routes

## Outputs

- Playwright HTML report: `artifacts/reports/playwright-html/`
- Playwright test outputs: `artifacts/reports/test-results/`
- Manual screenshots: `artifacts/reports/visual-manual/`
- Docs summary: `docs/SPRINT_12_REPORT.md`
