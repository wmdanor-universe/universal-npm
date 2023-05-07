import { spawn } from 'child_process';
import supportsColor, { ColorSupportLevel } from 'supports-color';

export async function executeCommand(command: string): Promise<void> {
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
