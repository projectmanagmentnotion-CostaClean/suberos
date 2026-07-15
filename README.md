# SUBEROS

Base tecnica de SUBEROS construida con React, TypeScript, Vite, GSAP y Lenis. El proyecto ya dispone de shell semantico, design system inicial, assets propios auditados, arquitectura de motion endurecida, sistema de contacto bloqueado honestamente sin backend real y base SEO/legal preparada para evolucionar hacia escenas cinematograficas posteriores.

## Estado actual

- Sprint 01 completado: auditoria, baseline, SEO, motion base y assets heredados verificados.
- Sprint 02 completado: design system, primitives de layout, shell accesible, header/menu/footer y linking interno estable.
- Sprint 03 completado: arquitectura de motion endurecida, laboratorio interno, perfiles de preferencia y escenas reutilizables.
- Sprint 04 completado: preloader cinematografico con carga real, persistencia de sesion, transicion FLIP y hero foundation scroll-linked.
- Sprint 05 completado: narrativa inmersiva de home y estructura de conversion.
- Sprint 05.1 completado: aislamiento de repositorio y retirada de referencias cruzadas.
- Sprint 06 completado: sistema visual interno, pipeline de assets y Portfolio Lab privado.
- Sprint 07 completado: motor de frame sequences y Sequence Lab privado.
- Sprint 08 completado localmente: motor de contacto y conversion con QA local y bloqueo honesto de produccion sin backend real.
- Sprint 09 completado localmente: arquitectura SEO, legal, privacidad y compliance con preview de produccion en `127.0.0.1:4173`.
- Sprint 10 completado localmente: baseline de accesibilidad, teclado, inclusive motion y QA automatizada con aria + axe.

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
- `npm run qa:sequences`
- `npm run qa:contact`
- `npm run qa:privacy`
- `npm run qa:seo`
- `npm run qa:legal`
- `npm run qa:aria`
- `npm run qa:a11y`
- `npm run qa:a11y:axe`
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
    frame-sequence/
    footer/
    home/
    legal/
    motion-lab/
    navigation/
    not-found/
    sequence-lab/
  hooks/
  lib/
    accessibility/
    forms/
    gsap/
    seo/
    utils/
  motion/
  styles/
public/
  branding/
  hero/
  backgrounds/
  motion/
  portfolio/
  services/
  legacy-source/
  textures/
docs/
scripts/
tests/
```

## Rutas publicas y de QA

- Home:
  - `/#inicio`
  - `/#estudio`
  - `/#servicios`
  - `/#trabajo`
  - `/#proceso`
  - `/#contacto`
- Legales SPA:
  - `/legal/aviso-legal`
  - `/legal/privacidad`
  - `/legal/cookies`
  - `/legal/accesibilidad`
- Laboratorios internos:
  - `/?motion-lab=1`
  - `/?portfolio-lab=1`
  - `/?sequence-lab=1`
- QA del preloader:
  - `/?preloader=1`
  - `/?preloader=reset`
  - `/?preloader=1&asset-fail=1`

## Assets y tipografia

- Tokens centralizados en `src/styles/tokens.css`.
- `src/styles/fonts.css` carga `StretchPro` local como display font actual.
- La fuente original recuperada se conserva en:
  - `public/branding/fonts/StretchPro.otf`
  - `public/legacy-source/fonts/StretchPro.otf`
- StretchPro sigue pendiente de evidencia documental de licencia comercial y self-hosting.

## Documentacion clave

- `docs/ROADMAP.md`
- `docs/EU_WEB_APP_STANDARD.md`
- `docs/MOTION_SYSTEM.md`
- `docs/PROJECT_ISOLATION.md`
- `docs/CONTACT_SYSTEM.md`
- `docs/CONTACT_DATA_FLOW.md`
- `docs/VENDOR_AND_PROCESSOR_INVENTORY.md`
- `docs/LEGAL_OWNER_INFORMATION_REQUIRED.md`
- `docs/LEGAL_APPLICABILITY_MATRIX.md`
- `docs/SEO_ARCHITECTURE.md`
- `docs/COOKIE_AND_STORAGE_AUDIT.md`
- `docs/CONTENT_SECURITY_POLICY.md`
- `docs/SPA_SEO_LIMITATIONS.md`
- `docs/LEGAL_PAGE_STATUS.md`
- `docs/SPRINT_09_REPORT.md`
- `docs/WCAG_2_2_AA_AUDIT.md`
- `docs/ACCESSIBILITY_TEST_PLAN.md`
- `docs/INCLUSIVE_MOTION_AUDIT.md`
- `docs/SPRINT_10_REPORT.md`

## Reglas de desarrollo

- Mantener contenido 100 % real y verificable.
- No exponer proyectos, clientes ni rutas externas hasta contar con materiales aprobados para publicacion.
- No hotlinkear assets del sitio legado.
- No indexar laboratorios internos ni drafts del portfolio.
- No afirmar que el formulario envia emails reales mientras no exista backend de produccion aprobado.
- No permitir que el mock del formulario se active en preview publico por hostname; solo en QA explicita.
- Centralizar nuevos tokens, estados de UI y metadata; no duplicar logica ad hoc.
- Registrar GSAP una sola vez y limpiar contextos y side effects.
- Validar siempre `npm run qa:isolation`, `npm run qa:portfolio`, `npm run qa:sequences`, `npm run qa:contact`, `npm run qa:privacy`, `npm run qa:seo`, `npm run qa:legal`, `npm run qa:aria`, `npm run qa:a11y`, `npm run qa:a11y:axe`, `npm run lint`, `npm run build` y `npm run qa:visual` antes de cerrar un bloque grande.
