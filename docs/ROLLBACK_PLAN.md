# Rollback Plan

Fecha: 2026-07-15

## Estado actual

Se ejecuto despliegue real en SiteGround y no fue necesario revertirlo.

## Evidencia de rollback disponible

1. Backup manual verificado en SiteGround: `suberos-before-launch-2026-07-15`
2. Instalacion WordPress original conservada en `public_html`
3. Copia del `.htaccess` anterior descargada en `release/siteground-prelaunch-htaccess-2026-07-15.txt`

## Plan de rollback si aparece una incidencia posterior

1. Restaurar el backup `suberos-before-launch-2026-07-15` desde SiteGround.
2. Verificar que vuelven:
   - `index.php`
   - `.htaccess` original
   - `wp-content`
   - base de datos WordPress
3. Confirmar carga publica del sitio anterior.
4. Revisar `shisha/` y el resto de subcarpetas preservadas.

## Condiciones de rollback inmediato

- pantalla blanca
- `403`
- `500`
- assets rotos criticos
- bucle de redireccion
- perdida de rutas legales o robots
- corrupcion del document root

## Resultado del sprint

Rollback no aplicado. Backup y material de reversibilidad confirmados.
