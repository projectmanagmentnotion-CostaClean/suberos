# Production Verification Report

Fecha: 2026-07-16

## Estado

`CONDITIONAL GO - VERIFICACION PUBLICA COMPLETADA, QA FISICA PENDIENTE`

## Verificacion publica ejecutada

- `https://suberos.com/` responde `200` y publica Sprint 14.6.
- `http://suberos.com/` redirige a `https://suberos.com/`.
- `https://www.suberos.com/` redirige a `https://suberos.com/`.
- `http://www.suberos.com/` todavia hace doble salto:
  - `http://www.suberos.com/`
  - `https://www.suberos.com/`
  - `https://suberos.com/`
- `https://suberos.com/robots.txt` responde `200`.
- `https://suberos.com/sitemap.xml` responde `200`.
- `https://suberos.com/legal/aviso-legal` responde `200`.
- `https://suberos.com/legal/privacidad` responde `200`.
- `https://suberos.com/legal/cookies` responde `200`.
- `https://suberos.com/legal/accesibilidad` responde `200`.
- `https://suberos.com/ruta-inexistente` responde por fallback SPA.
- `https://suberos.com/api/contact` responde `405` por `GET`, lo que confirma el endpoint publico fuera del fallback SPA.

## Evidencia tecnica

- Home publica:
  - titulo `SUBEROS - Estudio creativo de fotografia, diseno, produccion y web`
  - `canonical https://suberos.com/`
  - script `/assets/index-BEYwLeoD.js`
  - stylesheet `/assets/index-deA8oNZV.css`
- Tipos de contenido verificados:
  - JS: `application/javascript`
  - CSS: `text/css`
- Endpoint de contacto:
  - `POST /api/contact` devuelve JSON real
  - `requestId` de prueba: `84682fe34295195a`
  - recepcion real verificada en `info@suberos.com`
  - borrador de respuesta en Roundcube precarga el visitante de prueba mediante `Reply-To`
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
- Capturas reales guardadas en `artifacts/reports/sprint-14-5-production/`.
- Menu movil revisado visualmente en produccion.
- Sin errores de consola en las rutas revisadas.
- Sin `4xx` requests en las rutas revisadas.

## Hallazgos abiertos

- El doble salto de `http://www.suberos.com/` sigue pendiente de resolucion limpia en infraestructura.
- No se ejecuto prueba fisica en iPhone Safari ni Android Chrome.
- Las pruebas fisicas en iPhone Safari y Android Chrome siguen pendientes.
