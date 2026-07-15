# Browser Compatibility

Fecha: 2026-07-15

| Navegador | Version/entorno | Estado | Problemas | Evidencia |
| --- | --- | --- | --- | --- |
| Chrome / Chromium | Playwright Chromium en Windows | OK | ninguno bloqueante | `npx playwright test tests/home.spec.ts tests/performance-smoke.spec.ts` |
| Edge | no probado por separado; misma base Chromium | Parcial | pendiente confirmacion visual especifica | hereda smoke Chromium |
| Firefox | Playwright Firefox en Windows | OK | ninguno bloqueante en smoke | mismo comando cross-browser |
| Safari / WebKit | Playwright WebKit en Windows | OK como aproximacion | no equivale a Safari iOS fisico | mismo comando cross-browser |
| iOS Safari | no probado en dispositivo fisico | Pendiente | requiere iPhone real o BrowserStack | aproximacion solo con WebKit |
| Android Chrome | no probado en dispositivo fisico | Pendiente | requiere Android real | aproximacion con viewport movil Chromium y screenshots |
| In-app browser Codex | navegador integrado local | OK | viewport fijo del contenedor de la app | inspeccion visual directa durante el sprint |

## Cobertura ejecutada

- smoke cross-browser:
  - `tests/home.spec.ts`
  - `tests/performance-smoke.spec.ts`
- capturas visuales:
  - `.tmp-qa/home-390x844.png`
  - `.tmp-qa/home-768x1024.png`
  - `.tmp-qa/home-1366x768.png`
  - `.tmp-qa/contact-390x844.png`
