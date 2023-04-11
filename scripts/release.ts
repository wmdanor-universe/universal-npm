import { exec } from 'child_process';
import { createInterface } from 'readline';

function exit(code = 0) {
  process.exit(code);
}

function execPipe(command: string): Promise<void> {
  console.log('Running:', command);
  
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      }

      resolve();
    });

    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
  })
}

function prompt(query: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  return new Promise<string>(resolve => {
    rl.question(query, resolve);
  }).finally(() => {
    rl.close();
  });
}

export async function execute() {
  console.log('Release script started');

  const releaseType = process.argv[2] ?? await prompt('Input release type [major | minor | patch]: ');

  if (!['major', 'minor', 'patch'].includes(releaseType)) {
    console.error('Release type can be only be one of [major | minor | patch], you entered:', releaseType);

    exit(1);
  }

  console.log('Running checks:');

  await execPipe('npm run typecheck');
  await execPipe('npm run lint');
  await execPipe('npm run build');

  const confirmation = await prompt('Checks passed, do you want to proceed with release (y/n)? ');

  if (!confirmation.toLocaleLowerCase().startsWith('y')) {
    console.log('Aborting release');
    
    exit(0);
  }

  await execPipe(`npm version ${releaseType}`);

  await execPipe('npm publish');
}

if (require.main === module) {
  execute().catch(console.error);
}
