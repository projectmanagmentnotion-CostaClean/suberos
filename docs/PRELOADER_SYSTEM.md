# Preloader System

## Objetivo

El preloader de SUBEROS cubre la primera entrada cinematografica sin bloquear accesibilidad, navegacion ni scroll restore. La implementacion vive en `src/features/preloader/` y queda desacoplada del contenido del hero salvo por los targets visuales de salida.

## Arquitectura

- `Preloader.tsx`: orquesta assets criticos, salida, FLIP y coordinacion con header y refresh.
- `usePreloader.ts`: controla carga real, timeout, sessionStorage, smoothing de progreso y estados.
- `PreloaderLogo.tsx`: composicion visual del logotipo.
- `PreloaderProgress.tsx`: contador y linea de progreso.
- `preloader.types.ts`: tipos de assets y estados.
- `preloader.css`: direccion visual, backdrop, grain, sheen y layout.

## Assets criticos

Se precargan solo assets del primer viewport:

- `/branding/suberos-icon-192.png` - 15,917 B
- `/branding/suberos-icon-32.png` - 1,698 B
- `1em StretchPro` via `document.fonts.load()` - fuente display critica
- `/branding/suberos-logo-symbol.webp` - 77,016 B

No se precargan Motion Lab, assets below the fold, videos ni proyectos.

## Progreso real y resolucion

- Cada asset resuelto actualiza `targetProgressRef`.
- `displayProgress` se suaviza con `setInterval` cada 33 ms para evitar bloqueos por `requestAnimationFrame` en contextos throttled.
- `READINESS_THRESHOLD` = `0.985`.
- El estado final puede resolverse por:
  - `assets-ready`
  - `timeout`
  - `session-skip`

## Timeout y errores

- Perfil `full`: `4200 ms`
- Perfil `balanced`: `3000 ms`
- Perfil `reduced`: se omite salvo QA forzado

Los assets fallidos no bloquean la entrada. Se registran en `failedAssetIds` y la experiencia continua con fallback visual.

## Persistencia de sesion

- Clave: `suberos.preloader.seen.v1`
- Primera visita de sesion: preloader completo o balanceado segun perfil
- Siguientes cargas: salto directo
- QA:
  - `?preloader=1` fuerza ejecucion
  - `?preloader=reset` limpia la sesion
  - `?asset-fail=1` simula fallo del visual principal

## Perfiles

- `full`: desktop con pointer fino y sin reduced motion; usa FLIP completo y timings mas largos.
- `balanced`: comportamiento por defecto en touch/no-desktop; conserva entrada y salida pero reduce carga y recorrido.
- `reduced`: omite o simplifica el preloader; sin FLIP complejo ni scrub.

## Scroll lock

`src/hooks/useBodyScrollLock.ts` usa lock por referencia con:

- preservacion de `scrollY`
- `position: fixed`
- `overscroll-behavior`
- `touch-action`
- restauracion del scroll al liberar el ultimo lock

Esto cubre preloader y drawer sin compartir hacks fragiles.

## Timeline y transicion

Secuencia actual:

1. fondo negro y grain visibles de inmediato
2. entrada del logo con escala y opacidad
3. sheen horizontal en loop
4. progreso real hacia `100`
5. FLIP del emblema hacia `[data-hero-emblem]`
6. FLIP de la linea hacia `[data-hero-divider]`
7. clip vertical del panel
8. aparicion del header
9. `refreshManager.requestRefresh('preloader-finish')`

En `reduced` la salida es fade simple sin FLIP.

## Accesibilidad

- root con `aria-hidden="true"` y `role="presentation"`
- texto asistivo estable, sin live region por frame
- no atrapa foco
- reduced motion respetado
- si JS o assets fallan, el hero sigue siendo accesible

## QA ejecutada

- primera sesion
- segunda carga de sesion
- `?preloader=1`
- `?preloader=1&reduced-motion=1`
- `?preloader=1&asset-fail=1`
- verificacion de header visible al finalizar
- verificacion de ausencia de errores de consola en la build revisada
