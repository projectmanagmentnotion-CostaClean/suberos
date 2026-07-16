# Launch Readiness Matrix

Fecha: 2026-07-16

| Area | Estado | Evidencia | Bloqueo | Responsable | Accion |
| ---- | ------ | --------- | ------- | ----------- | ------ |
| contenido | GO | `docs/CONTENT_FINAL_AUDIT.md` | No | Codex / titular | Mantener copy factual |
| marca | GO | logo, favicon, social card y Syncopate locales | No | titular | Conservar inventario |
| licencias | GO | `docs/ASSET_LICENSE_STATUS.md`, `docs/licenses/SYNCOPATE_LICENSE.md` | No | Codex / titular | Mantener trazabilidad |
| portfolio | CONDITIONAL GO | `docs/PORTFOLIO_READINESS.md` | No hay casos publicados | titular | Solo publicar con permisos reales |
| contacto | GO | `docs/FORM_ENDPOINT_STATUS.md`, `docs/FORM_DELIVERY_PRODUCTION_TEST.md` | No | titular / Codex | Mantener endpoint, inbox y QA de envio |
| legal | GO | runtime publico y `src/data/legalContent.ts` | No | titular | Mantener datos verificados si cambian |
| privacidad | CONDITIONAL GO | `docs/LEGAL_APPLICABILITY_MATRIX.md` | Falta cerrar politica final de retencion del endpoint ya activo | titular | Formalizar retencion y operativa |
| cookies | GO | `docs/COOKIE_AND_STORAGE_AUDIT.md` | No | Codex / titular | Reauditar si cambia runtime |
| accesibilidad | CONDITIONAL GO | QA local + QA publica + `docs/KNOWN_LIMITATIONS.md` | Faltan dispositivos fisicos | titular / QA | Ejecutar iOS y Android fisicos |
| SEO | CONDITIONAL GO | `docs/PRODUCTION_VERIFICATION_REPORT.md`, `public/sitemap.xml`, `public/robots.txt`, `docs/CANONICAL_DOMAIN_VERIFICATION.md` | Doble salto administrado en `http://www` | Codex / titular | Ajustar hosting solo si puede hacerse sin riesgo |
| performance | GO | `docs/PERFORMANCE_AUDIT.md`, `npm run qa:lighthouse` | No critico abierto | Codex | Monitorizar en produccion |
| seguridad | GO | `npm run qa:security`, `.htaccess` publicado | No | Codex / titular | Revalidar si se activa backend |
| dispositivos | CONDITIONAL GO | `docs/PHYSICAL_MOBILE_QA.md` | Sin iPhone/Android fisicos disponibles en esta verificacion | titular / QA | Ejecutar pruebas reales |
| SiteGround | GO | `docs/SITEGROUND_DEPLOYMENT_REPORT.md` | No | titular / Codex | Mantener backup y rollback |
| backup | GO | `docs/ROLLBACK_PLAN.md`, `docs/SITEGROUND_DEPLOYMENT_REPORT.md` | No | titular / Codex | Conservar evidencia |
| DNS | CONDITIONAL GO | apex y `www` resolviendo | `http://www` hace doble salto gestionado por hosting | titular | Ajustar hosting/dominio solo si se confirma acceso seguro |
| HTTPS | GO | verificacion publica `http -> https` | No | titular / Codex | Monitorizar certificados |
| formulario | GO | `docs/FORM_ENDPOINT_STATUS.md`, `docs/CONTACT_PRODUCTION_DELIVERY_TEST.md` | No | titular / Codex | Mantener endpoint y buzon auditados |
| Search Console | NO-GO | no configurado desde repo | Sin acceso | titular | Configurar tras launch |
