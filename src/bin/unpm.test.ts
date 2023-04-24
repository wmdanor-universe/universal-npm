import { execute } from './unpm';
import runUnpmEntryPoint from '../entryPoints/unpm';
import { NotSupportedError } from '../errors/NotSupportedError';
import { PackageManager } from "../packageManager/packageManager";
import { printError } from '../io/printError';
import { exit } from '../process/exit';

jest.mock('../io/printError');
jest.mock('../process/exit');
jest.mock('../entryPoints/unpm', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(Promise.resolve()),
}));

const runUnpmEntryPointMock = jest.mocked(runUnpmEntryPoint);
const printErrorMock = jest.mocked(printError);
const exitMock = jest.mocked(exit);

describe('bin/unpm', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call runUnpmEntryPoint', async () => {
    await execute(process.argv);

    expect(runUnpmEntryPoint).toHaveBeenCalled();
  });

  it('should log NotSupportedError message and exit with code 1', async () => {
    const error = new NotSupportedError('licenses', PackageManager.NPM);
    runUnpmEntryPointMock.mockRejectedValueOnce(error);

    await execute(process.argv);

    expect(printErrorMock).toHaveBeenCalledWith(`${NotSupportedError.name}: "licenses" is not supported by ${PackageManager.NPM}`);
    expect(exitMock).toHaveBeenCalledWith('error');
  });

  it('should log general error message and exit with code 1', async () => {
    const errorMessage = 'General error message';
    const error = new Error(errorMessage);
    runUnpmEntryPointMock.mockRejectedValueOnce(error);

    await execute(process.argv);

    expect(printErrorMock).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    expect(exitMock).toHaveBeenCalledWith('error');
  });
});
