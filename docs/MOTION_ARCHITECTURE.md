# Motion Architecture

## Objetivo

Consolidar un sistema de motion reutilizable, desacoplado y seguro antes de construir el preloader y el hero cinematografico.

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

## Integracion actual

- `src/main.tsx` registra plugins una sola vez.
- `src/app/AppProviders.tsx` monta `MotionPreferencesProvider`, activa `Lenis` y adjunta `refreshManager`.
- `src/features/home/HomePage.tsx` valida reveal y parallax ligero con contenido real.
- `src/features/navigation/Header.tsx` usa el sistema central para transiciones del header y drawer movil.
- `src/features/motion-lab/MotionLabPage.tsx` sirve como laboratorio interno bajo `?motion-lab=1`.

## Reglas activas

- Reduced motion desactiva `Lenis` y evita escenas scroll-linked.
- Mobile no activa escenas pinned u horizontales de laboratorio.
- Cada escena limpia triggers y estilos al desmontar.
- El laboratorio queda fuera de la navegacion publica y marcado como `noindex`.

## Deuda controlada

- Aun no existe primitive de split-text ni FLIP aplicada a escenas reales.
- El laboratorio valida arquitectura, no direccion artistica final.
- El JS inicial sigue por encima del objetivo de 250 KB gzip; la division perezosa del laboratorio ya reduce el impacto del siguiente bloque, pero el hero/preloader tendran que entrar con presupuesto estricto.
