# Sequence Lab

## Objetivo

Documentar el laboratorio interno de secuencias implementado en Sprint 07.

## Entrada

- `/?sequence-lab=1`
- `/?sequence-lab=1&reduced-motion=1`
- `/?sequence-lab=1&asset-fail=1`

## Propiedades

- lazy-loaded
- no indexable
- no enlazado en la navegacion publica
- fuera de `robots.txt`
- fuera de `sitemap.xml`
- sin proyectos reales
- sin clientes
- sin marcas externas

## Secuencia abstracta

Asset de laboratorio:

- `public/motion/lab/suberos-sequence-lab/`

Componentes visuales usados:

- gradiente charcoal
- composicion tipografica propia
- numeracion
- lineas
- mascara
- simbolo de SUBEROS

## Sets actuales

- desktop:
  - `36` frames
  - `1600x900`
  - `737674` bytes estimados
- tablet:
  - `28` frames
  - `1280x720`
  - `440064` bytes estimados
- mobile:
  - `24` frames
  - `960x540`
  - `286724` bytes estimados

## Estados visibles

El panel del laboratorio muestra:

- `phase`
- `profile`
- `frame`
- `loaded`
- `cache`
- `memory`
- `dpr cap`
- `canvas`
- `fallback`
- `error`

## Modo asset-fail

`?asset-fail=1` fuerza rutas inexistentes para comprobar:

- error controlado
- fallback estatico
- ausencia de pantalla negra
- consola limpia de excepciones no controladas

## Reduced motion

`?reduced-motion=1` fuerza:

- `phase: fallback`
- `canvas: off`
- `loadedFrames: 0`
- `memory: 0`

## Uso permitido

El laboratorio sirve para QA tecnica. No representa un trabajo final de SUBEROS ni debe enlazarse desde la experiencia publica actual.
