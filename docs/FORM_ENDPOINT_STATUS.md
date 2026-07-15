# Form Endpoint Status

Fecha: 2026-07-15

## Estado decidido

Opcion B: formulario bloqueado.

## Evidencia actual

- `CONTACT_REAL_ENDPOINT_ENABLED` sigue efectivamente desactivado a traves de `src/data/companyProfile.ts`.
- El runtime publico muestra un mensaje honesto de indisponibilidad.
- El fallback operativo real sigue siendo:
  - `info@suberos.com`
  - `698 911 517`
- `qa:contact`, `qa:privacy`, `qa:legal` y `qa:release` validan que el formulario no simula exito fuera del modo QA.

## Lo que no existe todavia

- proveedor de envio real
- endpoint de produccion
- cuenta receptora confirmada
- validacion server-side real
- rate limit server-side real
- DPA o inventario definitivo del proveedor
- prueba de recepcion real en produccion
