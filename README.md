# SUBEROS

Base tecnica de SUBEROS construida con React, TypeScript, Vite, GSAP y Lenis. El proyecto ya dispone de shell semantico, design system inicial, assets propios auditados y una base de motion controlada para evolucionar hacia escenas cinematograficas posteriores.

## Estado actual

- Sprint 01 completado: auditoria, baseline, SEO, motion base y assets heredados verificados.
- Sprint 02 completado: design system, primitives de layout, shell accesible, header/menu/footer y linking interno estable.
- El siguiente foco recomendado es reforzar el motion system antes del hero y el preloader definitivos.

## Stack

- React 19
- TypeScript
- Vite
- GSAP + ScrollTrigger + `@gsap/react`
- Lenis

## Comandos

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview`

## Estructura actual

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
    footer/
    home/
    navigation/
  hooks/
  lib/
    gsap/
    seo/
    utils/
  styles/
    tokens.css
    reset.css
    typography.css
    utilities.css
    global.css
public/
  branding/
  legacy-source/
  legal/
docs/
```

## Design system

- Tokens centralizados en `src/styles/tokens.css`
- `src/styles/fonts.css` carga `StretchPro` local como display font actual
- Estilos base repartidos en `reset.css`, `typography.css`, `utilities.css` y `global.css`
- Primitives de layout: `Container`, `Section`, `Stack`, `Cluster`, `Grid`, `Bleed`, `Surface`
- UI components: `Button`, `TextLink`, `IconButton`, `Eyebrow`, `SectionHeader`, `MediaFrame`, `Divider`, `SkipLink`

Documentacion relacionada:

- `docs/DESIGN_SYSTEM.md`
- `docs/APP_SHELL.md`
- `docs/MOTION_SYSTEM.md`
- `docs/LEGACY_SITE_AUDIT.md`
- `docs/LEGACY_ASSET_INVENTORY.md`
- `docs/SPRINT_01_REPORT.md`
- `docs/SPRINT_02_REPORT.md`

## Shell y rutas

- Home SPA con anchors internos:
  - `#inicio`
  - `#estudio`
  - `#servicios`
  - `#proyectos`
  - `#proceso`
  - `#contacto`
- Paginas legales tecnicas temporales:
  - `/legal/aviso-legal.html`
  - `/legal/privacidad.html`
  - `/legal/cookies.html`

## Desarrollo

- Mantener contenido 100 % real y verificable.
- No hotlinkear assets del sitio legado.
- Los originales de fuentes legacy viven en `public/legacy-source/fonts/`; la tipografia display activada vive en `public/branding/fonts/StretchPro.otf`.
- Centralizar nuevos tokens y estados de UI; no duplicar CSS ad hoc.
- Registrar GSAP una sola vez y limpiar contextos/hook side effects.
- Validar siempre `npm run lint` y `npm run build` antes de cerrar un bloque.

## Validacion minima por sprint

- `npm install` o `npm ci`
- `npm run lint`
- `npm run build`
- revision de teclado
- revision de reduced motion
- revision responsive en `390x844`, `768x1024`, `1366x768` y `1440x900` si el tooling lo permite
- comprobacion de enlaces, menu y errores de consola
