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
   - la build publica hace `POST` JSON a `/api/contact`
5. En produccion:
   - `public/api/contact.php` vuelve a validar
   - aplica honeypot, tiempo minimo y rate limit por IP
   - entrega el correo a `info@suberos.com`
   - fija `Reply-To` con el email del visitante
6. Solo en QA explicita:
   - `window.__SUBEROS_CONTACT_TEST_MODE__ = true`
   - escenario de mock valido
   - el cliente hace `POST` JSON al mock local
7. El endpoint local mock vuelve a validar en servidor.
8. El mock responde con:
   - exito tecnico
   - error recuperable
   - rate limit
   - timeout
   - bloqueo
9. La UI muestra el estado accesible correspondiente.

## Destino QA de datos

- Solo en QA explicita, los datos llegan al mock local.
- El mock no entrega email ni persiste solicitudes.
- El mock registra solo:
  - `requestId`
  - servicio
  - dominio del email

## Destino en produccion hoy

- Backend real documentado en este repositorio: `public/api/contact.php`
- Hosting operativo del endpoint: SiteGround
- Buzon receptor: `info@suberos.com`
- El build publico no incorpora el mock.

## Retencion

- No hay persistencia propia de solicitudes dentro del repositorio.
- El tratamiento operativo ocurre en el buzon `info@suberos.com` y en logs tecnicos acotados del servidor.
- La politica final de retencion sigue pendiente de concretar documentalmente.

## Datos pendientes de cierre documental

- base legitimadora exacta
- retencion operativa final
- canal documental de supresion y ejercicio de derechos
- politica final de privacidad
