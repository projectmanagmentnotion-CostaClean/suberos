# Design System

Fecha: 2026-07-14

## Principios

- Base editorial sobria, de charcoal a negro, preparada para motion futuro sin depender de el.
- Componentes pequenos, tipados y semanticos antes que bloques monoliticos.
- Contenido real y verificable por encima de relleno visual.
- Accesibilidad, foco visible y reduced motion como requisitos de sistema.

## Tokens

### Color

- `--color-black-absolute`
- `--color-black-elevated`
- `--color-charcoal`
- `--color-graphite`
- `--color-metallic-gray`
- `--color-muted-text`
- `--color-primary-text`
- `--color-warm-white`
- `--color-border-subtle`
- `--color-border-strong`
- `--color-focus`
- `--color-error`
- `--color-success`

### Gradientes

- `--gradient-page`
- `--gradient-charcoal-black`
- `--gradient-radial-light`
- `--gradient-metallic`
- `--gradient-image-overlay`
- `--gradient-legibility`
- `--gradient-section-transition`

### Tipografia

- Display monumental: `--font-size-display`
- Heading XL: `--font-size-heading-xl`
- Heading L: `--font-size-heading-l`
- Heading M: `--font-size-heading-m`
- Body large: `--font-size-body-large`
- Body: `--font-size-body`
- Small: `--font-size-small`
- Eyebrow: `--font-size-eyebrow`
- Navigation: `--font-size-nav`
- Metadata: `--font-size-metadata`

Fuentes actuales:

- Display: `StretchPro`, `Arial Narrow`, `Helvetica Neue`, Arial
- Sans: `Segoe UI`, `Helvetica Neue`, Arial

`StretchPro.otf` se ha preservado desde la web heredada y ahora se sirve localmente. `Oswald` y `couture-bld` quedan conservadas como legacy assets, pero no activadas en la UI actual.

### Spacing

- Micro: `--space-2xs`, `--space-xs`
- Interno / componentes: `--space-sm`, `--space-md`
- Bloques: `--space-lg`, `--space-xl`
- Escenas: `--space-2xl`, `--space-3xl`, `--space-scene`
- Gutter responsive: `--space-gutter`

### Otros tokens

- Radios: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`
- Borders: `--border-thin`, `--border-strong`
- Shadows: `--shadow-soft`, `--shadow-deep`, `--shadow-header`
- Blur: `--blur-sm`, `--blur-md`
- Duraciones: `--duration-fast`, `--duration-medium`, `--duration-slow`
- Easings: `--ease-standard`, `--ease-enter`, `--ease-exit`
- Contenedores: `--container-narrow`, `--container-content`, `--container-wide`, `--container-full`
- Touch target minimo: `--touch-target-min`
- Capas: `--z-base`, `--z-header`, `--z-skip-link`, `--z-overlay`, `--z-drawer`

## Layout primitives

- `Container`: anchos `narrow`, `content`, `wide`, `full`
- `Section`: tonos `default`, `muted`, `hero`, `raised`; spacing `compact`, `default`, `scene`
- `Stack`: composicion vertical con escala de gaps
- `Cluster`: agrupacion horizontal con control de gap, alineacion y reparto
- `Grid`: presets `halves`, `thirds`, `content-aside`, `cards`
- `Bleed`: breakout horizontal controlado
- `Surface`: cajas reutilizables con padding y tono

## Componentes UI

- `Button`: variantes `primary`, `secondary`, `ghost`, `text`; tamanos `small`, `medium`, `large`; soporte para enlace o boton
- `TextLink`: interno/externo con indicador externo y foco visible
- `IconButton`: nombre accesible obligatorio y target tactil minimo
- `Eyebrow`: etiqueta editorial reutilizable
- `SectionHeader`: eyebrow, titulo, descripcion, CTA y anchos de lectura
- `MediaFrame`: prepara fotografia, video, canvas y fallback sin implementar aun la logica pesada
- `Divider`: separador sutil
- `SkipLink`: visible al foco y conectado con `#main-content`

## Accesibilidad

- No se eliminan outlines sin reemplazo.
- `:focus-visible` usa `--color-focus`.
- Menu movil con `aria-expanded`, `aria-controls`, cierre con Escape y restauracion de foco.
- Anchors internos reales, sin `href="#"`.
- Touch target minimo de `44px` en botones e inputs.
- Reduced motion respetado por CSS y por los hooks de motion.

## Uso correcto

- Construir escenas nuevas combinando `Section + Container + Grid/Stack` antes de crear wrappers ad hoc.
- Reutilizar `Surface` y `MediaFrame` para bloques editoriales y media.
- Mantener nuevos colores y timings dentro de tokens; no hardcodearlos en componentes.
- Usar `Button` para acciones principales y `TextLink` para navegacion contextual.

## Anti-patrones

- Reintroducir CSS monolitico por componente.
- Hardcodear negros, blancos o espaciados fuera de tokens.
- Crear secciones que dependan de GSAP para ser legibles o navegables.
- Anadir enlaces internos vacios, placeholders con `#` o redes no confirmadas.
