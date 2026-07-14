export const siteMeta = {
  title: 'SUBEROS | Branding, fotografia, impresion digital y desarrollo web',
  description:
    'Fotografia, diseno, impresion digital y experiencias web para marcas que quieren destacar, emocionar y ser recordadas.',
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
  heroEyebrow: 'Estudio creativo / Calella, Barcelona',
  heroTitle: 'Creamos imagenes que mueven marcas.',
  heroTitleLines: ['CREAMOS', 'IMAGENES', 'QUE MUEVEN', 'MARCAS'] as const,
  heroBody:
    'Fotografia, diseno, impresion digital y experiencias web para marcas que quieren destacar, emocionar y ser recordadas.',
  heroPrimaryCta: 'Ver proyectos',
  heroSecondaryCta: 'Cuentanos tu proyecto',
  heroContactEmail: 'info@suberos.com',
  heroContactPhone: '691 93 72 72',
  heroContactPhoneHref: '+34691937272',
  heroVisualEyebrow: 'Fotografia / Diseno / Impresion / Web',
  heroVisualBody:
    'Base visual real, logo recuperado y capas listas para evolucionar hacia portfolio, escenas y casos verificados.',
  heroVisualCaption: 'Activo propio de SUBEROS servido localmente como visual principal del primer viewport.',
  heroScrollLabel: 'Explorar el estudio',
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
    title: 'Hero y preloader base',
    body:
      'La home ya arranca con un primer viewport cinematografico, scroll-linked y preparado para ampliar la narrativa sin rehacer la base.',
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
