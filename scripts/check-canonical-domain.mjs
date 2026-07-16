const canonicalApex = 'https://suberos.com'

async function request(url) {
  const response = await fetch(url, {
    method: 'HEAD',
    redirect: 'manual',
  })

  return {
    url,
    status: response.status,
    location: response.headers.get('location'),
    server: response.headers.get('server'),
    csp: response.headers.get('content-security-policy'),
  }
}

function expectPermanentRedirect(result, expectedLocation) {
  if (![301, 308].includes(result.status)) {
    throw new Error(`${result.url} must return 301/308, received ${result.status}.`)
  }

  if (result.location !== expectedLocation) {
    throw new Error(`${result.url} must redirect to ${expectedLocation}, received ${result.location ?? 'null'}.`)
  }
}

function expectOk(result) {
  if (result.status !== 200) {
    throw new Error(`${result.url} must return 200, received ${result.status}.`)
  }
}

const checks = [
  {
    source: 'http://suberos.com/',
    target: `${canonicalApex}/`,
  },
  {
    source: 'https://www.suberos.com/',
    target: `${canonicalApex}/`,
  },
  {
    source: 'http://www.suberos.com/',
    target: 'https://www.suberos.com/',
  },
  {
    source: 'http://www.suberos.com/legal/privacidad',
    target: 'https://www.suberos.com/legal/privacidad',
  },
  {
    source: 'http://www.suberos.com/?ref=qa',
    target: 'https://www.suberos.com/?ref=qa',
  },
  {
    source: 'https://www.suberos.com/legal/privacidad',
    target: `${canonicalApex}/legal/privacidad`,
  },
]

const results = []

for (const check of checks) {
  const result = await request(check.source)
  expectPermanentRedirect(result, check.target)
  results.push(result)
}

const apexHome = await request(`${canonicalApex}/`)
const apexLegal = await request(`${canonicalApex}/legal/privacidad`)

expectOk(apexHome)
expectOk(apexLegal)

const managedHop = results.find((result) => result.url === 'http://www.suberos.com/')
const publishedHop = results.find((result) => result.url === 'https://www.suberos.com/')

if (!managedHop?.server?.toLowerCase().includes('nginx')) {
  throw new Error('Expected the managed http://www hop to be served by nginx.')
}

if (managedHop.csp !== null) {
  throw new Error('Managed http://www hop should not already include the published CSP headers.')
}

if (!publishedHop?.server?.toLowerCase().includes('nginx')) {
  throw new Error('Expected the https://www hop to be served by nginx.')
}

if (!publishedHop.csp?.includes("default-src 'self'")) {
  throw new Error('Expected the https://www hop to expose the published CSP headers.')
}

console.log('Canonical domain checks passed.')
