# SEO Architecture

Fecha: 2026-07-14

## Hallazgos del sprint

- La home dependia de metadata estatica en `index.html`.
- Los laboratorios internos mutaban `document.title` y `robots` manualmente.
- Las paginas legales antiguas existian como HTML tecnico aislado.
- No existia 404 integrada en la aplicacion.
- El bug conocido de `noindex,nofollow` persistente era posible al salir de labs.

## Arquitectura aplicada

### Fuente de verdad

- `src/app/routes.ts`
  - centraliza rutas publicas, legales, anchors de la home y compatibilidad con las antiguas URLs `.html`
- `src/data/seoPageMetadata.ts`
  - define el contrato SEO por tipo de ruta
- `src/lib/seo/useDocumentMetadata.ts`
  - sincroniza `title`, `description`, `canonical`, `robots`, Open Graph, Twitter, manifest y JSON-LD
- `src/lib/seo/seo.types.ts`
  - tipa el sistema de metadatos reutilizable

### Rutas auditadas

- Home indexable:
  - `/`
- Legales provisionales no indexables:
  - `/legal/aviso-legal`
  - `/legal/privacidad`
  - `/legal/cookies`
  - `/legal/accesibilidad`
- Labs internos no indexables:
  - `/?motion-lab=1`
  - `/?portfolio-lab=1`
  - `/?sequence-lab=1`
- 404 no indexable:
  - cualquier ruta no reconocida

## Home SEO

- Title:
  - `SUBEROS - Estudio creativo de fotografia, diseno, produccion y web`
- Canonical:
  - `https://suberos.com/`
- Meta description:
  - basada en servicios reales y CTA, sin ubicaciones, premios ni clientes inventados
- Open Graph y Twitter:
  - imagen propia `public/branding/suberos-social-card.png`
  - dimensiones `1200x630`
  - sin hotlinks

## Structured data

Se publica solo informacion verificable:

- `Organization`
- `WebSite`
- `WebPage`
- `ContactPoint`

No se publican:

- reviews;
- rating;
- clientes;
- premios;
- direccion completa;
- `priceRange`;
- redes no confirmadas;
- geodatos.

## Sitemap y robots

- `public/sitemap.xml` mantiene solo `/`
- `public/robots.txt` permite rastreo y referencia el sitemap
- Los labs quedan fuera del sitemap y reciben `noindex,nofollow` en runtime
- Las paginas legales provisionales tambien se mantienen fuera del sitemap mientras sigan bloqueadas para indexacion publica

## 404 y restauracion

- La 404 forma parte de la SPA y restaura metadata propia `noindex,nofollow`
- Al volver de una ruta de laboratorio o legal a la home se restaura la metadata indexable centralizada

## Riesgos abiertos

- La metadata sigue siendo client-side; conviene evaluar prerender o HTML por ruta en una fase posterior.
- Las paginas legales son profesionalmente visibles pero siguen marcadas como provisionales y no indexables hasta completar datos obligatorios.
