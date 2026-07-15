export const companyProfile = {
  brandName: 'SUBEROS',
  legalName: null,
  legalIdentityVerified: false,
  contact: {
    email: 'info@suberos.com',
    phoneDisplay: '691 93 72 72',
    phoneHref: '+34691937272',
    location: 'Calella, 08370 - Barcelona',
  },
  runtimeStatus: {
    form: {
      endpointEnabled: false,
      publicMessage:
        'El formulario online permanece desactivado en esta version publica mientras se define el endpoint real y la capa legal definitiva.',
      fallbackMessage: 'El formulario online estara disponible proximamente. Puedes contactar ahora por email o telefono.',
    },
    legal: {
      ownerDataVerified: false,
      publicLabel: 'Informacion publica provisional',
      missingDataSummary:
        'La identidad legal completa del titular, los datos registrales y la politica definitiva de tratamiento siguen pendientes de validacion documental.',
    },
    portfolio: {
      hasPublishedProjects: false,
      publicSummary:
        'El portfolio publico solo se activara cuando existan casos, permisos y materiales aprobados expresamente para publicacion.',
    },
    font: {
      family: 'Syncopate',
      licenceVerified: true,
      publicSummary:
        'La tipografia display publica usa Syncopate self-hosted desde una fuente oficial verificable y queda aprobada para el runtime actual.',
    },
  },
  officialSocialProfiles: [] as const,
} as const
