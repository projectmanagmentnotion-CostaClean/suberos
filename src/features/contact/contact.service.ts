import {
  CONTACT_REAL_ENDPOINT_ENABLED,
  CONTACT_ENDPOINT,
  getContactMockEndpoint,
  isContactDebugHost,
  contactBlockedMessage,
  contactGenericErrorMessage,
  contactRateLimitMessage,
} from './contact.constants'
import { validateContactSubmission } from './contact.schema'
import type {
  ContactFieldErrors,
  ContactSubmitFailure,
  ContactSubmitResult,
  ContactSubmitSuccess,
  ContactValidationResult,
} from './contact.types'

declare global {
  interface Window {
    __SUBEROS_CONTACT_TEST_MODE__?: boolean
    __SUBEROS_CONTACT_TEST_SCENARIO__?: string
  }
}

type ContactTestScenario = 'success' | 'error' | 'rate-limit' | 'timeout' | 'blocked'

type ContactApiSuccess = {
  ok: true
  deliveryMode: 'mock' | 'blocked' | 'production'
  message: string
  requestId: string
}

type ContactApiError = {
  ok: false
  message: string
  reason: ContactSubmitFailure['reason']
  fieldErrors?: ContactFieldErrors
  retryAfterSeconds?: number
}

function getDebugScenario() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!isContactDebugHost(window.location.hostname)) {
    return null
  }

  const fromGlobal = window.__SUBEROS_CONTACT_TEST_SCENARIO__

  if (typeof fromGlobal === 'string' && fromGlobal) {
    return fromGlobal as ContactTestScenario
  }

  const fromSearch = new URLSearchParams(window.location.search).get('contact-debug')
  return fromSearch ? (fromSearch as ContactTestScenario) : null
}

function isQaMockMode() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.__SUBEROS_CONTACT_TEST_MODE__ === true && Boolean(getDebugScenario())
}

function toFailure(reason: ContactSubmitFailure['reason'], message: string, fieldErrors?: ContactFieldErrors, retryAfterSeconds?: number): ContactSubmitFailure {
  return {
    ok: false,
    reason,
    message,
    fieldErrors,
    retryAfterSeconds,
  }
}

function toSuccess(response: ContactApiSuccess): ContactSubmitSuccess {
  return {
    ok: true,
    deliveryMode: response.deliveryMode,
    message: response.message,
    requestId: response.requestId,
  }
}

function getContactEndpoint() {
  if (typeof window === 'undefined') {
    return CONTACT_ENDPOINT
  }

  if (isQaMockMode()) {
    return getContactMockEndpoint(window.location.origin)
  }

  return CONTACT_ENDPOINT
}

async function parseContactApiResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    return null
  }

  try {
    return (await response.json()) as ContactApiSuccess | ContactApiError
  } catch {
    return null
  }
}

export async function submitContactRequest(validation: ContactValidationResult): Promise<ContactSubmitResult> {
  if (!validation.ok) {
    return toFailure('validation', validation.formError ?? contactGenericErrorMessage, validation.errors)
  }

  if (!isQaMockMode() && !CONTACT_REAL_ENDPOINT_ENABLED) {
    return toFailure('blocked', contactBlockedMessage)
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => {
    controller.abort()
  }, 8_000)

  try {
    const endpoint = getContactEndpoint()
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(getDebugScenario() ? { 'x-suberos-contact-scenario': getDebugScenario() as string } : {}),
      },
      body: JSON.stringify(validation.data),
      signal: controller.signal,
    })

    const payload = await parseContactApiResponse(response)

    if (response.ok && payload?.ok) {
      return toSuccess(payload)
    }

    if (response.status === 404) {
      return toFailure('blocked', contactBlockedMessage)
    }

    if (response.status === 429 && payload && !payload.ok) {
      return toFailure('rate-limited', payload.message || contactRateLimitMessage, payload.fieldErrors, payload.retryAfterSeconds)
    }

    if (response.status === 422 && payload && !payload.ok) {
      return toFailure('validation', payload.message || contactGenericErrorMessage, payload.fieldErrors)
    }

    if (response.status === 503) {
      return toFailure('blocked', payload && !payload.ok ? payload.message : contactBlockedMessage)
    }

    if (payload && !payload.ok) {
      return toFailure(payload.reason, payload.message || contactGenericErrorMessage, payload.fieldErrors, payload.retryAfterSeconds)
    }

    return toFailure('error', contactGenericErrorMessage)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return toFailure('network', 'La solicitud ha tardado demasiado. Revisa tu conexion o usa correo o telefono.')
    }

    return toFailure('network', 'No hemos podido conectar con el endpoint de contacto. Usa correo o telefono si lo prefieres.')
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export function validateClientContact(values: Record<string, unknown>) {
  return validateContactSubmission(values, { enforceTiming: false })
}
