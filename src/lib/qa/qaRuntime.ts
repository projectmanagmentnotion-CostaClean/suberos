function readSearchParams() {
  if (typeof window === 'undefined') {
    return new URLSearchParams()
  }

  return new URLSearchParams(window.location.search)
}

export function isQaStaticMode() {
  return readSearchParams().get('qa-static') === '1'
}

export function isQaLandscapeMode() {
  return readSearchParams().get('qa-landscape') === '1'
}
