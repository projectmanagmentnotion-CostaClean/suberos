# Production Verification Report

Fecha: 2026-07-15

## Estado

`CONDITIONAL GO - VERIFICACION PUBLICA COMPLETADA CON FORMULARIO BLOQUEADO`

## Verificacion publica ejecutada

- `https://suberos.com/` publica el build estatico actual.
- `http://suberos.com/` redirige a `https://suberos.com/` con `301`.
- `https://suberos.com/robots.txt` responde `200`.
- `https://suberos.com/sitemap.xml` responde `200`.
- `https://suberos.com/legal/aviso-legal` responde `200`.
- `https://suberos.com/legal/privacidad` responde `200`.
- `https://suberos.com/legal/cookies` responde `200`.
- `https://suberos.com/legal/accesibilidad` responde `200`.
- `https://suberos.com/no-existe-ruta` responde por fallback SPA y renderiza la vista 404 del runtime.

## Evidencia tecnica

- Home publica: titulo `SUBEROS - Estudio creativo de fotografia, diseno, produccion y web`
- Home publica: `canonical https://suberos.com/`
- Legales: `robots noindex,nofollow`
- 404 visual: `h1` publico `No encontramos esta pagina.`
- Favicon publicado:
  - `/branding/suberos-icon-32.png`
  - `/branding/suberos-icon-192.png`
  - `/branding/suberos-icon-180.png`
- Social card publicada:
  - `/branding/suberos-social-card.png`

## QA visual y runtime

- Viewports revisados publicamente:
  - `390x844`
  - `768x1024`
  - `1366x768`
- Reduced motion publico verificado en Chromium con `prefers-reduced-motion: reduce`.
- Sin errores de consola ni requests fallidas tras corregir `Permissions-Policy`.
- Sin claves en `localStorage`.
- Sin claves de datos personales en `sessionStorage` durante la prueba publica ejecutada.

## Hallazgos abiertos

- `www` no redirige todavia a `https://suberos.com/`; sirve el mismo build con `200`.
- No se ejecuto prueba fisica en iPhone Safari ni Android Chrome.
- El formulario no se activo en produccion.
