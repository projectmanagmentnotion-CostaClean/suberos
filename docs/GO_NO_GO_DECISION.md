# GO / NO-GO Decision

Fecha: 2026-07-16

## Decision

`CONDITIONAL GO - PRODUCCION OPERATIVA, QA FISICA PENDIENTE`

## Motivo objetivo

Se cumplen los requisitos tecnicos para mantener la web publica de SUBEROS en produccion:

1. existe backup verificable;
2. el document root y la web anterior fueron auditados;
3. la nueva web publica ya responde en el dominio principal;
4. legales, robots, sitemap y 404 fueron verificados publicamente;
5. la cache dinamica fue purgada y la cuenta FTP temporal eliminada;
6. existe endpoint productivo del formulario;
7. existe recepcion real verificada en `info@suberos.com`.

## Bloqueos que impiden un GO total

1. Siguen pendientes pruebas fisicas en iPhone Safari y Android Chrome.
2. El doble salto de `http://www.suberos.com/` sigue siendo una optimizacion menor de infraestructura administrada por hosting, no un fallo funcional.
