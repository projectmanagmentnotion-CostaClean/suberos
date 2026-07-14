# Motion System

## Estado actual

Sprint 03 completado. SUBEROS ya dispone de arquitectura central de motion, perfiles de preferencia, ownership unico de `Lenis`, refresh manager y primitives de escena listas para escalar hacia el hero y el preloader.

## Piezas activas

- Registro central:
  - `src/motion/core/registerGsap.ts`
- Preferencias y perfiles:
  - `src/motion/core/motionPreferences.ts`
  - `src/motion/hooks/MotionPreferencesProvider.tsx`
  - `src/motion/hooks/useMotionPreferences.ts`
- Runtime global:
  - `src/motion/core/scrollEngine.ts`
  - `src/motion/core/refreshManager.ts`
- Hooks reutilizables:
  - `src/motion/hooks/useGsapContext.ts`
  - `src/motion/hooks/useScrollScene.ts`
  - `src/motion/hooks/useElementReveal.ts`
  - `src/motion/hooks/useScrollVelocity.ts`
- Primitives:
  - `src/motion/scenes/createRevealScene.ts`
  - `src/motion/scenes/createParallaxScene.ts`
  - `src/motion/scenes/createPinnedScene.ts`
  - `src/motion/scenes/createHorizontalScene.ts`

## Perfiles

- `full`: desktop amplio, puntero fino y sin reduced motion.
- `balanced`: estado intermedio por defecto.
- `reduced`: `prefers-reduced-motion` o `?reduced-motion=1`.

## Reglas activas

- `Lenis` no se activa en reduced.
- Escenas pinned y horizontales no corren en mobile ni reduced.
- Cada escena limpia tweens, triggers y estilos al desmontar.
- El laboratorio interno vive en `?motion-lab=1` y fuerza `noindex`.

## Validacion actual

- Home publica valida reveal y parallax ligero con contenido real.
- Motion Lab valida:
  - reveal
  - parallax
  - pinning
  - horizontal
  - velocity
  - reduced motion

## Documentacion relacionada

- `docs/MOTION_ARCHITECTURE.md`
- `docs/MOTION_PERFORMANCE_BUDGET.md`
- `docs/MOTION_QA.md`
- `docs/SPRINT_03_REPORT.md`
