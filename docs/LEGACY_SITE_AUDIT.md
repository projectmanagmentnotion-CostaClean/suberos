# Legacy Site Audit

Fecha de auditoria: 2026-07-14

## URLs actuales confirmadas

- `https://suberos.com/`
- `https://suberos.com/shisha/`
- `https://suberos.com/robots.txt`

## Hallazgos de indexacion y estructura

### Home `https://suberos.com/`

- Titulo actual: `Subero Shoot: Diseño Gráfico, Fotografía Profesional, Impresión Digital y Diseño Web Personalizado – Expertos en diseño gráfico creativo, fotografía profesional, impresión de calidad y diseño web personalizado. Descubre cómo podemos transformar tus ideas en realidad.`
- Meta robots actual: `noindex, nofollow`
- H1 visible detectado:
  - `Subeero Shoot | Soluciones Creativas y Personalizadas para Impulsar Tu Marca Visualmente`
  - La pantalla de preloader tambien inyecta varios `h1` adicionales: `CREEATIVIDAD`, `QUE`, `CREA`, `REALIDAD`
- H2 visibles detectados:
  - `¿Qué es SUBEROS?`
  - `Descubre Cómo Podemos Ayudarte a Crecer`
  - `Diseños Web`
- H3 visibles detectados:
  - `¿Tienes un Proyecto en Mente? ¡Hablemmos!`
  - `691 93 72 72`
  - `info@suberos.com`
  - `Calella, 08370 - Barcelona`

### Shisha `https://suberos.com/shisha/`

- Responde con una SPA separada.
- Titulo actual detectado en HTML servido: `shisha-landing`
- Favicon propio de esa SPA: `/shisha/favicon.svg`
- No se ha reutilizado contenido ni assets de esa ruta en Sprint 01 por falta de relacion directa con el baseline corporativo principal.

## Servicios confirmados

- Branding
- Fotografia profesional
- Diseno grafico
- Impresion digital
- Diseno y desarrollo web

## Datos de contacto confirmados

- Telefono: `691 93 72 72`
- Email: `info@suberos.com`
- Ubicacion mostrada: `Calella, 08370 - Barcelona`

## Logo y favicon detectados

- Logo principal detectado en la home:
  - `https://suberos.com/wp-content/uploads/2024/08/LOGO-SUBEROS-1-989x1024.webp`
- Favicon / icono detectado en footer y variantes responsive:
  - `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo.png`
  - `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-192x192.png`
  - `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-180x180.png`
  - `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-32x32.png`

## Imagenes utiles y propiedad

### Reutilizables con alta confianza

- Logo simbolo SUBEROS en WebP.
- Icono/fallback favicon de SUBEROS en PNG.

### No reutilizadas en Sprint 01

- Fotografias de platos y bebidas vinculadas a `malcriadobcn.com`.
  - Motivo: parecen corresponder a trabajo de cliente o proyecto externo; la propiedad de reutilizacion para la home corporativa no queda suficientemente documentada.
- Fuentes `Oswald-VariableFont_wght.ttf`, `couture-bld.otf`, `StretchPro.otf`.
  - Motivo: la licencia de redistribucion no esta confirmada en la auditoria.

## Problemas detectados en la web heredada

- `robots` en `noindex, nofollow` en la home.
- Copy con errores ortograficos y duplicaciones:
  - `Subeero`, `Fotoggrafía`, `Diseñoo`, `Tipoo`, `Transfforma`, `Traansforma`, `Hablemmos`, `Enviaar`.
- Secciones repetidas de servicios.
- Multiples `h1` visuales por el preloader, rompiendo la jerarquia semantica.
- Dependencia de librerias cargadas desde CDN y scripts inline no auditados.
- La ruta `/shisha/` sirve una SPA separada con metadatos minimos y titulo generico.
- `robots.txt` solo protege `/wp-admin/` y no anuncia sitemap util accesible.
- No se ha podido confirmar un sitemap funcional publico; `sitemap.xml`, `wp-sitemap.xml` y variantes devuelven 404 HTML.

## URLs antiguas que pueden requerir redireccion futura

- `/shisha/`
- `/feed/`
- `/comments/feed/`
- Posibles rutas WordPress legales o de busqueda si siguen enlazadas desde la version heredada.

## Assets que no deben reutilizarse

- Cualquier asset servido desde `malcriadobcn.com`.
- Fotografias de restauracion incrustadas en la home heredada.
- Tipografias heredadas sin licencia confirmada.
- Scripts inline y dependencias CDN de la web WordPress antigua.
