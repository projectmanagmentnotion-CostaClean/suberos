import { useRef, useState } from 'react'

import { Button } from '../../components/ui/Button'
import { focusFirstFieldError } from '../../lib/forms/focusFirstFieldError'
import { siteContact } from '../../data/siteContent'
import { contactFieldOrder, contactInitialValues } from './contact.constants'
import { trackConversionEvent } from './contact.events'
import { ContactError } from './ContactError'
import { ContactFormFields } from './ContactFormFields'
import { ContactSuccess } from './ContactSuccess'
import { submitContactRequest, validateClientContact } from './contact.service'
import type { ContactFieldName, ContactFieldErrors, ContactFormStatus, ContactFormValues } from './contact.types'

type ContactFormProps = {
  onStatusChange?: (status: ContactFormStatus) => void
}

export function ContactForm({ onStatusChange }: ContactFormProps) {
  const [values, setValues] = useState(contactInitialValues)
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [status, setStatus] = useState<ContactFormStatus>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [requestId, setRequestId] = useState('')
  const hasStartedRef = useRef(false)
  const submitLockRef = useRef(false)
  const fieldRefs = {
    name: useRef<HTMLInputElement | null>(null),
    email: useRef<HTMLInputElement | null>(null),
    service: useRef<HTMLSelectElement | null>(null),
    message: useRef<HTMLTextAreaElement | null>(null),
    company: useRef<HTMLInputElement | null>(null),
    phone: useRef<HTMLInputElement | null>(null),
    budget: useRef<HTMLInputElement | null>(null),
    timeline: useRef<HTMLInputElement | null>(null),
    website: useRef<HTMLInputElement | null>(null),
    contactPreference: useRef<HTMLSelectElement | null>(null),
  }

  function syncStatus(nextStatus: ContactFormStatus) {
    setStatus(nextStatus)
    onStatusChange?.(nextStatus)
  }

  function handleChange(field: keyof ContactFormValues, value: string) {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      trackConversionEvent('contact_start', { area: 'home-contact' })
    }

    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))

    setErrors((currentErrors) => {
      if (!currentErrors[field as ContactFieldName] && !currentErrors.form) {
        return currentErrors
      }

      return {
        ...currentErrors,
        [field]: undefined,
        form: undefined,
      }
    })

    if (status !== 'idle') {
      syncStatus('idle')
      setFeedbackMessage('')
    }
  }

  function resetForm() {
    setValues(contactInitialValues())
    setErrors({})
    setFeedbackMessage('')
    setRequestId('')
    syncStatus('idle')
    hasStartedRef.current = false
    submitLockRef.current = false
    fieldRefs.name.current?.focus()
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitLockRef.current || status === 'submitting') {
      return
    }

    submitLockRef.current = true

    syncStatus('validating')

    const validation = validateClientContact(values)

    if (!validation.ok) {
      setErrors(validation.errors)
      setFeedbackMessage(validation.formError ?? 'Revisa los campos marcados para poder enviar la solicitud.')
      syncStatus('error')
      submitLockRef.current = false
      focusFirstFieldError(contactFieldOrder, fieldRefs, validation.errors)
      trackConversionEvent('contact_error', { area: 'home-contact', detail: 'client-validation' })
      return
    }

    setErrors({})
    syncStatus('submitting')
    setFeedbackMessage('')
    trackConversionEvent('contact_submit', { area: 'home-contact' })

    const result = await submitContactRequest(validation)

    if (result.ok) {
      setFeedbackMessage(result.message)
      setRequestId(result.requestId)
      syncStatus('success')
      setValues(contactInitialValues())
      submitLockRef.current = false
      trackConversionEvent('contact_success', { area: 'home-contact', detail: result.deliveryMode })
      return
    }

    setErrors(result.fieldErrors ?? {})
    setFeedbackMessage(result.message)
    setRequestId('')
    syncStatus(result.reason === 'rate-limited' ? 'rate-limited' : 'error')

    if (result.fieldErrors) {
      focusFirstFieldError(contactFieldOrder, fieldRefs, result.fieldErrors)
    }

    submitLockRef.current = false
    trackConversionEvent('contact_error', { area: 'home-contact', detail: result.reason })
  }

  return (
    <div className="contact-form-panel">
      {status === 'success' ? (
        <ContactSuccess message={feedbackMessage} onReset={resetForm} requestId={requestId} />
      ) : (
        <form className="contact-form" data-qa="contact-form" noValidate={true} onSubmit={handleSubmit}>
          <div className="contact-form__status" aria-live="polite">
            <p className="contact-form__eyebrow">Solicitud online</p>
            <p className="contact-form__intro">
              Cuatro campos obligatorios, el resto solo si aportan contexto real. Si prefieres una via directa, escribe a{' '}
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>.
            </p>
          </div>

          {status === 'error' || status === 'rate-limited' ? (
            <ContactError
              message={feedbackMessage}
              onRetry={() => {
                syncStatus('idle')
                setFeedbackMessage('')
              }}
              status={status}
            />
          ) : null}

          {errors.form && status !== 'error' ? (
            <div className="contact-feedback contact-feedback--error" data-qa="contact-feedback" role="alert">
              <p>{errors.form}</p>
            </div>
          ) : null}

          <ContactFormFields errors={errors} fieldRefs={fieldRefs} onChange={handleChange} values={values} />

          <div className="contact-form__actions">
            <Button data-qa="contact-submit" loading={status === 'submitting'} type="submit" variant="primary">
              {status === 'submitting' ? 'Enviando solicitud' : 'Enviar solicitud'}
            </Button>
            <p className="contact-form__meta">Sin cookies no esenciales. Sin analitica. Sin datos personales en la URL.</p>
          </div>
        </form>
      )}
    </div>
  )
}
