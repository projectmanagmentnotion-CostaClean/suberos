# Sprint 14.7 Report

Fecha: 2026-07-16

## Objetivo

Cerrar el `Reply-To`, auditar el doble salto de `www` y revisar el estado final de produccion sin reabrir alcance funcional.

## Trabajo ejecutado

- verificacion inicial del repositorio en `main`
- `origin/main...HEAD = 0 0`
- `npm install`
- `npm run qa:isolation`
- `npm run qa:contact`
- `npm run qa:navigation`
- `npm run qa:immersive`
- `npm run qa:security`
- `npm run qa:release`
- `npm run lint`
- `npm run build`
- `npm run qa:production`
- auditoria publica de home, legales, endpoint, JS y CSS
- verificacion manual del `Reply-To` en Webmail/Roundcube autenticado
- auditoria tecnica de la cadena `http://www -> https://www -> https://suberos.com`

## Hallazgos reales

### Reply-To

- correcto: si
- metodo: borrador de respuesta generado en Roundcube desde el correo `SUBEROS contacto: branding - Prueba Codex`
- destinatario precargado: `codex-test@...`
- dominio enmascarado: `e******.com`
- asunto de respuesta: `Re: SUBEROS contacto: branding - Prueba Codex`
- fecha del mensaje base: `2026-07-16 11:15`

### Redireccion canonicа

- `http://www.suberos.com/` hace un primer `301` a `https://www.suberos.com/`
- ese primer salto sale de `nginx` antes de la capa con cabeceras publicadas por SUBEROS
- `https://www.suberos.com/` hace un segundo `301` a `https://suberos.com/`
- `path` y `query string` se conservan
- no hay bucle ni error SSL

### QA fisica

- iPhone Safari real: pendiente
- Android Chrome real: pendiente
- motivo: este entorno Codex no tiene acceso a hardware fisico y no se ha usado emulacion para sustituirlo

## Estado final del sprint

`CONDITIONAL GO - PRODUCCION OPERATIVA, QA FISICA PENDIENTE`
