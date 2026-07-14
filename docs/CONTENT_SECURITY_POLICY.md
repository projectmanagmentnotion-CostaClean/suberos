# Content Security Policy

Fecha: 2026-07-14

## Objetivo

Definir una CSP inicial compatible con la build actual de SUBEROS sin inventar vendors ni romper la experiencia publica.

## Recursos reales detectados

- scripts del propio bundle Vite
- CSS propio
- fuentes self-hosted
- imagenes, SVG, WebP y PNG propios
- JSON-LD inline
- sin analytics
- sin iframes
- sin embeds
- sin workers
- sin formularios con destino externo activo

## Politica objetivo

```text
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self';
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  manifest-src 'self';
  upgrade-insecure-requests;
```

## Notas por directiva

- `default-src 'self'`
  - suficiente para el runtime actual
- `script-src 'self'`
  - no debe abrirse a terceros mientras no existan vendors reales
- `style-src 'self' 'unsafe-inline'`
  - se mantiene conservadoramente por compatibilidad inicial; reducirlo requiere revisar exactamente la salida final y cualquier estilo inline residual
- `img-src 'self' data: blob:`
  - cubre branding y posibles blobs internos de media
- `font-src 'self' data:`
  - cubre `StretchPro` y futuras fuentes self-hosted
- `connect-src 'self'`
  - en build publica el formulario no debe conectar con `localhost`
- `frame-src 'none'`
  - no hay iframes
- `form-action 'self'`
  - compatible con el formulario bloqueado sin endpoint externo
- `frame-ancestors 'self'`
  - endurece framing basico

## Despliegue recomendado

1. Validar primero en `Content-Security-Policy-Report-Only` sobre el hosting real.
2. Verificar:
   - cargas de fuentes;
   - JSON-LD;
   - assets de branding;
   - labs internos;
   - ausencia de conexiones bloqueadas legitimas.
3. Pasar a enforcement solo cuando SiteGround y la build final esten verificados.

## Bloqueos y limites

- No se ha aplicado aun una CSP de enforcement en `.htaccess`.
- La politica definitiva depende de validar la salida del hosting real y cualquier endpoint futuro de contacto.
- No debe anadirse `unsafe-eval`.
