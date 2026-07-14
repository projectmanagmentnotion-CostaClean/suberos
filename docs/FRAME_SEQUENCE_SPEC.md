# Frame Sequence Spec

Fecha de referencia: 2026-07-14

## Objetivo

Documentar la especificacion real del sistema de frame sequences implementado en Sprint 07 para SUBEROS. Esta base existe para QA interna, integracion progresiva y preparacion de futuras escenas cinematicas aprobadas, no para publicar todavia secuencias reales de clientes.

## Estado implementado

- Motor real en `src/motion/sequences/`
- Render canvas real en `src/features/frame-sequence/`
- Laboratorio privado en `/?sequence-lab=1`
- Assets abstractos propios en `public/motion/lab/suberos-sequence-lab/`
- Manifiesto real en `src/motion/sequences/manifests/suberos-sequence-lab.manifest.json`
- Secuencia desactivada automaticamente en `reduced motion`
- Fallback controlado ante fallo de carga o decode

## Principios obligatorios

- Mejora progresiva: el poster siempre existe y la secuencia nunca es requisito para entender la pagina
- Sin hotlinking: todos los assets deben ser locales y con propiedad verificada
- Sin segundo ticker global: no crear un owner paralelo de RAF o ticker fuera de `scrollEngine.ts`
- Carga por ventanas: no precargar la secuencia completa
- Memoria acotada: cache limitada por perfil y limpieza activa de frames lejanos
- Reduced motion primero: si el usuario prefiere menos movimiento, no se activa canvas ni loader
- Fallback estricto: ante error visible, se pasa a imagen estatica sin romper layout ni scroll

## Arquitectura implementada

Piezas principales:

- `FrameSequenceController`
- `FrameSequenceLoader`
- `FrameSequenceCache`
- `FrameSequenceCanvas`
- `FrameSequenceScene`
- `sequenceManifest.ts`

Responsabilidades:

- `FrameSequenceController`: estado, perfil activo, progreso, visibilidad, pausa y sincronizacion de cache
- `FrameSequenceLoader`: cola de carga, concurrencia limitada, `AbortController`, decode y reintento
- `FrameSequenceCache`: cache en memoria con politica LRU y cierre de `ImageBitmap` cuando aplica
- `FrameSequenceCanvas`: dibujado reactivo, `ResizeObserver` y control de DPR
- `FrameSequenceScene`: puente con `ScrollTrigger`, `IntersectionObserver`, `visibilitychange` y fallback

## Rutas y privacidad

Rutas internas actuales:

- `/?sequence-lab=1`
- `/?sequence-lab=1&reduced-motion=1`
- `/?sequence-lab=1&asset-fail=1`

Reglas:

- `Sequence Lab` es interno
- `robots` debe quedar en `noindex,nofollow`
- no debe aparecer en la navegacion publica
- no debe figurar en `robots.txt` ni en el sitemap publico

## Manifiesto real

Secuencia actual: `suberos-sequence-lab`

Campos relevantes:

- `title`: `SUBEROS Sequence Lab`
- `aspectRatio`: `1.7777777778`
- `preloadRadius`: `4`
- `priorityFrames`: `1, 2, 3, 4`
- `loop`: `false`
- `ownershipConfirmed`: `true`
- `publicationApproved`: `false`
- `reducedMotionDisabled`: `true`

Poster y fallback:

- `poster`: `/motion/lab/suberos-sequence-lab/poster.webp`
- `fallbackImage`: `/motion/lab/suberos-sequence-lab/fallback.webp`

## Sets reales

### Desktop

- Perfil: `desktop`
- Ruta base: `/motion/lab/suberos-sequence-lab/desktop`
- Resolucion: `1600x900`
- Frames: `36`
- Extension: `webp`
- Peso estimado total: `737674` bytes
- Patron: `frame-{index}`
- Inicio: `1`

### Tablet

- Perfil: `tablet`
- Ruta base: `/motion/lab/suberos-sequence-lab/tablet`
- Resolucion: `1280x720`
- Frames: `28`
- Extension: `webp`
- Peso estimado total: `440064` bytes
- Patron: `frame-{index}`
- Inicio: `1`

### Mobile

- Perfil: `mobile`
- Ruta base: `/motion/lab/suberos-sequence-lab/mobile`
- Resolucion: `960x540`
- Frames: `24`
- Extension: `webp`
- Peso estimado total: `286724` bytes
- Patron: `frame-{index}`
- Inicio: `1`

## Seleccion de perfil

Perfiles disponibles del sistema:

- `full`
- `balanced`
- `reduced`

Comportamiento actual:

- `reduced`: no selecciona set, no carga frames y fuerza fallback
- `full`: prioriza `desktop`, despues `tablet`, despues `mobile`
- `balanced`: prioriza `tablet` en pantallas amplias cuando existe, despues `mobile`

## Cache, preload y concurrencia

Politica actual de cache:

- desktop/full: `18`
- tablet: `12`
- mobile o balanced: `8`
- reduced: `0`

Politica actual de concurrencia:

- desktop/full: `4`
- tablet/mobile/balanced: `2`
- reduced: `0`

Politica de preload:

- frame actual obligatorio
- ventana centrada con radio `4`
- prioridad extra para frames `1-4`
- pruning activo de claves fuera de la ventana

## Render y DPR

Sistema actual:

- canvas 2D
- `ResizeObserver`
- dibujo solo cuando cambia firma de frame o tamano
- `fit` configurable entre `cover` y `contain`

Cap actual de DPR:

- desktop/full: `2`
- tablet/mobile/balanced: `1.5`
- reduced: `1`

## Scroll y activacion

Integracion actual:

- un solo `ScrollTrigger` por escena
- `scrub` por defecto: `0.35`
- `pin` solo cuando el perfil es `full`, el viewport es al menos `1024` y la escena lo pide
- progreso de scroll sincronizado hacia el frame activo

Reglas de visibilidad:

- no cargar cuando la pagina esta oculta
- no cargar cuando la escena sale del viewport observado
- permitir pausa manual del loader en laboratorio

## Reduced motion y fallback

Reglas actuales:

- `reduced motion` deja el estado en `fallback`
- sin canvas activo
- sin frames cargados
- sin consumo de cache

Escenarios de fallback contemplados:

- frames ausentes
- respuesta HTTP invalida
- dimensiones incorrectas
- fallo de decode
- desactivacion manual con `asset-fail=1`

Estado esperado en error:

- `phase: error`
- `canvasActive: false`
- `usingFallback: true`
- mensaje de error visible en debug interno

## Naming real

Frames actuales:

- `desktop/frame-0001.webp`
- `tablet/frame-0001.webp`
- `mobile/frame-0001.webp`

Assets auxiliares:

- `poster.webp`
- `fallback.webp`
- `README.txt`

Manifiesto:

- `suberos-sequence-lab.manifest.json`

## Pipeline y validacion

Scripts reales:

- `node scripts/generate-sequence-lab-assets.mjs`
- `node scripts/generate-sequence-manifest.mjs`
- `npm run qa:sequences`

Validaciones exigidas:

- continuidad de numeracion
- dimensiones reales de cada frame
- bytes estimados del set
- rutas locales
- propiedad confirmada
- restriccion de secuencias privadas bajo `/motion/lab/`

## Limites actuales

- no se ha probado Safari iOS fisico
- no hay todavia secuencias publicas aprobadas
- el laboratorio usa una secuencia abstracta propia para validar el motor, no una pieza final de marca

## Siguiente condicion para produccion publica

Solo integrar frame sequences en rutas publicas cuando existan simultaneamente:

- assets reales aprobados para publicacion
- presupuesto de peso y decode medido por escena
- fallback aprobado por direccion visual
- QA responsive y accesible en dispositivos reales
- validacion tecnica final sin degradar home, scroll ni conversion
