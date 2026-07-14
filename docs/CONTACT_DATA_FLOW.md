# Contact Data Flow

Fecha: 2026-07-14

## Flujo actual

1. La persona completa el formulario en `#contacto`.
2. `ContactForm.tsx` valida en cliente con `validateClientContact`.
3. Si falla la validacion:
   - no se envia nada
   - se muestran errores por campo
   - el foco salta al primer error
4. Si pasa la validacion:
   - `submitContactRequest()` serializa el payload normalizado
   - la build publica comprueba primero si existe endpoint real habilitado
   - si no existe y no se ha activado QA explicita, el flujo devuelve bloqueo honesto sin enviar red
5. Solo en QA explicita:
   - `window.__SUBEROS_CONTACT_TEST_MODE__ = true`
   - escenario de mock valido
   - el cliente hace `POST` JSON al mock local
6. El endpoint local mock vuelve a validar en servidor.
7. El mock responde con:
   - exito tecnico
   - error recuperable
   - rate limit
   - timeout
   - bloqueo
8. La UI muestra el estado accesible correspondiente.

## Destino QA de datos

- Solo en QA explicita, los datos llegan al mock local.
- El mock no entrega email ni persiste solicitudes.
- El mock registra solo:
  - `requestId`
  - servicio
  - dominio del email

## Destino en produccion hoy

- No existe backend real documentado en este repositorio.
- El build publico no incorpora el mock.
- La build publica responde con un mensaje de indisponibilidad del canal online mientras `CONTACT_REAL_ENDPOINT_ENABLED` siga en `false`.

## Retencion

- No hay almacenamiento persistente implementado en el repositorio actual.
- La retencion real no puede declararse hasta definir backend y operador real.

## Datos pendientes para una version real

- responsable juridico
- base legitimadora exacta
- destinatario de correo o CRM
- procesador o proveedor
- retencion
- canal de supresion
- politica final de privacidad
