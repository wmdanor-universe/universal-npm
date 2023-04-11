import run from './unpm';
import runHelpSubEntryPoint from '../subEntryPoints/help';
import runVersionSubEntryPoint from '../subEntryPoints/version';
import runCommandSubEntryPoint from '../subEntryPoints/command';
import { getNodeVersion } from '../utils/getNodeVersion';

jest.mock('../utils/getNodeVersion');

jest.mock('../subEntryPoints/help');

jest.mock('../subEntryPoints/version');

jest.mock('../subEntryPoints/command');

const getNodeVersionMock = jest.mocked(getNodeVersion).mockReturnValue('v14.7.0');
const runHelpSubEntryPointMock = jest.mocked(runHelpSubEntryPoint).mockResolvedValue();
const runVersionSubEntryPointMock = jest.mocked(runVersionSubEntryPoint).mockResolvedValue();
const runCommandSubEntryPointMock = jest.mocked(runCommandSubEntryPoint).mockResolvedValue();

describe('entryPoints/unpm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject when Node.js version is lower than v14.6', async () => {
    getNodeVersionMock.mockReturnValueOnce('v14.5.0');

    await expect(run).toThrowError(new Error(`This version of unpm requires at least Node.js v14.6\nThe current version of Node.js is ${process.version}`));

    expect(runHelpSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runVersionSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runCommandSubEntryPointMock).toHaveBeenCalledTimes(0);
  });

  it.each(
    ['--help', '--h', '-help', '-h', 'help', 'h']
  )('should call the "help" sub entry point when second argument is "help" compatible: %s', async (argv2) => {
    process.argv[2] = argv2;

    await run();

    expect(runHelpSubEntryPointMock).toHaveBeenCalledTimes(1);
    expect(runVersionSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runCommandSubEntryPointMock).toHaveBeenCalledTimes(0);
  });

  it.each(
    ['--version', '--v', '-version', '-v']
  )('should call the "help" sub entry point when second argument is "version" compatible: %s', async (argv2) => {
    process.argv[2] = argv2;

    await run();

    expect(runHelpSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runVersionSubEntryPointMock).toHaveBeenCalledTimes(1);
    expect(runCommandSubEntryPointMock).toHaveBeenCalledTimes(0);
  });

  it.each(
    ['-D']
  )('should reject when second argument is invalid: %s', async (argv2) => {
    process.argv[2] = argv2;

    await expect(run).toThrowError(new Error('Second argument must be: "--help", "--version" or command to invoke (or none if just called as "unpm" to install all packages)'));

    expect(runHelpSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runVersionSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runCommandSubEntryPointMock).toHaveBeenCalledTimes(0);
  });

  it.each(
    ['', 'run', 'install', 'version', 'config']
  )('should call the "command" sub entry point for other seconds argument values: %s', async (argv2) => {
    process.argv[2] = argv2;

    await run();

    expect(runHelpSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runVersionSubEntryPointMock).toHaveBeenCalledTimes(0);
    expect(runCommandSubEntryPointMock).toHaveBeenCalledTimes(1);
  });
});
