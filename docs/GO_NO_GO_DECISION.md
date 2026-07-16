# GO / NO-GO Decision

Fecha: 2026-07-16

## Decision

`CONDITIONAL GO - WEB PUBLICADA Y FORMULARIO OPERATIVO, PENDIENTE CIERRE CANONICO Y PRUEBAS FISICAS`

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

1. `http://www.suberos.com/` sigue haciendo doble salto antes de llegar a `https://suberos.com/`.
2. Siguen pendientes pruebas fisicas en iPhone Safari y Android Chrome.
3. Falta la comprobacion manual final del flujo de respuesta desde Webmail usando el `Reply-To` del visitante.
