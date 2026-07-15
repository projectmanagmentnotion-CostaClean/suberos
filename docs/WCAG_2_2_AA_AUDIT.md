# WCAG 2.2 AA Audit

Fecha: 2026-07-15
Estado: auditoria tecnica local completada, conformidad final no declarada

## Alcance auditado

- Home publica `/?reduced-motion=1` y preloader inicial `/?preloader=reset`
- Legales `/legal/aviso-legal`, `/legal/privacidad`, `/legal/cookies`, `/legal/accesibilidad`
- Laboratorios internos `/?motion-lab=1`, `/?portfolio-lab=1`, `/?sequence-lab=1`
- Navegacion principal, menu movil, skip link, foco visible, formulario de contacto y reduced motion

## Hallazgos reales corregidos en Sprint 10

- El preloader permitia fuga de foco al contenido mientras el overlay seguia visible.
- El menu movil no movia el foco de forma fiable al dialogo ni atrapaba el tab.
- El boton del menu exponia `aria-controls` contra un panel desmontado cuando estaba cerrado.
- El helper del campo `Tipo de proyecto o servicio` no estaba enlazado por `aria-describedby`.
- Las rutas no-home no garantizaban foco programatico sobre el `h1` al cargar.
- La lista de servicios usaba roles ARIA no validos sobre `article`.

## Estado actual

- Navegacion por teclado: verificada localmente con Playwright y comprobacion visual.
- Foco visible: presente en shell, CTAs, formulario y menu.
- Reduced motion: verificado en home, contacto y sequence lab.
- Dialogos/overlays: el menu movil y el preloader aislan el resto de la pagina con `inert`.
- ARIA: verificacion automatizada de referencias, ids duplicados y estados del menu superada.
- Axe: auditoria automatizada local superada en home reduced-motion, legal accesibilidad y sequence lab.

## No conformidades abiertas

- No se declara conformidad WCAG 2.2 AA final porque no se han ejecutado pruebas con lector de pantalla real ni validacion final en entorno publico desplegado.
- La auditoria de contraste esta cerrada sobre tokens base; cualquier nuevo asset editorial o composicion cinematografica futura requerira revalidacion.

## Decision de cierre

- Sprint 10 puede cerrarse como baseline tecnica de accesibilidad e inclusive motion.
- La declaracion publica de accesibilidad debe seguir siendo prudente y no afirmar conformidad total.
