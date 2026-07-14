# Sprint 01 Report

Fecha de cierre: 2026-07-14

## Objetivo

Convertir el repositorio actual en una base tecnica validada, accesible, escalable y preparada para desarrollar despues una experiencia cinematografica con GSAP.

## Trabajo ejecutado

- Auditoria inicial del repositorio y de la web publica heredada.
- Instalacion de dependencias.
- Ejecucion inicial de `lint` y `build`.
- Reestructuracion del frontend en carpetas modulares.
- Centralizacion de tokens visuales, shell semantico y metadatos SEO.
- Centralizacion de GSAP, ScrollTrigger, Lenis y reduced motion.
- Descarga local de logo y favicon propios verificados.
- Sustitucion de cualquier hotlink por assets locales.
- Documentacion del sitio heredado, inventario de assets y sistema de motion.
- QA local de consola, responsive y reduced motion sobre preview Vite.

## Hallazgos principales

- El repositorio real era minimo y sin `README.md`.
- La web heredada actual tiene problemas claros de calidad:
  - `noindex, nofollow` en la home.
  - errores ortograficos y duplicaciones.
  - varios `h1` introducidos por el preloader.
  - scripts inline y dependencias CDN.
- El sitemap publico heredado no era funcional en las rutas probadas.
- El logo y favicon de SUBEROS si eran recuperables con alta confianza.
- Las fotografias de comida/bebida no se han tratado como branding reutilizable por falta de certeza suficiente de reutilizacion corporativa.

## Baseline resultante

- Shell semantico con `header`, `main`, `footer` y skip link.
- Un unico `h1`.
- Metadatos SEO, canonical, Open Graph y favicon local.
- Tokens centralizados de color, tipografia, spacing, contenedores, gradientes y capas.
- Integracion motion limpia y reducida a una prueba scroll-linked controlada.
- Arquitectura lista para crecer por features.

## Archivos creados

- `README.md`
- `docs/LEGACY_SITE_AUDIT.md`
- `docs/LEGACY_ASSET_INVENTORY.md`
- `docs/MOTION_SYSTEM.md`
- `src/app/*`
- `src/components/layout/*`
- `src/components/motion/*`
- `src/components/ui/*`
- `src/data/siteContent.ts`
- `src/features/contact/ContactSection.tsx`
- `src/features/home/HomePage.tsx`
- `src/hooks/*`
- `src/lib/gsap/*`
- `src/lib/seo/siteMeta.ts`
- `src/styles/*`
- `public/branding/*`
- `public/legacy-source/*`

## Archivos modificados

- `.gitignore`
- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/main.tsx`

## Archivos eliminados o sustituidos

- `src/App.tsx`
- `src/styles.css`

## Validaciones

### Comandos ejecutados

- `npm install`
- `npm run lint`
- `npm run build`
- `curl -L -A "Mozilla/5.0" https://suberos.com/`
- `curl -I -L -A "Mozilla/5.0" https://suberos.com/wp-content/uploads/2024/08/LOGO-SUBEROS-1-989x1024.webp`
- `curl -I -L -A "Mozilla/5.0" https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-150x150.png`
- Descarga local de assets aprobados con `curl`
- QA local sobre `http://127.0.0.1:4173/`

### Lint

- Resultado: OK

### Build

- Resultado: OK
- Bundle JS generado: `dist/assets/index-B-6X1jBG.js` 338.40 kB sin comprimir, 115.64 kB gzip

### Responsive

- `390x844`: verificado sin overflow horizontal
- `768x1024`: verificado sin overflow horizontal
- `1366x768`: verificado sin overflow horizontal
- Capturas locales generadas durante QA

### Consola

- Sin `error` ni `warn` detectados en la carga revisada

### Accesibilidad

- Confirmado:
  - un unico `h1`
  - skip link presente
  - labels visibles en formulario
  - estructura semantica `header/main/footer`
  - contenido legible con `?reduced-motion=1`
- Limitacion de tooling:
  - el runtime del navegador embebido no avanzo el foco con las pulsaciones `Tab` automatizadas, asi que la secuencia completa de foco por teclado no pudo certificarse de extremo a extremo en esta sesion

### Reduced motion

- Verificado con override de QA `?reduced-motion=1`
- Lenis queda desactivado y el contenido sigue visible y operativo

## Estado Git

- Commit SHA: `7f69dbc03b1b22aa62abc59972f988f7cba98d1b`
- Commit message: `Establish SUBEROS production baseline and legacy asset audit`
- Push: confirmado y sincronizado con `origin/main`

## Riesgos y siguientes pasos

- Revisar manualmente la secuencia exacta de foco con teclado en un navegador de escritorio completo antes del siguiente sprint.
- Confirmar si la marca dispone de wordmark vectorial o tipografia con licencia reutilizable para sustituir el baseline tipografico temporal.
- Definir informacion confirmada para proyectos/casos antes de abrir rutas de portfolio.
