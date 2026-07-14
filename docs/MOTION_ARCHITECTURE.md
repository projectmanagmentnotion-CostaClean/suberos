# Motion Architecture

## Objetivo

Consolidar un sistema de motion reutilizable, desacoplado y seguro antes de construir escenas cinematograficas mas avanzadas.

## Estructura actual

```text
src/motion/
  config/
    breakpoints.ts
    durations.ts
    easings.ts
    motionConfig.ts
  core/
    motionPreferences.ts
    motionPreferencesContext.ts
    refreshManager.ts
    registerGsap.ts
    scrollEngine.ts
  hooks/
    MotionPreferencesProvider.tsx
    useElementReveal.ts
    useGsapContext.ts
    useMotionPreferences.ts
    useScrollScene.ts
    useScrollVelocity.ts
  lib/
    createMotionMedia.ts
  sequences/
    FrameSequenceController.ts
    FrameSequenceLoader.ts
    FrameSequenceCache.ts
    sequenceManifest.ts
    sequence.types.ts
    sequence.utils.ts
  scenes/
    createHorizontalScene.ts
    createParallaxScene.ts
    createPinnedScene.ts
    createRevealScene.ts
  types/
    motion.types.ts
  utilities/
    clampProgress.ts
    clearMotionStyles.ts
    getResponsiveValue.ts
    killAnimations.ts
```

## Responsabilidades

- `registerGsap.ts`: registro unico de `GSAP`, `ScrollTrigger` y `@gsap/react`.
- `motionPreferences.ts`: snapshot de viewport, puntero, reduced motion y perfil activo (`full`, `balanced`, `reduced`).
- `MotionPreferencesProvider.tsx` + `useMotionPreferences.ts`: exponen el estado de motion a toda la app.
- `scrollEngine.ts`: ownership unico de `Lenis`, ticker GSAP y pausa/reanudacion por visibilidad.
- `refreshManager.ts`: agrupa `ScrollTrigger.refresh()` ante resize, orientacion, fuentes, imagenes y cambios de layout.
- `useGsapContext.ts`: wrapper de `useGSAP` con registro central.
- `useScrollScene.ts`: ciclo de vida comun para escenas y `matchMedia`.
- `scenes/*`: primitives aisladas para reveal, parallax, pinning y horizontal.
- `sequences/*`: motor tipado de secuencias, loader, cache, manifests y utilidades de perfil.

## Integracion actual

- `src/main.tsx` registra plugins una sola vez.
- `src/app/AppProviders.tsx` monta `MotionPreferencesProvider`, activa `Lenis` y adjunta `refreshManager`.
- `src/features/home/HomeExperience.tsx` valida reveal y parallax ligero con contenido real.
- `src/features/navigation/Header.tsx` usa el sistema central para transiciones del header y drawer movil.
- `src/features/motion-lab/MotionLabPage.tsx` sirve como laboratorio interno bajo `?motion-lab=1`.
- `src/features/portfolio-lab/PortfolioLabPage.tsx` sirve como laboratorio interno bajo `?portfolio-lab=1`.
- `src/features/sequence-lab/SequenceLabPage.tsx` valida el motor canvas bajo `?sequence-lab=1`.

## Reglas activas

- Reduced motion desactiva `Lenis` y evita escenas scroll-linked.
- Mobile no activa escenas pinned u horizontales de laboratorio.
- Reduced motion tampoco activa secuencias ni canvas.
- Cada escena limpia triggers y estilos al desmontar.
- Los laboratorios quedan fuera de la navegacion publica y marcados como `noindex`.

## Deuda controlada

- No existe aun integracion publica de secuencias reales.
- El laboratorio valida arquitectura, no direccion artistica final de produccion.
- El JS inicial sigue por encima del objetivo ideal de 250 KB gzip, aunque los labs siguen perezosos y fuera del bundle inicial.
