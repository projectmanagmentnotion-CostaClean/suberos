import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.PLAYWRIGHT_PORT ?? '4173')
const serverMode = process.env.PLAYWRIGHT_SERVER_MODE ?? 'dev'
const shouldStartContactMock = process.env.PLAYWRIGHT_CONTACT_MOCK === '1'

const appServerCommand =
  serverMode === 'preview'
    ? `npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`
    : serverMode === 'dev'
      ? `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort`
      : null

const webServers = appServerCommand
  ? [
      {
        command: appServerCommand,
        port,
        reuseExistingServer: false,
        timeout: 120_000,
      },
    ]
  : []

if (shouldStartContactMock) {
  webServers.push({
    command: 'npm run contact:mock-server',
    url: 'http://127.0.0.1:8787/health',
    reuseExistingServer: true,
    timeout: 120_000,
  })
}

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
  outputDir: 'artifacts/reports/test-results',
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'artifacts/reports/playwright-html' }]],
  retries: process.env.CI ? 1 : 0,
  testDir: './tests',
  testIgnore: ['**/helpers/**'],
  timeout: 30_000,
  workers: Number(process.env.PLAYWRIGHT_WORKERS ?? '6'),
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  webServer: webServers.length > 0 ? webServers : undefined,
})
