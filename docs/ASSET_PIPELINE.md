# Asset Pipeline

## Objetivo

Definir como se almacenan, verifican y sirven los assets de SUBEROS para mantener trazabilidad, rendimiento y evitar hotlinks.

## Carpetas publicas

```text
public/
  branding/
    fonts/
  hero/
  textures/
  placeholders/
  legacy-source/
```

- `branding/`: assets aprobados para produccion
- `hero/`: variantes futuras del primer viewport
- `textures/`: grain, overlays y fondos aprobados
- `placeholders/`: placeholders editoriales controlados
- `legacy-source/`: originales recuperados, sin servir como dependencia final por defecto

## Assets actuales aprobados

- `public/branding/suberos-icon-32.png`
- `public/branding/suberos-icon-180.png`
- `public/branding/suberos-icon-192.png`
- `public/branding/suberos-icon-512.png`
- `public/branding/suberos-logo-symbol.webp`
- `public/branding/fonts/StretchPro.otf`

## Assets pendientes por proyecto

- `Luxury Shisha`
  - estado visual actual en home: composicion editorial temporal construida en codigo
  - pendientes:
    - capturas aprobadas desktop/mobile
    - version optimizada para `public/projects/`
    - alt final basado en la captura real aprobada

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

## Secuencias futuras

Si en fases posteriores se incorporan secuencias:

- separar desktop/mobile
- definir ventana de preload y descarte
- documentar frame count, peso total y fallback estatico
- no ubicar secuencias dentro de `branding/`

## Licencias y procedencia

- usar solo assets propios, recuperados del sitio legado o entregados por el usuario
- documentar toda nueva incorporacion en `docs/LEGACY_ASSET_INVENTORY.md` o en el sprint correspondiente
