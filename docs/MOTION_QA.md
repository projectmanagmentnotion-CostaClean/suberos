# Motion QA

## Validacion ejecutada

Fecha: 2026-07-14

Comandos:

- `npm run lint`
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4173`

## Escenarios revisados

Home publica:

- `390x844`
- `768x1024`
- `1366x768`
- `1440x900` en la revision previa del sprint
- horizontal movil
- `?preloader=1`
- `?preloader=1&reduced-motion=1`
- `?preloader=1&asset-fail=1`
- segunda carga de sesion sin repetir preloader

Motion Lab interno:

- `1366x768`
- `1366x768` con `?reduced-motion=1`

## Hallazgos y correcciones aplicadas

- El hero movil se recortaba en la version monumental inicial.
  - Corregido reduciendo la escala del display type en `<= 40rem`.
- El drawer movil ocupaba todo el ancho y dejaba el overlay inutil.
  - Corregido limitando el ancho del panel, ajustando el area real del overlay y anadiendo boton de cierre interno.
- El lock de scroll era demasiado basico para encadenar preloader y drawer.
  - Corregido con un lock fijo por referencia que preserva y restaura `scrollY`.

## Resultado de reduced motion

- El preloader se simplifica o se omite segun perfil.
- El hero queda visible sin scrub en `reduced`.
- Motion Lab sigue mostrando `ScrollTrigger.getAll().length = 0` en reduced.
- `Lenis` no se activa en reduced.

## Validacion accesible revisada

- Skip link presente en shell.
- Header con boton movil etiquetado.
- Drawer movil cierra con `Escape`, boton interno y overlay.
- Un unico `h1` por vista.
- El preloader no atrapa el foco.
- CTA del hero tienen destino real.

## Limites de esta QA

- No se ejecuto Lighthouse.
- No existe suite automatizada de tests en el repositorio actual.
- No se probo Safari iOS fisico.
- La validacion visual se hizo con capturas y comprobaciones DOM, no con diff visual automatizado.
