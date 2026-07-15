# Lighthouse Report

Fecha: 2026-07-15
Origen auditado: `http://127.0.0.1:4173`

## Resultados

| Perfil | Ruta | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | FCP | Speed Index |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobile | `/` | 85 | 100 | 100 | 100 | `3243 ms` | `0.001` | `205 ms` | `1652 ms` | `1652 ms` |
| mobile | `/#contacto` | 87 | 100 | 100 | 100 | `3379 ms` | `0.000` | `233 ms` | `1654 ms` | `1654 ms` |
| mobile | `/legal/privacidad` | 91 | 100 | 100 | 66 | `3454 ms` | `0.000` | `0 ms` | `1654 ms` | `1654 ms` |
| mobile | `/404-suberos-check` | 91 | 100 | 100 | 66 | `3453 ms` | `0.000` | `0 ms` | `1653 ms` | `1653 ms` |
| desktop | `/` | 99 | 100 | 100 | 100 | `704 ms` | `0.000` | `6 ms` | `406 ms` | `1142 ms` |
| desktop | `/#contacto` | 99 | 100 | 100 | 100 | `700 ms` | `0.000` | `5 ms` | `403 ms` | `1117 ms` |
| desktop | `/legal/privacidad` | 100 | 100 | 100 | 66 | `684 ms` | `0.000` | `0 ms` | `404 ms` | `404 ms` |
| desktop | `/404-suberos-check` | 100 | 100 | 100 | 66 | `685 ms` | `0.000` | `0 ms` | `405 ms` | `405 ms` |

## Lectura

- La home y el contacto visible quedan fuertes en desktop.
- La principal deuda restante es el LCP movil del hero.
- El `SEO 66` en privacidad y 404 debe leerse con cuidado: son rutas no prioritarias para indexacion y el laboratorio no afirma CWV de campo.
- Los resultados proceden de laboratorio local, no de datos de campo.

## Evidencia

- resumen reproducible generado en `.tmp-qa/lighthouse/summary.json`
- comando reproducible: `npm run qa:lighthouse`
