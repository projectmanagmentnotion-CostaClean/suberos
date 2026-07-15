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

const formBlockedInProfile =
  companyProfile.includes('endpointEnabled: false') &&
  companyProfile.includes('El formulario online estara disponible proximamente') &&
  companyProfile.includes('El formulario online permanece desactivado en esta version publica')

const formBlockedInConstants =
  contactConstants.includes('runtimeStatus.form.endpointEnabled') &&
  contactConstants.includes('runtimeStatus.form.fallbackMessage') &&
  contactConstants.includes('runtimeStatus.form.publicMessage')

if (!formBlockedInProfile || !formBlockedInConstants) {
  throw new Error('The public contact form must remain blocked until a real endpoint exists.')
}

if (!companyProfile.includes('El formulario online estara disponible proximamente') || !contactConstants.includes('runtimeStatus.form.fallbackMessage')) {
  throw new Error('The public contact form must show an honest blocked message.')
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

if (!vendorInventory.toLowerCase().includes('ninguno') || !vendorInventory.toLowerCase().includes('proveedor')) {
  throw new Error('Vendor inventory must document that there is no active production contact provider yet.')
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
