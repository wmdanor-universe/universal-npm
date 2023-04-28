import { executeCommand } from './executeCommand';
import { ChildProcess, exec, ExecException } from 'child_process';

jest.mock('child_process');

const execMock = jest.mocked(exec);

type ExecCallback = (
  error: ExecException | null,
  stdout: string,
  stderr: string,
) => void;

describe('io/executeCommand', () => {
  jest.spyOn(process, 'stdin', 'get').mockImplementation(
    () =>
      ({
        pipe: jest.fn(),
      } as unknown as NodeJS.ReadStream & { fd: 0 }),
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve when the command is executed successfully', async () => {
    execMock.mockImplementation((command, callback) => {
      (callback as ExecCallback)(null, 'output', '');

      return {} as unknown as ChildProcess;
    });

    await expect(
      executeCommand('echo "Hello, World!"'),
    ).resolves.toBeUndefined();
    expect(exec).toHaveBeenCalledWith(
      'echo "Hello, World!"',
      expect.any(Function),
    );
  });

  it('should reject with error, stdout, and stderr when the command execution fails', async () => {
    const error = new Error('Command failed');
    const stdout = 'partial output';
    const stderr = 'error message';

    execMock.mockImplementation((command, callback) => {
      (callback as ExecCallback)(error, stdout, stderr);

      return {} as unknown as ChildProcess;
    });

    await expect(executeCommand('nonexistent-command')).rejects.toEqual({
      error,
      stdout,
      stderr,
    });
    expect(exec).toHaveBeenCalledWith(
      'nonexistent-command',
      expect.any(Function),
    );
  });

  it('should pipe stdout and stderr to process stdout and stderr', () => {
    const stdoutMock = { pipe: jest.fn() };
    const stderrMock = { pipe: jest.fn() };

    execMock.mockImplementation(() => {
      return {
        stdout: stdoutMock,
        stderr: stderrMock,
      } as unknown as ChildProcess;
    });

    executeCommand('echo "Hello, World!"');

    expect(stdoutMock.pipe).toHaveBeenCalledWith(process.stdout);
    expect(stderrMock.pipe).toHaveBeenCalledWith(process.stderr);
  });
});
