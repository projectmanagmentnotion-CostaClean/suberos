# Motion Performance Budget

## Objetivo

Evitar que la evolucion cinematografica rompa legibilidad, navegacion o rendimiento en moviles.

## Presupuestos activos

- JS inicial comprimido: objetivo ideal `< 250 KB gzip`.
- Estado actual tras Sprint 03:
  - `assets/index-DXVAN4s_.js`: `359.70 kB` raw, `121.66 kB gzip`
  - `assets/MotionLabPage-DvM7IP0f.js`: `8.01 kB` raw, `2.98 kB gzip`
- CSS principal: `17.05 kB` raw, `4.56 kB gzip`
- Motion no debe depender de timers globales sin cleanup.
- `Lenis` solo permanece activo fuera de reduced motion.
- Pinning y horizontal quedan restringidos a laboratorio y excluidos de mobile/reduced.

## Reglas de implementacion

- Priorizar `transform` y `opacity`.
- Evitar animar listas completas al mismo tiempo.
- Cada escena debe degradarse a contenido estatico legible.
- Los assets cinematicos futuros necesitan tamaños separados para desktop y mobile.
- Todo frame sequence futuro debe pausar rendering fuera de viewport.

## Alertas para Sprint 04

- No introducir preloader ni hero final sin:
  - presupuesto de media por breakpoint;
  - carga progresiva;
  - fallback estatico;
  - prueba real de reduced motion.
