# Sprint 02 Report

Fecha de cierre: 2026-07-14

## Objetivo

Construir el sistema visual y estructural de SUBEROS antes de las escenas cinematograficas pesadas.

## Hallazgos reales

- La shell del Sprint 01 era funcional pero demasiado minima para soportar una home editorial compleja.
- No existian primitives de layout reutilizables.
- El header no cubria `inicio`, `proyectos` ni `proceso`, ni tenia menu movil.
- El CTA, footer y estados interactivos no estaban centralizados en componentes UI.
- Los estilos seguian demasiado concentrados en `app.css`.

## Decisiones

- Mantener React + TypeScript + GSAP + Lenis sin librerias adicionales.
- Reorganizar estilos en `tokens.css`, `reset.css`, `typography.css`, `utilities.css` y `global.css`.
- Mover el shell a `src/app/AppShell.tsx` y separar `Header` y `Footer` por feature.
- Preparar paginas legales estaticas temporales para evitar enlaces rotos.
- No inventar casos, premios, clientes ni redes; la seccion de proyectos queda como readiness layer honesta.
- Preservar y activar `StretchPro.otf` como display font local tras verificar que la web antigua la sirve directamente; conservar `Oswald` y `couture-bld` como assets legacy trazables.

## Archivos creados

- `docs/DESIGN_SYSTEM.md`
- `docs/APP_SHELL.md`
- `docs/SPRINT_02_REPORT.md`
- `public/legal/aviso-legal.html`
- `public/legal/privacidad.html`
- `public/legal/cookies.html`
- `src/app/AppShell.tsx`
- `src/components/layout/Container.tsx`
- `src/components/layout/Section.tsx`
- `src/components/layout/Stack.tsx`
- `src/components/layout/Cluster.tsx`
- `src/components/layout/Grid.tsx`
- `src/components/layout/Bleed.tsx`
- `src/components/layout/Surface.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/TextLink.tsx`
- `src/components/ui/IconButton.tsx`
- `src/components/ui/Eyebrow.tsx`
- `src/components/ui/MediaFrame.tsx`
- `src/components/ui/Divider.tsx`
- `src/components/ui/SkipLink.tsx`
- `src/features/navigation/Header.tsx`
- `src/features/footer/Footer.tsx`
- `src/hooks/useBodyScrollLock.ts`
- `src/hooks/useHeaderScrollState.ts`
- `src/hooks/useMenuMotion.ts`
- `src/lib/utils/cx.ts`
- `src/styles/reset.css`
- `src/styles/fonts.css`
- `src/styles/typography.css`
- `src/styles/utilities.css`
- `src/styles/global.css`

## Archivos modificados

- `README.md`
- `docs/SPRINT_01_REPORT.md`
- `src/app/App.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/data/siteContent.ts`
- `src/features/contact/ContactSection.tsx`
- `src/features/home/HomePage.tsx`
- `src/main.tsx`
- `src/styles/tokens.css`
- `docs/LEGACY_SITE_AUDIT.md`
- `docs/LEGACY_ASSET_INVENTORY.md`

## Archivos retirados o sustituidos

- `src/components/layout/AppShell.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/ButtonLink.tsx`
- `src/styles/base.css`
- `src/styles/app.css`

## Validaciones

### Comandos ejecutados

- `git status --short --branch`
- `git remote -v`
- `git branch --show-current`
- `git log -1 --oneline`
- `npm run lint`
- `npm run build`
- `npm install`

### Lint

- Resultado: OK

### Build

- Resultado: OK
- Bundle JS anterior Sprint 01: `338.40 kB` sin comprimir, `115.64 kB` gzip
- Bundle JS Sprint 02: `350.98 kB` sin comprimir, `119.59 kB` gzip
- Diferencia: `+12.58 kB` sin comprimir, `+3.95 kB` gzip
- Justificacion: primitives de layout, UI components, menu accesible y CSS del shell

### Limitaciones reales

- Las paginas legales son placeholders tecnicos y necesitan contenido juridico confirmado antes de publicar.
- La seccion `Proyectos` prepara arquitectura y media, pero no sustituye futuros case studies reales.
- `Oswald` y `couture-bld` se han preservado, pero siguen sin una confirmacion explicita de licencia/uso en produccion dentro del nuevo sistema.

## Riesgos

- Revisar contraste exacto y lectura al 200 % con QA manual complementaria antes del sprint cinematografico.
- Confirmar contenido legal real.
- Confirmar alcance de redistribucion/uso definitivo para las fuentes legacy secundarias.
- Mantener controlado el crecimiento del bundle en Sprint 03 y siguientes.

## Siguiente sprint recomendado

- Sprint 03: reforzar el motion system con primitives de reveal, control por breakpoint, debugging y escenas listas para hero/preloader.
