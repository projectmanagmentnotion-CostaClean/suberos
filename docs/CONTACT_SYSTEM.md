# Contact System

Fecha: 2026-07-14

## Estado real

- Sprint 08 implementa la arquitectura tecnica del contacto.
- Existe un endpoint server-side real en `public/api/contact.php`.
- El formulario envia solicitudes reales desde `https://suberos.com/`.
- El mock solo existe para desarrollo local y QA en `127.0.0.1` o `localhost`.

## Arquitectura

Capas:

- UI y estados: `src/features/contact/ContactForm.tsx`
- campos y accesibilidad: `src/features/contact/ContactFormFields.tsx`
- mensajes de exito y error: `src/features/contact/ContactSuccess.tsx`, `src/features/contact/ContactError.tsx`
- validacion compartida: `src/features/contact/contact.schema.ts`
- constantes y copy tecnico: `src/features/contact/contact.constants.ts`
- adapter de envio: `src/features/contact/contact.service.ts`
- mock local: `scripts/contact-mock-server.ts`

## Comportamiento por entorno

- `localhost` o `127.0.0.1`
  - el cliente apunta a `http://127.0.0.1:8787/api/contact`
  - se usa exclusivamente para QA y validacion local
- cualquier otro host
  - el cliente apunta a `/api/contact`
  - si el endpoint no existe o devuelve `404/503`, el sistema muestra indisponibilidad del envio online
  - no se muestra exito falso

## Campos

Obligatorios:

- `name`
- `email`
- `service`
- `message`

Opcionales:

- `company`
- `phone`
- `budget`
- `timeline`
- `website`
- `contactPreference`

Tecnicos:

- `startedAt`
- `websiteUrl`

## Estados de UI

- `idle`
- `validating`
- `submitting`
- `success`
- `error`
- `rate-limited`

## Privacy by design

- sin cookies no esenciales
- sin analytics activo
- sin persistencia del contenido del formulario en storage
- sin datos personales en query string
- sin secretos en el bundle

## Produccion

Arquitectura activa:

- endpoint server-side real en SiteGround
- destinatario operativo: `info@suberos.com`
- `Reply-To` configurado con el email del visitante
- rate limit server-side real
- honeypot y tiempo minimo de envio mantenidos en servidor

Pendientes de cierre final:

- verificacion continuada de entrega y respuesta real
- definicion final de retencion operativa
- QA publica de cierre tras cualquier cambio futuro del endpoint
