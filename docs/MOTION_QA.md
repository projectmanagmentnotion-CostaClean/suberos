# Motion QA

## Validacion ejecutada

Fecha: 2026-07-14

Comandos:

- `npm run qa:isolation`
- `npm run qa:portfolio`
- `npm run qa:sequences`
- `npm run lint`
- `npm run build`
- `npm run qa:visual`
- `npm run preview -- --host 127.0.0.1 --port 4173`
- `npm run preview -- --host 127.0.0.1 --port 4174`
- `npm run preview -- --host 127.0.0.1 --port 4175`

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

Sequence Lab interno:

- `390x844`
- `768x1024`
- `1366x768`
- `?sequence-lab=1`
- `?sequence-lab=1&reduced-motion=1`
- `?sequence-lab=1&asset-fail=1`
- comprobacion manual de progreso de `Frame 1 / 36` a `Frame 36 / 36`

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
- La lectura del titulo en un test desktop de home era fragil.
  - Corregido esperando `domcontentloaded` antes de las aserciones.
- `MotionLab` tenia el mismo riesgo de no restaurar correctamente `robots`.
  - Corregido con el mismo cleanup defensivo aplicado a los labs internos.

## Resultado de reduced motion

- El preloader se simplifica o se omite segun perfil.
- El hero queda visible sin scrub en `reduced`.
- Motion Lab sigue mostrando `ScrollTrigger.getAll().length = 0` en reduced.
- `Lenis` no se activa en reduced.
- Las escenas nuevas limpian estilos y dejan todo el contenido visible en orden natural.
- La home y el Portfolio Lab mantienen un unico `h1`, sin overflow y sin errores de consola en reduced.
- `Sequence Lab` en reduced queda con `Phase fallback`, `Loaded 0`, `Memory 0` y `Canvas off`.

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
- `Sequence Lab` queda claramente marcado como interno y no indexable.
- El fallback estatico mantiene contenido util cuando falla un frame.

## Limites de esta QA

- No se ejecuto Lighthouse.
- La revision manual del navegador embebido exigio esperar a la hidratacion del chunk lazy del Portfolio Lab antes de leer el DOM.
- La revision manual de `Sequence Lab` exigio un preview limpio aparte porque el navegador embebido puede enganchar previews viejos si ya habia un `vite preview` previo activo.
- No se probo Safari iOS fisico.
- La validacion visual se hizo con Playwright y comprobaciones manuales de preview, no con diff visual pixel-perfect.
