# Vendor And Processor Inventory

Fecha: 2026-07-14

## Runtime publico actual

Activos en la web:

- ninguna plataforma de analytics
- ningun pixel
- ningun SDK de terceros para contacto
- ningun proveedor real de formularios

## Dependencias tecnicas del frontend

- React
- Vite
- GSAP
- Lenis

Estas dependencias no reciben datos del formulario por diseño en el runtime actual.

## Desarrollo y QA

- Playwright: solo testing local
- `tsx`: ejecucion local del mock
- mock server local `127.0.0.1:8787`: solo desarrollo y preview local

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
