# Frame Sequence Loading

## Objetivo

Explicar la politica de carga progresiva del motor de secuencias de SUBEROS.

## Principios

- Nunca cargar todos los frames de golpe
- El HTML siempre expone poster y fallback
- El frame actual tiene prioridad maxima
- La secuencia solo trabaja si la escena y la pestaña siguen activas

## Prioridades

Orden de carga:

1. poster en HTML
2. frame actual
3. `priorityFrames`
4. ventana alrededor del frame actual

## Concurrencia

Limites iniciales:

- desktop/full: `4`
- tablet/mobile balanced: `2`
- reduced: `0`

Estos limites son presupuestos de partida y pueden reajustarse tras pruebas reales de decode o memoria.

## Ventanas

Ventana actual del laboratorio:

- `preloadRadius: 4`

Eso significa:

- mantener el frame actual
- cargar alrededor
- expulsar frames lejanos cuando ya no aportan valor inmediato

## Errores

El loader controla:

- `fetch` fallido
- respuesta no OK
- decode fallido
- dimensiones inesperadas

Estrategia:

- un reintento
- si vuelve a fallar, error controlado
- fallback estatico visible

## Cancelacion

La cancelacion ocurre cuando:

- la escena sale del viewport
- la pestaña se oculta
- el controlador cambia de perfil o set
- el componente se desmonta

Se usa `AbortController` donde el `fetch` lo permite.

## Cache y carga lenta

- la cache mantiene solo frames proximos
- la memoria aproximada se expone en el panel interno
- el laboratorio muestra `error`, `fallback`, `cache` y `loadedFrames`
- en conexiones lentas el contenido sigue siendo legible gracias al poster/fallback
