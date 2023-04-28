import { ErrorObject } from 'ajv';
import { UnpmConfig } from '../types';
import { createConfigFile } from './createConfigFile';
import { writeFile } from 'fs/promises';
import { configFileLocation, defaultConfig } from './constants';
import { validateConfig } from './validateConfig';

jest.mock('fs/promises');
jest.mock('./validateConfig');

const validateConfigMock = jest.mocked(validateConfig);

describe('config/internal/createConfigFile', () => {
  const mockInit: Partial<UnpmConfig> = {
    defaultPm: 'yarn',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a config file with default config if init is not provided', async () => {
    const expectedConfig = defaultConfig;
    validateConfigMock.mockResolvedValue(null);

    await createConfigFile();

    expect(writeFile).toHaveBeenCalledWith(
      configFileLocation,
      JSON.stringify(expectedConfig, null, 2),
    );
  });

  it('should create a config file with merged config if init is provided', async () => {
    const expectedConfig = { ...defaultConfig, ...mockInit };
    validateConfigMock.mockResolvedValue(null);

    await createConfigFile(mockInit);

    expect(writeFile).toHaveBeenCalledWith(
      configFileLocation,
      JSON.stringify(expectedConfig, null, 2),
    );
  });

  it('should throw an error if the config fails validation', async () => {
    const mockErrors: ErrorObject[] = [];
    validateConfigMock.mockResolvedValue(mockErrors);

    await expect(createConfigFile(mockInit)).rejects.toThrow(
      `Initial config failed the validation, errors: ${JSON.stringify(
        mockErrors,
        null,
        2,
      )}`,
    );

    expect(writeFile).not.toHaveBeenCalled();
  });
});
