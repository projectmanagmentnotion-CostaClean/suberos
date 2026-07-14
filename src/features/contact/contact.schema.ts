import {
  CONTACT_MAX_PAYLOAD_CHARS,
  CONTACT_MIN_SUBMIT_DELAY_MS,
  contactServiceOptions,
} from './contact.constants'
import type {
  ContactFieldErrors,
  ContactFormValues,
  ContactNormalizedSubmission,
  ContactValidationResult,
} from './contact.types'
import {
  containsRepeatedSpamPattern,
  countLettersAndDigits,
  isValidEmail,
  isValidHttpUrl,
  isValidPhone,
  normalizeMultiline,
  normalizeSingleLine,
  normalizeUrl,
} from '../../lib/validation/text'

type ValidationOptions = {
  enforceTiming: boolean
  now?: number
}

const allowedServices = new Set(contactServiceOptions.map((service) => service.id))
const allowedPreferences = new Set(['email', 'phone', 'either'])
const allowedKeys = new Set([
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
  'honey',
  'startedAt',
])

function getString(record: Record<string, unknown>, key: string) {
  const value = record[key]
  return typeof value === 'string' ? value : ''
}

function getPayloadSize(values: ContactNormalizedSubmission) {
  return JSON.stringify(values).length
}

export function validateContactSubmission(rawValues: Record<string, unknown>, options: ValidationOptions): ContactValidationResult {
  const errors: ContactFieldErrors = {}
  const now = options.now ?? Date.now()

  const unknownKeys = Object.keys(rawValues).filter((key) => !allowedKeys.has(key))

  if (unknownKeys.length > 0) {
    errors.form = 'El formulario incluye campos no admitidos.'
  }

  const normalized: ContactNormalizedSubmission = {
    name: normalizeSingleLine(getString(rawValues, 'name')),
    email: normalizeSingleLine(getString(rawValues, 'email')).toLowerCase(),
    service: getString(rawValues, 'service') as ContactNormalizedSubmission['service'],
    message: normalizeMultiline(getString(rawValues, 'message')),
    company: normalizeSingleLine(getString(rawValues, 'company')),
    phone: normalizeSingleLine(getString(rawValues, 'phone')),
    budget: normalizeSingleLine(getString(rawValues, 'budget')),
    timeline: normalizeSingleLine(getString(rawValues, 'timeline')),
    website: normalizeUrl(getString(rawValues, 'website')),
    contactPreference: getString(rawValues, 'contactPreference') as ContactNormalizedSubmission['contactPreference'],
    startedAt: Number(getString(rawValues, 'startedAt')),
  }

  const honey = normalizeSingleLine(getString(rawValues, 'honey'))

  if (!normalized.name) {
    errors.name = 'Introduce tu nombre.'
  } else if (normalized.name.length < 2 || normalized.name.length > 80) {
    errors.name = 'El nombre debe tener entre 2 y 80 caracteres.'
  }

  if (!normalized.email) {
    errors.email = 'Introduce un correo electronico.'
  } else if (normalized.email.length > 160 || !isValidEmail(normalized.email)) {
    errors.email = 'Introduce un correo electronico valido.'
  }

  if (!normalized.service || !allowedServices.has(normalized.service)) {
    errors.service = 'Selecciona el tipo de proyecto o servicio.'
  }

  if (!normalized.message) {
    errors.message = 'Describe brevemente el proyecto.'
  } else if (normalized.message.length < 24 || normalized.message.length > 3_000) {
    errors.message = 'La descripcion debe tener entre 24 y 3000 caracteres.'
  } else if (countLettersAndDigits(normalized.message) < 12 || containsRepeatedSpamPattern(normalized.message)) {
    errors.message = 'Necesitamos una descripcion un poco mas clara para poder ayudarte.'
  }

  if (normalized.company.length > 120) {
    errors.company = 'La empresa o marca no puede superar 120 caracteres.'
  }

  if (normalized.phone && (!isValidPhone(normalized.phone) || normalized.phone.length > 20)) {
    errors.phone = 'Introduce un telefono valido o dejalo vacio.'
  }

  if (normalized.budget.length > 80) {
    errors.budget = 'Resume el presupuesto aproximado en menos de 80 caracteres.'
  }

  if (normalized.timeline.length > 80) {
    errors.timeline = 'Resume el plazo en menos de 80 caracteres.'
  }

  if (normalized.website && (!isValidHttpUrl(normalized.website) || normalized.website.length > 160)) {
    errors.website = 'Introduce una URL valida o dejala vacia.'
  }

  if (normalized.contactPreference && !allowedPreferences.has(normalized.contactPreference)) {
    errors.contactPreference = 'Selecciona una preferencia valida o deja el campo sin elegir.'
  }

  if (!Number.isFinite(normalized.startedAt)) {
    errors.form = 'No hemos podido validar el envio. Recarga e intentalo de nuevo.'
  }

  if (options.enforceTiming && Number.isFinite(normalized.startedAt) && now - normalized.startedAt < CONTACT_MIN_SUBMIT_DELAY_MS) {
    errors.form = 'Espera un instante y vuelve a intentarlo.'
  }

  if (honey) {
    errors.form = 'No hemos podido procesar el envio.'
  }

  if (getPayloadSize(normalized) > CONTACT_MAX_PAYLOAD_CHARS) {
    errors.form = 'El mensaje es demasiado largo para procesarlo ahora mismo.'
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
      formError: errors.form,
    }
  }

  return {
    ok: true,
    data: normalized,
  }
}

export function toContactValidationInput(values: ContactFormValues) {
  return {
    name: values.name,
    email: values.email,
    service: values.service,
    message: values.message,
    company: values.company,
    phone: values.phone,
    budget: values.budget,
    timeline: values.timeline,
    website: values.website,
    contactPreference: values.contactPreference,
    honey: values.honey,
    startedAt: values.startedAt,
  }
}
