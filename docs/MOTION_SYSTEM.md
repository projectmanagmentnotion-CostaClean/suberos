# Motion System

## Objetivo del Sprint 01

Establecer una base de motion segura y reutilizable antes de desarrollar escenas cinematicas de alta complejidad.

## Piezas implementadas

- Registro centralizado de GSAP y ScrollTrigger en `src/lib/gsap/registerGsap.ts`
- Utilidad de media queries para motion en `src/lib/gsap/createMotionMedia.ts`
- Deteccion real de `prefers-reduced-motion` en `src/hooks/useReducedMotion.ts`
- Integracion Lenis + ScrollTrigger con limpieza en `src/hooks/useLenisScroll.ts`
- Animacion de validacion ligada al scroll en `src/hooks/useScrollAccent.ts` y `src/components/motion/ScrollAccent.tsx`

## Ciclo de vida

1. `src/main.tsx` registra plugins una sola vez.
2. `AppProviders` consulta reduced motion.
3. Si reduced motion no esta activo, `useLenisScroll` inicializa Lenis y sincroniza `ScrollTrigger.update`.
4. Cada componente con motion usa su propio hook aislado.
5. Cada hook usa `useGSAP` y `gsap.matchMedia()` para limpiar contextos y listeners al desmontar.

## Regla actual de reduced motion

- Si el usuario tiene `prefers-reduced-motion: reduce`, Lenis no se activa.
- La animacion del acento scroll no se ejecuta.
- El contenido queda completamente legible y operativo sin depender de movimiento.

## Validacion implementada en Sprint 01

- Una linea horizontal se expande con `scrub` cuando entra en viewport.
- El bloque completo se desplaza levemente en Y para confirmar que el sistema scroll-linked funciona.
- No hay pinning, scroll traps ni timelines largas en esta fase.

## Restricciones activas

- No hay secuencias de frames.
- No hay autoplay de audio.
- No hay cursor custom.
- No hay dependencias secundarias de animacion.
- No se usan estados globales mutables para motion.

## Siguiente escalon recomendado

- Escenas por seccion con `gsap.context()`
- Breakpoints diferenciados para desktop/tablet/mobile
- FLIP para transiciones entre estados de loader y hero
- Timelines por feature con presupuesto de performance por escena
