# Asset License Status

Fecha: 2026-07-15

## Estado general

SUBEROS conserva en el repositorio los assets propios recuperados del sitio heredado y los sirve localmente. La publicacion final sigue bloqueada por la falta de evidencia documental suficiente sobre la fuente display `StretchPro`.

## Aprobados para produccion actual

| Asset | Ruta | Estado | Nota |
| --- | --- | --- | --- |
| Logo simbolo | `public/branding/suberos-logo-symbol.webp` | Approved | Asset propio recuperado y optimizado |
| Favicon 32 | `public/branding/suberos-icon-32.png` | Approved | Uso productivo confirmado |
| Apple touch icon 180 | `public/branding/suberos-icon-180.png` | Approved | Uso productivo confirmado |
| Icon 192 | `public/branding/suberos-icon-192.png` | Approved | Uso productivo confirmado |
| Icon 512 | `public/branding/suberos-icon-512.png` | Approved | Uso productivo confirmado |
| Social card SVG | `public/branding/suberos-social-card.svg` | Approved | Composicion propia del proyecto |
| Social card PNG | `public/branding/suberos-social-card.png` | Approved | Export de la composicion propia |

## Conservados pero pendientes

| Asset | Ruta | Estado | Bloqueo |
| --- | --- | --- | --- |
| StretchPro original | `public/branding/fonts/StretchPro.otf` | Pending | Falta licencia documental y derecho de self-hosting comercial |
| StretchPro backup | `public/legacy-source/fonts/StretchPro.otf` | Pending | Copia de trazabilidad, mismo bloqueo documental |
| couture-bld | `public/legacy-source/fonts/couture-bld.otf` | Pending | Fuente legacy sin aprobacion productiva |
| Oswald Variable | `public/legacy-source/fonts/Oswald-VariableFont_wght.ttf` | Pending | Fuente legacy sin aprobacion productiva |

## Evidencia de recuperacion

- La recuperacion original de `StretchPro.otf`, `couture-bld.otf` y `Oswald-VariableFont_wght.ttf` ya estaba documentada en `docs/LEGACY_ASSET_INVENTORY.md`.
- En Sprint 13 no se han descargado nuevos assets porque `https://suberos.com/` y sus URLs directas devolvieron `403` durante la comprobacion actual desde shell.
