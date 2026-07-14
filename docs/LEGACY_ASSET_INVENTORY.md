# Legacy Asset Inventory

Fecha de auditoria: 2026-07-14

| Asset | Source URL | Original format and dimensions | Ownership confidence | Quality assessment | Production destination | Optimization performed | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Logo simbolo SUBEROS | `https://suberos.com/wp-content/uploads/2024/08/LOGO-SUBEROS-1-989x1024.webp` | WebP, 989x1024 | Alta | Nitido, fondo transparente, valido para branding | `public/branding/suberos-logo-symbol.webp` | Conservado en WebP, renombrado; original guardado en `public/legacy-source/` | Approved |
| Icono SUBEROS master | `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo.png` | PNG, 512x512 | Alta | Adecuado para OG y favicon base | `public/branding/suberos-icon-512.png` | Copia local sin hotlink; original conservado | Approved |
| Icono SUBEROS 192 | `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-192x192.png` | PNG, 192x192 | Alta | Valido para favicon/app icon | `public/branding/suberos-icon-192.png` | Copia local sin hotlink; original conservado | Approved |
| Icono SUBEROS 180 | `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-180x180.png` | PNG, 180x180 | Alta | Valido para Apple touch icon | `public/branding/suberos-icon-180.png` | Copia local sin hotlink; original conservado | Approved |
| Icono SUBEROS 32 | `https://suberos.com/wp-content/uploads/2023/08/cropped-cropped-ikigai-logo-32x32.png` | PNG, 32x32 | Alta | Valido para favicon de navegador | `public/branding/suberos-icon-32.png` | Copia local sin hotlink; original conservado | Approved |
| StretchPro display font | `https://suberos.com/wp-content/uploads/2023/08/StretchPro.otf` | OTF, 199652 bytes | Media-alta | Fuente display principal detectada en headings y botones de la web heredada | `public/branding/fonts/StretchPro.otf` | Original preservado en `public/legacy-source/fonts/`; activada con `@font-face` local | Approved |
| couture-bld legacy font | `https://suberos.com/wp-content/uploads/2023/08/couture-bld.otf` | OTF, 6196 bytes | Media | Descargable y trazable, pero no usada en el baseline actual | `public/legacy-source/fonts/couture-bld.otf` | Conservada sin activacion en produccion | Pending |
| Oswald variable legacy font | `https://suberos.com/wp-content/uploads/2023/08/Oswald-VariableFont_wght.ttf` | TTF, 169108 bytes | Media | Descargable y trazable, pero no usada en el baseline actual | `public/legacy-source/fonts/Oswald-VariableFont_wght.ttf` | Conservada sin activacion en produccion | Pending |
| Fotografias de platos y bebidas | Multiples URLs `wp-content/uploads/...` en la home | JPEG/WebP variados | Baja-media | Visualmente utiles, pero parecen asociadas a cliente/proyecto externo | No aplica | No descargadas para produccion | Rejected |
| Favicon de `shisha` | `/shisha/favicon.svg` | SVG | Media | Ligado a SPA separada; no necesario para baseline corporativo | No aplica | No reutilizado | Pending |
