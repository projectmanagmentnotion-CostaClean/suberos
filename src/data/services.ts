import { homeAnchors } from '../app/routes'

export type ServiceContent = {
  id: string
  title: string
  summary: string
  benefit: string
  result: string
  ctaHref: string
  ctaLabel: string
  visualEyebrow: string
}

export const siteServices: ServiceContent[] = [
  {
    id: 'fotografia',
    title: 'Fotografia profesional',
    summary: 'Capturamos la esencia de cada marca para campanas, catalogos, carta digital y contenido web.',
    benefit: 'Imagen propia y utilizable en todos los soportes donde la marca se juega la atencion.',
    result: 'Direccion visual mas coherente y activos listos para comunicar mejor.',
    ctaHref: homeAnchors.contacto,
    ctaLabel: 'Hablar sobre fotografia',
    visualEyebrow: 'Captura y direccion visual',
  },
  {
    id: 'diseno',
    title: 'Diseno grafico y branding',
    summary: 'Ordenamos mensaje, identidad y piezas visuales para que todo hable con la misma direccion.',
    benefit: 'Una marca mas clara, reconocible y consistente en digital, impreso y presentacion.',
    result: 'Sistema grafico con jerarquia y criterio para crecer sin ruido.',
    ctaHref: homeAnchors.contacto,
    ctaLabel: 'Hablar sobre branding',
    visualEyebrow: 'Identidad y sistema',
  },
  {
    id: 'impresion',
    title: 'Impresion y produccion',
    summary: 'Llevamos las ideas al soporte fisico con formatos y acabados pensados para el uso real.',
    benefit: 'Piezas que mantienen la calidad de la marca tambien fuera de la pantalla.',
    result: 'Materiales listos para exponer, vender, presentar o activar campañas.',
    ctaHref: homeAnchors.contacto,
    ctaLabel: 'Hablar sobre produccion',
    visualEyebrow: 'Del arte final al soporte',
  },
  {
    id: 'web',
    title: 'Diseno y desarrollo web',
    summary: 'Creamos experiencias digitales claras, mobile-first y preparadas para destacar y convertir.',
    benefit: 'Una presencia digital mas util, mas memorable y conectada con el resto de la marca.',
    result: 'Webs, landings o experiencias editoriales con narrativa y contacto directo.',
    ctaHref: homeAnchors.trabajo,
    ctaLabel: 'Ver enfoque digital',
    visualEyebrow: 'Experiencia digital',
  },
]
