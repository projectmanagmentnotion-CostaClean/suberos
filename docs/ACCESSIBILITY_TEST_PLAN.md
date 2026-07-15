# Accessibility Test Plan

Fecha: 2026-07-15

## Automatizado ejecutado

- `npm run qa:aria`
- `npm run qa:a11y`
- `npm run qa:a11y:axe`
- `npm run qa:visual`

## Cobertura automatizada

- Skip link hacia `#main-content`
- Foco retenido dentro del preloader inicial
- Menu movil con foco inicial dentro del dialogo y trap de tab
- Foco de carga en `h1` para rutas no-home
- `aria-describedby` del select de servicio
- ARIA integrity: referencias rotas, ids duplicados y estados overlay
- Axe: reglas generales de estructura, labels, headings y semantica

## Manual ejecutado localmente

- Revision visual en `390x844`
- Revision visual en `768x1024`
- Revision visual en `1366x768`
- Comprobacion de overflow horizontal
- Comprobacion de consola sin errores en la home cargada localmente

## Manual pendiente

- NVDA en Windows con home, legales y formulario
- VoiceOver en macOS/iOS si el proyecto se publica en esos targets
- TalkBack en Android si la futura experiencia cinematografica afecta scroll o gestos
## Sprint 12 update

- Automated accessibility coverage now lives in `tests/accessibility/`.
- The suite validates skip link, menu focus trap, non-home heading focus and contact helper bindings.
- Axe runs on home, contact and `/legal/accesibilidad`.
- Full browser-project runs passed on Chromium, Firefox and WebKit after worker and focus-trap hardening.
