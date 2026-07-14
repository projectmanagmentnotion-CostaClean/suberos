# Project Content Model

## Objetivo

Definir una base tipada para proyectos sin abrir todavia paginas de caso completas ni inventar contenido.

## Tipo actual

Archivo fuente:

- `src/data/featuredProjects.ts`

Campos:

- `slug`
- `name`
- `category`
- `services`
- `summary`
- `description`
- `primaryVisual`
  - `alt`
  - `mode`
- `href`
- `linkLabel`
- `notes`
- `routeKind`
- `seoLabel`
- `status`

## Estado

- `published`: puede mostrarse en la home
- `pending`: no debe mostrarse como caso terminado en la web publica

## Reglas

- no inventar clientes, premios, metricas, resultados ni testimonios
- no publicar proyectos `pending` como si fueran terminados
- si faltan capturas o media, usar composicion temporal claramente documentada
- toda ruta debe ser real
- toda relacion servicio-proyecto debe estar respaldada por contenido confirmado

## Caso actual

- `Luxury Shisha`
  - estado: `published`
  - ruta real: `https://suberos.com/shisha/`
  - uso actual: proyecto destacado de la home
  - limitacion: capturas finales pendientes de aprobacion y optimizacion

## Rutas futuras

- fase 6: rutas propias SEO-ready por proyecto
- mientras tanto, la home puede enlazar solo a destinos reales ya existentes
