# SPA SEO Limitations

Fecha: 2026-07-14

## Situacion actual

SUBEROS funciona hoy como SPA en Vite con metadata gestionada en cliente y fallback de `.htaccess` para rutas publicas.

## Lo que ya queda cubierto

- home con title, description, canonical, OG, Twitter y JSON-LD consistentes
- rutas legales dedicadas
- 404 visual integrada
- labs internos con `noindex,nofollow`
- compatibilidad de rutas legacy `.html` hacia las nuevas rutas legales

## Limites reales

### Metadata client-side

Los metadatos se actualizan correctamente en navegador, pero no existe HTML prerenderizado por ruta legal o 404 antes de ejecutar JavaScript.

Impacto:

- algunos bots secundarios pueden leer peor la metadata especifica de rutas no home;
- la home es la ruta mejor servida desde `index.html`.

### Rutas legales y 404

Las rutas `/legal/*` y la 404 dependen del fallback SPA del hosting.

Impacto:

- si el `.htaccess` o la configuracion del hosting no reescriben a `index.html`, la recarga directa fallara;
- esta dependencia debe validarse en SiteGround antes de publicar.

### Anchors como IA principal

La home sigue organizada principalmente por anchors.

Impacto:

- el contenido principal indexable se concentra en una sola URL;
- no existe todavia arquitectura multiurl por servicio.

## Decision del sprint

No se introduce un framework nuevo ni SSR en este sprint porque:

- el objetivo era cerrar una base SEO y legal real sin romper la arquitectura actual;
- no existe todavia portfolio aprobado ni una necesidad demostrada de multiples landing pages indexables;
- la deuda principal inmediata estaba en metadata, 404, legales y privacidad.

## Recomendacion para fases posteriores

Evaluar una de estas opciones antes del lanzamiento publico definitivo si se quiere reforzar indexacion por ruta:

1. prerender estatico de home, legales y 404;
2. SSG por ruta publica estable;
3. migracion controlada a una arquitectura con HTML por ruta solo si la complejidad SEO lo exige.

## Conclusion

La arquitectura actual es suficiente para:

- validar localmente;
- desplegar preview real;
- mantener una home indexable limpia;
- exponer legales visibles pero no indexables.

No es todavia la arquitectura SEO mas fuerte posible para una publicacion publica final de largo plazo.
