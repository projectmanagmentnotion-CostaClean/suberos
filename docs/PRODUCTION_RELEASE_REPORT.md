# Production Release Report

Fecha: 2026-07-15

## Estado exacto

WEB PUBLICADA EN `https://suberos.com` CON ESTADO `CONDITIONAL GO`. EL FORMULARIO SIGUE BLOQUEADO HASTA DISPONER DE ENDPOINT REAL Y RECEPCION COMPROBADA.

## Codigo

- Rama objetivo: `main`
- Remoto: `https://github.com/projectmanagmentnotion-CostaClean/suberos.git`
- Cambio estructural de este cierre:
  - datos legales y de contacto publicados verificados
  - `.htaccess` de produccion ajustado para Apache/Nginx con `DirectoryIndex index.html index.php`
  - header `Permissions-Policy` corregido para eliminar warnings de consola
  - `run-production-qa.mjs` endurecido para Windows

## Produccion local

- `dist/` generado correctamente
- `dist/` incluye `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `branding/`, `motion/` y el resto de carpetas publicas activas
- `dist/branding/fonts/syncopate/` publica exactamente:
  - `Syncopate-Regular.woff2`
  - `Syncopate-Bold.woff2`
  - `LICENSE.txt`
- ZIP de produccion actualizado:
  - `C:\Users\USUARIO\Documents\SUBEROS-real\release\suberos-production-2026-07-15.zip`

## SiteGround

- Site Tools operativo para `suberos.com`
- Backup manual creado: `suberos-before-launch-2026-07-15`
- Document root real: `public_html`
- WordPress previo conservado
- Base de datos MySQL detectada: `dbry6hsvvnegv5`
- Caché dinámica purgada
- Cuenta FTP temporal eliminada

## Verificacion publica

- home, legales, robots, sitemap y 404 verificados
- HTTP redirige a HTTPS
- `www` sigue pendiente de redireccion a la canonica apex
- reduced motion publico verificado
- sin errores de consola ni assets `404` en la comprobacion publica final
