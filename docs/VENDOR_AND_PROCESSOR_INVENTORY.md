# Vendor And Processor Inventory

Fecha: 2026-07-16

## Runtime publico actual

Activos en la web:

- ninguna plataforma de analytics
- ningun pixel
- ningun SDK de terceros para contacto
- endpoint server-side real de contacto
- ninguna request de tracking a dominios externos en el alcance auditado

## Dependencias tecnicas del frontend

- React
- Vite
- GSAP
- Lenis

Estas dependencias no reciben datos del formulario por diseno en el runtime actual.

## Infraestructura y servicios relacionados

- GitHub
  - rol: repositorio de codigo y control de versiones
  - datos de visitantes web: ninguno por el runtime publico
  - clasificacion: proveedor tecnico de desarrollo, no encargado del formulario publico actual
- SiteGround
  - rol: hosting activo del sitio y del endpoint server-side del formulario
  - datos de visitantes web: potenciales logs tecnicos del hosting y procesamiento server-side del formulario
  - clasificacion: proveedor tecnico activo del canal de contacto
- correo corporativo real
  - rol: recepcion operativa de solicitudes en `info@suberos.com`
  - estado: activo
  - clasificacion: canal operativo activo

## Desarrollo y QA

- Playwright: solo testing local
- `tsx`: ejecucion local del mock
- mock server local `127.0.0.1:8787`: solo desarrollo y preview local
- Vite preview: servidor local de validacion, no servicio productivo de tratamiento
- fuentes locales self-hosted: assets servidos desde el propio sitio, no proveedor externo

## Proveedores activos para contacto en produccion

- SiteGround como hosting y capa server-side del endpoint
- buzon corporativo `info@suberos.com` como canal receptor operativo

## Procesadores pendientes de definir antes de cerrar documentalmente el envio real

- politica de logs
- ubicacion y transferencias
- retencion operativa del buzon

## Riesgo abierto

El pipeline real de entrega ya existe, pero la politica documental final de retencion, logs y transferencias sigue pendiente.
