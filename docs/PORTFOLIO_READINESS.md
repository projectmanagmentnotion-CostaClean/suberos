# Portfolio Readiness

## Objetivo

Definir cuando un proyecto de SUBEROS puede pasar de borrador interno a publicacion real.

## Estados

- `draft`
  - material inicial sin revision completa
- `review`
  - en comprobacion editorial, SEO, legal o de assets
- `approved`
  - validado internamente pero no publicado
- `published`
  - visible en produccion
- `archived`
  - retirado de la publicacion activa

## Permisos

Un proyecto no puede pasar a `published` si falta cualquiera de estos campos:

- `clientPublicationApproved`
- `seoApproved`
- `copyApproved`
- `legalApproved`

## Assets

Cada `PortfolioMedia` debe tener:

- `src` local
- `width`
- `height`
- `approval`
- `ownershipConfirmed`
- `alt` cuando no sea decorativo

No se admite:

- hotlink remoto
- media sin dimensiones
- media informativa sin alt
- media pendiente o rechazada en proyectos publicados

## Copy y SEO

- Ningun proyecto publicado sale sin `summary`
- Ningun caso entra en SEO publico sin copy aprobado
- Drafts, review y approved privados no deben entrar en:
  - sitemap
  - structured data
  - rutas publicas enlazadas

## QA

Automatizada:

- `npm run qa:isolation`
- `npm run qa:portfolio`
- `npm run qa:visual`

Manual:

- revisar home y laboratorio interno
- revisar desktop, tablet y movil
- revisar reduced motion
- revisar consola y overflow

## Aprobacion

Checklist previa a publicacion:

- cliente autoriza publicacion
- assets autorizados y propios
- ownership confirmado
- alt y copy revisados
- SEO aprobado
- legal aprobado
- proyecto validado por `validatePortfolioProject`
- proyecto visible y correcto en `?portfolio-lab=1`

## Publicacion

- mover assets productivos a `public/portfolio/published/`
- mantener originales en `public/legacy-source/` cuando proceda
- añadir datos reales a `src/data/portfolioProjects.data.json`
- verificar que solo `published` se expone publicamente

## Retirada

Motivos de retirada:

- revocacion de permiso
- cambio de derechos
- error factual
- asset no autorizado
- contenido desactualizado que ya no representa a SUBEROS

Accion:

- cambiar estado a `archived`
- retirar assets de rutas publicas si aplica
- limpiar linking, sitemap y structured data asociados

## Checklist final

- Datos reales
- Slug valido
- Titulo real
- Categoria real
- Servicios reales
- Summary real
- Cliente autorizado
- SEO aprobado
- Copy aprobado
- Legal aprobado
- Media aprobada
- Ownership confirmado
- Sin hotlinks
- Sin errores bloqueantes
- QA automatizada en verde
- QA manual revisada
