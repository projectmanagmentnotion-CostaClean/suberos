import { spawn } from 'node:child_process'

const npmCliPath = process.env.npm_execpath

if (!npmCliPath) {
  throw new Error('npm_execpath is required to run qa:release from npm scripts.')
}

const steps = [
  ['npm', ['run', 'qa:isolation']],
  ['npm', ['run', 'qa:assets']],
  ['npm', ['run', 'qa:overflow']],
  ['npm', ['run', 'qa:portfolio']],
  ['npm', ['run', 'qa:sequences']],
  ['npm', ['run', 'qa:contact']],
  ['npm', ['run', 'qa:privacy']],
  ['npm', ['run', 'qa:seo']],
  ['npm', ['run', 'qa:legal']],
  ['npm', ['run', 'qa:font-licenses']],
  ['npm', ['run', 'qa:aria']],
  ['npm', ['run', 'qa:a11y']],
  ['npm', ['run', 'qa:security']],
  ['npm', ['run', 'qa:performance']],
  ['npm', ['run', 'qa:production']],
  ['npm', ['run', 'qa:visual']],
  ['npm', ['run', 'lint']],
  ['npm', ['run', 'build']],
]

function run(command, args) {
  return new Promise((resolve, reject) => {
    const executable = command === 'npm' ? process.execPath : command
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

for (const [command, args] of steps) {
  await run(command, args)
}
