# Performance Budget

Fecha: 2026-07-15

## Presupuestos activos

| Presupuesto | Limite | Estado actual | Resultado |
| --- | --- | --- | --- |
| JS inicial gzip | `<= 160 kB` | `147.61 kB` | OK |
| CSS inicial gzip | `<= 10.0 kB` | `8.13 kB` | OK |
| Hero visual principal | `<= 120000 B` | `77016 B` | OK |
| Syncopate total | `<= 55000 B` | `49776 B` | OK |
| Syncopate Bold preload | `<= 20000 B` | `17432 B` | OK |
| CLS laboratorio | `<= 0.1` | home mobile `0.000`, home desktop `0.000057` | OK |
| LCP laboratorio movil ideal | `<= 2.5 s` | home `2.65 s` | Desviacion menor documentada |

## Reglas

- los labs deben seguir lazy
- la home publica no debe cargar sequence assets
- el preloader no debe bloquear `balanced` ni `reduced`
- el bundle no debe incluir QA globals ni endpoints localhost en `dist/`
- las fuentes runtime solo pueden salir de `public/branding/fonts/syncopate/`

## Lectura

- La sustitucion a Syncopate reduce radicalmente el coste tipografico respecto al OTF legacy anterior.
- El presupuesto tipografico ya no es un bloqueo.
- El unico gap restante de rendimiento observable sigue siendo acercar aun mas el LCP movil al objetivo ideal en hardware real.
