# Cookie And Storage Audit

Fecha: 2026-07-14

## Resultado

No se detectan cookies no esenciales ni trackers activos en la web publica actual de SUBEROS.

## Runtime auditado

- cookies
- `localStorage`
- `sessionStorage`
- IndexedDB
- service workers
- requests de terceros
- formulario publico
- labs internos
- preloader

## Hallazgos reales

### Cookies

- No se detectan cookies propias o de terceros con finalidad analitica, publicitaria o de perfilado.

### localStorage

- No se detecta persistencia de datos personales del formulario.
- No se detecta uso funcional activo en la home publica.

### sessionStorage

- Uso tecnico detectado:
  - persistir que el preloader ya se ha mostrado durante la sesion actual
- Finalidad:
  - evitar repetir una animacion inicial ya vista
- Naturaleza:
  - dato tecnico local
  - no contiene datos personales

### IndexedDB

- No detectado en el alcance actual.

### Service workers

- No detectados.

### Requests externas

- No se detectan llamadas activas a analytics, pixels ni proveedores de formularios de terceros en el runtime publico.
- El mock del formulario solo se activa en QA explicita y no por hostname.

## Banner de cookies

No procede implementar banner en el alcance actual porque:

- no hay cookies no esenciales activas;
- no hay analytics;
- no hay embeds de terceros cargados por defecto;
- no hay marketing automation ni newsletter.

Si en una fase posterior se activan servicios no esenciales, esta conclusion debe revisarse antes de publicar.

## Borrado por parte de la persona usuaria

- Cerrar la sesion del navegador elimina el estado tecnico en `sessionStorage`.
- Alternativamente, se puede borrar el almacenamiento del sitio desde el navegador.

## Evidencia tecnica

- `scripts/check-privacy-storage.mjs`
- `tests/privacy.spec.ts`
- `src/features/preloader/`
- `src/features/contact/contact.service.ts`
