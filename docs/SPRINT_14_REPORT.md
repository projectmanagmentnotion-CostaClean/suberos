# Sprint 14 Report

Fecha: 2026-07-15

## Objetivo

SiteGround production deployment and launch verification.

## Resultado

`CONDITIONAL GO - WEB PUBLICADA, FORMULARIO TEMPORALMENTE DESACTIVADO`

## Trabajo completado

- verificacion local completa del repo en `main`
- actualizacion de datos legales y de contacto publicados
- correccion del wrapper `run-production-qa.mjs` para evitar procesos `preview` huerfanos en Windows
- `npm run qa:release`
- `npm run qa:lighthouse`
- `npm run lint`
- `npm run build`
- backup remoto manual `suberos-before-launch-2026-07-15`
- identificacion de `public_html` como document root
- auditoria de la web previa WordPress
- descarga del `.htaccess` legacy
- publicacion del build estatico en SiteGround
- purga de caché dinámica
- verificacion publica del dominio
- eliminacion de la cuenta FTP temporal de despliegue

## Hallazgos reales

- `public_html` contenia una instalacion WordPress activa con PHP y MySQL.
- La base de datos detectada en SiteGround es `dbry6hsvvnegv5` (~108 MB en Site Tools).
- El sitio legacy y `shisha/` se conservaron para rollback y compatibilidad.
- La nueva web publica ya sirve el build estatico con `index.html` y cabeceras propias.
- `www` sigue resolviendo en `200` y no redirige a la canonica raiz.
- El formulario sigue bloqueado porque no hay backend real publicado ni recepcion verificada.

## Estado recomendado

- Mantener la web publica actual.
- No activar exito del formulario hasta disponer de endpoint real y prueba de recepcion.
- Cerrar en el siguiente bloque:
  - canonical redirect `www -> apex`
  - endpoint real del formulario
  - validacion fisica en iPhone Safari y Android Chrome
