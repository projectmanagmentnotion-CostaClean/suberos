import { defineConfig } from '@playwright/test'

const port = Number(process.env.PLAYWRIGHT_PORT ?? '4173')
const shouldStartContactMock = process.env.PLAYWRIGHT_CONTACT_MOCK === '1'

const webServers = [
  {
    command: `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort`,
    port,
    reuseExistingServer: false,
    timeout: 120_000,
  },
]

if (shouldStartContactMock) {
  webServers.push({
    command: 'npm run contact:mock-server',
    url: 'http://127.0.0.1:8787/health',
    reuseExistingServer: false,
    timeout: 120_000,
  })
}

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'on-first-retry',
  },
  webServer: webServers,
})
