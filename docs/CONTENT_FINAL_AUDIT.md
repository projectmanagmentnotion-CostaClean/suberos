# Content Final Audit

Fecha: 2026-07-15

## Alcance revisado

- home publica completa
- contacto integrado en home
- footer
- rutas legales
- 404
- metadata base
- laboratorios internos no indexables

## Datos confirmados y reutilizables

- nombre comercial: `SUBEROS`
- email publico: `info@suberos.com`
- telefono publico: `691 93 72 72`
- ubicacion publicada: `Calella, 08370 - Barcelona`
- servicios confirmados:
  - fotografia profesional
  - diseno grafico y branding
  - impresion y produccion
  - diseno y desarrollo web

## Hallazgos editoriales reales

- El runtime publico todavia mostraba varias frases demasiado internas o tecnicas:
  - referencias al logo recuperado y al asset servido localmente
  - explicaciones sobre la home como sistema o estructura interna
  - copy de footer demasiado centrada en el estado del repositorio
- El mensaje legal provisional ya era honesto, pero estaba disperso entre `footer`, `contacto` y documentos.
- El portfolio seguia correctamente sin inventar casos, aunque parte del copy podia expresarse mejor sin sonar a nota tecnica del repositorio.

## Cambios aplicados

- Se centralizo el estado real de marca, contacto, legales, portfolio y formulario en `src/data/companyProfile.ts`.
- Se reescribio copy publico para eliminar lenguaje meta sin inventar claims nuevos.
- Se mantuvo el formulario honestamente bloqueado y las paginas legales como provisionales.
- Se preservo el enfoque editorial del bloque de trabajo sin publicar proyectos ficticios.

## Pendientes no resueltos por falta de evidencia

- nombre o razon social del titular
- NIF/CIF
- domicilio legal
- datos registrales si aplican
- email legal definitivo si difiere del publico
- proveedor real del formulario
- redes sociales oficiales verificadas
- licencia documental de StretchPro
