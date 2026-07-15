import { homeAnchors } from '../app/routes'
import { companyProfile } from './companyProfile'

export const siteMeta = {
  title: 'SUBEROS - Estudio creativo de fotografia, diseno, produccion y web',
  description:
    'SUBEROS conecta fotografia, diseno, produccion e interaccion web para marcas que necesitan una direccion visual clara, coherente y lista para activar su siguiente paso.',
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
  ...companyProfile.contact,
} as const
