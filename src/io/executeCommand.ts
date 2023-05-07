import { exec, spawn } from 'child_process';
import supportsColor, { ColorSupportLevel } from 'supports-color';

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

export async function executeCommand1(command: string): Promise<void> {
  const supportedColorLevel: ColorSupportLevel = supportsColor.stdout
    ? supportsColor.stdout.level
    : 0;

  return new Promise(resolve => {
    const childProcess = spawn(command, [], {
      env: {
        ...process.env,
        FORCE_COLOR: supportedColorLevel.toString(),
      },
      shell: true,
      stdio: 'inherit',
    });

    childProcess.on('close', () => {
      resolve();
    });
  });
}
