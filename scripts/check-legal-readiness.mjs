import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

const requiredDocs = [
  'docs/LEGAL_APPLICABILITY_MATRIX.md',
  'docs/SEO_ARCHITECTURE.md',
  'docs/COOKIE_AND_STORAGE_AUDIT.md',
  'docs/CONTENT_SECURITY_POLICY.md',
  'docs/SPA_SEO_LIMITATIONS.md',
  'docs/LEGAL_PAGE_STATUS.md',
  'docs/SPRINT_09_REPORT.md',
]

for (const relativePath of requiredDocs) {
  read(relativePath)
}

const footer = read('src/features/footer/Footer.tsx')
const companyProfile = read('src/data/companyProfile.ts')
const legalContent = read('src/data/legalContent.ts')
const contactConstants = read('src/features/contact/contact.constants.ts')
const routesSource = read('src/app/routes.ts')
const legalOwnerInfo = read('docs/LEGAL_OWNER_INFORMATION_REQUIRED.md')
const vendorInventory = read('docs/VENDOR_AND_PROCESSOR_INVENTORY.md')
const legalMatrix = read('docs/LEGAL_APPLICABILITY_MATRIX.md')
const legalPageStatus = read('docs/LEGAL_PAGE_STATUS.md')
const assetInventory = read('docs/SUBEROS_VISUAL_ASSET_INVENTORY.md')
const contactFlow = read('docs/CONTACT_DATA_FLOW.md')

const footerMarkers = [
  '/legal/aviso-legal',
  '/legal/privacidad',
  '/legal/cookies',
  '/legal/accesibilidad',
]

for (const marker of footerMarkers) {
  if (!routesSource.includes(marker)) {
    throw new Error(`Missing legal route declaration: ${marker}`)
  }

  const routeKey =
    marker === '/legal/aviso-legal'
      ? 'legalPaths.avisoLegal'
      : marker === '/legal/privacidad'
        ? 'legalPaths.privacidad'
        : marker === '/legal/cookies'
          ? 'legalPaths.cookies'
          : 'legalPaths.accesibilidad'

  if (!footer.includes(routeKey)) {
    throw new Error(`Footer missing legal link binding: ${routeKey}`)
  }
}

const formEnabledInProfile =
  companyProfile.includes('endpointEnabled: true') &&
  companyProfile.includes('El formulario online de SUBEROS ya esta activo') &&
  companyProfile.includes('Si el envio online falla, puedes contactar ahora por email o telefono.')

const formEnabledInConstants =
  contactConstants.includes('runtimeStatus.form.endpointEnabled') &&
  contactConstants.includes('runtimeStatus.form.fallbackMessage') &&
  contactConstants.includes('runtimeStatus.form.publicMessage')

if (!formEnabledInProfile || !formEnabledInConstants) {
  throw new Error('The public contact form must document the active production endpoint state.')
}

if (!contactFlow.includes('SiteGround') || !contactFlow.includes('info@suberos.com') || !contactFlow.includes('Reply-To')) {
  throw new Error('Contact data flow must document the active production delivery path and reply channel.')
}

const forbiddenMarkers = ['lorem ipsum', '123 fake', 'nif pendiente', 'domicilio por confirmar']
for (const source of [legalContent, legalPageStatus]) {
  const lowered = source.toLowerCase()
  for (const marker of forbiddenMarkers) {
    if (lowered.includes(marker)) {
      throw new Error(`Forbidden placeholder or fake legal marker found: ${marker}`)
    }
  }
}

const requiredOwnerFields = ['nombre o razon social del titular', 'nif/cif', 'domicilio legal completo']
for (const field of requiredOwnerFields) {
  if (!legalOwnerInfo.toLowerCase().includes(field)) {
    throw new Error(`Missing owner data requirement in LEGAL_OWNER_INFORMATION_REQUIRED.md: ${field}`)
  }
}

const vendorInventoryLowered = vendorInventory.toLowerCase()
if (!vendorInventoryLowered.includes('siteground') || !vendorInventoryLowered.includes('info@suberos.com') || !vendorInventoryLowered.includes('activo')) {
  throw new Error('Vendor inventory must document the active production contact provider and mailbox.')
}

if (!legalMatrix.includes('Bloquea lanzamiento') || !legalMatrix.toLowerCase().includes('syncopate')) {
  throw new Error('Legal applicability matrix must include launch blockers and the approved Syncopate licence status.')
}

const assetInventoryLowered = assetInventory.toLowerCase()
if (!assetInventoryLowered.includes('syncopate') || !assetInventoryLowered.includes('aprobada')) {
  throw new Error('The public font inventory must document Syncopate as approved.')
}

if (!assetInventoryLowered.includes('stretchpro') || !assetInventoryLowered.includes('retirada')) {
  throw new Error('The legacy inventory must document StretchPro as removed from the public release.')
}

console.log('Legal readiness checks passed with publication blockers documented.')
