# Sprint 05.1 Report

## Sprint

SUBEROS Repository Isolation and Content Correction

## Objetivo cumplido

Eliminar la exposicion publica de proyectos, rutas y referencias ajenas sin desmontar la arquitectura React, TypeScript, GSAP, Lenis, AppShell, preloader ni la narrativa editorial ya construida.

## Auditoria real

- La contaminacion cruzada estaba concentrada en la home publica y en la documentacion viva del Sprint 05.
- `src/data/featuredProjects.ts` exponia `Luxury Shisha` como proyecto `published`.
- `src/features/home/FeaturedProjectsSection.tsx` enlazaba a `https://suberos.com/shisha/` desde la home.
- `homeContent`, `siteNavigation`, `services` y `MOTION_QA` seguian usando `#proyectos` y copy derivado del caso externo.
- `public/projects/` no contenia assets publicados, por lo que no habia media ajena en produccion dentro del repo.
- Los assets legacy de marca de SUBEROS siguen siendo validos y se conservan.

## Solucion aplicada

- Se elimino el modelo publico `featuredProjects`.
- Se creo `src/data/portfolioProjects.ts` con estado neutral `draft | approved | published | archived`.
- `portfolioProjects` queda vacio en la version publica actual.
- Se creo `src/data/workShowcase.ts` para representar capacidades reales de SUBEROS sin fingir portfolio publicado.
- La home sustituyo `FeaturedProjectsSection` por `FeaturedWorkSection`.
- La navegacion cambia de `#proyectos` a `#trabajo`.
- El CTA principal del hero pasa de `Ver proyectos` a `Ver servicios`.
- El CTA del servicio web deja de sugerir un proyecto relacionado inexistente y apunta al bloque editorial de trabajo.
- Se anadio `scripts/check-project-isolation.mjs` y el comando `npm run qa:isolation`.

## Referencias encontradas

- `Luxury Shisha`
- `https://suberos.com/shisha/`
- `/shisha/`
- `shisha-landing`

## Referencias eliminadas del contenido publico actual

- `src/data/featuredProjects.ts`
- `src/features/home/FeaturedProjectsSection.tsx`
- menciones activas a `Luxury Shisha` en `src/data/homeContent.ts`
- anchors y CTAs hacia `#proyectos`
- referencia publica al caso externo en `README.md`, `HOME_NARRATIVE.md`, `HOME_SCENES.md`, `PROJECT_CONTENT_MODEL.md`, `MOTION_QA.md` y `ROADMAP.md`

## Referencias legitimas conservadas

- dominio canonical `https://suberos.com/`
- `https://schema.org` en JSON-LD
- namespace del sitemap `http://www.sitemaps.org/schemas/sitemap/0.9`
- registros historicos en `docs/LEGACY_SITE_AUDIT.md`, `docs/SPRINT_01_REPORT.md` y `docs/SPRINT_05_REPORT.md`

## Assets y aislamiento

- no habia assets de `Luxury Shisha` en `public/projects/`
- `public/projects/` permanece vacio salvo `.gitkeep`
- el favicon legacy de `shisha` queda documentado como rechazado para produccion en `docs/LEGACY_ASSET_INVENTORY.md`
- se conservan sin cambios los assets propios de marca de SUBEROS y la fuente `StretchPro`

## SEO y linking

- sin rutas externas de proyecto en la home publica
- sitemap y robots siguen limitados al contenido corporativo actual
- metadata corporativa sin referencias a casos externos
- linking interno actualizado a `#trabajo`

## Accesibilidad y motion

- se mantiene un unico `h1`
- la nueva seccion editorial usa el mismo sistema de reveal y fallback reducido
- reduced motion sigue mostrando el contenido en orden natural
- no se introduce nueva dependencia ni nuevo motor de motion

## Privacidad y legal

- este sprint no anade nuevos trackers, cookies, embeds ni tratamiento de datos personales
- no se anaden proveedores externos ni transferencias nuevas

## Bundle esperado

- el cambio elimina contenido ajeno y no introduce nuevas dependencias
- la medicion final debe confirmarse tras `npm run build`

## Siguiente fase recomendada

Phase 6, pero solo cuando exista un caso real de SUBEROS con assets, copy y permiso de publicacion aprobados.
