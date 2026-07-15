import type {
  ContactFieldName,
  ContactFormValues,
  ContactPreferenceOption,
  ContactServiceOption,
} from './contact.types'
import { companyProfile } from '../../data/companyProfile'

export const CONTACT_ENDPOINT = '/api/contact'
export const CONTACT_MAX_PAYLOAD_CHARS = 6_000
export const CONTACT_MIN_SUBMIT_DELAY_MS = 1_500
export const CONTACT_RATE_LIMIT_WINDOW_MS = 60_000
export const CONTACT_RATE_LIMIT_MAX_REQUESTS = 3
export const CONTACT_REAL_ENDPOINT_ENABLED = companyProfile.runtimeStatus.form.endpointEnabled

const localHostname = [108, 111, 99, 97, 108, 104, 111, 115, 116]
  .map((characterCode) => String.fromCharCode(characterCode))
  .join('')
const loopbackHostnameSegments = [127, 0, 0, 1]

export function isContactDebugHost(hostname: string) {
  return hostname === localHostname || hostname === loopbackHostnameSegments.join('.')
}

export function getContactMockEndpoint(origin: string) {
  const url = new URL(origin)
  url.protocol = 'http:'
  url.hostname = loopbackHostnameSegments.join('.')
  url.port = '8787'
  url.pathname = CONTACT_ENDPOINT
  url.search = ''
  url.hash = ''
  return url.toString()
}

export const contactInitialValues = (): ContactFormValues => ({
  name: '',
  email: '',
  service: '',
  message: '',
  company: '',
  phone: '',
  budget: '',
  timeline: '',
  website: '',
  contactPreference: '',
  honey: '',
  startedAt: String(Date.now()),
})

export const contactFieldOrder: readonly ContactFieldName[] = [
  'name',
  'email',
  'service',
  'message',
  'company',
  'phone',
  'budget',
  'timeline',
  'website',
  'contactPreference',
] as const

export const contactServiceOptions: readonly ContactServiceOption[] = [
  {
    id: 'photography',
    title: 'Fotografia profesional',
    description: 'Campanas, catalogos, producto, espacio o contenido editorial.',
  },
  {
    id: 'branding',
    title: 'Branding e identidad visual',
    description: 'Direccion visual, tono, sistema de marca y piezas base.',
  },
  {
    id: 'graphic-design',
    title: 'Diseno grafico',
    description: 'Piezas, layouts, soportes y materiales de comunicacion.',
  },
  {
    id: 'print-production',
    title: 'Impresion y produccion',
    description: 'Arte final, soportes, acabados y activacion fisica.',
  },
  {
    id: 'web-design-development',
    title: 'Diseno y desarrollo web',
    description: 'Webs, landings o experiencias digitales con enfoque editorial.',
  },
  {
    id: 'not-sure',
    title: 'No estoy seguro',
    description: 'Necesito orientacion para definir el servicio adecuado.',
  },
] as const

export const contactPreferenceOptions: readonly ContactPreferenceOption[] = [
  { id: 'email', label: 'Prefiero email' },
  { id: 'phone', label: 'Prefiero telefono' },
  { id: 'either', label: 'Me vale cualquiera' },
] as const

export const contactPrivacyNotice =
  'Responsable pendiente de completar con identidad legal verificada. Usaremos estos datos unicamente para responder y gestionar tu solicitud. La base juridica final, el proveedor de envio y los plazos de conservacion siguen pendientes de validacion antes del lanzamiento.'

export const contactSuccessMessage =
  'Solicitud recibida en el entorno tecnico de SUBEROS. La entrega real por correo sigue bloqueada hasta aprobar el backend y el proveedor final.'

export const contactBlockedMessage =
  companyProfile.runtimeStatus.form.fallbackMessage

export const contactProductionStatusMessage =
  companyProfile.runtimeStatus.form.publicMessage

export const contactRateLimitMessage =
  'Hemos detenido temporalmente nuevos envios desde este entorno. Espera un momento o usa correo o telefono si tu consulta es urgente.'

export const contactGenericErrorMessage =
  'No hemos podido procesar tu solicitud ahora mismo. Revisa los campos o utiliza correo o telefono como alternativa.'

export const contactConsentContext =
  'Al enviar, nos autorizas a usar estos datos para responder a tu solicitud. No activamos marketing ni seguimiento adicional en este formulario.'
