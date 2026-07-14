# App Shell

Fecha: 2026-07-14

## Estructura

- `src/app/AppShell.tsx`
- `SkipLink`
- `Header`
- `main#main-content`
- secciones con IDs estables
- `Footer`

## Landmarks y jerarquia

- `header` sticky con marca, navegacion y CTA
- `nav` principal desktop y `nav` del menu movil
- `main` unico para el contenido
- `footer` con navegacion, servicios, contacto y legal preparado
- un unico `h1` en la home

## Linking interno

Anchors disponibles:

- `#inicio`
- `#estudio`
- `#servicios`
- `#trabajo`
- `#proceso`
- `#contacto`

Cada seccion usa `scroll-margin-top` para compensar la altura del header.

## Header

- Logo local recuperado en Sprint 01
- CTA de contacto real
- estado base translcido y estado elevado al hacer scroll
- preparado para animacion GSAP, pero funcional sin ella

## Menu movil

- `IconButton` con `aria-expanded`
- panel asociado por `aria-controls`
- bloqueo de scroll del `body`
- cierre con Escape
- cierre al seleccionar destino
- restauracion de foco al boton cuando corresponde
- overlay de fondo

## Footer

- marca
- descripcion basada en servicios confirmados
- listas de navegacion y servicios
- contacto real
- legal preparado con paginas estaticas temporales
- copyright dinamico
- enlace para volver arriba

## Responsive

- Desktop: nav inline, CTA visible
- Tablet/mobile: CTA desktop se oculta y entra menu drawer
- Grids `thirds`, `halves` y `content-aside` colapsan a una columna en breakpoints medios

## Integracion futura con motion

- `Header` ya tiene transicion ligera con GSAP
- `useMenuMotion` centraliza apertura/cierre del drawer
- `ScrollAccent` mantiene la validacion editorial del sistema
- El shell sigue usable aunque GSAP falle o reduced motion este activo
