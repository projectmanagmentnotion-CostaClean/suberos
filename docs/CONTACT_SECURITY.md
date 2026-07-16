# Contact Security

Fecha: 2026-07-14

## Medidas implementadas

- validacion cliente y servidor compartiendo esquema
- rechazo de campos desconocidos
- limite de tamano del payload
- honeypot `honey`
- tiempo minimo de envio para frenar bots simples
- `AbortController` con timeout
- rate limit server-side en el endpoint real
- `Reply-To` con el email del visitante
- remitente server-side `info@suberos.com`
- sin logs del cuerpo completo
- sin secretos en frontend
- sin uso de `VITE_` para credenciales

## Lo que aun no existe

- WAF o proteccion edge especifica para el formulario
- CAPTCHA o challenge adicional
- monitorizacion de abuso en produccion
- telemetria operativa del endpoint separada del runtime publico

## Riesgos

- el endpoint depende del transporte de correo disponible en SiteGround
- la politica final de logs y retencion sigue pendiente de definir
