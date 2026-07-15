# Asset Pipeline

## Objetivo

Definir como se almacenan, verifican y sirven los assets de SUBEROS para mantener trazabilidad, rendimiento y evitar hotlinks.

## Carpetas publicas

```text
public/
  branding/
    fonts/
  hero/
  motion/
    lab/
      suberos-sequence-lab/
    sequences/
    posters/
  services/
    photography/
    branding/
    print/
    web/
  portfolio/
    drafts/
    approved/
    published/
  backgrounds/
  textures/
  legacy-source/
```

- `branding/`: assets aprobados para produccion
- `hero/`: variantes futuras del primer viewport
- `motion/lab/`: secuencias internas de QA no publicables
- `motion/sequences/` y `motion/posters/`: reservados para secuencias y posters aprobados
- `services/`: assets de disciplinas por servicio; pueden permanecer vacios hasta contar con material aprobado
- `portfolio/drafts/`: material privado no publicable
- `portfolio/approved/`: material aprobado internamente pero todavia no publicado
- `portfolio/published/`: unico origen valido para media de portfolio publica
- `backgrounds/` y `textures/`: overlays, grain y fondos propios aprobados
- `legacy-source/`: originales recuperados, sin servir como dependencia final por defecto

## Assets actuales aprobados

- `public/branding/suberos-icon-32.png`
- `public/branding/suberos-icon-180.png`
- `public/branding/suberos-icon-192.png`
- `public/branding/suberos-icon-512.png`
- `public/branding/suberos-logo-symbol.webp`
- `public/branding/fonts/StretchPro.otf`

## Assets de portfolio

- `public/portfolio/` permanece sin assets publicados en este momento
- cualquier futuro caso de estudio debe aportar:
  - assets propios o autorizados
  - dimensiones y peso documentados
  - aprobacion explicita para publicacion
  - copia original en `public/legacy-source/` cuando proceda

## Assets de secuencia

- `public/motion/lab/suberos-sequence-lab/` contiene la secuencia abstracta propia de Sprint 07
- uso:
  - solo `Sequence Lab`
  - no publicable como portfolio
  - no enlazado desde la web publica
- composicion actual:
  - `poster.webp`
  - `fallback.webp`
  - sets `desktop/`, `tablet/`, `mobile/`
  - `README.txt` de trazabilidad

## Assets legado conservados

- `public/legacy-source/LOGO-SUBEROS-1-989x1024.webp`
- `public/legacy-source/cropped-cropped-ikigai-logo-32x32.png`
- `public/legacy-source/cropped-cropped-ikigai-logo-180x180.png`
- `public/legacy-source/cropped-cropped-ikigai-logo-192x192.png`
- `public/legacy-source/cropped-cropped-ikigai-logo.png`
- `public/legacy-source/fonts/StretchPro.otf`
- `public/legacy-source/fonts/couture-bld.otf`
- `public/legacy-source/fonts/Oswald-VariableFont_wght.ttf`

La fuente original `StretchPro.otf` queda conservada tanto en `branding/fonts/` como en `legacy-source/fonts/`.

## Naming

- prefijo de marca: `suberos-`
- usar sufijos de tamano solo cuando aplica
- evitar nombres genericos como `image-final-final`
- mantener el formato en el nombre si hay variantes (`.webp`, `.png`)

## Formatos

- iconos/favicons: `png`
- imagen editorial optimizada: `webp`
- futura fotografia responsive: `avif` + `webp` via `picture` cuando existan originales adecuados
- tipografias: conservar original verificado; servir la minima necesaria

## Reglas de optimizacion

- dimensiones explicitas en `img`
- `fetchPriority="high"` solo para el visual principal del primer viewport
- no duplicar el mismo asset en varias carpetas sin motivo
- no servir originales de `legacy-source/` directamente salvo auditoria o comparacion
- no incorporar assets externos sin licencia o procedencia verificable

## Responsive media

- desktop/tablet/mobile deben compartir naming coherente
- si se introducen variantes por breakpoint:
  - `suberos-hero-desktop.*`
  - `suberos-hero-tablet.*`
  - `suberos-hero-mobile.*`
- documentar peso y crop de cada variante antes de adoptarla

## Fuentes

- display actual: `StretchPro`
- preservar fuente original descargada del sitio legado si existe verificada
- evitar sumar familias innecesarias antes de medir impacto real en LCP
- `StretchPro.otf` queda conservada tanto en `public/branding/fonts/` como en `public/legacy-source/fonts/`
- `couture-bld.otf` y `Oswald-VariableFont_wght.ttf` permanecen solo como legado pendiente de verificacion de licencia para uso productivo

## Secuencias futuras

Si en fases posteriores se incorporan secuencias:

- separar desktop/mobile
- definir ventana de preload y descarte
- documentar frame count, peso total y fallback estatico
- no ubicar secuencias dentro de `branding/`
- producir manifiesto JSON en `src/motion/sequences/manifests/`
- validar con `npm run qa:sequences`

## Herramientas de optimizacion

- `sharp` se incorpora como `devDependency`, no como dependencia runtime
- justificacion:
  - inspeccion reproducible de dimensiones y formato
  - conversion controlada a `webp` y `avif`
  - generacion de variantes mobile y posters
  - eliminacion de metadatos innecesarios
- comandos actuales:
  - `node scripts/inspect-asset-metadata.mjs <file>`
  - `node scripts/optimize-asset.mjs --input <file> --output <file> --format webp`
  - `node scripts/optimize-asset.mjs --input <file> --output <file> --format avif --width 1600`
  - `node scripts/generate-sequence-lab-assets.mjs`
  - `npm run assets:sequence-manifest`
  - `npm run qa:sequences`

## Licencias y procedencia

- usar solo assets propios, recuperados del sitio legado o entregados por el usuario
- no promover a produccion assets de clientes o proyectos separados hasta confirmar permiso de uso en la web corporativa de SUBEROS
- documentar toda nueva incorporacion en `docs/SUBEROS_VISUAL_ASSET_INVENTORY.md` y en el sprint correspondiente
## Sprint 11 update - 2026-07-15

- `src/styles/fonts.css` deja de declarar `Legacy Couture` y `Legacy Oswald` en runtime.
- El runtime solo usa `StretchPro` desde `public/branding/fonts/StretchPro.otf`.
- `StretchPro.otf` y el hero visual principal reciben preload explicito en `index.html`.
- Las copias en `public/legacy-source/` se conservan solo como respaldo auditado, no como dependencia publica del runtime.
