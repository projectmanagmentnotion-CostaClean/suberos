# SUBEROS Visual Asset Inventory

Fecha de auditoria: 2026-07-15

## Resumen

- Logo productivo confirmado: `public/branding/suberos-logo-symbol.webp`
- Favicons productivos confirmados:
  - `public/branding/suberos-icon-32.png`
  - `public/branding/suberos-icon-180.png`
  - `public/branding/suberos-icon-192.png`
  - `public/branding/suberos-icon-512.png`
- Social card propia:
  - `public/branding/suberos-social-card.svg`
  - `public/branding/suberos-social-card.png`
- Tipografia publica aprobada:
  - `public/branding/fonts/syncopate/Syncopate-Regular.woff2`
  - `public/branding/fonts/syncopate/Syncopate-Bold.woff2`
  - `public/branding/fonts/syncopate/LICENSE.txt`
- Fuentes legacy retiradas del build publico:
  - `resources/fonts/legacy/StretchPro.otf`
  - `resources/fonts/legacy/StretchPro-legacy.otf`
  - `resources/fonts/legacy/couture-bld.otf`
  - `resources/fonts/legacy/Oswald-VariableFont_wght.ttf`
- No existen aun fotografias, video, mockups ni portfolio publicado dentro del repositorio

## Inventario principal

| ID | Archivo | Tipo | Licencia | Peso | Formato | Uso | Estado | Publicable | Observaciones |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| brand-logo-symbol | `public/branding/suberos-logo-symbol.webp` | imagen | interna SUBEROS | 77016 | WebP | logo editorial | optimizado | si | Derivado del logo legacy recuperado |
| brand-icon-32 | `public/branding/suberos-icon-32.png` | icono | interna SUBEROS | 1698 | PNG | favicon | optimizado | si | Icono de navegador |
| brand-icon-180 | `public/branding/suberos-icon-180.png` | icono | interna SUBEROS | 14881 | PNG | apple touch icon | optimizado | si | Para iOS homescreen |
| brand-icon-192 | `public/branding/suberos-icon-192.png` | icono | interna SUBEROS | 15917 | PNG | PWA/Android icon | optimizado | si | Referenciado en metadata |
| brand-icon-512 | `public/branding/suberos-icon-512.png` | icono | interna SUBEROS | 50927 | PNG | OG fallback, app icon | optimizado | si | Metadata y fallback visual |
| brand-social-card-svg | `public/branding/suberos-social-card.svg` | imagen | interna SUBEROS | 1529 | SVG | base editable para social card | original | si | Usa stack local con Syncopate como primera opcion |
| brand-social-card-png | `public/branding/suberos-social-card.png` | imagen | interna SUBEROS | 29873 | PNG | `og:image` y `twitter:image` | optimizado | si | Exportada desde la composicion propia |
| brand-font-syncopate-regular | `public/branding/fonts/syncopate/Syncopate-Regular.woff2` | fuente | aprobada | 32344 | WOFF2 | display 400 de apoyo | optimizado | si | Fuente oficial self-hosted |
| brand-font-syncopate-bold | `public/branding/fonts/syncopate/Syncopate-Bold.woff2` | fuente | aprobada | 17432 | WOFF2 | display 700 critica | optimizado | si | Peso preload above the fold |
| brand-font-syncopate-license | `public/branding/fonts/syncopate/LICENSE.txt` | licencia | Apache License 2.0 | 11358 | TXT | evidencia de licencia | original | si | Uso comercial, self-hosting y redistribucion permitidos con la licencia y avisos aplicables |

## Legacy no publicable

| ID | Archivo | Tipo | Estado | Publicable | Observaciones |
| --- | --- | --- | --- | --- | --- |
| legacy-font-stretchpro | `resources/fonts/legacy/StretchPro.otf` | fuente | retirada | no | Fuente historica fuera de `public` |
| legacy-font-stretchpro-backup | `resources/fonts/legacy/StretchPro-legacy.otf` | fuente | retirada | no | Copia trazable fuera del build |
| legacy-font-couture | `resources/fonts/legacy/couture-bld.otf` | fuente | retirada | no | Sin aprobacion documental |
| legacy-font-oswald | `resources/fonts/legacy/Oswald-VariableFont_wght.ttf` | fuente | retirada | no | Sin aprobacion documental |

## Riesgos actuales

- El cierre legal del titular, NIF/CIF y domicilio sigue pendiente.
- El formulario publico sigue sin endpoint real.
- No existen todavia assets de portfolio aprobados para publicacion.
- La conformidad final en dispositivos fisicos y hosting real sigue pendiente.
