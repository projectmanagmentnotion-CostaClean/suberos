# Sprint 14.4 Report

Date: 2026-07-16

## Scope executed in this block

- Home art direction refined with a clearer editorial hierarchy.
- A real scroll-tied frame-sequence scene was integrated into the public home narrative.
- Mobile navigation was reinforced with direct project CTA, contextual summary and safer hash-close behaviour.
- Canonical `www -> apex` redirect was prepared locally in `public/.htaccess`.
- Visual regression baselines were regenerated after intentional layout changes.

## Real findings

- Local and public home were visually aligned before this block; the work was not fixing a repo/production mismatch.
- The previous home was technically stable, but still felt too audit-driven:
  - oversized repeated statements;
  - insufficient use of the existing frame-sequence engine in the real public narrative;
  - mobile menu functional but not strong enough as a conversion/navigation surface.
- `qa:release` initially failed only because `qa:visual` still pointed to outdated snapshots after the intentional redesign.
- Production still serves both apex and `www` with `200`; the redirect is prepared in code but not yet verified live.
- The contact form remains honestly blocked in production because no real provider or verified mailbox delivery has been completed in this block.

## Files created

- `src/features/home/SequenceNarrativeSection.tsx`
- `docs/SPRINT_14_4_REPORT.md`

## Files modified

- `public/.htaccess`
- `README.md`
- `src/data/homeContent.ts`
- `src/features/home/HomePage.tsx`
- `src/features/home/home-page.css`
- `src/features/navigation/Header.tsx`
- `src/styles/global.css`
- `tests/visual/visual-regression.spec.ts-snapshots/home-hero-wide-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-studio-wide-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-services-wide-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-work-wide-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-contact-wide-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-mobile-qa-static-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-mobile-reduced-chromium-win32.png`

## Validation executed

- `npm run lint`: pass
- `npm run build`: pass
- `npm run qa:assets`: pass with 4 known warnings
- `npm run qa:overflow`: pass
- `npm run qa:visual`: pass after regenerating intentional baselines
- `npm run qa:release`: pass after baseline update

## Visual review executed

- Local dev reviewed visually at:
  - `390x844`
  - `768x1024`
  - `1366x768`
- Menu state reviewed visually in mobile with drawer open.
- Production checked again before edits to confirm it still matched the previous published local build.

## Accessibility and motion status

- Mobile menu keeps focus trap behaviour covered by existing navigation suite inside `qa:release`.
- The new sequence scene preserves reduced-motion fallback through the existing frame-sequence controller and HTML fallback layer.
- No overflow regressions detected after the redesign.

## Remaining blockers

- Real production contact endpoint still not implemented and mailbox delivery not verified.
- `www -> apex` redirect is prepared locally but not yet deployed and verified in SiteGround.
- This report does not claim production publication of the Sprint 14.4 changes.
