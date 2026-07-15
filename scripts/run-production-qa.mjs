import { spawn } from 'node:child_process'
import http from 'node:http'

const previewPort = 4184
const npmCliPath = process.env.npm_execpath

if (!npmCliPath) {
  throw new Error('npm_execpath is required to run production QA from npm scripts.')
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const executable = command === 'npm' ? process.execPath : command
    const commandArgs = command === 'npm' ? [npmCliPath, ...args] : args
    const child = spawn(executable, commandArgs, {
      cwd: process.cwd(),
      env: process.env,
      shell: false,
      stdio: 'inherit',
      ...options,
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code ?? 1}.`))
    })
  })
}

function waitForHttpOk(url, timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const attempt = () => {
      const request = http.get(url, (response) => {
        response.resume()

        if (response.statusCode === 200) {
          resolve()
          return
        }

        if (Date.now() - startTime >= timeoutMs) {
          reject(new Error(`Preview server responded with ${response.statusCode} instead of 200.`))
          return
        }

        setTimeout(attempt, 500)
      })

      request.on('error', () => {
        if (Date.now() - startTime >= timeoutMs) {
          reject(new Error(`Preview server did not become ready at ${url}.`))
          return
        }

        setTimeout(attempt, 500)
      })
    }

    attempt()
  })
}

await run('npm', ['run', 'build'])

const previewProcess = spawn(process.execPath, [npmCliPath, 'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(previewPort), '--strictPort'], {
  cwd: process.cwd(),
  env: process.env,
  shell: false,
  stdio: 'inherit',
})

try {
  await waitForHttpOk(`http://127.0.0.1:${previewPort}`)
  await run('node', [
    'scripts/run-playwright-suite.mjs',
    '--server=none',
    `--port=${previewPort}`,
    'tests/smoke',
    'tests/navigation',
    'tests/contact/contact.spec.ts',
    'tests/legal',
    'tests/seo',
    'tests/labs',
    'tests/performance',
    '--project',
    'chromium',
    '--grep-invert',
    '@qa-mock',
  ])
} finally {
  previewProcess.kill()
}
