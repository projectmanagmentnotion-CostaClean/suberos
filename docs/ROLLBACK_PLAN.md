# Rollback Plan

Fecha: 2026-07-15

## Estado actual

No se ejecuto despliegue en SiteGround durante este sprint. Por tanto, no fue necesario restaurar nada.

## Plan obligatorio antes del despliegue

1. Crear backup completo verificable con nombre `suberos-before-launch-2026-07-15`.
2. Confirmar que incluye archivos, `.htaccess`, configuracion relevante y base de datos si existe.
3. Publicar la nueva version de forma incremental, sin borrar el document root completo.
4. Verificar home, legales, assets y endpoint real.
5. Si aparece un error critico, restaurar inmediatamente el backup anterior.

## Condiciones de rollback inmediato

- pantalla blanca
- 403
- 500
- assets rotos
- `.htaccess` defectuoso
- formulario roto
- perdida de contenido
- HTTPS incorrecto

## Resultado del sprint

Rollback no aplicado porque no hubo despliegue.
