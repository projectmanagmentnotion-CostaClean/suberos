# Frame Sequence Engine

## Objetivo

Documentar la arquitectura del motor de secuencias por fotogramas implementado en Sprint 07 para SUBEROS.

## Arquitectura

Estructura real:

```text
src/
  features/
    frame-sequence/
      FrameSequenceCanvas.tsx
      FrameSequenceScene.tsx
      FrameSequenceFallback.tsx
      frame-sequence.css
    sequence-lab/
      SequenceLabPage.tsx
  motion/
    sequences/
      FrameSequenceController.ts
      FrameSequenceLoader.ts
      FrameSequenceCache.ts
      sequenceManifest.ts
      sequence.types.ts
      sequence.utils.ts
      manifests/
        suberos-sequence-lab.manifest.json
```

## Responsabilidades

- `FrameSequenceController.ts`
  - coordina manifest, perfil, viewport, estado y fallback
  - decide si la secuencia puede activarse o debe caer a imagen estatica
  - evita trabajo de canvas en `reduced`
- `FrameSequenceLoader.ts`
  - carga bajo demanda
  - limita concurrencia
  - prioriza frame actual y priority frames
  - reintenta una vez
  - aborta trabajo no critico cuando la escena deja de ser relevante
- `FrameSequenceCache.ts`
  - cache LRU limitada por perfil
  - libera `ImageBitmap` al expulsar entradas
- `FrameSequenceCanvas.tsx`
  - renderiza en canvas 2D
  - respeta DPR cap
  - usa `ResizeObserver`
  - solo redibuja cuando cambia frame o tamaño
- `FrameSequenceFallback.tsx`
  - asegura poster/fallback siempre presentes en HTML
- `FrameSequenceScene.tsx`
  - integra scroll, visibilidad, fallback, debug y cleanup
- `sequenceManifest.ts`
  - centraliza manifests y validacion basica

## Manifiestos

Cada secuencia define:

- `id`
- `title`
- `poster`
- `fallbackImage`
- `aspectRatio`
- `sets[]`
- `preloadRadius`
- `priorityFrames`
- `loop`
- `reducedMotionDisabled`
- `ownershipConfirmed`
- `publicationApproved`

Reglas activas:

- solo rutas locales
- poster y fallback obligatorios
- ownership obligatorio
- sets tipados por perfil
- ninguna URL remota

## Loader

Estrategia actual:

- el poster se sirve en HTML desde el primer render
- el controlador solicita el frame actual cuando la escena es visible
- el loader carga el frame objetivo y luego abre una ventana alrededor de el
- se abortan tareas no criticas al salir del viewport o al ocultar la pestaña
- no se lanzan cientos de promesas a la vez

## Cache

Politica actual:

- `desktop/full`: hasta 18 frames
- `tablet/balanced`: hasta 12 frames
- `mobile/balanced`: hasta 8 frames
- `reduced`: 0

La cache se recorta a la ventana de preload vigente y expulsa por orden LRU.

## Canvas

- motor principal: Canvas 2D
- sin WebGL
- DPR cap:
  - desktop/full: `2`
  - balanced/mobile/tablet: `1.5`
  - reduced: `1`
- render `cover` por defecto
- redraw solo por cambio real de frame o tamaño

## Lifecycle

Estados principales:

- `idle`
- `poster`
- `loading`
- `ready`
- `fallback`
- `error`

Eventos principales:

- configuracion inicial por perfil y viewport
- entrada/salida de viewport mediante `IntersectionObserver`
- visibilidad de pestaña mediante `visibilitychange`
- progreso de scroll por `ScrollTrigger`
- resize por `ResizeObserver`
- cleanup al desmontar o cambiar de modo

## Cleanup

El motor libera:

- tareas de carga no criticas
- listeners de visibilidad
- observers
- `ImageBitmap` expulsados de cache
- `ScrollTrigger` de la escena

No crea ticker GSAP adicional ni un RAF global continuo para el canvas.

## Fallback

La escena nunca queda negra:

- `reduced` -> fallback estatico
- error de frame -> fallback estatico
- asset fail intencionado en laboratorio -> fallback estatico
- falta de visibilidad -> poster/fallback permanecen presentes en HTML
