# Contact Security

Fecha: 2026-07-14

## Medidas implementadas

- validacion cliente y servidor compartiendo esquema
- rechazo de campos desconocidos
- limite de tamano del payload
- honeypot `websiteUrl`
- tiempo minimo de envio para frenar bots simples
- `AbortController` con timeout
- rate limit local en el mock
- CORS restringido a `localhost` y `127.0.0.1`
- sin logs del cuerpo completo
- sin secretos en frontend
- sin uso de `VITE_` para credenciales

## Lo que aun no existe

- endpoint real endurecido en servidor
- WAF o proteccion edge
- CAPTCHA o challenge adicional
- seguridad de correo saliente
- monitorizacion de abuso en produccion

## Riesgos

- mientras no exista backend real, el formulario online no puede considerarse canal operativo en produccion
- el rate limit actual es solo para entorno local de QA
- la politica final de logs y retencion sigue pendiente de definir
