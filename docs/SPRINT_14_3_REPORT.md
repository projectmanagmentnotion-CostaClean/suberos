# Sprint 14.3 Report

Fecha: 2026-07-16

## Objetivo

Publicar el build validado del commit `886270d` como nueva web estatica coherente en `https://suberos.com`, corrigiendo la discrepancia entre produccion y `dist/`.

## Decision operativa aprobada

Legacy WordPress database intentionally excluded from the required rollback because the previous website was a disposable demonstration without business-critical data. The owner explicitly authorised treating SUBEROS as a new static website.

## Verificacion local

- `git status --short --branch`: limpio en `main...origin/main`
- `git rev-list --left-right --count origin/main...HEAD`: `0 0`
- `npm install`: pass
- `npm run qa:assets`: pass con 4 warnings conocidos
- `npm run qa:overflow`: pass con servidor local activo
- `npm run qa:release`: pass con servidor local activo
- `npm run lint`: pass
- `npm run build`: pass

## Produccion corregida

- `public_html` confirmado como document root
- backup de archivos verificado:
  - `suberos-before-launch-2026-07-15-public_html.zip.zip`
- cuenta FTP temporal recreada:
  - `codexdeploy@suberos.com`
- subida ejecutada en este orden:
  - assets y ficheros estaticos criticos
  - verificacion HTTP de `/assets/index-BoFbJRjq.js`
  - verificacion HTTP de `/assets/index-B71Yuaov.css`
  - subida final de `index.html`
- cache dinamica purgada en SiteGround
- cuenta FTP temporal eliminada al terminar

## Evidencia final

- `https://suberos.com/` coincide por SHA-256 con `dist/index.html`
- `/assets/index-BoFbJRjq.js` responde `200` con `Content-Type: application/javascript`
- `/assets/index-B71Yuaov.css` responde `200` con `Content-Type: text/css`
- verificacion visual publica positiva en navegador:
  - hero
  - navegacion
  - servicios
  - proceso
  - contacto
  - footer legal

## Riesgos pendientes

- el formulario continua desactivado hasta disponer de endpoint real y recepcion comprobada
- `www` sigue sin redirigir a la canonica apex
