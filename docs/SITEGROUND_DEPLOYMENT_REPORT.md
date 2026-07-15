# SiteGround Deployment Report

Fecha: 2026-07-15

## Estado

`CONDITIONAL GO - WEB PUBLICADA, FORMULARIO TEMPORALMENTE DESACTIVADO`

## Hosting verificado

- Dominio operativo en Site Tools: `suberos.com`
- Document root real: `public_html`
- Backup manual creado y visible: `suberos-before-launch-2026-07-15`
- Web anterior identificada: instalacion WordPress activa en `public_html`
- Base de datos detectada en SiteGround MySQL: `dbry6hsvvnegv5`
- PHP presente por instalacion WordPress existente

## Web anterior conservada

- Se mantuvieron `wp-admin`, `wp-content`, `wp-includes`, `wp-config.php`, `index.php`, `xmlrpc.php` y el resto de ficheros legacy.
- Se conservo la subcarpeta `shisha/`.
- Se descargo una copia del `.htaccess` previo en `release/siteground-prelaunch-htaccess-2026-07-15.txt`.

## Publicacion ejecutada

- Se subieron los contenidos de `dist/` directamente a `public_html/`.
- Se publico `.htaccess` nuevo con:
  - `DirectoryIndex index.html index.php`
  - HTTPS forzado
  - fallback SPA
  - cabeceras de seguridad
  - preservacion del bloqueo `xmlrpc.php`
- `index.html` se subio al final, despues del resto de assets.
- La web publica responde ya con el `index.html` del build estatico (`Content-Length: 3239`).

## Cache y acceso temporal

- Caché dinámica purgada en SuperCacher con confirmacion: `Caché de suberos.com vaciada.`
- La cuenta FTP temporal `codexdeploy@suberos.com` fue eliminada tras el despliegue.
- No se detecto necesidad de rollback durante esta ejecucion.

## Observaciones

- `https://www.suberos.com/` responde en `200`, no redirige todavia a la raiz canonica sin `www`.
- El formulario continua honestamente bloqueado porque no existe endpoint real ni recepcion comprobada en `info@suberos.com`.
