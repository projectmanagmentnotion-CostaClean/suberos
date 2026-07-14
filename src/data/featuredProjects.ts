export type ProjectStatus = 'published' | 'pending'

export type FeaturedProject = {
  slug: string
  name: string
  category: string
  services: string[]
  summary: string
  description: string
  primaryVisual: {
    alt: string
    mode: 'editorial-placeholder'
  }
  href: string
  linkLabel: string
  notes: string[]
  routeKind: 'external'
  seoLabel: string
  status: ProjectStatus
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'luxury-shisha',
    name: 'Luxury Shisha',
    category: 'Experiencia web y carta digital',
    services: ['Diseno y desarrollo web', 'Carta digital', 'Mobile-first', 'Motion'],
    summary: 'Caso real ya publicado como experiencia separada dentro del ecosistema actual de SUBEROS.',
    description:
      'Luxury Shisha se integra como el primer proyecto demostrado: una experiencia web orientada a carta digital, navegacion mobile-first e interaccion vinculada al scroll.',
    primaryVisual: {
      alt: 'Composicion editorial temporal para Luxury Shisha mientras se aprueban capturas finales del proyecto.',
      mode: 'editorial-placeholder',
    },
    href: 'https://suberos.com/shisha/',
    linkLabel: 'Abrir experiencia actual',
    notes: [
      'Ruta real existente en la web publica actual: /shisha/.',
      'Los assets visuales finales del caso siguen pendientes de aprobacion y optimizacion.',
    ],
    routeKind: 'external',
    seoLabel: 'Luxury Shisha, experiencia web y carta digital',
    status: 'published',
  },
]
