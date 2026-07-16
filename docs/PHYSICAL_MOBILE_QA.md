# Physical Mobile QA

Fecha: 2026-07-16

## Estado

`PENDIENTE DE DISPOSITIVOS REALES`

Este entorno de trabajo no tiene acceso directo a un iPhone real ni a un dispositivo Android real. No se ha usado emulacion para cerrar este documento como prueba fisica.

## Resultado actual

| Dispositivo | SO | Navegador | Area | Prueba | Resultado | Evidencia | Incidencia |
| --- | --- | --- | --- | --- | --- | --- | --- |
| iPhone real | Pendiente | Safari | carga inicial, menu, servicios, secuencia, contacto, legales, reduced motion | no ejecutada | pendiente | sin acceso a hardware real desde Codex | no evaluada |
| Android real | Pendiente | Chrome | carga inicial, menu, servicios, secuencia, contacto, legales, reduced motion | no ejecutada | pendiente | sin acceso a hardware real desde Codex | no evaluada |

## Lo que si se verifico antes de la prueba fisica

- `npm run qa:navigation` en verde
- `npm run qa:immersive` en verde
- `npm run qa:contact` en verde
- `npm run qa:production` en verde
- verificacion publica manual de `https://suberos.com/`

## Siguiente paso real requerido

- iPhone fisico con Safari
- Android fisico con Chrome
- capturas ligeras o grabaciones cortas sin datos personales en `artifacts/reports/physical-mobile-qa/`
