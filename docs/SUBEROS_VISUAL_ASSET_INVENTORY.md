# SUBEROS Visual Asset Inventory

Fecha de auditoria: 2026-07-14

## Alcance

Inventario maestro de assets visuales localizados en el repositorio durante Sprint 06. No se asume propiedad solo por presencia en disco. Los assets solo son publicables cuando su propiedad, licencia y aprobacion quedan confirmadas.

## Resumen

- Logo productivo confirmado: `public/branding/suberos-logo-symbol.webp`
- Favicons productivos confirmados:
  - `public/branding/suberos-icon-32.png`
  - `public/branding/suberos-icon-180.png`
  - `public/branding/suberos-icon-192.png`
  - `public/branding/suberos-icon-512.png`
- Fuente original conservada:
  - `public/branding/fonts/StretchPro.otf`
  - copia legacy en `public/legacy-source/fonts/StretchPro.otf`
- Fuentes legacy adicionales conservadas pero no aprobadas para uso productivo:
  - `public/legacy-source/fonts/couture-bld.otf`
  - `public/legacy-source/fonts/Oswald-VariableFont_wght.ttf`
- No existen aun fotografias, video, mockups, secuencias ni portfolio publicado dentro del repositorio

## Inventario

| ID | Archivo | Tipo | Propiedad | Licencia | Dimensiones | Peso | Formato | Uso | Desktop | Movil | Prioridad | Estado | Publicable | Observaciones |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| brand-logo-symbol | `public/branding/suberos-logo-symbol.webp` | imagen | confirmada | pendiente de registro formal | 989x1024 | 77016 | WebP | logo editorial, marca | si | si | high | optimizado | si | Derivado del logo legacy recuperado; alpha presente |
| brand-icon-32 | `public/branding/suberos-icon-32.png` | icono | confirmada | pendiente de registro formal | 32x32 | 1698 | PNG | favicon | si | si | critical | optimizado | si | Icono de navegador |
| brand-icon-180 | `public/branding/suberos-icon-180.png` | icono | confirmada | pendiente de registro formal | 180x180 | 14881 | PNG | apple touch icon | si | si | high | optimizado | si | Para iOS homescreen |
| brand-icon-192 | `public/branding/suberos-icon-192.png` | icono | confirmada | pendiente de registro formal | 192x192 | 15917 | PNG | PWA/Android icon | si | si | high | optimizado | si | Referenciado en metadata |
| brand-icon-512 | `public/branding/suberos-icon-512.png` | icono | confirmada | pendiente de registro formal | 512x512 | 50927 | PNG | OG fallback, app icon | si | si | high | optimizado | si | Se usa como `og:image` actual |
| brand-font-stretchpro | `public/branding/fonts/StretchPro.otf` | fuente | pendiente | pendiente de licencia formal | n/a | 199652 | OTF | display font | si | si | high | original | pendiente | Fuente preservada para uso actual local; requiere registro/licencia documental |
| legacy-logo-master | `public/legacy-source/LOGO-SUBEROS-1-989x1024.webp` | imagen | confirmada | pendiente de registro formal | 989x1024 | 77016 | WebP | original legacy | no | no | normal | original | no | No usar directamente en produccion |
| legacy-icon-32 | `public/legacy-source/cropped-cropped-ikigai-logo-32x32.png` | icono | confirmada | pendiente de registro formal | 32x32 | 1698 | PNG | original legacy | no | no | normal | original | no | Copia de trazabilidad |
| legacy-icon-180 | `public/legacy-source/cropped-cropped-ikigai-logo-180x180.png` | icono | confirmada | pendiente de registro formal | 180x180 | 14881 | PNG | original legacy | no | no | normal | original | no | Copia de trazabilidad |
| legacy-icon-192 | `public/legacy-source/cropped-cropped-ikigai-logo-192x192.png` | icono | confirmada | pendiente de registro formal | 192x192 | 15917 | PNG | original legacy | no | no | normal | original | no | Copia de trazabilidad |
| legacy-icon-512 | `public/legacy-source/cropped-cropped-ikigai-logo.png` | icono | confirmada | pendiente de registro formal | 512x512 aprox | 50927 | PNG | original legacy | no | no | normal | original | no | Renombrado legacy; no usar como productivo |
| legacy-font-stretchpro | `public/legacy-source/fonts/StretchPro.otf` | fuente | pendiente | pendiente de licencia formal | n/a | 199652 | OTF | respaldo legacy | no | no | normal | original | no | Copia de seguridad de la fuente original |
| legacy-font-couture | `public/legacy-source/fonts/couture-bld.otf` | fuente | pendiente | no verificada | n/a | 6196 | OTF | legado | no | no | lazy | original | no | No aprobada para uso publico |
| legacy-font-oswald | `public/legacy-source/fonts/Oswald-VariableFont_wght.ttf` | fuente | pendiente | no verificada | n/a | 169108 | TTF | legado | no | no | lazy | original | no | No aprobada para uso publico |

## Directorios reservados sin media cargada

- `public/hero/`
- `public/services/photography/`
- `public/services/branding/`
- `public/services/print/`
- `public/services/web/`
- `public/portfolio/drafts/`
- `public/portfolio/approved/`
- `public/portfolio/published/`
- `public/motion/sequences/`
- `public/motion/posters/`
- `public/backgrounds/`
- `public/textures/`

## Assets aprobados

- Aprobados para produccion actual:
  - logo simbolo WebP
  - paquete favicon PNG
- Pendientes de evidencia documental:
  - `StretchPro.otf`
- Rechazados para publicacion actual:
  - no hay assets rechazados explicitamente; simplemente no hay portfolio, video ni fotografia aprobados todavia

## Riesgos actuales

- La licencia documental de `StretchPro.otf` no esta registrada en el repositorio
- No existen texturas, fotografia, mockups ni secuencias reales aprobadas para elevar mas la home sin recurrir a placeholders editoriales
- El inventario refleja el estado real del repo, no una aprobacion legal definitiva
