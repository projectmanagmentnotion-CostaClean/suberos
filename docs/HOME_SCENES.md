# Home Scenes

## Hero

- componente: `src/features/home/HeroSection.tsx`
- escena: `src/motion/scenes/createHeroFoundationScene.ts`
- trigger:
  - start `top top`
  - end `bottom top+=8%` desktop
  - end `bottom top+=18%` mobile
- perfil:
  - `full`: scrub `0.8`
  - `balanced`: scrub `0.5`
  - `reduced`: sin scrub
- assets:
  - `suberos-logo-symbol.webp`
- cleanup:
  - mata timeline y limpia estilos

## Que es SUBEROS

- componente: `src/features/home/StudioSection.tsx`
- escena: `src/motion/scenes/createStudioNarrativeScene.ts`
- trigger:
  - start `top 72%`
  - end `bottom top+=18%` desktop
- perfil:
  - `full` y `balanced`: reveal editorial con scrub
  - `reduced`: contenido estatico
- assets:
  - sin media adicional
- cleanup:
  - mata timeline y limpia estilos

## Servicios

- componente: `src/features/home/ServicesSection.tsx`
- escena: `src/motion/scenes/createServicesNarrativeScene.ts`
- trigger principal:
  - start `top 76%` para reveal de la lista
- triggers por item:
  - start `top center`
  - end `bottom center`
- perfil:
  - `full`: transicion mas larga entre paneles
  - `balanced`: transicion mas corta
  - `reduced`: sin triggers, lista completa
- responsive:
  - desktop/tablet: visual sticky activo
  - mobile: visual sticky oculto y lista completa
- assets:
  - composicion visual por CSS
- cleanup:
  - mata tween y triggers por item
  - limpia `data-active`

## Trabajo

- componente: `src/features/home/FeaturedWorkSection.tsx`
- motion:
  - `useElementReveal`
- trigger:
  - reveal de seccion bajo el sistema comun
- perfil:
  - `full`/`balanced`: reveal
  - `reduced`: contenido visible
- assets:
  - composicion editorial propia por CSS, sin casos externos publicados
- cleanup:
  - gestionado por `createRevealScene`

## Metodo

- componente: `src/features/home/ProcessSection.tsx`
- motion:
  - `useElementReveal`
- trigger:
  - reveal de cards y divider
- perfil:
  - `full`/`balanced`: reveal
  - `reduced`: visible

## Declaracion

- componente: `src/features/home/BrandStatementSection.tsx`
- escena: `src/motion/scenes/createStatementScene.ts`
- trigger:
  - start `top 82%`
  - end `bottom top+=20%`
- perfil:
  - `full`: scrub `0.65`
  - `balanced`: scrub `0.35`
  - `reduced`: estatico
- cleanup:
  - mata timeline y limpia estilos

## Contacto

- componente: `src/features/contact/ContactSection.tsx`
- motion:
  - no depende de escena propia nueva
- objetivo:
  - cierre directo y accesible, sin ocultar contenido
