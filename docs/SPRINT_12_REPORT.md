# SPRINT_12_REPORT

## Scope

Sprint 12 closes the visual and functional QA automation baseline for SUBEROS on the real repository `C:\Users\USUARIO\Documents\SUBEROS-real` and branch `main`, starting from commit `c9b067858ebb4a91bcba6249d41c4bb685519379`.

## Repository and runtime status

- Working repository: `C:\Users\USUARIO\Documents\SUBEROS-real`
- Remote: `https://github.com/projectmanagmentnotion-CostaClean/suberos.git`
- Branch: `main`
- Initial commit: `c9b0678 Harden SUBEROS performance security and browser compatibility`
- Local dev URL during Sprint 12: `http://127.0.0.1:5173`
- QA production preview command: `npm run qa:production`
- Final manual preview target: `http://127.0.0.1:4173`

## Real findings

- The suite already had meaningful functional coverage, but it was flat, partially fragile and missing visual baselines.
- `qa-static` existed conceptually in the sprint brief but not in runtime; Sprint 12 implemented it in motion preferences, document metadata and global CSS.
- Labs and `qa-static` had a real SEO regression: `canonicalUrl: null` and `ogUrl: null` were being lost through nullish coalescing and the home canonical leaked into internal routes.
- The preloader still animated under reduced motion, which made visual snapshots unstable; Sprint 12 converted that path into a static state.
- Motion Lab lacked an H1-level heading contract compared with the other internal labs; Sprint 12 normalized it.
- Windows orchestration for Playwright needed dedicated Node-based runners instead of relying on `.cmd` wrappers.
- Full browser-project runs were initially unstable with excessive worker concurrency; reducing workers to `6` removed starvation-related timeouts.

## Files created

- `docs/FINAL_QA_MATRIX.md`
- `docs/VISUAL_REGRESSION_SYSTEM.md`
- `docs/FUNCTIONAL_QA_SYSTEM.md`
- `docs/KNOWN_LIMITATIONS.md`
- `docs/QA_RELEASE_GATE.md`
- `docs/SPRINT_12_REPORT.md`
- `scripts/run-playwright-suite.mjs`
- `scripts/run-cross-browser-qa.mjs`
- `scripts/run-production-qa.mjs`
- `scripts/run-qa-release.mjs`
- `tests/helpers/runtime.ts`
- `tests/helpers/accessibility.ts`
- `tests/smoke/home.spec.ts`
- `tests/navigation/navigation.spec.ts`
- `tests/contact/contact.spec.ts`
- `tests/legal/legal.spec.ts`
- `tests/seo/seo.spec.ts`
- `tests/labs/labs.spec.ts`
- `tests/performance/performance.spec.ts`
- `tests/accessibility/accessibility.spec.ts`
- `tests/visual/visual-regression.spec.ts`
- `tests/visual/visual-regression.spec.ts-snapshots/*`

## Commands executed

- `npm install`
- `npm run lint`
- `npm run build`
- `npm run qa:smoke`
- `npm run qa:contact`
- `npm run qa:privacy`
- `npm run qa:seo`
- `npm run qa:legal`
- `npm run qa:a11y`
- `node scripts/run-playwright-suite.mjs --port=4180 --contact-mock=1 tests/visual --project chromium --update-snapshots`
- `npm run qa:visual`
- `npm run qa:cross-browser`
- `npm run qa:production`
- `npm run qa:release`
- `npx playwright test --project=chromium`
- `npx playwright test --project=firefox`
- `npx playwright test --project=webkit`

## Results

- `npm install`: pass, dependencies already up to date
- `npm run lint`: pass
- `npm run build`: pass
- `npm run qa:release`: pass
- `npm run qa:cross-browser`: pass
- `npx playwright test --project=chromium`: 54 passed
- `npx playwright test --project=firefox`: 45 passed, 9 visual tests skipped by design
- `npx playwright test --project=webkit`: 45 passed, 9 visual tests skipped by design

## Bundle measurement

- JS: `443.04 kB` raw / `147.56 kB` gzip
- CSS: `36.49 kB` raw / `8.09 kB` gzip
- Delta versus Sprint 11 baseline:
  - JS: `+1.04 kB` raw / `+0.29 kB` gzip
  - CSS: `+0.23 kB` raw / `+0.04 kB` gzip

## Visual verification

Manual visual review was executed against the live local dev site and stored in:

- `artifacts/reports/visual-manual/desktop-home.png`
- `artifacts/reports/visual-manual/mobile-menu-open.png`
- `artifacts/reports/visual-manual/mobile-contact.png`
- `artifacts/reports/visual-manual/tablet-legal-privacidad.png`

Validated manually:

- desktop home narrative and hero integrity
- mobile menu overlay, hierarchy and direct contact block
- tablet legal layout and readability
- mobile contact reachability

## Responsive and accessibility validation

- Responsive automation: `390x844`, `768x1024`, `1366x768`, `1440x900`, `844x390`
- Manual browser review: desktop, tablet legal and mobile menu/contact
- Keyboard and focus: pass on home, skip link, menu, legal and labs
- Axe coverage: pass on home, contact and legal accessibility route
- Reduced motion: pass on public home, preloader and labs

## Risks and pending work

- Physical iOS Safari and Android Chrome still pending
- Real production contact endpoint still pending
- Final legal owner data and definitive legal copy still pending
- StretchPro licence evidence still pending
- Real approved portfolio content still pending

## Recommended next phase

Move to Phase 13: content, legal and launch-readiness polish, using the new Sprint 12 gate as the mandatory baseline before any launch candidate.
