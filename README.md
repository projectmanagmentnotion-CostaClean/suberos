# SUBEROS

Base tecnica de SUBEROS construida con React, TypeScript, Vite, GSAP y Lenis. El proyecto ya dispone de shell semantico, design system inicial, assets propios auditados y una arquitectura de motion endurecida para evolucionar hacia escenas cinematograficas posteriores.

## Estado actual

- Sprint 01 completado: auditoria, baseline, SEO, motion base y assets heredados verificados.
- Sprint 02 completado: design system, primitives de layout, shell accesible, header/menu/footer y linking interno estable.
- Sprint 03 completado: arquitectura de motion endurecida, laboratorio interno, perfiles de preferencia y escenas reutilizables.
- Sprint 04 completado: preloader cinematografico con carga real, persistencia de sesion, transicion FLIP y hero foundation scroll-linked.
- Sprint 05 completado: narrativa inmersiva de home, escenas editoriales y estructura de conversion para la home publica.
- Sprint 05.1 completado: aislamiento de repositorio, retirada de referencias cruzadas y sustitucion del bloque de proyectos por una seccion editorial propia.
- Sprint 06 completado: sistema visual interno, pipeline de assets, Portfolio Lab privado y readiness del portfolio sin publicar casos ficticios.
- El siguiente foco recomendado es Phase 7: frame sequences y media avanzada una vez existan materiales reales aprobados para motion.

## Stack

- React 19
- TypeScript
- Vite
- GSAP + ScrollTrigger + `@gsap/react`
- Lenis

## Comandos

- `npm install`
- `npm run dev`
- `npm run qa:isolation`
- `npm run qa:portfolio`
- `npm run qa:visual`
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
    motion-lab/
    navigation/
  hooks/
  lib/
    gsap/
    seo/
    utils/
  motion/
  styles/
    tokens.css
    reset.css
    typography.css
    utilities.css
    global.css
public/
  branding/
  hero/
  backgrounds/
  motion/
  portfolio/
  services/
  legacy-source/
  textures/
  legal/
docs/
```

## Design system and motion

- Tokens centralizados en `src/styles/tokens.css`
- `src/styles/fonts.css` carga `StretchPro` local como display font actual
- La fuente original recuperada tambien se conserva en:
  - `public/branding/fonts/StretchPro.otf`
  - `public/legacy-source/fonts/StretchPro.otf`
- Tambien permanecen en legacy las fuentes verificadas `couture-bld.otf` y `Oswald-VariableFont_wght.ttf`
- El sistema visual de Sprint 06 anade primitives reutilizables para media editorial, placeholders premium y revisiones internas de portfolio
- Primitives de layout: `Container`, `Section`, `Stack`, `Cluster`, `Grid`, `Bleed`, `Surface`
- UI components: `Button`, `TextLink`, `IconButton`, `Eyebrow`, `SectionHeader`, `MediaFrame`, `Divider`, `SkipLink`
- Nuevas piezas de motion viven en `src/motion/`
- El preloader vive en `src/features/preloader/` y el hero foundation en `src/features/home/`

Documentacion relacionada:

- `docs/DESIGN_SYSTEM.md`
- `docs/APP_SHELL.md`
- `docs/MOTION_SYSTEM.md`
- `docs/MOTION_ARCHITECTURE.md`
- `docs/MOTION_PERFORMANCE_BUDGET.md`
- `docs/MOTION_QA.md`
- `docs/PRELOADER_SYSTEM.md`
- `docs/HERO_SYSTEM.md`
- `docs/ASSET_PIPELINE.md`
- `docs/HOME_NARRATIVE.md`
- `docs/HOME_SCENES.md`
- `docs/PROJECT_CONTENT_MODEL.md`
- `docs/PROJECT_ISOLATION.md`
- `docs/SUBEROS_VISUAL_ASSET_INVENTORY.md`
- `docs/SUBEROS_ASSET_PRODUCTION_BRIEF.md`
- `docs/FRAME_SEQUENCE_SPEC.md`
- `docs/PORTFOLIO_READINESS.md`
- `docs/LEGACY_SITE_AUDIT.md`
- `docs/LEGACY_ASSET_INVENTORY.md`
- `docs/SPRINT_01_REPORT.md`
- `docs/SPRINT_02_REPORT.md`
- `docs/SPRINT_03_REPORT.md`
- `docs/SPRINT_04_REPORT.md`
- `docs/SPRINT_05_REPORT.md`
- `docs/SPRINT_05_1_REPORT.md`

## Shell y rutas

- Home SPA con anchors internos:
  - `#inicio`
  - `#estudio`
  - `#servicios`
  - `#trabajo`
  - `#proceso`
  - `#contacto`
- Laboratorio interno:
  - `/?motion-lab=1`
  - `/?motion-lab=1&reduced-motion=1`
  - `/?portfolio-lab=1`
  - `/?portfolio-lab=1&reduced-motion=1`
- QA del preloader:
  - `/?preloader=1`
  - `/?preloader=reset`
  - `/?preloader=1&asset-fail=1`
- Paginas legales tecnicas temporales:
  - `/legal/aviso-legal.html`
  - `/legal/privacidad.html`
  - `/legal/cookies.html`

## Desarrollo

- Mantener contenido 100 % real y verificable.
- No exponer proyectos, clientes ni rutas externas hasta contar con materiales aprobados para publicacion.
- No hotlinkear assets del sitio legado.
- No indexar laboratorios internos ni drafts del portfolio.
- Centralizar nuevos tokens y estados de UI; no duplicar CSS ad hoc.
- Registrar GSAP una sola vez y limpiar contextos y side effects.
- Usar `src/motion/` como entrypoint de nuevas escenas, no crear hooks GSAP ad hoc fuera del sistema salvo compatibilidad puntual.
- Validar siempre `npm run qa:isolation`, `npm run qa:portfolio`, `npm run lint`, `npm run build` y `npm run qa:visual` antes de cerrar un bloque grande.

## Validacion minima por sprint

- `npm install` o `npm ci`
- `npm run qa:isolation`
- `npm run lint`
- `npm run build`
- revision de teclado
- revision de reduced motion
- revision responsive en `390x844`, `768x1024`, `1366x768` y `1440x900` si el tooling lo permite
- comprobacion de enlaces, menu y errores de consola
