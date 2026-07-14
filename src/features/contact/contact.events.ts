import type { ContactEventPayload, ConversionEvent } from './contact.types'

export function trackConversionEvent(event: ConversionEvent, payload: ContactEventPayload) {
  void event
  void payload
  // Reserved for Phase 9/14. No provider is active in Sprint 08.
}
