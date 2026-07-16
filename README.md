# SUBEROS

Base tecnica de SUBEROS construida con React, TypeScript, Vite, GSAP y Lenis. El proyecto mantiene shell semantico, motion encapsulado, QA automatizada, formulario real en produccion con entrega verificada a `info@suberos.com` y una capa de marca local sin dependencias tipograficas externas.

## Estado actual

- Fases 0 a 14 completadas.
- Sprint 14.4 validado localmente: direccion de arte final de home, nueva escena inmersiva integrada en narrativa publica y mejora del menu movil.
- Sprint 14.5 publicado: servicios conectados con trabajo real, nueva cobertura `qa:links`, `qa:navigation` y `qa:immersive`, decision formal sobre la posicion de la secuencia publica y produccion alineada con el build validado.
- Sustitucion tipografica completada: `StretchPro` ha salido del build publico y el runtime usa `Syncopate` self-hosted.
- `qa:release`, `lint`, `build`, `qa:lighthouse` y `qa:visual` pasan.
- Produccion publicada en `https://suberos.com` con estado `CONDITIONAL GO`.
- Bloqueos abiertos:
  - cierre limpio del doble salto del host `www` hacia el dominio canonico
  - pruebas fisicas en iPhone Safari y Android Chrome
  - verificacion manual final del flujo de respuesta desde Webmail usando el `Reply-To` ya configurado

## Stack

- React 19
- TypeScript
- Vite
- GSAP + ScrollTrigger + `@gsap/react`
- Lenis

## Comandos principales

- `npm install`
- `npm run dev -- --host 127.0.0.1 --port 5173`
- `npm run lint`
- `npm run build`
- `npm run qa:font-licenses`
- `npm run qa:assets`
- `npm run qa:overflow`
- `npm run qa:links`
- `npm run qa:navigation`
- `npm run qa:immersive`
- `npm run qa:legal`
- `npm run qa:privacy`
- `npm run qa:seo`
- `npm run qa:security`
- `npm run qa:performance`
- `npm run qa:visual`
- `npm run qa:lighthouse`
- `npm run qa:release`
- `npm run preview -- --host 127.0.0.1 --port 4173`

## Tipografia y branding

- Fuente display publica: `Syncopate` 400/700 self-hosted en `public/branding/fonts/syncopate/`.
- Repositorio oficial: `google/fonts/apache/syncopate`
- Licencia: `Apache License 2.0`
- Uso comercial: permitido
- Self-hosting: permitido
- Redistribucion: permitida conservando la licencia y avisos aplicables
- Evidencia de licencia y hashes:
  - `docs/licenses/SYNCOPATE_LICENSE.md`
  - `docs/licenses/SYNCOPATE_CHECKSUMS.txt`
- Fuentes legacy retiradas del build:
  - `resources/fonts/legacy/StretchPro.otf`
  - `resources/fonts/legacy/StretchPro-legacy.otf`
  - `resources/fonts/legacy/couture-bld.otf`
  - `resources/fonts/legacy/Oswald-VariableFont_wght.ttf`

## Criterios de desarrollo

- Mantener contenido 100 % real y verificable.
- No hotlinkear assets del sitio legado.
- No introducir requests a `fonts.googleapis.com` ni `fonts.gstatic.com` en produccion.
- Mantener el formulario operativo solo mientras el endpoint real siga desplegado y auditado.
- Centralizar tokens, estados y motion; no duplicar logica ad hoc.
- Validar siempre `npm run qa:release` antes de cerrar un bloque grande.
- Usar `artifacts/reports/assets/asset-inventory.json` y `artifacts/reports/overflow/overflow-report.json` como evidencia automatizada del estado visual y de assets.
