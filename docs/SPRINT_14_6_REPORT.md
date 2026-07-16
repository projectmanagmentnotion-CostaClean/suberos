# Sprint 14.6 Report

Fecha: 2026-07-16

## Objetivo

Cerrar los ultimos pendientes funcionales y de produccion de SUBEROS sin mezclar referencias activas de otros proyectos, activar el formulario real y revalidar la web publica.

## Trabajo ejecutado

- Auditoria de aislamiento completa en repositorio, runtime y build.
- Limpieza de referencias activas no permitidas en documentacion operativa.
- Activacion del endpoint real `public/api/contact.php` con:
  - validacion server-side
  - honeypot
  - control minimo de tiempo de envio
  - rate limit por ventana
  - respuestas JSON
  - `From: info@suberos.com`
  - `Reply-To` con el email del visitante
- Ajuste del runtime para declarar el formulario activo y no bloquear el CTA publico.
- Actualizacion de QA automatizada para el nuevo estado operativo.
- Publicacion del build Sprint 14.6 en SiteGround.
- Verificacion publica del HTML, assets, legales y endpoint.
- Verificacion visual de recepcion real en la bandeja `info@suberos.com`.

## Evidencia real

- `https://suberos.com/` publica el build con:
  - `/assets/index-B4OUHjhi.js`
  - `/assets/index-deA8oNZV.css`
- `curl -I https://suberos.com/api/contact` devuelve `405 Method Not Allowed` y `Content-Type: application/json; charset=utf-8`.
- Un `POST` real al endpoint devolvio:
  - `ok: true`
  - `deliveryMode: production`
  - `requestId: 84682fe34295195a`
- Webmail de `info@suberos.com` muestra el mensaje:
  - `SUBEROS contacto: branding - Prueba Codex`
  - fecha visible: `2026-07-16`
  - hora visible: `11:15`

## Estado final del sprint

`CONDITIONAL GO - WEB PUBLICADA Y FORMULARIO OPERATIVO`

## Bloqueos restantes

- `http://www.suberos.com/` mantiene doble salto antes de llegar a `https://suberos.com/`.
- No se ejecutaron pruebas fisicas en iPhone Safari ni Android Chrome.
- Falta una comprobacion manual final del flujo de respuesta desde Webmail usando el `Reply-To` del visitante.
