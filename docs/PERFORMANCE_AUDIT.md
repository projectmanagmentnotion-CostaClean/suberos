# Performance Audit

Fecha: 2026-07-15

## Alcance

- build de produccion local
- Lighthouse mobile y desktop sobre `http://127.0.0.1:4173`
- revision del bundle inicial
- revision de preloader, hero, Lenis y GSAP
- smoke visual y responsive en `390x844`, `768x1024` y `1366x768`

## Bundle

| Activo | Sprint 10 baseline | Sprint 11 actual | Cambio |
| --- | --- | --- | --- |
| JS inicial raw | 443.11 kB | 442.00 kB | -1.11 kB |
| JS inicial gzip | 147.66 kB | 147.27 kB | -0.39 kB |
| CSS inicial raw | 36.46 kB | 36.26 kB | -0.20 kB |
| CSS inicial gzip | 8.10 kB | 8.05 kB | -0.05 kB |

Chunks lazy confirmados:

- `PortfolioLabPage` `8.42 kB`
- `MotionLabPage` `8.73 kB`
- `SequenceLabPage` `19.97 kB`

## LCP y render inicial

Inferencia mas probable del LCP:

- home: tipografia display del `h1` y/o visual principal del hero
- contacto visible en home: mismo primer viewport del hero
- legales / 404: primer bloque textual del contenido principal

Cambios aplicados para mejorar LCP y estabilidad:

- preload explicito del visual principal `suberos-logo-symbol.webp`
- preload explicito de `StretchPro.otf`
- preloader limitado al perfil `full`; `balanced` y `reduced` lo omiten salvo QA forzada
- salida del preloader simplificada para no desplazar el hero real con `Flip`
- el hero expone `data-qa="home-lcp"` y `loading="eager"` en el asset principal

## Lighthouse resumido

Referencias completas en `docs/LIGHTHOUSE_REPORT.md`.

- mobile home baseline previo: performance `85`, LCP `3243 ms`, CLS `0.001`, TBT `205 ms`
- desktop home: performance `99`, LCP `704 ms`, CLS `0.000`, TBT `6 ms`

## Hallazgos reales

- El cuello inicial no era solo el peso del logo; la entrada de `StretchPro` y el preloader estaban afectando LCP y CLS.
- El `CLS` del hero quedo virtualmente eliminado al simplificar la salida del preloader y adelantar la carga de la fuente.
- La home movil sigue por encima del objetivo ideal `<= 2.5 s` en LCP de laboratorio. La medicion final reproducida en Sprint 13 queda en `3396 ms`.
- Se probo de forma conservadora cambiar `font-display: swap` a `font-display: fallback` en `StretchPro`, pero el resultado empeoro ligeramente a `3423 ms`; el cambio se revirtio.
- El mayor riesgo restante sigue siendo la fuente display `StretchPro.otf`, que sigue pesada y en formato OTF.
- Los labs siguen lazy y no entran en el shell publico salvo query explicita.
- No se detectaron overflow ni errores de consola en las vistas auditadas.

## Pendientes recomendados

- convertir `StretchPro` a `woff2` o preparar sustitucion legal-equivalente cuando exista licencia verificable
- reevaluar el hero movil si se quiere acercar el LCP de laboratorio a `<= 2.5 s` sin perder identidad visual
- repetir la auditoria en iPhone Safari fisico y Android fisico antes de publicacion
## Sprint 12 update

- Added `tests/performance/performance.spec.ts` for:
  - initial home route without lab chunk leakage
  - preloader asset fail
  - first-session versus second-load preloader behaviour
- `qa:production` now validates the production build on a dedicated preview port.
- Final measured bundle after Sprint 12:
  - JS `443.04 kB` raw / `147.56 kB` gzip
  - CSS `36.49 kB` raw / `8.09 kB` gzip
