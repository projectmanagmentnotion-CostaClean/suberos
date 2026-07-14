# Sprint 07 Report

Fecha: 2026-07-14

## Ruta y git

- Ruta: `C:\Users\USUARIO\Documents\SUBEROS-real`
- Rama: `main`
- Commit inicial: `836d075` - `Build SUBEROS visual content and portfolio readiness system`
- Remoto: `https://github.com/projectmanagmentnotion-CostaClean/suberos.git`

## Auditoria

Hallazgos reales previos:

- GSAP, `ScrollTrigger` y `Lenis` ya estaban centralizados y no requerian una segunda instancia global.
- `scrollEngine.ts` ya era el unico owner del ticker GSAP y de `Lenis`.
- `MotionLabPage` y `PortfolioLabPage` ya validaban el patron correcto de laboratorios lazy y no indexables.
- No existia motor de secuencias, manifiesto ni pipeline especifico.
- `VisualAsset` solo representaba `sequence` como placeholder, sin canvas ni loader real.
- La QA visual existente era buena base, pero faltaba cobertura especifica para secuencias, fallback y reduced motion.
- La suite Playwright tenia una fragilidad intermitente en la lectura del titulo de home; se estabilizo esperando `domcontentloaded`.

## Arquitectura

Se implemento:

- `src/features/frame-sequence/`
- `src/features/sequence-lab/`
- `src/motion/sequences/`

Detalles completos en:

- `docs/FRAME_SEQUENCE_ENGINE.md`
- `docs/FRAME_SEQUENCE_LOADING.md`
- `docs/FRAME_SEQUENCE_MEMORY.md`
- `docs/SEQUENCE_LAB.md`

## Manifiesto

Manifest actual:

- id: `suberos-sequence-lab`
- poster local
- fallback local
- ownership confirmado
- publicacion no aprobada
- `reducedMotionDisabled: true`

## Loader

Capacidades implementadas:

- carga del frame actual por prioridad
- ventana progresiva de preload
- concurrencia limitada
- un reintento
- `AbortController`
- validacion de dimensiones
- fallback a `HTMLImageElement.decode()` si `createImageBitmap()` no es viable

## Cache

Politica implementada:

- desktop/full: `18`
- tablet: `12`
- mobile: `8`
- reduced: `0`

## Render canvas y DPR

- Canvas 2D
- `ResizeObserver`
- DPR cap:
  - desktop/full: `2`
  - balanced/mobile/tablet: `1.5`
  - reduced: `1`

## Perfiles, reduced motion, errores y fallback

- `full`: set desktop y pin opcional
- `balanced`: preferencia por tablet/mobile
- `reduced`: sin loader ni canvas
- `asset-fail`: fallback estatico con error controlado

## Sequence Lab y secuencia abstracta

Entrada:

- `/?sequence-lab=1`

Assets creados:

- `poster.webp`
- `fallback.webp`
- `desktop/*.webp`
- `tablet/*.webp`
- `mobile/*.webp`

La secuencia es abstracta, propia y no representa un proyecto real publicado.

## Scripts y QA

Nuevos scripts:

- `scripts/generate-sequence-lab-assets.mjs`
- `scripts/generate-sequence-manifest.mjs`
- `scripts/check-frame-sequences.mjs`

Comandos reales ejecutados:

- `npm install`
- `npm run qa:isolation`
- `npm run qa:portfolio`
- `npm run qa:sequences`
- `npm run lint`
- `npm run build`
- `npm run qa:visual`
- `node scripts/generate-sequence-lab-assets.mjs`
- `node scripts/generate-sequence-manifest.mjs`
- `npm run preview -- --host 127.0.0.1 --port 4175`

Resultados:

- `qa:isolation`: OK
- `qa:portfolio`: OK
- `qa:sequences`: OK
- `lint`: OK
- `build`: OK
- `qa:visual`: OK, `19` tests

## Verificacion visual real

Preview limpio verificado manualmente en `http://127.0.0.1:4175`:

- home `390x844`
- sequence lab `390x844`
- sequence lab `768x1024`
- sequence lab `1366x768`
- sequence lab reduced
- sequence lab asset-fail

Confirmaciones reales:

- `Sequence Lab` muestra `h1` unico y `noindex,nofollow`
- no hay overflow
- no aparece en la navegacion publica
- en desktop el scroll paso de `Frame 1 / 36` a `Frame 36 / 36`
- en `asset-fail` quedo `Phase error`, `Canvas off`, `Fallback yes`
- en reduced quedo `Phase fallback`, `Loaded 0`, `Memory 0`

## Bundle

Baseline Sprint 06:

- JS principal: `405.39 kB raw / 136.41 kB gzip`
- CSS principal: `32.93 kB raw / 7.49 kB gzip`
- Portfolio Lab: `8.74 kB raw / 2.70 kB gzip`
- Portfolio Lab CSS: `0.50 kB raw / 0.24 kB gzip`

Resultado Sprint 07:

- `assets/index-CJszSo1d.js`: `405.76 kB raw / 136.51 kB gzip`
- `assets/SequenceLabPage-Dl4QK_P6.js`: `20.13 kB raw / 6.56 kB gzip`
- `assets/SequenceLabPage-B2v9MXbA.css`: `2.04 kB raw / 0.74 kB gzip`

## Riesgos y siguiente paso

- no se ha probado Safari iOS fisico
- la secuencia del laboratorio es valida para QA, no para produccion publica
- siguen faltando secuencias reales aprobadas para escenas publicas

Siguiente sprint recomendado:

- Phase 8, contacto y conversion real
- o una iteracion de integracion publica solo si entran assets de secuencia reales aprobados
