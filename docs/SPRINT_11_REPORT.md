# Sprint 11 Report

Fecha: 2026-07-15
Sprint: Performance, Security and Browser Hardening

## Ruta y baseline

- ruta de trabajo: `C:\Users\USUARIO\Documents\SUBEROS-real`
- rama: `main`
- remoto: `https://github.com/projectmanagmentnotion-CostaClean/suberos.git`
- commit inicial confirmado: `da1b8f4ec4740c6715150ce80bb48497a964b803`

## Trabajo ejecutado

- hardening de `Lenis` para evitar reinicios innecesarios
- limpieza del runtime de fuentes legacy
- preload del hero visual y de `StretchPro`
- preloader limitado al perfil `full`
- salida del preloader simplificada para eliminar `CLS`
- encapsulado dev-only del mock de contacto
- `qa:security`, `qa:performance` y `qa:lighthouse` reproducibles
- smoke cross-browser en Chromium, Firefox y WebKit
- capturas reales en `390x844`, `768x1024` y `1366x768`
- `.htaccess` endurecido con CSP, COOP/CORP y cache policy explicita

## Resultados clave

- bundle inicial:
  - JS `442.00 kB raw / 147.27 kB gzip`
  - CSS `36.26 kB raw / 8.05 kB gzip`
- Lighthouse home:
  - mobile `85 / 100 / 100 / 100`
  - desktop `99 / 100 / 100 / 100`
- CLS home:
  - mobile `0.001`
  - desktop `0.000`
- TBT home:
  - mobile `205 ms`
  - desktop `6 ms`

## Riesgos abiertos

- `StretchPro.otf` sigue pesada y pendiente de licencia documental formal
- LCP movil del hero sigue por encima del objetivo ideal `<= 2.5 s`
- pruebas fisicas en iOS Safari y Android Chrome siguen pendientes
- `npm audit` reporta `17` vulnerabilidades moderadas del tooling de `lighthouse`

## Siguiente sprint recomendado

- Sprint 12 / visual and functional QA automation
