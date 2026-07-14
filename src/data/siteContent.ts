import { homeAnchors } from '../app/routes'

export const siteMeta = {
  title: 'SUBEROS - Estudio creativo de fotografia, diseno, produccion y web',
  description:
    'SUBEROS une fotografia, diseno, produccion e interaccion web para marcas que necesitan una direccion visual clara y una ejecucion coherente.',
  canonicalUrl: 'https://suberos.com/',
  ogImage: 'https://suberos.com/branding/suberos-social-card.png',
}

export const siteNavigation = [
  { label: 'Inicio', href: homeAnchors.inicio },
  { label: 'Estudio', href: homeAnchors.estudio },
  { label: 'Servicios', href: homeAnchors.servicios },
  { label: 'Trabajo', href: homeAnchors.trabajo },
  { label: 'Proceso', href: homeAnchors.proceso },
  { label: 'Contacto', href: homeAnchors.contacto },
] as const

export const siteContact = {
  email: 'info@suberos.com',
  phoneDisplay: '691 93 72 72',
  phoneHref: '+34691937272',
  location: 'Calella, 08370 - Barcelona',
} as const
