# Legal Applicability Matrix

Fecha: 2026-07-14

## Alcance auditado

SUBEROS mantiene actualmente una web corporativa y de captacion con home publica, rutas legales en SPA, laboratorios internos no indexables y formulario visible pero sin endpoint real de produccion.

No existe ecommerce, cuentas, reservas, newsletter, area privada, subida de archivos, pagos directos ni analytics activa.

## Matriz

| Requisito | Aplica | Estado | Evidencia | Pendiente | Bloquea lanzamiento |
| --- | ---: | --- | --- | --- | ---: |
| RGPD | Si | Parcial | `docs/CONTACT_DATA_FLOW.md`, `src/features/contact/contact.service.ts`, `src/data/legalContent.ts` | Definir responsable juridico, base legitimadora final, retencion y canal de derechos | Si |
| LOPDGDD | Si | Parcial | Misma capa de contacto y privacidad descrita en el repo | Confirmacion documental del titular y politica definitiva de tratamiento | Si |
| LSSI | Si | Parcial | Footer legal publico, rutas `/legal/*`, `docs/LEGAL_OWNER_INFORMATION_REQUIRED.md` | Nombre o razon social del titular, NIF/CIF, domicilio legal, datos registrales si aplican | Si |
| Cookies | Si | Resuelto para el alcance actual | `docs/COOKIE_AND_STORAGE_AUDIT.md`, `scripts/check-privacy-storage.mjs` | Reauditar antes de activar analytics, embeds o backend de terceros | No |
| Ecommerce | No | No aplica en el alcance actual | No existen pagos, carrito, checkout ni contratacion automatizada | Reabrir analisis si cambia el alcance del producto | No |
| Accesibilidad europea | Si | Parcial | `src/data/legalContent.ts`, `docs/LEGAL_PAGE_STATUS.md`, QA de teclado y reduced motion | Auditoria final de conformidad y declaracion definitiva antes de publicacion final | Si |
| DSA | No | No aplica en el alcance actual | No hay cuentas, hosting de contenido de usuarios ni marketplace | Reabrir si la web pasa a intermediar contenido de terceros | No |
| Condiciones de venta | No | No aplica en el alcance actual | No existe venta online ni contratacion directa | Reabrir si se anaden servicios contratables online | No |
| Transferencias internacionales | Potencialmente | Abierto | `docs/VENDOR_AND_PROCESSOR_INVENTORY.md` documenta que no hay proveedor activo de formulario | Confirmar hosting final, correo real y cualquier proveedor que procese solicitudes | Si |
| Encargados | Si | Parcial | Inventario de proveedores y estado del formulario | Definir proveedor real del endpoint, correo receptor y politica de logs | Si |
| Propiedad intelectual | Si | Parcial | `docs/SUBEROS_VISUAL_ASSET_INVENTORY.md`, assets propios recuperados | Confirmar evidencias documentales de marca y materiales futuros | Si |
| Licencias de fuente | Si | Abierto | `public/branding/fonts/StretchPro.otf`, `docs/SUBEROS_VISUAL_ASSET_INVENTORY.md` | Confirmar licencia comercial y derecho de self-hosting de StretchPro | Si |

## Conclusiones

- La build local puede validarse y desplegarse en `127.0.0.1:4173` porque el formulario publico queda honestamente bloqueado.
- La publicacion final en SiteGround sigue bloqueada por cuatro grupos de pendientes:
  - identidad legal definitiva del titular;
  - endpoint real y receptor del formulario;
  - revision final de accesibilidad;
  - licencia verificable de StretchPro.
