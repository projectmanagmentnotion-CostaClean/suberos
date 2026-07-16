# Project Isolation

## Objetivo

Evitar que la web publica, el codigo activo y la documentacion viva de SUBEROS mezclen proyectos, clientes, rutas o assets ajenos antes de contar con aprobacion expresa para publicarlos.

## Que se considera contaminacion cruzada

- nombres de proyectos o clientes no aprobados para la web publica actual
- rutas externas presentadas como portfolio propio
- capturas o assets de proyectos separados usados como contenido editorial publico
- metadatos, JSON-LD, OG, breadcrumbs o sitemap con referencias ajenas
- variables, componentes o docs vivas que mantengan esos contenidos como parte del producto actual

## Busquedas ejecutadas

- auditoria repo-wide de terminos prohibidos y URLs externas no aprobadas
- revision manual de `src/`, `public/`, `README.md` y la documentacion activa de home, content model, motion y roadmap

## Referencias eliminadas o aisladas

- proyecto externo retirado de la home publica
- modelo `featuredProjects` eliminado
- CTA y linking internos hacia `#proyectos` sustituidos por `#trabajo`
- nota de portfolio actualizada para indicar que no hay casos publicados
- activos y rutas legacy mantenidos solo como referencia historica en auditoria legacy, no como contenido publico actual

## Referencias legitimas conservadas

- `https://suberos.com/` como canonical y dominio corporativo
- `https://schema.org` en JSON-LD
- `http://www.sitemaps.org/schemas/sitemap/0.9` en `public/sitemap.xml`
- inventario y auditoria legacy necesarios para trazabilidad historica

## Politica para futuros contenidos

- solo contenido `published` puede salir en la web publica
- todo proyecto necesita copy, assets, permiso de publicacion y ownership documentado
- `public/portfolio/published/` permanece vacio hasta que exista ese material aprobado
- `public/portfolio/drafts/` y `public/portfolio/approved/` no deben ser referenciados desde la web publica
- si no hay portfolio publicado, la home debe usar composiciones editoriales propias, nunca proyectos inventados
- `?portfolio-lab=1` es una herramienta interna, no una ruta publica indexable
- el formulario publico no puede prometer entrega real mientras no exista backend de produccion aprobado
- el mock de contacto debe permanecer restringido a localhost y fuera del build publico

## Script automatizado

- archivo: `scripts/check-project-isolation.mjs`
- comando: `npm run qa:isolation`
- alcance:
  - `src/`
  - `README.md`
  - `index.html`
  - `public/robots.txt`
  - `public/sitemap.xml`
  - documentacion viva asociada a narrativa, assets, motion, roadmap e informes actuales
- excluye reportes historicos y auditorias legacy para evitar falsos positivos en registros de trazabilidad

## Checklist de release

- ejecutar `npm run qa:isolation`
- verificar que no existan enlaces externos accidentales en home, SEO o docs activas
- ejecutar `npm run qa:portfolio`
- revisar `public/portfolio/`, `public/services/`, `public/motion/` y `public/legacy-source/`
- confirmar que sitemap, robots y metadata solo exponen contenido actual de SUBEROS
- documentar cualquier excepcion tecnica o historica antes del commit
