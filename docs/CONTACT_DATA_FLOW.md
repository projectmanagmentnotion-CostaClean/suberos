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
   - el cliente hace `POST` JSON al endpoint resuelto por host
5. El endpoint local mock vuelve a validar en servidor.
6. El mock responde con:
   - exito tecnico
   - error recuperable
   - rate limit
   - timeout
   - bloqueo
7. La UI muestra el estado accesible correspondiente.

## Destino real de datos

- En localhost, los datos llegan al mock local.
- El mock no entrega email ni persiste solicitudes.
- El mock registra solo:
  - `requestId`
  - servicio
  - dominio del email

## Destino en produccion hoy

- No existe backend real documentado en este repositorio.
- El build publico no incorpora el mock.
- Si `/api/contact` no existe, el usuario recibe un mensaje de indisponibilidad del canal online.

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
