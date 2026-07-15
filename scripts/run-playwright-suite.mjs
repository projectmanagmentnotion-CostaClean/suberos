import { spawn } from 'node:child_process'
import path from 'node:path'

const argv = process.argv.slice(2)
const passthroughArgs = []
const env = { ...process.env }

for (const arg of argv) {
  if (arg.startsWith('--port=')) {
    env.PLAYWRIGHT_PORT = arg.slice('--port='.length)
    continue
  }

  if (arg.startsWith('--server=')) {
    env.PLAYWRIGHT_SERVER_MODE = arg.slice('--server='.length)
    continue
  }

  if (arg.startsWith('--contact-mock=')) {
    env.PLAYWRIGHT_CONTACT_MOCK = arg.slice('--contact-mock='.length)
    continue
  }

  passthroughArgs.push(arg)
}

const command = process.execPath
const cliPath = path.resolve(process.cwd(), 'node_modules/playwright/cli.js')

const child = spawn(command, [cliPath, 'test', ...passthroughArgs], {
  cwd: process.cwd(),
  env,
  shell: false,
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})
