import { execute } from './unpm';
import runUnpmEntryPoint from '../entryPoints/unpm';
import { NotSupportedError } from '../errors/NotSupportedError';
import { PackageManager } from '../enums';
import { printError } from '../utils/printError';

jest.mock('../utils/printError');
jest.mock('../entryPoints/unpm', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(Promise.resolve()),
}));

const runUnpmEntryPointMock = jest.mocked(runUnpmEntryPoint);
const printErrorMock = jest.mocked(printError);

describe('bin/unpm', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call runUnpmEntryPoint', async () => {
    await execute();

    expect(runUnpmEntryPoint).toHaveBeenCalled();
  });

  it('should log NotSupportedError message and exit with code 1', async () => {
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => { /* */}) as () => never);
    const error = new NotSupportedError('licenses', PackageManager.NPM);
    runUnpmEntryPointMock.mockRejectedValueOnce(error);

    await execute();

    expect(printErrorMock).toHaveBeenCalledWith(`${NotSupportedError.name}: "licenses" is not supported by ${PackageManager.NPM}`);
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it('should log general error message and exit with code 1', async () => {
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => { /* */}) as () => never);
    const errorMessage = 'General error message';
    const error = new Error(errorMessage);
    runUnpmEntryPointMock.mockRejectedValueOnce(error);

    await execute();

    expect(printErrorMock).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
