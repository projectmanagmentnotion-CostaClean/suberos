# Lighthouse Report

Fecha: 2026-07-15
Origen auditado: `http://127.0.0.1:4173`

## Resultados

| Perfil | Ruta | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | FCP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobile | `/` | 94 | 100 | 100 | 100 | `2647 ms` | `0.000` | `170 ms` | `1654 ms` |
| mobile | `/#contacto` | 94 | 100 | 100 | 100 | `2631 ms` | `0.000` | `171 ms` | `1654 ms` |
| mobile | `/legal/privacidad` | 96 | 100 | 100 | 66 | `2559 ms` | `0.000` | `0 ms` | `1656 ms` |
| mobile | `/404-suberos-check` | 96 | 100 | 100 | 63 | `2555 ms` | `0.000` | `0 ms` | `1653 ms` |
| desktop | `/` | 99 | 100 | 100 | 100 | `606 ms` | `0.000057` | `5 ms` | `405 ms` |
| desktop | `/#contacto` | 99 | 100 | 100 | 100 | `597 ms` | `0.000057` | `3 ms` | `402 ms` |
| desktop | `/legal/privacidad` | 100 | 100 | 100 | 66 | `564 ms` | `0.000` | `0 ms` | `402 ms` |
| desktop | `/404-suberos-check` | 100 | 100 | 100 | 63 | `565 ms` | `0.000` | `0 ms` | `403 ms` |

## Lectura

- La home y el contacto visible mejoran materialmente en mobile frente al baseline previo `86 / 3396 ms`.
- El `SEO 66` y `63` en privacidad y 404 sigue siendo coherente con rutas no indexables o no prioritarias para SEO publico.
- Los resultados proceden de laboratorio local, no de datos de campo.

## Evidencia

- resumen reproducible generado en `.tmp-qa/lighthouse/summary.json`
- comando reproducible: `npm run qa:lighthouse`
- nota operacional: Lighthouse puede dejar warnings `EPERM` al cerrar Chrome temporal en Windows sin invalidar el resumen generado
