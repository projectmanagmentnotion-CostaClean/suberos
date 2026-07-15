# Inclusive Motion Audit

Fecha: 2026-07-15

## Validaciones ejecutadas

- Home con `?reduced-motion=1`
- Sequence Lab con `?sequence-lab=1&reduced-motion=1`
- Contacto y navegacion publica con reduced motion
- Preloader y menu movil con foco y aislamiento del fondo

## Resultado

- El contenido esencial de home, legales y contacto no depende de motion para ser entendido.
- El preloader no expone el contenido de fondo al tab mientras la capa inicial esta activa.
- El menu movil no deja el foco escapar al documento mientras esta abierto.
- Sequence Lab sigue ofreciendo fallback estatico legible cuando el perfil es `reduced`.

## Riesgos pendientes

- GSAP cinematografico futuro debera mantener la misma politica: contenido base primero, motion como mejora progresiva.
- Toda escena futura con pin, scrub, canvas o transiciones superpuestas debe pasar por esta auditoria antes de declararse apta.
