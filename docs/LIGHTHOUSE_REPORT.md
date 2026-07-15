# Lighthouse Report

Fecha: 2026-07-15
Origen auditado: `http://127.0.0.1:4173`

## Resultados

| Perfil | Ruta | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | FCP | Speed Index |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobile | `/` | 86 | 100 | 100 | 100 | `3396 ms` | `0.000` | `250 ms` | `1661 ms` | `1661 ms` |
| mobile | `/#contacto` | 86 | 100 | 100 | 100 | `3381 ms` | `0.000` | `258 ms` | `1656 ms` | `1656 ms` |
| mobile | `/legal/privacidad` | 91 | 100 | 100 | 66 | `3455 ms` | `0.000` | `0 ms` | `1655 ms` | `1655 ms` |
| mobile | `/404-suberos-check` | 91 | 100 | 100 | 63 | `3454 ms` | `0.000` | `0 ms` | `1654 ms` | `1654 ms` |
| desktop | `/` | 99 | 100 | 100 | 100 | `705 ms` | `0.000` | `6 ms` | `403 ms` | `1152 ms` |
| desktop | `/#contacto` | 99 | 100 | 100 | 100 | `700 ms` | `0.000` | `4 ms` | `404 ms` | `1117 ms` |
| desktop | `/legal/privacidad` | 100 | 100 | 100 | 66 | `685 ms` | `0.000` | `0 ms` | `405 ms` | `405 ms` |
| desktop | `/404-suberos-check` | 100 | 100 | 100 | 63 | `684 ms` | `0.000` | `0 ms` | `404 ms` | `404 ms` |

## Lectura

- La home y el contacto visible quedan fuertes en desktop.
- La principal deuda restante es el LCP movil del hero y la carga de la fuente display.
- El `SEO 66` y `63` en privacidad y 404 debe leerse con cuidado: son rutas no indexables o no prioritarias para SEO publico.
- Los resultados proceden de laboratorio local, no de datos de campo.

## Evidencia

- resumen reproducible generado en `.tmp-qa/lighthouse/summary.json`
- comando reproducible: `npm run qa:lighthouse`
- nota operacional: Lighthouse puede dejar warnings `EPERM` al cerrar Chrome temporal en Windows, sin invalidar el resumen generado
