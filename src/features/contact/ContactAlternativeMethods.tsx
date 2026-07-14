import { Cluster } from '../../components/layout/Cluster'
import { Stack } from '../../components/layout/Stack'
import { TextLink } from '../../components/ui/TextLink'
import { siteContact } from '../../data/siteContent'
import { trackConversionEvent } from './contact.events'

export function ContactAlternativeMethods() {
  return (
    <Stack className="contact-alternatives" gap="md">
      <div>
        <p className="contact-alternatives__label">Email</p>
        <TextLink
          href={`mailto:${siteContact.email}`}
          onClick={() => trackConversionEvent('email_click', { area: 'home-contact' })}
        >
          {siteContact.email}
        </TextLink>
      </div>

      <div>
        <p className="contact-alternatives__label">Telefono</p>
        <TextLink
          href={`tel:${siteContact.phoneHref}`}
          onClick={() => trackConversionEvent('phone_click', { area: 'home-contact' })}
        >
          {siteContact.phoneDisplay}
        </TextLink>
      </div>

      <div>
        <p className="contact-alternatives__label">Ubicacion</p>
        <p className="contact-alternatives__copy">{siteContact.location}</p>
      </div>

      <Cluster className="contact-alternatives__notes" gap="sm">
        <span>Sin cookies no esenciales.</span>
        <span>Sin trackers.</span>
        <span>Datos legales pendientes de verificacion final.</span>
      </Cluster>
    </Stack>
  )
}
