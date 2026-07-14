# Motion QA

## Validacion ejecutada

Fecha: 2026-07-14

Comandos:

- `npm run qa:isolation`
- `npm run qa:portfolio`
- `npm run lint`
- `npm run build`
- `npm run qa:visual`
- `npm run preview -- --host 127.0.0.1 --port 4173`
- `npm run preview -- --host 127.0.0.1 --port 4174`

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
- entrada directa a `#estudio`, `#servicios`, `#trabajo`, `#proceso`, `#contacto`
- `?reduced-motion=1`

Motion Lab interno:

- `1366x768`
- `1366x768` con `?reduced-motion=1`

Portfolio Lab interno:

- `390x844`
- `768x1024`
- `1366x768`
- `?portfolio-lab=1`
- comprobacion de `noindex,nofollow`
- comprobacion de ausencia en `robots.txt` y `sitemap.xml`

## Hallazgos y correcciones aplicadas

- El hero movil se recortaba en la version monumental inicial.
  - Corregido reduciendo la escala del display type en `<= 40rem`.
- El drawer movil ocupaba todo el ancho y dejaba el overlay inutil.
  - Corregido limitando el ancho del panel, ajustando el area real del overlay y anadiendo boton de cierre interno.
- El lock de scroll era demasiado basico para encadenar preloader y drawer.
  - Corregido con un lock fijo por referencia que preserva y restaura `scrollY`.
- La home bajo el hero seguia siendo una secuencia de readiness cards.
  - Corregido con escenas editoriales para estudio, servicios, trabajo, metodo y statement.
- `aria-labelledby` apuntaba a titulos sin `id` real.
  - Corregido anadiendo `titleId` a `SectionHeader`.
- El Portfolio Lab podia dejar la meta `robots` en `noindex,nofollow` al volver a la home dentro de la SPA.
  - Corregido restaurando o eliminando correctamente el atributo `content` en cleanup.

## Resultado de reduced motion

- El preloader se simplifica o se omite segun perfil.
- El hero queda visible sin scrub en `reduced`.
- Motion Lab sigue mostrando `ScrollTrigger.getAll().length = 0` en reduced.
- `Lenis` no se activa en reduced.
- Las escenas nuevas limpian estilos y dejan todo el contenido visible en orden natural.
- La home y el Portfolio Lab mantienen un unico `h1`, sin overflow y sin errores de consola en reduced.

## Validacion accesible revisada

- Skip link presente en shell.
- Header con boton movil etiquetado.
- Drawer movil cierra con `Escape`, boton interno y overlay.
- Un unico `h1` por vista.
- El preloader no atrapa el foco.
- CTA del hero tienen destino real.
- Las secciones principales ya exponen `h2` con IDs reales para `aria-labelledby`.
- Los anchors directos a secciones se verificaron en preview.
- El Portfolio Lab queda claramente marcado como interno y no indexable.

## Limites de esta QA

- No se ejecuto Lighthouse.
- La revision manual del navegador embebido exigio esperar a la hidratacion del chunk lazy del Portfolio Lab antes de leer el DOM.
- No se probo Safari iOS fisico.
- La validacion visual se hizo con Playwright y comprobaciones manuales de preview, no con diff visual pixel-perfect.
