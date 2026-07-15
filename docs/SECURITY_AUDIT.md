# Security Audit

Fecha: 2026-07-15

## Alcance

- `public/.htaccess`
- `index.html`
- `src/`
- `dist/`
- `npm audit`
- comprobacion automatizada `npm run qa:security`

## Hallazgos resueltos

- El bundle ya no filtra globals de QA del formulario (`__SUBEROS_CONTACT_TEST_*`).
- El mock de contacto queda encapsulado en ramas de desarrollo y no aparece en `dist/`.
- `dist/` queda sin referencias a `localhost`, `127.0.0.1` ni puerto `8787`.
- Se endurecieron CSP, `COOP`, `CORP`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`.
- Se definieron politicas de cache diferenciadas para HTML, assets versionados, fuentes y ficheros robots/sitemap/manifest.

## npm audit

Resultado real:

- `17` vulnerabilidades `moderate`
- sin `high`
- sin `critical`

Origen real:

- todas vienen del arbol de `lighthouse` y sus dependencias de `@sentry/node` / `@opentelemetry`
- afectan tooling de auditoria local, no runtime publico del sitio

Decision:

- se documentan, no se aplico upgrade mayor ciego
- no bloquean el build publico actual
- deben reevaluarse cuando exista una version de `lighthouse` sin ese arbol vulnerable

## Limites

- esta auditoria no sustituye cabeceras reales del hosting ni validacion final en SiteGround
- `HSTS` no se activa como prueba definitiva local
