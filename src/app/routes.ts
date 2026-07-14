export const HOME_PATH = '/'

export const homeAnchors = {
  inicio: '/#inicio',
  estudio: '/#estudio',
  servicios: '/#servicios',
  trabajo: '/#trabajo',
  proceso: '/#proceso',
  contacto: '/#contacto',
} as const

export const legalPaths = {
  avisoLegal: '/legal/aviso-legal',
  privacidad: '/legal/privacidad',
  cookies: '/legal/cookies',
  accesibilidad: '/legal/accesibilidad',
} as const

const legacyLegalPathMap = new Map<string, string>([
  ['/legal/aviso-legal.html', legalPaths.avisoLegal],
  ['/legal/privacidad.html', legalPaths.privacidad],
  ['/legal/cookies.html', legalPaths.cookies],
])

export type AppRoute =
  | { kind: 'home' }
  | { kind: 'motion-lab' }
  | { kind: 'portfolio-lab' }
  | { kind: 'sequence-lab' }
  | { kind: 'legal'; slug: 'aviso-legal' | 'privacidad' | 'cookies' | 'accesibilidad'; canonicalPath: string }
  | { kind: 'not-found'; pathname: string }

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export function getAppRoute(locationLike: Pick<Location, 'pathname' | 'search'>): AppRoute {
  const normalizedPathname = normalizePathname(locationLike.pathname)
  const pathname = legacyLegalPathMap.get(normalizedPathname) ?? normalizedPathname
  const params = new URLSearchParams(locationLike.search)

  if (pathname === legalPaths.avisoLegal) {
    return { kind: 'legal', slug: 'aviso-legal', canonicalPath: legalPaths.avisoLegal }
  }

  if (pathname === legalPaths.privacidad) {
    return { kind: 'legal', slug: 'privacidad', canonicalPath: legalPaths.privacidad }
  }

  if (pathname === legalPaths.cookies) {
    return { kind: 'legal', slug: 'cookies', canonicalPath: legalPaths.cookies }
  }

  if (pathname === legalPaths.accesibilidad) {
    return { kind: 'legal', slug: 'accesibilidad', canonicalPath: legalPaths.accesibilidad }
  }

  if (pathname !== HOME_PATH) {
    return { kind: 'not-found', pathname }
  }

  if (params.get('portfolio-lab') === '1') {
    return { kind: 'portfolio-lab' }
  }

  if (params.get('sequence-lab') === '1') {
    return { kind: 'sequence-lab' }
  }

  if (params.get('motion-lab') === '1') {
    return { kind: 'motion-lab' }
  }

  return { kind: 'home' }
}
