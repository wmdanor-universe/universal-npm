import { ErrorObject } from 'ajv';
import { readFile } from 'fs/promises';
import { UnpmConfig } from '../types';
import { configFileLocation, defaultConfig } from './constants';
import { readConfigFile } from './readConfigFile';
import { validateConfig } from './validateConfig';
import { printError } from '../../utils/printError';

jest.mock('fs/promises');
jest.mock('./validateConfig');
jest.mock('../../utils/printError')

const readFileMock = jest.mocked(readFile);
const validateConfigMock = jest.mocked(validateConfig);
const printErrorMock = jest.mocked(printError);

describe('config/internal/readConfigFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return config if the config file is valid', async () => {
    const validConfig: UnpmConfig = {
      defaultPm: 'yarn',
    };
    readFileMock.mockResolvedValue(JSON.stringify(validConfig));
    validateConfigMock.mockResolvedValue(null);

    const result = await readConfigFile();

    expect(readFileMock).toHaveBeenCalledWith(configFileLocation, 'utf-8');
    expect(validateConfigMock).toHaveBeenCalledWith(validConfig);
    expect(result).toEqual({ ...defaultConfig, ...validConfig });
  });

  it('should return the default config and log an error if the config file is invalid', async () => {
    const invalidConfig = '{"invalid": "json"}';
    const validationErrors: ErrorObject[] = [];
    readFileMock.mockResolvedValue(invalidConfig);
    validateConfigMock.mockResolvedValue(validationErrors);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await readConfigFile();

    expect(readFileMock).toHaveBeenCalledWith(configFileLocation, 'utf-8');
    expect(validateConfigMock).toHaveBeenCalled();
    expect(printErrorMock).toHaveBeenCalledWith(
      `Error: config file is broken, using fallback to the default config, errors: ${JSON.stringify(validationErrors, null, 2)}`
    );
    expect(result).toEqual(defaultConfig);

    consoleErrorSpy.mockRestore();
  });
});
