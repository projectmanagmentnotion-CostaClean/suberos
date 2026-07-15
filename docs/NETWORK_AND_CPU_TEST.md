# Network And CPU Test

Fecha: 2026-07-15

## Pruebas ejecutadas

Script manual con Playwright Chromium:

- `slow-4g-home`
- `offline-contact`
- `cpu-4x-home`

## Resultados

| Escenario | Resultado | Observacion |
| --- | --- | --- |
| Slow 4G home | OK | la home sigue mostrando contenido y no queda en pantalla negra |
| Offline contact | OK | el formulario devuelve feedback honesto de red sin filtrar datos |
| CPU 4x home | OK | tras la salida del preloader el hero y CTA siguen utilizables |

## Limites

- emulacion local en Chromium, no medicion fisica
- la red lenta no sustituye pruebas en iPhone/Android reales
