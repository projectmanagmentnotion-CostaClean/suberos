# Launch Readiness Matrix

Fecha: 2026-07-15

| Area | Estado | Evidencia | Bloqueo | Responsable | Accion |
| ---- | ------ | --------- | ------- | ----------- | ------ |
| contenido | GO | `docs/CONTENT_FINAL_AUDIT.md` | No | Codex / titular | Mantener copy factual |
| marca | GO | logo, favicon, social card y Syncopate locales | No | titular | Conservar inventario |
| licencias | GO | `docs/ASSET_LICENSE_STATUS.md`, `docs/licenses/SYNCOPATE_LICENSE.md` | Bloqueo tipografico resuelto con Apache License 2.0 | Codex / titular | Mantener trazabilidad si cambia la fuente |
| portfolio | CONDITIONAL GO | `docs/PORTFOLIO_READINESS.md` | No hay casos publicados | titular | Solo publicar con permisos reales |
| contacto | NO-GO | `docs/FORM_ENDPOINT_STATUS.md`, `docs/FORM_DELIVERY_PRODUCTION_TEST.md` | Sin endpoint productivo desplegado ni recepcion real verificada | titular | Desplegar endpoint y verificar correo real |
| legal | NO-GO | `docs/LEGAL_OWNER_INFORMATION_REQUIRED.md` | Falta titular, NIF/CIF y domicilio legal | titular | Entregar datos verificados |
| privacidad | NO-GO | `docs/LEGAL_APPLICABILITY_MATRIX.md` | Falta responsable, retention y receptor real | titular | Cerrar responsable y tratamiento |
| cookies | GO | `docs/COOKIE_AND_STORAGE_AUDIT.md` | No | Codex / titular | Reauditar si cambia runtime |
| accesibilidad | CONDITIONAL GO | QA local y `docs/KNOWN_LIMITATIONS.md` | Faltan dispositivos fisicos | titular / QA | Ejecutar iOS y Android fisicos |
| SEO | GO | `docs/LIGHTHOUSE_REPORT.md`, `public/sitemap.xml`, `public/robots.txt` | No critico | Codex | Mantener canonicals y noindex internos |
| performance | CONDITIONAL GO | `docs/PERFORMANCE_AUDIT.md` | Validacion final pendiente tras QA actual | Codex | Reconfirmar bundle y Lighthouse |
| seguridad | CONDITIONAL GO | `npm run qa:security` | Endpoint real aun no existe | Codex / titular | Revalidar cuando exista backend |
| dispositivos | NO-GO | `docs/KNOWN_LIMITATIONS.md` | Sin iPhone/Android fisicos | titular / QA | Ejecutar pruebas reales |
| SiteGround | NO-GO | `docs/SITEGROUND_DEPLOYMENT_REPORT.md` | Sin sesion operativa verificable en Site Tools | titular | Abrir acceso real a Site Tools y backup |
| backup | NO-GO | `docs/ROLLBACK_PLAN.md`, `docs/SITEGROUND_DEPLOYMENT_REPORT.md` | Backup no verificable sin acceso al hosting | titular | Crear y verificar backup antes del despliegue |
| DNS | NO-GO | no verificado en este sprint | Sin acceso operativo | titular | Revisar DNS y canonical final |
| HTTPS | NO-GO | no verificado en hosting real | Sin despliegue real | titular | Validar tras staging o hosting real |
| formulario | NO-GO | `docs/FORM_ENDPOINT_STATUS.md` | Sin endpoint real | titular | Cerrar proveedor o mantener landing sin envio |
| Search Console | NO-GO | no configurado desde repo | Sin acceso | titular | Configurar tras despliegue |
