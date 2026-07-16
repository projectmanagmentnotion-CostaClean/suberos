# Form Delivery Production Test

Fecha: 2026-07-16

## Estado

`ACTIVO EN PRODUCCION CON RECEPCION VERIFICADA`

## Estado real publicado

- La web publica ya esta desplegada.
- `public/api/contact.php` esta desplegado en produccion y resuelve `POST /api/contact`.
- El formulario publico responde con exito real y no con un mock.
- La recepcion real en `info@suberos.com` quedo verificada visualmente en Webmail.

## Lo que si se verifico

- No se publica ningun exito falso.
- El canal alternativo visible sigue siendo:
  - `info@suberos.com`
  - `698 911 517`
- `curl -I https://suberos.com/api/contact` devuelve `405 Method Not Allowed` con `Content-Type: application/json; charset=utf-8`, lo que confirma que el endpoint publico existe y no cae en el fallback SPA.
- Un `POST` real de prueba devolvio:
  - `ok: true`
  - `deliveryMode: production`
  - `requestId: 84682fe34295195a`
- El mensaje `SUBEROS contacto: branding - Prueba Codex` aparecio en la bandeja de `info@suberos.com` a las `11:15` del `2026-07-16`.
- La decision final del lanzamiento permanece en `CONDITIONAL GO` por el doble salto de `http://www.suberos.com/` y por la ausencia de pruebas fisicas en iPhone/Android, no por el formulario.

## Pendiente para activar el formulario

- comprobacion manual completa del flujo de respuesta desde Webmail usando el `Reply-To` del visitante
- politica final de retencion operativa del buzon y de los logs temporales del endpoint
