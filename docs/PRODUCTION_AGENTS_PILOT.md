# Production Agents Pilot — SUBEROS

## Fuente

- Biblioteca: `projectmanagmentnotion-CostaClean/production-agents`
- Release candidate: `v1.0.0-rc.1`
- Commit fuente: `b908f6cd33751e5d5d899cc3a74e4084bb245fbc`
- Fecha de instalación: 2026-07-27

## Perfiles instalados

- `implementation-planner`
- `pr-quality-gate`
- `frontend-ux-accessibility`
- `performance-gsap-motion`
- `seo-local-structured-data`
- `release-deployment-guardian`

Todos mantienen `disable-model-invocation: true` y deben seleccionarse manualmente.

## Gobierno local

Los perfiles quedan subordinados a `AGENTS.md`, `docs/EU_WEB_APP_STANDARD.md` y `docs/ROADMAP.md` de SUBEROS. No pueden introducir contenido, marcas, assets, rutas o referencias de otros proyectos.

La instalación no modifica componentes, estilos, assets, SEO, build ni producción.

## Escenarios piloto

### 1. Planificación read-only

Seleccionar `implementation-planner` y pedir:

```text
Analiza el siguiente bloque pendiente del roadmap de SUBEROS. Trabaja únicamente en lectura y crea un plan con alcance, motion lifecycle, responsive, accesibilidad, SEO, rendimiento, validaciones y rollback. No modifiques código.
```

### 2. GSAP y rendimiento

Seleccionar `performance-gsap-motion` y pedir:

```text
Audita en modo read-only las timelines GSAP, ScrollTrigger, cleanup, matchMedia, reduced motion, imágenes, vídeos y riesgos de LCP, CLS e INP. No inventes métricas externas ni modifiques producción.
```

### 3. UX y accesibilidad

Seleccionar `frontend-ux-accessibility` y auditar una ruta en 390x844, 768x1024, 1366x768 y 1440x900. Diferenciar lo probado de lo no ejecutado.

### 4. SEO

Seleccionar `seo-local-structured-data` y revisar metadatos, canonicals, sitemap, robots, headings, contenido indexable y JSON-LD usando solo hechos confirmados de SUBEROS.

### 5. Release

Seleccionar `release-deployment-guardian` para preparar artefacto, inventario, smoke y rollback en modo `PREPARE_ONLY`. No desplegar.

### 6. Gate independiente

Usar `pr-quality-gate` sobre cualquier PR generado. El implementador no aprueba su propio trabajo.

## Criterios de éxito

- Los perfiles aparecen en GitHub Copilot Agents tras el merge.
- Respetan el aislamiento estricto de SUBEROS.
- No realizan despliegues ni acciones remotas.
- No inventan contenido, clientes, métricas o validaciones.
- Conservan accesibilidad y reduced motion.
- Todo cambio queda en rama y PR revisable.

## Rollback

Eliminar mediante PR los perfiles instalados y este documento. No hay cambios de runtime que revertir.
