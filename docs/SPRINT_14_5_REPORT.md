# Sprint 14.5 Report

Date: 2026-07-16

## Scope executed

- Completed useful service-to-work navigation instead of static service cards.
- Moved the public immersive sequence to the accepted editorial position.
- Added immersive QA coverage for scroll-forward, scroll-back and reduced-motion fallback.
- Reinforced mobile navigation with resize cleanup coverage.
- Regenerated visual baselines affected by the intentional home reorder.

## Real findings

- The previous home was stable, but the immersive section was placed too early in the reading flow.
- Service CTAs were not connected to the matching discipline proof in `Trabajo`.
- `qa:release` failed during this sprint only because the visual baseline for mobile home no longer matched the new intentional layout.
- The current public sequence remains abstract and owned by SUBEROS; it is valid as a narrative bridge, not as a substitute for approved portfolio material.
- The contact form remains honestly blocked because delivery to `info@suberos.com` is still not verified in this sprint.

## Files created

- `docs/IMMERSIVE_SEQUENCE_PLACEMENT_DECISION.md`
- `docs/IMMERSIVE_SEQUENCE_STORYBOARD.md`
- `docs/IMMERSIVE_SEQUENCE_TECHNICAL_SPEC.md`
- `docs/IMMERSIVE_SEQUENCE_PERFORMANCE.md`
- `docs/SERVICES_INTERACTION_AUDIT.md`
- `docs/COPY_AUDIT_AND_CONTENT_SYSTEM.md`
- `docs/ASSET_REQUIREMENTS_AND_ART_DIRECTION.md`
- `docs/ASSET_PRODUCTION_BRIEF.md`
- `docs/MOBILE_NAVIGATION_REPAIR.md`
- `docs/SPRINT_14_5_REPORT.md`
- `tests/immersive/immersive.spec.ts`
- `tests/links/links.spec.ts`
- `tests/navigation/mobile-navigation.spec.ts`

## Files modified

- `README.md`
- `docs/ROADMAP.md`
- `package.json`
- `scripts/run-qa-release.mjs`
- `src/app/routes.ts`
- `src/data/services.ts`
- `src/features/frame-sequence/FrameSequenceScene.tsx`
- `src/features/home/HomePage.tsx`
- `src/features/home/ServicesSection.tsx`
- `src/features/navigation/Header.tsx`
- `src/features/work/WorkProject.tsx`
- `src/features/work/WorkProjectIndex.tsx`
- `src/features/work/WorkShowcase.tsx`
- `src/features/work/work-showcase.css`
- `src/styles/global.css`
- `tests/visual/visual-regression.spec.ts-snapshots/home-mobile-qa-static-chromium-win32.png`
- `tests/visual/visual-regression.spec.ts-snapshots/home-mobile-reduced-chromium-win32.png`

## Validation executed

- `npm install`
- `npm run qa:assets`
- `npm run qa:overflow`
- `npm run qa:links`
- `npm run qa:navigation`
- `npm run qa:immersive`
- `npm run qa:performance`
- `npm run lint`
- `npm run build`
- `npm run qa:release`

## Real validation results

- `npm run lint`: pass
- `npm run build`: pass
- `npm run qa:performance`: pass
- `npm run qa:release`: pass

## Responsive and accessibility status

- Responsive QA covered `390x844`, `768x1024`, `1366x768` plus dedicated mobile menu regression sizes.
- Reduced motion remains explicitly supported in home and immersive sequence.
- Keyboard navigation remains covered for skip link, drawer focus trap, Escape close and legal-route return flow.

## Production publication status

- Sprint 14.5 was published to `https://suberos.com/` on 2026-07-16.
- Public HTML now references:
  - `/assets/index-BEYwLeoD.js`
  - `/assets/index-deA8oNZV.css`
- Public runtime verification completed with:
  - no console errors in the reviewed pages;
  - no `4xx` requests in the reviewed pages;
  - visual screenshots captured in `artifacts/reports/sprint-14-5-production/`.

## Remaining blockers

- Real contact endpoint and mailbox delivery remain unresolved.
- `https://www.suberos.com/` already redirects to apex, but `http://www.suberos.com/` still performs a double hop through `https://www.suberos.com/` before reaching apex.
- Physical-device validation on iPhone Safari and Android Chrome remains pending.
