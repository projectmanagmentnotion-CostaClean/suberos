# Hero System

## Objetivo

El hero de Sprint 04 establece la primera escena cinematografica real de SUBEROS sin depender todavia de portfolio final ni media pesada. La implementacion vive en `src/features/home/HeroSection.tsx` y `src/motion/scenes/createHeroFoundationScene.ts`.

## Estructura

- eyebrow real: `Estudio creativo / Calella, Barcelona`
- un unico `h1`
- cuerpo explicativo real
- CTA primaria a `#servicios`
- CTA secundaria a `#contacto`
- metadata de servicios y contacto real
- visual principal con asset propio
- indicador de scroll a `#estudio`

## Copy final

- H1 accesible: `Creamos imagenes que mueven marcas.`
- lineas visibles:
  - `CREAMOS`
  - `IMAGENES`
  - `QUE MUEVEN`
  - `MARCAS`
- texto:
  - `Fotografia, diseno, impresion digital y experiencias web para marcas que quieren destacar, emocionar y ser recordadas.`

No se introducen clientes, premios, resultados ni ubicaciones inventadas.

## Visual principal

Se usa `public/branding/suberos-logo-symbol.webp` como asset propio verificado, servido localmente y tratado como visual editorial. El `img` expone dimensiones explicitas, `fetchPriority="high"` y `picture` preparado para futuras variantes.

## Timeline scroll-linked

`createHeroFoundationScene()` usa `ScrollTrigger` dentro del sistema comun:

- desplazamiento progresivo por lineas
- escala y elevacion del visual
- acento luminoso con leve parallax
- desvanecimiento de metadata
- salida del scroll cue

Perfiles:

- `full`: mayor escala, desplazamiento y scrub `0.8`
- `balanced`: recorrido y scrub reducidos
- `reduced`: limpia estilos y deja el contenido estatico

## Responsive

- `1366x768`: hero completo con layout editorial de dos columnas
- `768x1024`: stack unico con visual debajo del copy
- `390x844`: titulacion reducida para eliminar recorte y mantener impacto
- horizontal movil: altura minima recortada para no colapsar el viewport

## Header integrado

- el header se oculta durante el preloader
- reaparece al final de la transicion
- sigue funcionando cuando el preloader se omite
- el drawer movil mantiene `Escape`, boton interno y cierre por overlay

## Accesibilidad

- un unico `h1`
- orden DOM logico
- CTA con destino real
- foco visible heredado del shell
- reduced motion sin contenido bloqueado
- scroll cue tratado como enlace real hacia contenido

## SEO

- H1 unico alineado con meta description actualizada
- CTA principal dirigida a servicios
- CTA secundaria dirigida a contacto
- anchors semanticos estables
- copy inmediata sobre que hace SUBEROS y por que contactar

## Siguientes extensiones

- evolucionar el visual hacia portfolio o fotografia propia cuando exista asset aprobado
- conectar escenas siguientes con featured work
- definir una segunda capa de media por breakpoint sin reescribir la base
