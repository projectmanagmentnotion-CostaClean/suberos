# Canonical Redirect Single Hop Audit

Fecha: 2026-07-16

## Estado observado

Cadena actual para `http://www.suberos.com/`:

1. `http://www.suberos.com/` -> `301` -> `https://www.suberos.com/`
2. `https://www.suberos.com/` -> `301` -> `https://suberos.com/`
3. `https://suberos.com/` -> `200`

## Evidencia tecnica

### Primer salto

- origen: `http://www.suberos.com/`
- codigo: `301`
- servidor: `nginx`
- `Location`: `https://www.suberos.com/`
- observacion: no aparecen las cabeceras CSP y endurecimiento de Apache publicadas por SUBEROS

### Segundo salto

- origen: `https://www.suberos.com/`
- codigo: `301`
- servidor: `nginx`
- `Location`: `https://suberos.com/`
- observacion: aqui si aparecen `Content-Security-Policy`, `Permissions-Policy` y el resto de cabeceras del sitio publicado, por lo que esta capa ya pasa por la configuracion publicada

## Preservacion de rutas

- `http://www.suberos.com/legal/privacidad` -> `https://www.suberos.com/legal/privacidad`
- `https://www.suberos.com/legal/privacidad` -> `https://suberos.com/legal/privacidad`

## Preservacion de query string

- `http://www.suberos.com/?ref=qa` -> `https://www.suberos.com/?ref=qa`

## Diagnostico

La primera redireccion ocurre antes de Apache y antes de `.htaccess`. La causa mas probable es la capa administrada de SiteGround / NGINX que fuerza HTTPS para el host `www`.

La segunda redireccion ya pertenece a la configuracion publicada de SUBEROS hacia el apex canonico.

## Decision

No se aplica una correccion arriesgada desde este sprint.

Motivo:

- no hay bucle;
- no hay error SSL;
- ambos saltos son `301`;
- se conservan `path` y `query string`;
- la URL final es `https://suberos.com/`;
- la primera capa parece administrada por el hosting.

Se clasifica como optimizacion menor de infraestructura, no como bloqueo de lanzamiento.
