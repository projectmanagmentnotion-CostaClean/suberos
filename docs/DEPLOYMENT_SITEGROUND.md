# Deployment SiteGround

Fecha: 2026-07-14

## Estado

Este repositorio deja preparado el paquete de produccion, pero no documenta una subida real a SiteGround porque no se han proporcionado credenciales ni acceso verificable.

## Precondiciones obligatorias

- acceso real a Site Tools, SFTP o SSH
- confirmacion de que el dominio objetivo es `suberos.com`
- backup verificable de la web actual
- identificacion del document root real
- revision del `.htaccess` existente antes de sobrescribir nada

## Archivos preparados en este repositorio

- build publico en `dist/`
- fallback SPA en `public/.htaccess` copiado a `dist/.htaccess`
- ZIP de entrega con el contenido interior de `dist/`

## Orden recomendado de despliegue

1. crear backup completo del estado actual del hosting
2. comprobar `public_html/` o ruta equivalente real
3. subir primero assets versionados
4. subir `index.html` al final
5. limpiar cache de SiteGround y CDN si existe
6. verificar dominio publico, `robots.txt`, `sitemap.xml` y assets

## Formulario

Mientras no exista backend real:

- no debe presentarse como envio operativo de emails
- deben seguir funcionando email y telefono como canales reales

Mensaje operativo aceptable:

`La web esta publicada, pero el formulario online permanece desactivado y se mantienen email y telefono como canales funcionales.`

## Riesgo critico

No sobrescribir la web actual sin backup verificable ni mezclar reglas nuevas con un `.htaccess` previo no auditado.
