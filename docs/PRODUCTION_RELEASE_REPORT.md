# Production Release Report

Fecha: 2026-07-14

## Sprint 11 update

- rendimiento, seguridad frontend y compatibilidad de navegador endurecidos localmente
- Lighthouse reproducible disponible via `npm run qa:lighthouse`
- seguridad reproducible disponible via `npm run qa:security`
- budgets reproducibles disponibles via `npm run qa:performance`
- preview local sigue siendo requisito antes de publicacion real

## Estado exacto

BUILD DE PRODUCCION VALIDADO LOCALMENTE; PUBLICACION EN SITEGROUND BLOQUEADA HASTA DISPONER DE ACCESO, BACKUP, ENDPOINT REAL Y DATOS LEGALES DEFINITIVOS

## Codigo

- Sprint 09: SEO, legal, privacidad y compliance en cierre tecnico local
- Rama objetivo: `main`
- Remoto: `https://github.com/projectmanagmentnotion-CostaClean/suberos.git`
- El commit y push deben confirmarse con SHA real tras cerrar el working tree

## Produccion local

Objetivo:

- generar build limpio
- revisar `dist/`
- levantar `vite preview`
- validar home, legales y laboratorios internos

Resultado esperado del sprint:

- `dist/` generado correctamente
- `dist/` incluye `index.html`, `assets/`, `robots.txt`, `sitemap.xml`, `.htaccess`, `branding/`, `hero/`, `motion/`, `textures/` y el resto de carpetas publicas actuales
- preview validado en `http://127.0.0.1:4173/`
- el formulario publico queda bloqueado honestamente cuando no existe endpoint real
- el mock solo puede ejecutarse en QA explicita
- labs internos mantienen `noindex,nofollow`
- paginas legales integradas en la SPA y marcadas `noindex,nofollow`
- sin overflow ni errores de consola en los escenarios revisados
- ZIP generado en `C:\\Users\\USUARIO\\Documents\\SUBEROS-real\\release\\suberos-production-2026-07-14.zip`

## SiteGround

Estado actual:

- acceso no proporcionado en esta ejecucion
- backup remoto no verificable desde el repositorio
- document root real no verificado
- subida no ejecutada
- cache remota no limpiada
- dominio publico no modificado por esta ejecucion

## Entregables esperados

- `dist/` validado
- ZIP de produccion en `release/`
- documentacion de Sprint 09
- guia de despliegue manual para SiteGround
## Sprint 12 update

- Added `npm run qa:production` to validate the built app through `vite preview` before release.
- Added `npm run qa:release` as the mandatory aggregate gate.
- Manual preview evidence and visual QA captures are now stored under `artifacts/reports/visual-manual/`.
