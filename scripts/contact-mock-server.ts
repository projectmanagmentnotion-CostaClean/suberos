import { createServer } from 'node:http'

import {
  CONTACT_RATE_LIMIT_MAX_REQUESTS,
  CONTACT_RATE_LIMIT_WINDOW_MS,
  contactBlockedMessage,
  contactGenericErrorMessage,
  contactRateLimitMessage,
  contactSuccessMessage,
} from '../src/features/contact/contact.constants'
import { validateContactSubmission } from '../src/features/contact/contact.schema'
import type { ContactFieldErrors } from '../src/features/contact/contact.types'

type ContactScenario = 'success' | 'error' | 'rate-limit' | 'timeout' | 'blocked'

type RateLimitEntry = {
  count: number
  startedAt: number
}

const port = 8787
const rateLimitStore = new Map<string, RateLimitEntry>()

function setCorsHeaders(origin: string | undefined, response: import('node:http').ServerResponse) {
  if (origin && /^https?:\/\/(127\.0\.0\.1|localhost):\d+$/u.test(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }

  response.setHeader('Access-Control-Allow-Headers', 'content-type, x-suberos-contact-scenario')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
}

function createJsonResponse(
  response: import('node:http').ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
  origin?: string,
) {
  setCorsHeaders(origin, response)
  response.statusCode = statusCode
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(body))
}

function readJsonBody(request: import('node:http').IncomingMessage) {
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    let rawBody = ''

    request.on('data', (chunk) => {
      rawBody += String(chunk)

      if (rawBody.length > 12_000) {
        reject(new Error('Payload too large'))
      }
    })

    request.on('end', () => {
      try {
        resolve(JSON.parse(rawBody || '{}') as Record<string, unknown>)
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })

    request.on('error', () => {
      reject(new Error('Read error'))
    })
  })
}

function getRateLimitState(fingerprint: string, now: number) {
  const currentEntry = rateLimitStore.get(fingerprint)

  if (!currentEntry || now - currentEntry.startedAt > CONTACT_RATE_LIMIT_WINDOW_MS) {
    const freshEntry = {
      count: 0,
      startedAt: now,
    }

    rateLimitStore.set(fingerprint, freshEntry)
    return freshEntry
  }

  return currentEntry
}

function getScenario(request: import('node:http').IncomingMessage): ContactScenario {
  const headerValue = request.headers['x-suberos-contact-scenario']
  const normalized = Array.isArray(headerValue) ? headerValue[0] : headerValue

  if (
    normalized === 'error' ||
    normalized === 'rate-limit' ||
    normalized === 'timeout' ||
    normalized === 'blocked'
  ) {
    return normalized
  }

  return 'success'
}

function isExplicitDebugScenario(scenario: ContactScenario) {
  return scenario !== 'success'
}

function buildValidationFailure(errors: ContactFieldErrors, message?: string) {
  return {
    ok: false,
    reason: 'validation',
    message: message ?? 'Revisa los campos y vuelve a intentarlo.',
    fieldErrors: errors,
  }
}

const server = createServer(async (request, response) => {
  const origin = Array.isArray(request.headers.origin) ? request.headers.origin[0] : request.headers.origin

  if (request.url === '/health') {
    createJsonResponse(response, 200, { ok: true }, origin)
    return
  }

  if (request.method === 'OPTIONS' && request.url === '/api/contact') {
    setCorsHeaders(origin, response)
    response.statusCode = 204
    response.end()
    return
  }

  if (request.method !== 'POST' || request.url !== '/api/contact') {
    response.statusCode = 404
    response.end()
    return
  }

  const contentType = request.headers['content-type'] ?? ''
  const normalizedContentType = Array.isArray(contentType) ? contentType[0] : contentType

  if (!normalizedContentType.includes('application/json')) {
    createJsonResponse(response, 415, {
      ok: false,
      reason: 'error',
      message: contactGenericErrorMessage,
    }, origin)
    return
  }

  let body: Record<string, unknown>

  try {
    body = await readJsonBody(request)
  } catch (error) {
    const message = error instanceof Error && error.message === 'Payload too large'
      ? 'El payload supera el limite permitido.'
      : contactGenericErrorMessage

    createJsonResponse(
      response,
      error instanceof Error && error.message === 'Payload too large' ? 413 : 400,
      {
        ok: false,
        reason: 'error',
        message,
      },
      origin,
    )
    return
  }

  const validation = validateContactSubmission(body, {
    enforceTiming: true,
    now: Date.now(),
  })

  if (!validation.ok) {
    createJsonResponse(response, 422, buildValidationFailure(validation.errors, validation.formError), origin)
    return
  }

  const scenario = getScenario(request)
  const fingerprint = `${request.socket.remoteAddress ?? 'local'}:${request.headers['user-agent'] ?? 'unknown'}`
  const rateLimit = isExplicitDebugScenario(scenario) ? null : getRateLimitState(fingerprint, Date.now())

  if (scenario === 'rate-limit' || (rateLimit && rateLimit.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS)) {
    createJsonResponse(response, 429, {
      ok: false,
      reason: 'rate-limited',
      message: contactRateLimitMessage,
      retryAfterSeconds: 60,
    }, origin)
    return
  }

  if (rateLimit) {
    rateLimit.count += 1
  }

  if (scenario === 'blocked') {
    createJsonResponse(response, 503, {
      ok: false,
      reason: 'blocked',
      message: contactBlockedMessage,
    }, origin)
    return
  }

  if (scenario === 'error') {
    createJsonResponse(response, 500, {
      ok: false,
      reason: 'error',
      message: contactGenericErrorMessage,
    }, origin)
    return
  }

  if (scenario === 'timeout') {
    await new Promise((resolve) => {
      setTimeout(resolve, 8_500)
    })
  }

  const requestId = `sub-${Date.now().toString(36)}`
  console.info(
    `[contact-mock] requestId=${requestId} service=${validation.data.service} emailDomain=${validation.data.email.split('@')[1] ?? 'unknown'}`,
  )

  createJsonResponse(response, 200, {
    ok: true,
    deliveryMode: 'mock',
    message: contactSuccessMessage,
    requestId,
  }, origin)
})

server.on('error', (error) => {
  const errorCode =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: string }).code)
      : ''

  if (errorCode === 'EADDRINUSE') {
    console.info('[contact-mock] port 8787 already in use, reusing existing mock server')
    process.exit(0)
  }

  throw error
})

server.listen(port, '127.0.0.1', () => {
  console.info(`[contact-mock] listening on http://127.0.0.1:${port}`)
})
