# Launch Readiness Matrix

Fecha: 2026-07-15

| Area | Estado | Evidencia | Bloqueo | Responsable | Accion |
| ---- | ------ | --------- | ------- | ----------- | ------ |
| contenido | GO | `docs/CONTENT_FINAL_AUDIT.md` | No | Codex / titular | Mantener copy factual |
| marca | GO | logo, favicon, social card y Syncopate locales | No | titular | Conservar inventario |
| licencias | GO | `docs/ASSET_LICENSE_STATUS.md`, `docs/licenses/SYNCOPATE_LICENSE.md` | Bloqueo tipografico resuelto con Apache License 2.0 | Codex / titular | Mantener trazabilidad si cambia la fuente |
| portfolio | CONDITIONAL GO | `docs/PORTFOLIO_READINESS.md` | No hay casos publicados | titular | Solo publicar con permisos reales |
| contacto | CONDITIONAL GO | `docs/FORM_ENDPOINT_STATUS.md` | Formulario no operativo | titular | Confirmar si la landing sale sin endpoint o definir proveedor real |
| legal | NO-GO | `docs/LEGAL_OWNER_INFORMATION_REQUIRED.md` | Falta titular, NIF/CIF y domicilio legal | titular | Entregar datos verificados |
| privacidad | NO-GO | `docs/LEGAL_APPLICABILITY_MATRIX.md` | Falta responsable, retention y receptor real | titular | Cerrar responsable y tratamiento |
| cookies | GO | `docs/COOKIE_AND_STORAGE_AUDIT.md` | No | Codex / titular | Reauditar si cambia runtime |
| accesibilidad | CONDITIONAL GO | QA local y `docs/KNOWN_LIMITATIONS.md` | Faltan dispositivos fisicos | titular / QA | Ejecutar iOS y Android fisicos |
| SEO | GO | `docs/LIGHTHOUSE_REPORT.md`, `public/sitemap.xml`, `public/robots.txt` | No critico | Codex | Mantener canonicals y noindex internos |
| performance | CONDITIONAL GO | `docs/PERFORMANCE_AUDIT.md` | Validacion final pendiente tras QA actual | Codex | Reconfirmar bundle y Lighthouse |
| seguridad | CONDITIONAL GO | `npm run qa:security` | Endpoint real aun no existe | Codex / titular | Revalidar cuando exista backend |
| dispositivos | NO-GO | `docs/KNOWN_LIMITATIONS.md` | Sin iPhone/Android fisicos | titular / QA | Ejecutar pruebas reales |
| SiteGround | NO-GO | `docs/PRODUCTION_RELEASE_REPORT.md` | Sin acceso ni backup verificado | titular | Facilitar acceso y ruta de despliegue |
| backup | NO-GO | `docs/PRODUCTION_RELEASE_REPORT.md` | No verificable | titular | Confirmar backup remoto |
| DNS | NO-GO | no verificado en este sprint | Sin acceso operativo | titular | Revisar DNS y canonical final |
| HTTPS | NO-GO | no verificado en hosting real | Sin despliegue real | titular | Validar tras staging o hosting real |
| formulario | NO-GO | `docs/FORM_ENDPOINT_STATUS.md` | Sin endpoint real | titular | Cerrar proveedor o mantener landing sin envio |
| Search Console | NO-GO | no configurado desde repo | Sin acceso | titular | Configurar tras despliegue |
