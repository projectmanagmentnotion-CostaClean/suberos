# Asset License Status

Fecha: 2026-07-15

## Estado general

SUBEROS mantiene los assets propios de marca en local y ha sustituido la fuente display publica por `Syncopate` self-hosted desde una fuente oficial verificable. Las fuentes legacy sin evidencia suficiente ya no forman parte de `public/` ni del build de produccion.

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
| Syncopate Regular | `public/branding/fonts/syncopate/Syncopate-Regular.woff2` | Approved | Fuente oficial self-hosted para soporte de peso 400 |
| Syncopate Bold | `public/branding/fonts/syncopate/Syncopate-Bold.woff2` | Approved | Fuente oficial self-hosted critica para hero y titulares |
| Syncopate license file | `public/branding/fonts/syncopate/OFL.txt` | Approved | Copia literal del fichero de licencia oficial descargado |

## Retirados del build publico

| Asset | Ruta actual | Estado | Motivo |
| --- | --- | --- | --- |
| StretchPro original | `resources/fonts/legacy/StretchPro.otf` | Removed from public release | Sin evidencia documental suficiente para self-hosting comercial |
| StretchPro backup | `resources/fonts/legacy/StretchPro-legacy.otf` | Removed from public release | Copia historica fuera del build |
| couture-bld | `resources/fonts/legacy/couture-bld.otf` | Removed from public release | Fuente legacy sin aprobacion productiva |
| Oswald Variable | `resources/fonts/legacy/Oswald-VariableFont_wght.ttf` | Removed from public release | Fuente legacy sin aprobacion productiva |

## Evidencia

- Fuente oficial usada: Google Fonts / repositorio oficial `google/fonts`.
- Trazabilidad y licencia: `docs/licenses/SYNCOPATE_LICENSE.md`.
- Checksums SHA-256: `docs/licenses/SYNCOPATE_CHECKSUMS.txt`.
- Inventario maestro de assets: `docs/SUBEROS_VISUAL_ASSET_INVENTORY.md`.
