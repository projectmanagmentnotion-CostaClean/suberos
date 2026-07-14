# Motion QA

## Validacion ejecutada

Fecha: 2026-07-14

Comandos:

- `npm run lint`
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4173`

## Escenarios revisados

- Home publica:
  - `390x844`
  - `768x1024`
  - `1366x768`
- Motion Lab interno:
  - `1366x768`
  - `1366x768` con `?reduced-motion=1`

## Hallazgos y correcciones aplicadas

- El hero en mobile desbordaba la CTA principal.
  - Corregido reduciendo display type en `<= 40rem` y forzando grid para CTAs.
- El hero en tablet necesitaba mas separacion entre copy y panel.
  - Corregido aumentando el gap del layout en `<= 64rem`.
- El laboratorio carecia de estilos propios.
  - Corregido con estilos dedicados para cards, pin wrap, track horizontal y velocity card.

## Resultado de reduced motion

- Perfil `reduced` visible en Motion Lab.
- `ScrollTrigger.getAll().length` pasa a `0` en reduced.
- `Lenis` no se activa en reduced.

## Validacion accesible revisada

- Skip link presente en shell.
- Header con boton movil etiquetado y `aria-expanded`.
- Drawer movil cierra con `Escape`.
- Un unico `h1` por vista.
- El laboratorio permanece fuera de indexacion publica.

## Limites de esta QA

- No se ejecuto Lighthouse ni suite automatica de accesibilidad.
- La validacion visual se hizo con capturas headless y revision manual, no con diff automatizado.
