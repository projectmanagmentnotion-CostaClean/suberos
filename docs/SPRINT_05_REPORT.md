# Sprint 05 Report

## Sprint

Immersive Home Narrative

## Ruta y base

- ruta: `C:\Users\USUARIO\Documents\SUBEROS-real`
- rama: `main`
- commit inicial: `1b0dffd3941d0cee8ec87db2d95f7d0c4c64a5c3`
- mensaje inicial: `Build cinematic SUBEROS preloader and hero foundation`

## Auditoria real

- La home bajo el hero seguia funcionando como readiness layer tecnica:
  - manifiesto sobre la base del sprint, no sobre SUBEROS
  - servicios en cards genericas
  - seccion de proyectos sin proyectos reales
  - proceso todavia conceptual
- `aria-labelledby` apuntaba a IDs inexistentes porque `SectionHeader` no soportaba `titleId`.
- El proyecto real aprovechable seguia siendo `https://suberos.com/shisha/`, documentado desde Sprint 01 como SPA separada.
- No existen todavia capturas o media final aprobada para Luxury Shisha dentro del repo.

## Narrativa implementada

1. Hero cinematografico heredado de Sprint 04
2. Escena editorial “Que es SUBEROS”
3. Escena de servicios con visual activo en desktop/tablet
4. Proyecto destacado con Luxury Shisha
5. Metodo de trabajo
6. Declaracion de marca
7. Cierre a contacto

## Escenas

- `HeroSection`
- `StudioSection`
- `ServicesSection`
- `FeaturedProjectsSection`
- `ProcessSection`
- `BrandStatementSection`
- `ContactSection`

## Contenido real utilizado

- servicios confirmados:
  - fotografia profesional
  - diseno grafico y branding
  - impresion y produccion
  - diseno y desarrollo web
- contacto real:
  - `info@suberos.com`
  - `691 93 72 72`
  - `Calella, 08370 - Barcelona`
- proyecto real integrado:
  - `Luxury Shisha`
  - ruta real: `https://suberos.com/shisha/`

## Proyectos incluidos

- publicados en home:
  - `Luxury Shisha`
- no publicados:
  - cualquier otro caso sin contenido confirmado o assets aprobados

## Assets pendientes

- capturas finales del caso Luxury Shisha
- fotografia o media real adicional para servicios y proyectos
- nuevas piezas aprobadas para `public/projects/`

## SEO y linking

- un unico `h1`
- `h2` con IDs reales:
  - `estudio-title`
  - `services-title`
  - `projects-title`
  - `process-title`
  - `contact-title`
- anchors directos verificados:
  - `#estudio`
  - `#servicios`
  - `#proyectos`
  - `#proceso`
  - `#contacto`
- enlace contextual a Luxury Shisha como destino real existente

## Accesibilidad

- orden DOM natural
- reduced motion sin ocultar contenido
- contacto visible y usable sin animacion
- se corrigio la relacion `aria-labelledby` de las secciones

## Responsive y reduced motion

Revisado en:

- `390x844`
- `768x1024`
- `1366x768`
- `1366x768` con `?reduced-motion=1`
- entrada directa a anchors

Hallazgos:

- `390x844`: el visual sticky de servicios se oculta y queda la lista editorial completa
- `768x1024`: se mantiene el visual de servicios y la narrativa sigue legible
- `1366x768`: la home muestra la secuencia completa y el proyecto Luxury Shisha aparece correctamente
- `reduced`: las escenas custom limpian estilos y dejan contenido visible

## QA y consola

Comandos ejecutados:

- `npm install`
- `npm run lint`
- `npm run build`
- validacion en preview `127.0.0.1:4173`
- comprobacion de anchors directos
- comprobacion de consola

Resultado:

- `npm run lint`: OK
- `npm run build`: OK
- consola del bundle actual `index-B2tCr_je.js`: sin `warn` ni `error`

## ScrollTriggers

Conteo auditado por implementacion de home publica:

- hero: 1
- studio: 1
- services: 1 reveal + 4 triggers por item
- projects: 1 reveal
- process: 1 reveal
- statement: 1

Total auditado para la home: 10 triggers de narrativa en modo no reducido, sin escenas pinned de larga duracion.

Nota:

- Este conteo se verifico por auditoria de codigo y flujos ejecutados; el runtime del navegador usado en la QA no expone `ScrollTrigger` como global para una lectura directa desde la pagina.

## Bundle anterior y actual

Baseline Sprint 04:

- JS principal: `395.99 kB` raw / `133.97 kB` gzip
- CSS principal: `24.84 kB` raw / `6.11 kB` gzip
- Motion Lab lazy: `8.53 kB` raw / `3.09 kB` gzip

Sprint 05 final:

- JS principal: `404.48 kB` raw / `136.17 kB` gzip
- CSS principal: `30.21 kB` raw / `7.00 kB` gzip
- Motion Lab lazy: `8.53 kB` raw / `3.09 kB` gzip

Incremento:

- JS: `+8.49 kB` raw / `+2.20 kB` gzip
- CSS: `+5.37 kB` raw / `+0.89 kB` gzip

## Archivos creados

- `src/data/homeContent.ts`
- `src/data/services.ts`
- `src/data/featuredProjects.ts`
- `src/data/processSteps.ts`
- `src/features/home/StudioSection.tsx`
- `src/features/home/ServicesSection.tsx`
- `src/features/home/FeaturedProjectsSection.tsx`
- `src/features/home/ProcessSection.tsx`
- `src/features/home/BrandStatementSection.tsx`
- `src/features/home/home-page.css`
- `src/motion/scenes/createStudioNarrativeScene.ts`
- `src/motion/scenes/createServicesNarrativeScene.ts`
- `src/motion/scenes/createStatementScene.ts`
- `docs/HOME_NARRATIVE.md`
- `docs/HOME_SCENES.md`
- `docs/PROJECT_CONTENT_MODEL.md`
- `docs/SPRINT_05_REPORT.md`

## Archivos modificados

- `README.md`
- `docs/ROADMAP.md`
- `docs/MOTION_QA.md`
- `docs/ASSET_PIPELINE.md`
- `src/components/ui/SectionHeader.tsx`
- `src/data/siteContent.ts`
- `src/features/contact/ContactSection.tsx`
- `src/features/footer/Footer.tsx`
- `src/features/home/HomePage.tsx`
- `src/features/home/HeroSection.tsx`
- `src/features/navigation/Header.tsx`
- `src/features/preloader/Preloader.tsx`
- `src/motion/hooks/useScrollScene.ts`

## Limitaciones

- Luxury Shisha aun no dispone de capturas finales aprobadas dentro del repo.
- No se ejecuto Lighthouse.
- No se probo Safari iOS fisico.
- El conteo de ScrollTriggers no pudo leerse directamente desde `window` en el navegador de QA porque el runtime no expone GSAP como global.

## Riesgos y siguiente sprint recomendado

- El siguiente riesgo principal es seguir construyendo proyectos sin media real suficiente.
- El siguiente sprint recomendado es Phase 6: sistema de proyectos y primeras rutas de caso con Luxury Shisha como base.
