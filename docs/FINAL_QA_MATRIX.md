# FINAL_QA_MATRIX

## Matrix

| View / Area | State | Viewport | Browser | Test / Command | Evidence | Result | Blocker | Notes |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
| Home public flow | Default | 390x844, 768x1024, 1366x768 | Chromium | `tests/smoke/home.spec.ts` via `npm run qa:smoke` | Playwright + manual screenshot `artifacts/reports/visual-manual/desktop-home.png` | Pass | No | No overflow, no foreign content, no console errors. |
| Home reduced motion | Reduced | 390x844, 1366x768 | Chromium, Firefox, WebKit | `tests/smoke/home.spec.ts`, `tests/accessibility/accessibility.spec.ts` | Playwright | Pass | No | Motion profile reduced validated without console regressions. |
| Preloader | First session, asset fail, second load | 1366x768 | Chromium, Firefox, WebKit | `tests/performance/performance.spec.ts`, `tests/visual/visual-regression.spec.ts` | Playwright + snapshot `preloader-first-session-desktop` | Pass | No | Reduced-motion preloader forced to static for deterministic QA. |
| Header / menu | Desktop nav, mobile open, Escape, close by link | 390x844, 1366x768 | Chromium, Firefox, WebKit | `tests/navigation/navigation.spec.ts`, `tests/accessibility/accessibility.spec.ts` | Playwright + `artifacts/reports/visual-manual/mobile-menu-open.png` | Pass | No | Mobile focus trap validated in all three engines. |
| Contact public state | Honest block | 390x844, 768x1024, 1366x768 | Chromium, Firefox, WebKit | `tests/contact/contact.spec.ts`, `npm run qa:privacy` | Playwright + snapshots `contact-blocked-tablet` and `mobile-contact.png` | Pass | No | No URL leaks, no storage persistence, no external scripts. |
| Contact QA mock | Success, error, rate limit, double submit, offline | 768x1024 | Chromium | `tests/contact/contact.spec.ts`, `npm run qa:contact` | Playwright + snapshots `contact-success-tablet`, `contact-error-tablet`, `contact-rate-limit-tablet` | Pass | No | Mock only available with explicit QA mode on localhost. |
| Legal routes | Aviso legal, privacidad, cookies, accesibilidad | 768x1024 | Chromium, Firefox, WebKit | `tests/legal/legal.spec.ts`, `npm run qa:legal` | Playwright + `tablet-legal-privacidad.png` | Pass | No | H1, focus, noindex and canonical runtime validated. |
| 404 | Noindex, exits | 768x1024 | Chromium, Firefox, WebKit | `tests/navigation/navigation.spec.ts`, `tests/seo/seo.spec.ts`, visual snapshot | Playwright | Pass | No | Metadata restores when returning home. |
| SEO runtime | Canonical, robots, OG, Twitter, JSON-LD, favicon | 1366x768 | Chromium | `tests/seo/seo.spec.ts`, `npm run qa:seo` | Playwright + static SEO audit | Pass | No | Sprint 12 fixed `null` canonical / OG regression for labs and `qa-static`. |
| Portfolio Lab | Internal only, noindex | 1366x768 | Chromium, Firefox, WebKit | `tests/labs/labs.spec.ts`, `npm run qa:cross-browser` | Playwright + snapshot `portfolio-lab-desktop` | Pass | No | No published portfolio items exposed. |
| Sequence Lab | Scroll progress, reduced, asset fail | 1366x768 | Chromium, Firefox, WebKit | `tests/labs/labs.spec.ts`, `npm run qa:cross-browser` | Playwright + snapshots `sequence-lab-desktop`, `sequence-lab-asset-fail-desktop` | Pass | No | Abort and forced-fail network noise filtered as expected QA fallback behaviour. |
| Motion Lab | Default, reduced | 1366x768 | Chromium, Firefox, WebKit | `tests/labs/labs.spec.ts` | Playwright + snapshot `motion-lab-desktop` | Pass | No | Sprint 12 added a visible H1-level heading contract. |
| Accessibility baseline | Keyboard, axe, focus, aria | 390x844, 768x1024, 1366x768 | Chromium | `npm run qa:a11y` | Playwright + axe | Pass | No | No serious or critical axe violations in covered routes. |
| Cross-browser smoke | Core public routes and labs | 390x844, 768x1024, 1366x768 | Chromium, Firefox, WebKit | `npm run qa:cross-browser` | Playwright | Pass | No | 27 tests per engine on the smoke matrix. |
| Full project browser runs | Complete suite by project | Mixed | Chromium, Firefox, WebKit | `npx playwright test --project=chromium|firefox|webkit` | Playwright | Pass | No | Chromium 54/54, Firefox 45 pass + 9 visual skips, WebKit 45 pass + 9 visual skips. |
| Production preview | Preview smoke against built app | Preview port 4184 | Chromium | `npm run qa:production` | Playwright against `vite preview` | Pass | No | Dedicated QA preview port avoids interference with final preview. |
| Release gate | Aggregated checks | Mixed | Mixed | `npm run qa:release` | Node runner + Playwright + lint + build | Pass | No | Mandatory gate order completed without failures. |

## Viewport matrix

| View | 390 | 768 | 1366 | 1440 | Landscape |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | Pass | Pass | Pass | Pass | Covered by visual baseline and manual review |
| Menu | Pass | N/A | Pass | N/A | Pass |
| Contact | Pass | Pass | Pass | Pass via visual desktop section | Manual mobile and tablet review |
| Legal | Manual mobile not required | Pass | N/A | N/A | N/A |
| Labs | N/A | N/A | Pass | N/A | N/A |

## Artifact locations

- Visual snapshots: `tests/visual/visual-regression.spec.ts-snapshots/`
- Playwright outputs: `artifacts/reports/test-results/`
- Manual browser captures: `artifacts/reports/visual-manual/`
- Lighthouse: `artifacts/lighthouse/`
