# Performance Budget

Fecha: 2026-07-15

## Presupuestos activos

| Presupuesto | Limite | Estado actual | Resultado |
| --- | --- | --- | --- |
| JS inicial gzip | `<= 160 kB` | `147.27 kB` | OK |
| CSS inicial gzip | `<= 10.0 kB` | `8.05 kB` | OK |
| Hero visual principal | `<= 120000 B` | `77016 B` | OK |
| StretchPro | `<= 220000 B` | `199652 B` | OK con warning |
| CLS laboratorio | `<= 0.1` | home desktop `0.000`, home mobile `0.001` | OK |
| LCP laboratorio movil ideal | `<= 2.5 s` | home `3.24 s` | Excepcion documentada |
| TBT laboratorio movil | bajo y controlado | home `205 ms` | OK razonable |

## Reglas

- los labs deben seguir lazy
- la home publica no debe cargar sequence assets
- el preloader no debe bloquear `balanced` ni `reduced`
- el bundle no debe incluir QA globals ni endpoints localhost en `dist/`
- las fuentes runtime solo pueden salir de `public/branding/`

## Excepciones documentadas

- `StretchPro.otf` sigue pesada porque solo existe el original legacy aprobado; falta licencia documental y una version optimizada publicable
- el LCP movil de laboratorio queda por encima del objetivo ideal, pero mejora sin comprometer la direccion visual ni la accesibilidad
