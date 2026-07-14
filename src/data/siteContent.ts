export const siteMeta = {
  title: 'SUBEROS | Branding, fotografia, impresion digital y desarrollo web',
  description:
    'SUBEROS ofrece branding, fotografia profesional, impresion digital y desarrollo web para empresas y emprendedores que buscan una presencia visual mas clara y competitiva.',
  canonicalUrl: 'https://suberos.com/',
  ogImage: 'https://suberos.com/branding/suberos-icon-512.png',
}

export const siteNavigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Estudio', href: '#estudio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
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
    'SUBEROS presenta servicios confirmados de branding, fotografia profesional, impresion digital y diseno y desarrollo web, ahora dentro de una base editorial accesible, responsive y preparada para motion cinematografico posterior.',
  heroPrimaryCta: 'Cuentanos tu proyecto',
  heroSecondaryCta: 'Ver servicios',
  heroContactEmail: 'info@suberos.com',
  heroContactPhone: '691 93 72 72',
  heroContactPhoneHref: '+34691937272',
  heroPanelEyebrow: 'Sistema visual base',
  heroPanelBody: 'Logo, shell, tokens, linking interno y motion controlado listos para evolucionar sin rehacer la arquitectura.',
  heroPanelCaption: 'Marca propia recuperada y servida localmente.',
  manifestoTitle: 'Una base clara antes de construir la experiencia cinematografica completa.',
  manifestoBody:
    'El sitio publico actual confirma servicios, contacto y marca. Este sprint reorganiza esa base en un sistema profesional sin inventar contenido ni depender de animaciones para funcionar.',
  contactBody:
    'Si quieres trabajar branding, fotografia, impresion o web, contactanos y revisaremos el proyecto con una direccion clara.',
}

export const projectReadiness = [
  {
    title: 'Assets propios localizados',
    body:
      'Logo y favicon de SUBEROS se sirven desde `public/branding/`, sin hotlinks y con trazabilidad documentada.',
  },
  {
    title: 'Escenas preparadas',
    body:
      'MediaFrame, Surface y los primitives de layout dejan preparada la base para futuros case studies y escenas de portfolio.',
  },
  {
    title: 'SEO y enlaces limpios',
    body:
      'El shell mantiene anchors estables hacia inicio, estudio, servicios, proyectos, proceso y contacto, sin `href="#"` ni enlaces rotos.',
  },
] as const

export const processNotes = [
  {
    title: 'Jerarquia editorial',
    body:
      'El contenido ahora avanza desde la propuesta de valor hacia servicios, estructura de proyectos, proceso y contacto con una lectura mas clara.',
  },
  {
    title: 'Interaccion accesible',
    body:
      'Header, menu, CTA y footer funcionan con foco visible, reduced motion y landmarks semanticos sin depender de GSAP para la usabilidad basica.',
  },
  {
    title: 'Escalado futuro',
    body:
      'La base separa tokens, layout, UI, contenido y hooks para que el siguiente sprint pueda concentrarse en escenas y no en deuda estructural.',
  },
] as const
