# Form Endpoint Status

Fecha: 2026-07-16

## Estado decidido

Opcion A: formulario real activo.

## Evidencia actual

- `CONTACT_REAL_ENDPOINT_ENABLED` queda activado a traves de `src/data/companyProfile.ts`.
- El runtime publico apunta a `/api/contact`.
- El endpoint real se sirve desde `public/api/contact.php`.
- El destinatario operativo configurado es:
  - `info@suberos.com`
- `Reply-To` usa el correo del visitante.
- `qa:contact`, `qa:privacy`, `qa:legal` y `qa:release` validan ya el nuevo estado activo sin exito falso.
- La entrega productiva quedo verificada el `2026-07-16` con el `requestId 84682fe34295195a`.
- El mensaje de prueba fue visible en la bandeja de `info@suberos.com` con asunto `SUBEROS contacto: branding - Prueba Codex`.

## Lo que queda por confirmar en este sprint

- prueba manual completa de respuesta desde Webmail usando el `Reply-To`
- documentacion final de retencion y operativa del buzon
