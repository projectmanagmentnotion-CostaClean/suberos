# Sprint 08 Report

Fecha: 2026-07-14

## Objetivo

Construir el motor real de contacto y conversion de SUBEROS con validacion, estados accesibles, privacidad minima, mock local controlado y base segura para integrar un endpoint real despues.

## Auditoria y hallazgos reales

- El contacto existente era un formulario `mailto:` sin backend, sin estados robustos y sin validacion server-side.
- Los datos publicos de contacto visibles y reutilizados en la web siguen siendo:
  - `info@suberos.com`
  - `691 93 72 72`
  - `Calella, 08370 - Barcelona`
- No existia proveedor de envio real aprobado en el repositorio.
- Las paginas legales siguen siendo provisionales y no podian sostener promesas falsas sobre entrega o tratamiento.
- La verificacion visual real detecto dos incidencias antes del cierre:
  - contaminacion del `rate limit` del mock entre pruebas
  - conteo incorrecto del preflight como segundo submit

## Arquitectura del formulario

Implementado:

- formulario controlado con estados tipados
- validacion cliente y servidor compartida
- focus al primer error
- mensajes accesibles de exito, error y rate limit
- envio encapsulado en `contact.service.ts`
- bloqueo de doble submit
- metodos alternativos siempre visibles

Archivos principales:

- `src/features/contact/ContactSection.tsx`
- `src/features/contact/ContactForm.tsx`
- `src/features/contact/ContactFormFields.tsx`
- `src/features/contact/ContactSuccess.tsx`
- `src/features/contact/ContactError.tsx`
- `src/features/contact/contact.types.ts`
- `src/features/contact/contact.constants.ts`
- `src/features/contact/contact.schema.ts`
- `src/features/contact/contact.service.ts`
- `src/features/contact/contact.events.ts`
- `src/features/contact/contact.css`

## Estado del endpoint

- Produccion real: no conectado a proveedor real
- Desarrollo local: mock server en `127.0.0.1:8787`
- En dominios no locales, el cliente usa `/api/contact`
- Si no existe backend real, el sistema no devuelve falso exito y muestra indisponibilidad del canal online

## Mock de desarrollo

Archivo:

- `scripts/contact-mock-server.ts`

Capacidades:

- validacion server-side
- escenarios de QA
- rate limit local
- CORS restringido
- logs minimos
- timeout controlado

Correcciones de cierre:

- el `rate limit` deja de contaminar escenarios de debug
- el test de doble submit solo cuenta `POST` real, no preflight

## Validacion

Cliente:

- obligatorios reales
- email valido
- contenido minimo del mensaje
- errores por campo

Servidor local:

- mismo esquema compartido
- rechazo de campos desconocidos
- limite de payload
- honeypot
- tiempo minimo

## Seguridad y antispam

- sin secretos en el bundle
- sin `VITE_` con credenciales
- honeypot
- delay minimo
- timeout
- rate limit local
- sin body completo en logs

## Privacidad

- sin cookies no esenciales
- sin trackers
- sin persistencia del formulario en storage
- sin datos personales en URL
- politica de privacidad aun provisional

## Proveedores activos

- ninguno para entrega real en produccion

## Datos pendientes

- titular legal verificado
- backend real
- destinatario real
- remitente autenticado
- politica final de retencion
- texto legal definitivo

## QA visual real

Validacion por capturas renderizadas y ejecucion Playwright:

- `390x844`
- `768x1024`
- `1366x768`
- verificacion adicional previa en `1440x900`
- reduced motion

Confirmado:

- success estable
- error recuperable estable
- no overflow visible
- no errores de consola en suite
- jerarquia y espaciado coherentes en mobile, tablet y desktop

## QA contacto

Resultado real:

- `npm run qa:contact`
- `11` pruebas pasando

Cobertura:

- visibilidad responsive
- validacion requerida
- email invalido
- success local
- error recuperable
- rate limit accesible
- doble submit
- offline
- reduced motion

## QA privacidad

Resultado real:

- `npm run qa:privacy`
- `2` pruebas pasando

Cobertura:

- sin trackers
- sin cookies no esenciales
- sin persistencia del contenido del formulario

## Bundle

Resultado de build de Sprint 08:

- `dist/assets/index-CitWgmut.js`: `422.30 kB raw / 141.14 kB gzip`
- `dist/assets/index-B5Il1O0e.css`: `35.73 kB raw / 7.95 kB gzip`
- sin source maps publicos
- `.htaccess` copiado a `dist/.htaccess`

## Produccion real hoy

Estado exacto:

El frontend queda preparado para publicacion, pero el formulario online no esta operativo como canal real de envio porque no existe backend de produccion aprobado en este repositorio.

## Preview local y release

- `vite preview` validado en `http://127.0.0.1:4173/`
- home validada en `390x844`, `768x1024`, `1366x768`, `1440x900` y `844x390`
- `?preloader=1`, `?portfolio-lab=1` y `?sequence-lab=1` revisados sobre el build real
- ZIP generado:
  - `release/suberos-production-2026-07-14.zip`

## Riesgos y siguiente paso

- falta endpoint real server-side
- falta legal definitivo
- falta verificacion de SiteGround con acceso real
- falta prueba publica del dominio tras despliegue

Siguiente sprint recomendado:

- Phase 9: SEO, legal, privacy and compliance architecture
