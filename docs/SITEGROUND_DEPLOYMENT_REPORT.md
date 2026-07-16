# SiteGround Deployment Report

Fecha: 2026-07-16

## Estado

`CONDITIONAL GO - WEB PUBLICADA, FORMULARIO TEMPORALMENTE DESACTIVADO`

## Hosting verificado

- Dominio operativo en Site Tools: `suberos.com`
- Document root real: `public_html`
- Backup visible y preservado: `suberos-before-launch-2026-07-15-public_html.zip.zip`
- Web legacy identificada en paralelo:
  - `index.php`
  - `wp-admin`
  - `wp-content`
  - `wp-includes`
  - `wp-config.php`
  - `shisha/`

## Decision del propietario

Legacy WordPress database intentionally excluded from the required rollback because the previous website was a disposable demonstration without business-critical data. The owner explicitly authorised treating SUBEROS as a new static website.

## Publicacion Sprint 14.5

- Se creo una cuenta FTP temporal solo para esta publicacion y se elimino despues.
- Se subieron los contenidos de `dist/` a `public_html/` sin borrar los elementos legacy preservados.
- `index.html` se subio al final.
- Activos verificados tras la subida:
  - `/assets/index-BEYwLeoD.js`
  - `/assets/index-deA8oNZV.css`
- Tipos correctos verificados:
  - `application/javascript`
  - `text/css`

## Resultado publico

- `https://suberos.com/` ya sirve el build publicado de Sprint 14.5.
- Produccion coincide con el build local validado para los assets principales y el HTML publicado.
- Rutas legales, `robots.txt`, `sitemap.xml` y fallback SPA responden correctamente.

## Riesgo restante

- `https://www.suberos.com/` ya redirige a apex, pero `http://www.suberos.com/` mantiene un doble salto previo a apex.
- El formulario sigue bloqueado hasta que exista un endpoint real con recepcion comprobada.
