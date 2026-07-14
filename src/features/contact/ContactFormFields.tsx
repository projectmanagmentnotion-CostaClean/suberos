import type { RefObject } from 'react'

import { contactPreferenceOptions, contactServiceOptions, contactConsentContext } from './contact.constants'
import type { ContactFieldErrors, ContactFieldName, ContactFormValues } from './contact.types'

type ContactFormFieldsProps = {
  errors: ContactFieldErrors
  fieldRefs: {
    name: RefObject<HTMLInputElement | null>
    email: RefObject<HTMLInputElement | null>
    service: RefObject<HTMLSelectElement | null>
    message: RefObject<HTMLTextAreaElement | null>
    company: RefObject<HTMLInputElement | null>
    phone: RefObject<HTMLInputElement | null>
    budget: RefObject<HTMLInputElement | null>
    timeline: RefObject<HTMLInputElement | null>
    website: RefObject<HTMLInputElement | null>
    contactPreference: RefObject<HTMLSelectElement | null>
  }
  onChange: (field: keyof ContactFormValues, value: string) => void
  values: ContactFormValues
}

function getFieldDescribedBy(field: ContactFieldName, errors: ContactFieldErrors, hintId?: string) {
  const ids = []

  if (hintId) {
    ids.push(hintId)
  }

  if (errors[field]) {
    ids.push(`contact-error-${field}`)
  }

  return ids.length > 0 ? ids.join(' ') : undefined
}

export function ContactFormFields({ errors, fieldRefs, onChange, values }: ContactFormFieldsProps) {
  return (
    <>
      <div className="contact-form__field">
        <label htmlFor="contact-name">Nombre</label>
        <input
          ref={fieldRefs.name}
          aria-describedby={getFieldDescribedBy('name', errors)}
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
          data-qa="contact-name"
          id="contact-name"
          name="name"
          onChange={(event) => onChange('name', event.target.value)}
          required={true}
          value={values.name}
        />
        {errors.name ? <p className="contact-form__error" id="contact-error-name">{errors.name}</p> : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Correo electronico</label>
        <input
          ref={fieldRefs.email}
          aria-describedby={getFieldDescribedBy('email', errors)}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          data-qa="contact-email"
          id="contact-email"
          inputMode="email"
          name="email"
          onChange={(event) => onChange('email', event.target.value)}
          required={true}
          type="email"
          value={values.email}
        />
        {errors.email ? <p className="contact-form__error" id="contact-error-email">{errors.email}</p> : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-service">Tipo de proyecto o servicio</label>
        <select
          ref={fieldRefs.service}
          aria-describedby={getFieldDescribedBy('service', errors)}
          aria-invalid={Boolean(errors.service)}
          data-qa="contact-service"
          id="contact-service"
          name="service"
          onChange={(event) => onChange('service', event.target.value)}
          required={true}
          value={values.service}
        >
          <option value="">Selecciona una opcion</option>
          {contactServiceOptions.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
        <p className="contact-form__hint" id="contact-hint-service">
          Puedes elegir “No estoy seguro” si todavia necesitas orientacion.
        </p>
        {errors.service ? <p className="contact-form__error" id="contact-error-service">{errors.service}</p> : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Proyecto o necesidad</label>
        <textarea
          ref={fieldRefs.message}
          aria-describedby={getFieldDescribedBy('message', errors, 'contact-hint-message')}
          aria-invalid={Boolean(errors.message)}
          data-qa="contact-message"
          id="contact-message"
          name="message"
          onChange={(event) => onChange('message', event.target.value)}
          required={true}
          rows={6}
          value={values.message}
        />
        <p className="contact-form__hint" id="contact-hint-message">
          Cuanto mas claro sea el contexto, mejor podremos responderte.
        </p>
        {errors.message ? <p className="contact-form__error" id="contact-error-message">{errors.message}</p> : null}
      </div>

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="contact-company">Empresa o marca <span>(opcional)</span></label>
          <input
            ref={fieldRefs.company}
            aria-describedby={getFieldDescribedBy('company', errors)}
            aria-invalid={Boolean(errors.company)}
            autoComplete="organization"
            id="contact-company"
            name="company"
            onChange={(event) => onChange('company', event.target.value)}
            value={values.company}
          />
          {errors.company ? <p className="contact-form__error" id="contact-error-company">{errors.company}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-phone">Telefono <span>(opcional)</span></label>
          <input
            ref={fieldRefs.phone}
            aria-describedby={getFieldDescribedBy('phone', errors)}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            id="contact-phone"
            inputMode="tel"
            name="phone"
            onChange={(event) => onChange('phone', event.target.value)}
            value={values.phone}
          />
          {errors.phone ? <p className="contact-form__error" id="contact-error-phone">{errors.phone}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-budget">Presupuesto aproximado <span>(opcional)</span></label>
          <input
            ref={fieldRefs.budget}
            aria-describedby={getFieldDescribedBy('budget', errors, 'contact-hint-budget')}
            aria-invalid={Boolean(errors.budget)}
            id="contact-budget"
            name="budget"
            onChange={(event) => onChange('budget', event.target.value)}
            value={values.budget}
          />
          <p className="contact-form__hint" id="contact-hint-budget">
            Campo libre para no fijar rangos no aprobados todavia.
          </p>
          {errors.budget ? <p className="contact-form__error" id="contact-error-budget">{errors.budget}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-timeline">Plazo o fecha <span>(opcional)</span></label>
          <input
            ref={fieldRefs.timeline}
            aria-describedby={getFieldDescribedBy('timeline', errors)}
            aria-invalid={Boolean(errors.timeline)}
            id="contact-timeline"
            name="timeline"
            onChange={(event) => onChange('timeline', event.target.value)}
            value={values.timeline}
          />
          {errors.timeline ? <p className="contact-form__error" id="contact-error-timeline">{errors.timeline}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-website">URL actual <span>(opcional)</span></label>
          <input
            ref={fieldRefs.website}
            aria-describedby={getFieldDescribedBy('website', errors)}
            aria-invalid={Boolean(errors.website)}
            autoComplete="url"
            id="contact-website"
            inputMode="url"
            name="website"
            onChange={(event) => onChange('website', event.target.value)}
            value={values.website}
          />
          {errors.website ? <p className="contact-form__error" id="contact-error-website">{errors.website}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-preference">Preferencia de contacto <span>(opcional)</span></label>
          <select
            ref={fieldRefs.contactPreference}
            aria-describedby={getFieldDescribedBy('contactPreference', errors)}
            aria-invalid={Boolean(errors.contactPreference)}
            id="contact-preference"
            name="contactPreference"
            onChange={(event) => onChange('contactPreference', event.target.value)}
            value={values.contactPreference}
          >
            <option value="">Sin preferencia</option>
            {contactPreferenceOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.contactPreference ? (
            <p className="contact-form__error" id="contact-error-contactPreference">
              {errors.contactPreference}
            </p>
          ) : null}
        </div>
      </div>

      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contact-honey">No completar</label>
        <input
          autoComplete="off"
          id="contact-honey"
          name="honey"
          onChange={(event) => onChange('honey', event.target.value)}
          tabIndex={-1}
          type="text"
          value={values.honey}
        />
      </div>

      <input name="startedAt" type="hidden" value={values.startedAt} />
      <p className="contact-form__privacy" id="contact-consent-context">
        {contactConsentContext} <a href="/legal/privacidad.html">Politica de privacidad provisional</a>.
      </p>
    </>
  )
}
