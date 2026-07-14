# Project Content Model

## Objetivo

Mantener una base tipada y neutral para portfolio sin exponer proyectos publicos hasta contar con materiales aprobados.

## Tipo actual

Archivo fuente:

- `src/data/portfolioProjects.ts`
- `src/data/portfolioProjects.data.json`

Estados de publicacion:

- `draft`: material no listo para revision publica
- `review`: pendiente de comprobacion editorial, SEO o legal
- `approved`: contenido validado internamente, aun no expuesto
- `published`: unico estado visible en la web publica
- `archived`: historial no expuesto

Estados de asset:

- `pending`
- `approved`
- `rejected`

Modelo base:

- `PortfolioProject`
  - `id`
  - `slug`
  - `status`
  - `title`
  - `category`
  - `summary?`
  - `services[]`
  - `year?`
  - `clientDisplayName?`
  - `clientPublicationApproved`
  - `media[]`
  - `seoApproved`
  - `copyApproved`
  - `legalApproved`
- `PortfolioMedia`
  - `id`
  - `type`
  - `src`
  - `mobileSrc?`
  - `poster?`
  - `alt?`
  - `width`
  - `height`
  - `approval`
  - `ownershipConfirmed`
  - `priority?`
  - `decorative?`
  - `credit?`

## Reglas

- no inventar clientes, premios, metricas, resultados ni testimonios
- no publicar proyectos `draft`, `review`, `approved` o `archived`
- si no hay elementos `published`, la home debe usar una solucion editorial propia en lugar de un grid vacio
- toda ruta futura debe ser real y estar respaldada por contenido confirmado
- toda relacion servicio-proyecto debe activarse solo cuando exista material aprobado para ese caso
- `approved` no significa publicado
- ningun asset pendiente o rechazado puede entrar en produccion
- ningun proyecto puede ser `published` sin permisos de cliente, SEO, copy y legal
- los drafts y approved privados no deben entrar en sitemap, structured data ni linking publico
- no se permite hotlink remoto en `media.src`, `mobileSrc` o `poster`

## Validacion

- `validatePortfolioProject(project)` devuelve:
  - `blockingErrors`
  - `warnings`
  - `pendingData`
  - `publishable`
- `getPortfolioValidationSummary()` consolida:
  - recuento de `published`
  - items publicables
  - errores bloqueantes
  - warnings
  - datos pendientes

## Estado actual

- `portfolioProjects` permanece vacio en la web publica actual
- la home utiliza `src/data/workShowcase.ts` para representar capacidades reales de SUBEROS sin fingir portfolio publicado
- la arquitectura queda lista para incorporar proyectos `published` cuando existan permisos, assets, ownership y copy aprobados
- el laboratorio interno `?portfolio-lab=1` consume el mismo modelo sin crear rutas publicas de portfolio

## Rutas futuras

- fase 6: rutas propias SEO-ready por proyecto, solo con materiales aprobados
- mientras tanto, la home no debe enlazar a casos externos ni a paginas thin
