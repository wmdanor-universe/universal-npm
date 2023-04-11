import { exec } from 'child_process';

export function executeCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve();
      }
    });

    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.stdin.pipe(childProcess.stdin!);
  });
}
