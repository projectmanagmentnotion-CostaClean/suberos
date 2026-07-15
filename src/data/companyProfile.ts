export const companyProfile = {
  brandName: 'SUBEROS',
  legalName: 'Anderson David Subero Garcia',
  legalIdentityVerified: true,
  legalIdentifier: '60952573C',
  contact: {
    email: 'info@suberos.com',
    phoneDisplay: '698 911 517',
    phoneHref: '+34698911517',
    location: 'Calella, 08370, Barcelona, Espana',
  },
  runtimeStatus: {
    form: {
      endpointEnabled: false,
      publicMessage:
        'El formulario online permanece desactivado en esta version publica mientras se define el endpoint real y la capa legal definitiva.',
      fallbackMessage: 'El formulario online estara disponible proximamente. Puedes contactar ahora por email o telefono.',
    },
    legal: {
      ownerDataVerified: true,
      publicLabel: 'Informacion legal verificada',
      missingDataSummary:
        'La identidad publica del titular ya ha sido verificada. La capa pendiente se limita al endpoint real del formulario, su proveedor de entrega y la validacion final del tratamiento asociado.',
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
