# Conversion Events

Fecha: 2026-07-14

## Estado actual

La arquitectura de eventos existe, pero no hay proveedor activo.

Archivo:

- `src/features/contact/contact.events.ts`

## Eventos definidos

- `contact_view`
- `contact_start`
- `contact_submit`
- `contact_success`
- `contact_error`
- `email_click`
- `phone_click`

## Comportamiento real

- Sprint 08 no envia estos eventos a ninguna plataforma.
- El helper actual es un no-op intencional.
- No se transmite contenido del formulario a sistemas de analytics.

## Condiciones para activar eventos en futuro

- evaluacion de privacidad
- inventario de proveedor
- base legitimadora o necesidad legitima documentada
- prohibicion explicita de incluir datos personales en payloads analiticos
- QA de consentimiento si aplica
