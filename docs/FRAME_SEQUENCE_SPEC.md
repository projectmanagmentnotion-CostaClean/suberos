# Frame Sequence Spec

## Objetivo

Definir la base tecnica para futuras secuencias de fotogramas de SUBEROS sin activar todavia el reproductor final.

## Principios

- Secuencias como mejora progresiva
- Poster estatico obligatorio
- No cargar secuencias en perfil `reduced`
- Carga condicionada por viewport, perfil y presupuesto real
- Limpieza estricta de memoria y listeners

## Desktop

- Anchura objetivo:
  - 1600 a 1920 px segun escena
- DPR:
  - controlado; no asumir 2x en todos los casos
- Cantidad orientativa:
  - 60 a 120 frames
- Peso total objetivo:
  - validar por escena; empezar con 8 a 18 MB como rango de referencia y ajustar tras pruebas
- Preload:
  - por ventanas, no secuencia completa inicial
- Formato:
  - WebP o AVIF tras medir decode y banding

## Tablet

- Resolucion intermedia:
  - 1200 a 1440 px segun composicion
- Menos frames:
  - 40 a 80
- Menor duracion:
  - acortar recorrido efectivo
- Menos capas:
  - evitar overlays pesados simultaneos

## Movil

- Resolucion:
  - 720 a 1080 px segun composicion
- Cantidad:
  - 30 a 60 frames
- Fallback:
  - poster estatico por defecto
- Carga:
  - solo en perfiles `balanced` o `full` cuando el presupuesto lo permita
- Reduced:
  - no cargar secuencia

## Naming

- Frames:
  - `scene-slug-desktop-0001.webp`
  - `scene-slug-tablet-0001.webp`
  - `scene-slug-mobile-0001.webp`
- Poster:
  - `scene-slug-poster.webp`
- Fallback:
  - `scene-slug-fallback.webp`
- Manifest:
  - `scene-slug.manifest.json`

## Manifest JSON

Campos recomendados:

- `scene`
- `variant`
- `frameCount`
- `width`
- `height`
- `poster`
- `fallback`
- `frames[]`
- `estimatedBytes`
- `preloadWindow`
- `loop`

## Carga progresiva

- Cargar poster primero
- Cargar primera ventana de frames antes de iniciar
- Extender ventana segun scroll o proximidad
- Liberar frames lejanos cuando la escena ya no los necesite

## Memoria y limpieza

- Reutilizar buffers cuando sea viable
- Cancelar cargas al salir del viewport
- Limpiar referencias en `cleanup`
- Vigilar Safari iOS por presion de memoria

## Errores y fallback

- Si faltan frames:
  - bloquear reproduccion y usar poster
- Si falla decode:
  - usar fallback estatico
- Si el presupuesto de red o memoria se excede:
  - degradar a poster sin romper la narrativa

## Cache y CDN futuro

- Preparar rutas cacheables por nombre versionado
- Separar manifest y posters del bloque de frames
- Prever CDN solo cuando exista pipeline de publicacion y versionado real
