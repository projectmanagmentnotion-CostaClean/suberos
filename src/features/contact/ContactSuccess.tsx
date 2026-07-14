import { Button } from '../../components/ui/Button'

type ContactSuccessProps = {
  message: string
  onReset: () => void
  requestId: string
}

export function ContactSuccess({ message, onReset, requestId }: ContactSuccessProps) {
  return (
    <div className="contact-feedback contact-feedback--success" data-qa="contact-feedback" role="status">
      <p className="contact-feedback__eyebrow">Solicitud recibida</p>
      <h3>La conversacion ya esta encarrilada.</h3>
      <p>{message}</p>
      <p className="contact-feedback__meta">Identificador interno: {requestId}</p>
      <Button onClick={onReset} size="small" variant="secondary">
        Enviar otra solicitud
      </Button>
    </div>
  )
}
