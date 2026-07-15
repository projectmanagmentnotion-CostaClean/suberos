# GO / NO-GO Decision

Fecha: 2026-07-15

## Decision

`CONDITIONAL GO - WEB PUBLICADA, FORMULARIO TEMPORALMENTE DESACTIVADO`

## Motivo objetivo

Se cumplen los requisitos tecnicos para mantener la web publica de SUBEROS en produccion:

1. existe backup verificable;
2. el document root y la web anterior fueron auditados;
3. la nueva web publica ya responde en el dominio principal;
4. legales, robots, sitemap y 404 fueron verificados publicamente;
5. la caché dinámica fue purgada y la cuenta FTP temporal eliminada.

## Bloqueos que impiden un GO total

1. No existe endpoint productivo del formulario.
2. No existe recepcion real verificada en `info@suberos.com`.
3. `www.suberos.com` no redirige todavia a la canonica `https://suberos.com/`.
4. Siguen pendientes pruebas fisicas en iPhone Safari y Android Chrome.
