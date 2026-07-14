# Motion Performance Budget

## Objetivo

Evitar que la evolucion cinematografica rompa legibilidad, navegacion o rendimiento en moviles.

## Presupuestos activos

- JS inicial comprimido: objetivo ideal `< 250 KB gzip`.
- Estado actual tras Sprint 07:
  - `assets/index-CJszSo1d.js`: `405.76 kB` raw, `136.51 kB gzip`
  - `assets/SequenceLabPage-Dl4QK_P6.js`: `20.13 kB` raw, `6.56 kB gzip`
  - `assets/SequenceLabPage-B2v9MXbA.css`: `2.04 kB` raw, `0.74 kB gzip`
- CSS principal: `32.93 kB` raw, `7.49 kB gzip`
- Motion no debe depender de timers globales sin cleanup.
- `Lenis` solo permanece activo fuera de reduced motion.
- Pinning y horizontal quedan restringidos a laboratorio y excluidos de mobile/reduced.
- El motor de secuencias queda fuera del bundle inicial cuando no se usa.

## Reglas de implementacion

- Priorizar `transform` y `opacity`.
- Evitar animar listas completas al mismo tiempo.
- Cada escena debe degradarse a contenido estatico legible.
- Los assets cinematicos futuros necesitan tamanos separados para desktop y mobile.
- Todo frame sequence futuro debe pausar rendering fuera de viewport.
- Los posters deben seguir resolviendo el LCP antes que cualquier secuencia.
- Los sets mobile deben ser mas livianos que desktop y no heredar el set desktop por defecto.

## Presupuestos iniciales para secuencias

- Cache maxima:
  - desktop/full: `18`
  - tablet: `12`
  - mobile: `8`
- Concurrencia maxima:
  - desktop/full: `4`
  - balanced: `2`
- DPR maxima:
  - desktop/full: `2`
  - balanced/mobile: `1.5`
- Numero maximo de secuencias activas:
  - `1` por ahora
- Reduced:
  - `0` frames
  - `0` canvas activo
