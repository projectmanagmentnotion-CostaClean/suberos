# Sprint 10 Report

Fecha: 2026-07-15
Sprint: 10
Objetivo: baseline real de accesibilidad, teclado, inclusive motion y QA automatizada

## Hallazgos reales

- El preloader inicial permitia fuga de foco al contenido.
- El menu movil no atrapaba tab ni desplazaba el foco de forma fiable al dialogo.
- El trigger del menu declaraba `aria-controls` sobre un panel inexistente en estado cerrado.
- El campo `Tipo de proyecto o servicio` no enlazaba su hint por `aria-describedby`.
- Los labs lazy y rutas no-home no garantizaban foco inicial sobre su `h1`.
- La seccion de servicios usaba semantica ARIA invalida detectada por axe.

## Archivos creados

- `src/lib/accessibility/getFocusableElements.ts`
- `src/lib/accessibility/isolateElements.ts`
- `src/lib/accessibility/usePageHeadingFocus.ts`
- `scripts/check-accessibility.mjs`
- `scripts/check-aria-integrity.mjs`
- `tests/accessibility.spec.ts`
- `docs/WCAG_2_2_AA_AUDIT.md`
- `docs/ACCESSIBILITY_TEST_PLAN.md`
- `docs/KEYBOARD_NAVIGATION_AUDIT.md`
- `docs/CONTRAST_AUDIT.md`
- `docs/INCLUSIVE_MOTION_AUDIT.md`
- `docs/SCREEN_READER_TEST.md`
- `docs/ACCESSIBILITY_REMEDIATION_LOG.md`
- `docs/SPRINT_10_REPORT.md`

## Archivos modificados

- `package.json`
- `README.md`
- `src/app/App.tsx`
- `src/app/AppShell.tsx`
- `src/components/ui/SkipLink.tsx`
- `src/components/ui/TextLink.tsx`
- `src/features/contact/ContactFormFields.tsx`
- `src/features/footer/Footer.tsx`
- `src/features/home/ServicesSection.tsx`
- `src/features/legal/LegalPage.tsx`
- `src/features/motion-lab/MotionLabPage.tsx`
- `src/features/navigation/Header.tsx`
- `src/features/not-found/NotFoundPage.tsx`
- `src/features/preloader/Preloader.tsx`
- `src/features/portfolio-lab/PortfolioLabPage.tsx`
- `src/features/sequence-lab/SequenceLabPage.tsx`
- `tests/home.spec.ts`

## Validaciones ejecutadas

- `npm run lint`
- `npm run qa:isolation`
- `npm run qa:portfolio`
- `npm run qa:sequences`
- `npm run qa:contact`
- `npm run qa:privacy`
- `npm run qa:seo`
- `npm run qa:legal`
- `npm run qa:aria`
- `npm run qa:a11y`
- `npm run qa:a11y:axe`
- `npm run qa:visual`
- `npm run build`

## Resultados

- `lint`: OK
- `qa:isolation`: OK
- `qa:portfolio`: OK
- `qa:sequences`: OK
- `qa:contact`: OK, 12/12 tests
- `qa:privacy`: OK, 3/3 tests
- `qa:seo`: OK
- `qa:legal`: OK
- `qa:aria`: OK
- `qa:a11y`: OK, 7/7 tests
- `qa:a11y:axe`: OK
- `qa:visual`: OK, 48/48 tests
- `build`: OK

## Responsive y accesibilidad

- Revisado en `390x844`, `768x1024` y `1366x768`
- Sin overflow horizontal en las rutas y labs cubiertos por QA
- Menu movil y preloader con aislamiento de foco
- Reduced motion validado localmente

## Limitaciones honestas

- No se declara conformidad WCAG 2.2 AA final.
- No se han ejecutado lectores de pantalla reales en este sprint.
- Falta reauditar cuando entre la experiencia cinematografica definitiva.
