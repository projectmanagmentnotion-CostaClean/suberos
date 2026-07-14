# Project Content Model

## Objetivo

Mantener una base tipada y neutral para portfolio sin exponer proyectos publicos hasta contar con materiales aprobados.

## Tipo actual

Archivo fuente:

- `src/data/portfolioProjects.ts`

Campos:

- `slug`
- `title`
- `status`
- `notes`

## Estado

- `draft`: material no listo para revision publica
- `approved`: contenido validado internamente, aun no expuesto
- `published`: unico estado visible en la web publica
- `archived`: historial no expuesto

## Reglas

- no inventar clientes, premios, metricas, resultados ni testimonios
- no publicar proyectos `draft`, `approved` o `archived`
- si no hay elementos `published`, la home debe usar una solucion editorial propia en lugar de un grid vacio
- toda ruta futura debe ser real y estar respaldada por contenido confirmado
- toda relacion servicio-proyecto debe activarse solo cuando exista material aprobado para ese caso

## Estado actual

- `portfolioProjects` permanece vacio en la web publica actual
- la home utiliza `src/data/workShowcase.ts` para representar capacidades reales de SUBEROS sin fingir portfolio publicado
- la arquitectura queda lista para incorporar proyectos `published` cuando existan permisos, assets y copy aprobados

## Rutas futuras

- fase 6: rutas propias SEO-ready por proyecto, solo con materiales aprobados
- mientras tanto, la home no debe enlazar a casos externos ni a paginas thin
