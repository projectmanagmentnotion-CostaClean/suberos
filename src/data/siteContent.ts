export const siteMeta = {
  title: 'SUBEROS | Branding, fotografia, impresion digital y desarrollo web',
  description:
    'SUBEROS ofrece branding, fotografia profesional, impresion digital y desarrollo web para empresas y emprendedores que buscan una presencia visual mas clara y competitiva.',
  canonicalUrl: 'https://suberos.com/',
  ogImage: 'https://suberos.com/branding/suberos-icon-512.png',
}

export const siteNavigation = [
  { label: 'Estudio', href: '#estudio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
] as const

export const siteServices = [
  {
    id: 'fotografia',
    title: 'Fotografia profesional',
    description:
      'Capturamos la esencia de cada marca con imagenes pensadas para campanas, catalogos y contenido web.',
  },
  {
    id: 'diseno',
    title: 'Diseno grafico',
    description:
      'Desarrollamos piezas visuales y mensajes claros para comunicar ideas y atraer a tu publico objetivo.',
  },
  {
    id: 'impresion',
    title: 'Impresion digital',
    description:
      'Llevamos las ideas del digital al fisico con formatos y acabados orientados a un resultado profesional.',
  },
  {
    id: 'web',
    title: 'Diseno y desarrollo web',
    description:
      'Creamos sitios intuitivos y visualmente atractivos que ayudan a destacar y facilitar el contacto.',
  },
] as const

export const siteContact = {
  email: 'info@suberos.com',
  phoneDisplay: '691 93 72 72',
  phoneHref: '+34691937272',
  location: 'Calella, 08370 - Barcelona',
}

export const homeContent = {
  heroEyebrow: 'Soluciones creativas y personalizadas',
  heroTitle: 'Creatividad que crea realidad.',
  heroBody:
    'SUBEROS es una empresa de creacion visual integral orientada a branding, fotografia profesional, impresion digital y desarrollo web.',
  heroPrimaryCta: 'Cuentanos tu proyecto',
  heroSecondaryCta: 'Ver servicios',
  manifestoTitle: 'Una base clara antes de construir la experiencia cinematografica completa.',
  manifestoBody:
    'Esta primera iteracion convierte el proyecto en una base tecnica accesible, escalable y preparada para motion avanzado con GSAP, sin inventar contenido ni depender de la web antigua.',
  contactBody:
    'Si quieres trabajar branding, fotografia, impresion o web, contactanos y revisaremos el proyecto con una direccion clara.',
}
