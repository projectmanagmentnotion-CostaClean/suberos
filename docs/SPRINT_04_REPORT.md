# Sprint 04 Report

## Sprint

Cinematic Preloader and Hero Foundation

## Ruta y base

- ruta: `C:\Users\USUARIO\Documents\SUBEROS-real`
- rama: `main`
- commit inicial: `e71aecf057dec7f99e2365e0e444428e147d1c35`
- mensaje inicial: `Harden SUBEROS motion system and scene architecture`

## Objetivo cumplido

SUBEROS ya dispone de una entrada cinematografica real con preloader basado en carga efectiva, persistencia de sesion, transicion continua al hero, escena scroll-linked inicial, responsive revisado y reduced motion funcional.

## Hallazgos reales

- El hero previo seguia siendo una base tecnica, no una entrada cinematografica real.
- El CTA principal no priorizaba proyectos y el visual inicial era demasiado debil para sostener el primer viewport.
- El sitio no tenia preloader, persistencia de sesion ni coordinacion visual entre arranque y hero.
- El lock de scroll previo no era suficientemente robusto para encadenar preloader y drawer.
- En mobile el drawer ocupaba todo el ancho, dejando el overlay inutil para cierre.
- En `390x844` el titular monumental se recortaba y hubo que reducir la escala real del display type.

## Arquitectura del preloader

- feature nueva en `src/features/preloader/`
- carga real de logo, favicon, fuente display y visual principal
- smoothing de progreso con `setInterval`
- timeout de seguridad
- manejo de assets fallidos sin bloqueo
- `sessionStorage` para omitir repeticiones innecesarias
- salida FLIP hacia targets del hero cuando el perfil no es `reduced`

## Hero implementado

- nuevo `HeroSection`
- copy real y H1 unico
- CTA a proyectos y contacto
- metadata de servicios y contacto confirmados
- visual principal propio servido localmente
- escena scroll-linked con `ScrollTrigger`

## Copy final

- eyebrow: `Estudio creativo / Calella, Barcelona`
- H1: `Creamos imagenes que mueven marcas.`
- CTA principal: `Ver proyectos`
- CTA secundaria: `Cuentanos tu proyecto`

## Assets criticos y pesos

- `suberos-icon-192.png` - 15,917 B
- `suberos-icon-32.png` - 1,698 B
- `suberos-logo-symbol.webp` - 77,016 B
- `StretchPro.otf` - 199,652 B

## Persistencia, timeout y QA params

- session key: `suberos.preloader.seen.v1`
- timeout:
  - `full`: `4200 ms`
  - `balanced`: `3000 ms`
- QA:
  - `?preloader=1`
  - `?preloader=reset`
  - `?asset-fail=1`
  - `?reduced-motion=1`

## Perfiles

- `full`: FLIP completo, mayor scrub y mayor profundidad
- `balanced`: recorrido y timings reducidos
- `reduced`: sin FLIP complejo ni scrub; hero visible con salida simple

## Validacion real

- `npm install`: OK
- `npm run lint`: OK
- `npm run build`: OK
- tests automatizados: no existen scripts de test en el repositorio actual
- preview validado en `127.0.0.1:4173`

Responsive revisado:

- `390x844`
- `768x1024`
- `1366x768`
- `1440x900` en la QA previa del sprint y `1366x768`/`390x844` recapturados tras los ajustes finales
- horizontal movil revisado

Flujos revisados:

- primera sesion
- segunda carga de sesion
- `?preloader=1`
- `?preloader=1&asset-fail=1`
- `?preloader=1&reduced-motion=1`
- drawer movil con `Escape`
- drawer movil con boton interno
- drawer movil con overlay
- ausencia de errores de consola en la build verificada

## Accesibilidad y SEO

- un unico H1
- CTA con destino real
- reduced motion funcional
- header operativo incluso si el preloader se omite
- copy inmediata sobre servicios reales y contacto
- meta description actualizada sin inventar claims

## Bundle anterior y actual

Baseline Sprint 03:

- JS principal: `359.70 kB` raw / `121.66 kB` gzip
- CSS principal: `17.10 kB` raw / `4.57 kB` gzip
- Motion Lab lazy: `8.01 kB` raw / `2.98 kB` gzip

Sprint 04 final:

- JS principal: `395.99 kB` raw / `133.97 kB` gzip
- CSS principal: `24.84 kB` raw / `6.11 kB` gzip
- Motion Lab lazy: `8.53 kB` raw / `3.09 kB` gzip

Incremento principal:

- JS: `+36.29 kB` raw / `+12.31 kB` gzip
- CSS: `+7.74 kB` raw / `+1.54 kB` gzip

## Archivos creados

- `src/features/home/HeroSection.tsx`
- `src/features/home/HomeExperience.tsx`
- `src/features/home/hero.css`
- `src/features/preloader/Preloader.tsx`
- `src/features/preloader/PreloaderLogo.tsx`
- `src/features/preloader/PreloaderProgress.tsx`
- `src/features/preloader/preloader.css`
- `src/features/preloader/preloader.types.ts`
- `src/features/preloader/usePreloader.ts`
- `src/motion/scenes/createHeroFoundationScene.ts`
- `docs/PRELOADER_SYSTEM.md`
- `docs/HERO_SYSTEM.md`
- `docs/ASSET_PIPELINE.md`
- `docs/SPRINT_04_REPORT.md`
- `public/hero/.gitkeep`
- `public/textures/.gitkeep`
- `public/placeholders/.gitkeep`

## Archivos modificados

- `README.md`
- `docs/MOTION_QA.md`
- `docs/ROADMAP.md`
- `src/app/App.tsx`
- `src/data/siteContent.ts`
- `src/features/home/HomePage.tsx`
- `src/features/navigation/Header.tsx`
- `src/hooks/useBodyScrollLock.ts`
- `src/lib/gsap/registerGsap.ts`
- `src/motion/core/registerGsap.ts`
- `src/styles/global.css`

## Limitaciones y riesgos

- No se probo Safari iOS fisico.
- No hay suite automatizada de tests ni Lighthouse en este sprint.
- El visual principal sigue siendo una composicion editorial basada en logo propio, no una fotografia/caso definitivo.
- El siguiente sprint debe atacar la narrativa principal y los bloques de proyectos reales.
