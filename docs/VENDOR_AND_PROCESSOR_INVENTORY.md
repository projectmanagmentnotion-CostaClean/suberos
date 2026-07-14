# Vendor And Processor Inventory

Fecha: 2026-07-14

## Runtime publico actual

Activos en la web:

- ninguna plataforma de analytics
- ningun pixel
- ningun SDK de terceros para contacto
- ningun proveedor real de formularios
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
  - rol: hosting previsto o documentado para despliegue
  - datos de visitantes web: potenciales logs tecnicos del hosting cuando la publicacion exista
  - clasificacion: proveedor tecnico a revisar como posible encargado o subencargado segun la configuracion final
- correo corporativo real
  - rol: pendiente de confirmar
  - estado: no documentado aun como receptor definitivo de formularios
  - clasificacion: pendiente

## Desarrollo y QA

- Playwright: solo testing local
- `tsx`: ejecucion local del mock
- mock server local `127.0.0.1:8787`: solo desarrollo y preview local
- Vite preview: servidor local de validacion, no servicio productivo de tratamiento
- fuentes locales self-hosted: assets servidos desde el propio sitio, no proveedor externo

## Proveedores activos para contacto en produccion

- ninguno

## Procesadores pendientes de definir antes de lanzar envio real

- proveedor de correo transaccional o backend
- hosting o funcion server-side que procese el formulario
- personal o cuenta receptora
- politica de logs
- ubicacion y transferencias

## Riesgo abierto

No existe todavia inventario final de procesadores porque no hay pipeline real de entrega en produccion.
