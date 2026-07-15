import { spawn } from 'node:child_process'

const npmCliPath = process.env.npm_execpath

if (!npmCliPath) {
  throw new Error('npm_execpath is required to run cross-browser QA from npm scripts.')
}

const browsers = ['chromium', 'firefox', 'webkit']
const suiteArgs = [
  'scripts/run-playwright-suite.mjs',
  '--port=4181',
  'tests/smoke',
  'tests/navigation',
  'tests/contact/contact.spec.ts',
  'tests/legal',
  'tests/seo',
  'tests/labs',
  '--grep-invert',
  '@qa-mock',
]

function run(command, args) {
  return new Promise((resolve, reject) => {
    const executable = command === 'npm' || command === 'node' ? process.execPath : command
    const commandArgs = command === 'npm' ? [npmCliPath, ...args] : args
    const child = spawn(executable, commandArgs, {
      cwd: process.cwd(),
      env: process.env,
      shell: false,
      stdio: 'inherit',
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

for (const browser of browsers) {
  await run('node', [...suiteArgs, '--project', browser])
}
