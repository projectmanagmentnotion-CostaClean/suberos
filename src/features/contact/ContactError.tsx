import { Button } from '../../components/ui/Button'
import type { ContactFormStatus } from './contact.types'

type ContactErrorProps = {
  message: string
  onRetry: () => void
  status: Extract<ContactFormStatus, 'error' | 'rate-limited'>
}

export function ContactError({ message, onRetry, status }: ContactErrorProps) {
  return (
    <div
      className={`contact-feedback contact-feedback--${status === 'rate-limited' ? 'warning' : 'error'}`}
      data-qa="contact-feedback"
      role="alert"
    >
      <p className="contact-feedback__eyebrow">{status === 'rate-limited' ? 'Envio temporalmente limitado' : 'No enviado'}</p>
      <h3>{status === 'rate-limited' ? 'Espera un momento o usa una via directa.' : 'No hemos podido completar el envio.'}</h3>
      <p>{message}</p>
      <Button onClick={onRetry} size="small" variant="secondary">
        Revisar formulario
      </Button>
    </div>
  )
}
