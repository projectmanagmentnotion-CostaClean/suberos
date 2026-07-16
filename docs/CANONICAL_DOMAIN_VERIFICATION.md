# Canonical Domain Verification

Fecha: 2026-07-16

## Verificacion publica

- `https://suberos.com/` -> `200 OK`
- `http://suberos.com/` -> `301` a `https://suberos.com/`
- `https://www.suberos.com/` -> `301` a `https://suberos.com/`
- `http://www.suberos.com/` -> doble `301` pero termina correctamente en `https://suberos.com/`

## Canonical publicado

- `<link rel="canonical" href="https://suberos.com/" />`
- `og:url`: `https://suberos.com/`

## Conclusiones

- el dominio canonico publico es `https://suberos.com/`
- el host `www` no queda expuesto con `200`
- la cadena final es correcta
- el doble salto de `http://www` sigue siendo una mejora pendiente de infraestructura, no un fallo funcional
