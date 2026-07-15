# Performance Audit

Fecha: 2026-07-15

## Alcance

- build de produccion local
- Lighthouse mobile y desktop sobre `http://127.0.0.1:4173`
- revision del bundle inicial
- revision de preloader, hero, Lenis y GSAP
- smoke visual y responsive en `390x844`, `768x1024`, `1366x768`, `1440x900` y `844x390`

## Bundle final

| Activo | Estado actual |
| --- | --- |
| JS inicial raw | `443.34 kB` |
| JS inicial gzip | `147.61 kB` |
| CSS inicial raw | `36.94 kB` |
| CSS inicial gzip | `8.13 kB` |
| Syncopate Regular | `32344 B` |
| Syncopate Bold | `17432 B` |
| Syncopate total | `49776 B` |

## Lighthouse resumido

- mobile home: performance `94`, LCP `2647 ms`, CLS `0.000`, TBT `170 ms`
- mobile contact: performance `94`, LCP `2631 ms`, CLS `0.000`, TBT `171 ms`
- desktop home: performance `99`, LCP `606 ms`, CLS `0.000057`, TBT `5 ms`
- desktop contact: performance `99`, LCP `597 ms`, CLS `0.000057`, TBT `3 ms`

## Comparativa con baseline previo

- referencia previa mobile performance: `86`
- referencia previa mobile LCP: `3396 ms`
- referencia previa desktop performance: `99`
- referencia previa desktop LCP: `705 ms`
- mejora real observada tras Syncopate:
  - mobile performance `+8`
  - mobile LCP `-749 ms`
  - desktop LCP `-99 ms`

## Hallazgos reales

- Eliminar `StretchPro.otf` del runtime y precargar solo `Syncopate-Bold.woff2` reduce el coste above the fold.
- No se detectaron requests a Google Fonts ni fugas de fuentes legacy en `dist`.
- El hero conserva impacto visual sin overflow en los viewports auditados.
- Los labs siguen lazy y no entran en el shell publico salvo query explicita.

## Pendientes recomendados

- repetir la auditoria en iPhone Safari fisico y Android Chrome fisico antes de publicacion
- revalidar el rendimiento una vez exista hosting real y CDN final
