import { executeCommand } from './executeCommand';
import { ChildProcess, spawn } from 'child_process';
import supportsColor from 'supports-color';

jest.mock('child_process');

jest.mock('../.././external/supports-color', () => {
  return {
    __esModule: true,
    default: {
      stdout: {
        level: 2,
      },
    },
  };
});

const spawnMock = jest.mocked(spawn);

describe('io/executeCommand', () => {
  it('should spawn a child process with the given command', async () => {
    console.log('BRUH', supportsColor.stdout);

    const command = 'npm i express -D';
    const childProcessOnMock = jest
      .fn()
      .mockImplementation((event: string, listener: () => void) => {
        if (event === 'close') listener();
      });
    const childProcessMock = {
      on: childProcessOnMock,
    } as unknown as ChildProcess;
    spawnMock.mockReturnValue(childProcessMock);

    await executeCommand(command);

    expect(childProcessOnMock).toHaveBeenCalledWith(
      'close',
      expect.any(Function),
    );

    expect(spawn).toHaveBeenCalledWith(command, [], {
      env: expect.objectContaining({
        FORCE_COLOR: '2',
      }),
      shell: true,
      stdio: 'inherit',
    });
  });
});
