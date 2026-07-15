# Frame Sequence Memory

## Objetivo

Registrar la politica de memoria del motor de secuencias de SUBEROS, con foco en moviles y Safari iOS.

## Limites activos

- desktop/full:
  - hasta 18 frames en cache
  - DPR cap `2`
- tablet:
  - hasta 12 frames en cache
  - DPR cap `1.5`
- mobile:
  - hasta 8 frames en cache
  - DPR cap `1.5`
- reduced:
  - sin frames
  - sin canvas activo

## Liberacion

La liberacion ocurre por:

- expulsion LRU
- poda a la ventana de preload
- salida de viewport
- pestaña oculta
- desmontaje

`ImageBitmap` se cierra explicitamente al expulsarse de cache.

## Safari iOS

Politica actual:

- se intenta `createImageBitmap()` cuando existe
- si falla, se cae a `HTMLImageElement.decode()` o carga convencional
- no se depende de una sola API
- no se usa WebGL

## Canvas

- el canvas no redibuja en bucle continuo
- solo redibuja cuando cambia:
  - frame
  - tamaño
  - DPR efectivo

## Pestaña oculta

Al ocultarse la pestaña:

- se aborta carga no critica
- no se siguen precargando frames
- al volver, el controlador retoma la ventana alrededor del frame actual

## Desmontaje

Al desmontar:

- se matan triggers
- se detiene la carga
- se liberan observers
- se vacia cache del controlador

## Observabilidad

El laboratorio interno expone:

- frames cargados
- tamaño de cache
- memoria aproximada en bytes
- estado del canvas
- error actual
## Sprint 11 update - 2026-07-15

- La home publica no carga frame sequences.
- `qa:performance` sigue validando que los labs permanezcan lazy.
- No se detectaron regresiones de bundle por cargar assets de Sequence Lab en la home.
- La validacion de memoria de secuencias sigue limitada a laboratorio local; Safari iOS fisico continua pendiente.
