# Contact System

Fecha: 2026-07-14

## Estado real

- Sprint 08 implementa la arquitectura tecnica del contacto.
- No existe un proveedor de envio real activo en produccion.
- El formulario no envia emails reales desde `https://suberos.com/`.
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

Para activar envio real hacen falta:

- endpoint server-side real
- secreto solo en servidor
- destinatario real confirmado
- remitente autenticado
- actualizacion de privacidad y vendors
- nueva QA end-to-end sobre dominio publico
