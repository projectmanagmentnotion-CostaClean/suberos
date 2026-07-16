import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'src/features/contact/ContactSection.tsx',
  'src/features/contact/ContactForm.tsx',
  'src/features/contact/ContactFormFields.tsx',
  'src/features/contact/ContactSuccess.tsx',
  'src/features/contact/ContactError.tsx',
  'src/features/contact/ContactAlternativeMethods.tsx',
  'src/features/contact/contact.constants.ts',
  'src/features/contact/contact.schema.ts',
  'src/features/contact/contact.service.ts',
  'scripts/contact-mock-server.ts',
  'public/api/contact.php',
]

for (const relativePath of requiredFiles) {
  if (!existsSync(resolve(root, relativePath))) {
    throw new Error(`Missing contact system file: ${relativePath}`)
  }
}

const serviceSource = readFileSync(resolve(root, 'src/features/contact/contact.service.ts'), 'utf8')
const schemaSource = readFileSync(resolve(root, 'src/features/contact/contact.schema.ts'), 'utf8')
const headerSource = readFileSync(resolve(root, 'src/features/navigation/Header.tsx'), 'utf8')
const packageSource = readFileSync(resolve(root, 'package.json'), 'utf8')

if (!serviceSource.includes('CONTACT_ENDPOINT')) {
  throw new Error('Contact service must target the same-origin /api/contact endpoint.')
}

if (!serviceSource.includes('validateClientContact')) {
  throw new Error('Client-side validation entry point not found in contact.service.ts.')
}

if (!schemaSource.includes('CONTACT_MIN_SUBMIT_DELAY_MS')) {
  throw new Error('Minimum submit delay validation is missing.')
}

if (!schemaSource.includes('unknownKeys')) {
  throw new Error('Unknown-field rejection is missing from the contact schema.')
}

if (serviceSource.includes('VITE_') || packageSource.includes('VITE_CONTACT')) {
  throw new Error('Contact secrets must not be exposed through Vite environment variables.')
}

if (headerSource.includes('Button href={`mailto:${siteContact.email}`} variant="secondary" size="small"')) {
  throw new Error('Header CTA still points directly to mailto instead of the contact section.')
}

console.log('Contact system static checks passed.')
