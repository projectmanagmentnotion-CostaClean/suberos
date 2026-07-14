export type ContactServiceOptionId =
  | 'photography'
  | 'branding'
  | 'graphic-design'
  | 'print-production'
  | 'web-design-development'
  | 'not-sure'

export type ContactPreference = 'email' | 'phone' | 'either'

export type ContactFormStatus =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error'
  | 'rate-limited'

export type ConversionEvent =
  | 'contact_view'
  | 'contact_start'
  | 'contact_submit'
  | 'contact_success'
  | 'contact_error'
  | 'email_click'
  | 'phone_click'

export type ContactFieldName =
  | 'name'
  | 'email'
  | 'service'
  | 'message'
  | 'company'
  | 'phone'
  | 'budget'
  | 'timeline'
  | 'website'
  | 'contactPreference'
  | 'consentContext'
  | 'form'

export type ContactFormValues = {
  name: string
  email: string
  service: ContactServiceOptionId | ''
  message: string
  company: string
  phone: string
  budget: string
  timeline: string
  website: string
  contactPreference: ContactPreference | ''
  honey: string
  startedAt: string
}

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>

export type ContactNormalizedSubmission = {
  name: string
  email: string
  service: ContactServiceOptionId
  message: string
  company: string
  phone: string
  budget: string
  timeline: string
  website: string
  contactPreference: ContactPreference | ''
  startedAt: number
}

export type ContactValidationResult =
  | {
      ok: true
      data: ContactNormalizedSubmission
    }
  | {
      ok: false
      errors: ContactFieldErrors
      formError?: string
    }

export type ContactDeliveryMode = 'mock' | 'blocked' | 'production'

export type ContactSubmitSuccess = {
  ok: true
  deliveryMode: ContactDeliveryMode
  message: string
  requestId: string
}

export type ContactSubmitFailure = {
  ok: false
  message: string
  reason: 'validation' | 'error' | 'rate-limited' | 'network' | 'blocked'
  fieldErrors?: ContactFieldErrors
  retryAfterSeconds?: number
}

export type ContactSubmitResult = ContactSubmitSuccess | ContactSubmitFailure

export type ContactServiceOption = {
  id: ContactServiceOptionId
  title: string
  description: string
}

export type ContactPreferenceOption = {
  id: ContactPreference
  label: string
}

export type ContactEventPayload = {
  area: 'home-contact'
  detail?: string
}
