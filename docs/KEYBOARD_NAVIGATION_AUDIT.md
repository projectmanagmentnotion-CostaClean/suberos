# Keyboard Navigation Audit

Fecha: 2026-07-15

## Flujo auditado

- `Tab` al skip link
- Activacion del skip link hacia `main`
- Home publica con CTAs y anchors
- Menu movil en `390x844`
- Legales y labs internos con foco inicial en `h1`
- Formulario de contacto con foco al primer error

## Hallazgos corregidos

- Preloader: antes dejaba tabular al contenido oculto; ahora retiene el foco en el overlay.
- Menu movil: antes el foco podia escapar al fondo; ahora el dialogo atrapa tab y restaura foco al trigger con `Escape`.
- Rutas no-home: antes el foco inicial no estaba garantizado; ahora cada vista monta el foco sobre su `h1`.

## Estado actual

- `SkipLink` enfoca el destino real y actualiza el hash sin perder contexto.
- `main#main-content` es enfocables por script con `tabIndex={-1}`.
- El menu movil abre con foco en el boton de cierre del dialogo.
- `Escape` cierra el menu y devuelve el foco al trigger.
- El formulario mantiene foco correcto sobre el primer campo invalido.

## Riesgos pendientes

- Cuando llegue el hero cinematografico definitivo habra que reauditar cualquier nuevo overlay, pin o secuencia scroll-linked.
