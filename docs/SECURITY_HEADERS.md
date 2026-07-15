# Security Headers

Fecha: 2026-07-15

## Fuente

- `public/.htaccess`

## Headers aplicados

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Permissions-Policy` con capacidades denegadas
- `Content-Security-Policy`

## CSP aplicada

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self';
manifest-src 'self';
media-src 'self';
worker-src 'self' blob:;
frame-src 'none';
upgrade-insecure-requests
```

## Cache

- HTML: `no-cache, no-store, must-revalidate`
- assets versionados y fuentes: `public, max-age=31536000, immutable`
- `robots.txt`, `sitemap.xml`, `site.webmanifest`: `public, max-age=3600, must-revalidate`

## Compresion

- la compresion real de produccion depende del servidor
- localmente se validaron solo tamanos gzip del build
- Brotli/Gzip final siguen dependiendo de SiteGround
