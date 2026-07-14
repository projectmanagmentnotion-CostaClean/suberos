# SUBEROS

Base tecnica de SUBEROS construida con React, TypeScript, Vite, GSAP y Lenis. Este repositorio queda preparado para evolucionar hacia escenas cinematicas mas complejas sin perder accesibilidad, rendimiento ni mantenibilidad.

## Stack

- React 19
- TypeScript
- Vite
- GSAP + ScrollTrigger + `@gsap/react`
- Lenis

## Scripts

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview`

## Estructura

```text
src/
  app/
  components/
    layout/
    motion/
    ui/
  data/
  features/
    contact/
    home/
  hooks/
  lib/
    gsap/
    seo/
  styles/
public/
  backgrounds/
  branding/
  legacy-source/
  motion/
  projects/
docs/
```

## Assets

- Los originales recuperados de la web heredada viven temporalmente en `public/legacy-source/`.
- Solo las versiones aprobadas para produccion se usan desde `public/branding/`.
- No se hotlinkea ningun asset de `suberos.com`.

## Notas de deployment

- `public/robots.txt` y `public/sitemap.xml` forman la base SEO inicial.
- El HTML principal incluye favicon local, canonical y metadatos Open Graph basados en informacion confirmada.
- La animacion actual es deliberadamente pequena: valida limpieza de GSAP, reduced motion y sincronizacion de scroll antes del sprint cinematografico.
