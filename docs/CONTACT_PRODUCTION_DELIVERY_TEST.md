# Contact Production Delivery Test

Fecha: 2026-07-16

## Estado

`VERIFICADO EN PRODUCCION`

## Evidencia del endpoint

- `GET https://suberos.com/api/contact` devuelve `405 Method Not Allowed`
- `Content-Type`: `application/json; charset=utf-8`
- el endpoint no cae en el fallback SPA

## Evidencia del envio real

- asunto recibido: `SUBEROS contacto: branding - Prueba Codex`
- `requestId`: `84682fe34295195a`
- fecha visible en Webmail: `2026-07-16 11:15`
- navegador utilizado para la verificacion manual: in-app browser de Codex sobre Webmail/Roundcube autenticado

## Verificacion manual de Reply-To

- `Reply-To` correcto: si
- metodo de comprobacion: apertura del mensaje en Roundcube y generacion del borrador de respuesta desde la accion `Responder`
- destinatario precargado: visitante de prueba `codex-test@...`
- dominio del destinatario enmascarado: `e******.com`
- asunto de respuesta: `Re: SUBEROS contacto: branding - Prueba Codex`

## Conclusion

El canal de contacto publico entrega correos reales a `info@suberos.com` y el borrador de respuesta usa el `Reply-To` del visitante, no la cuenta interna de SUBEROS.
