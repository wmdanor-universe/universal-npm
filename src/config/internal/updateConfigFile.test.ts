import { updateConfigFile } from './updateConfigFile';
import { writeFile, readFile } from 'fs/promises';
import { UnpmConfig } from '../types';
import { configFileLocation, defaultConfig } from './constants';
import { validateConfig } from './validateConfig';

jest.mock('fs/promises');
jest.mock('./validateConfig');

const readFileMock = jest.mocked(readFile);
const validateConfigMock = jest.mocked(validateConfig);

describe('config/internal/updateConfigFile', () => {
  const currentConfig: UnpmConfig = {
    ...defaultConfig,
  };

  const updatedConfig: Partial<UnpmConfig> = {
    defaultPm: 'yarn',
  };

  beforeEach(() => {
    readFileMock.mockResolvedValue(JSON.stringify(currentConfig));
    validateConfigMock.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update and return the new config', async () => {
    const newConfig = await updateConfigFile(updatedConfig);

    expect(readFile).toHaveBeenCalledWith(configFileLocation, 'utf-8');
    expect(validateConfig).toHaveBeenNthCalledWith(1, currentConfig);
    expect(validateConfig).toHaveBeenNthCalledWith(2, {
      ...currentConfig,
      ...updatedConfig,
    });
    expect(writeFile).toHaveBeenCalledWith(
      configFileLocation,
      JSON.stringify({ ...currentConfig, ...updatedConfig }, null, 2),
    );
    expect(newConfig).toEqual({ ...currentConfig, ...updatedConfig });
  });

  it('should throw an error if the current config is broken', async () => {
    validateConfigMock.mockResolvedValueOnce([]);

    await expect(updateConfigFile(updatedConfig)).rejects.toThrow();

    expect(readFile).toHaveBeenCalledWith(configFileLocation, 'utf-8');
    expect(validateConfig).toHaveBeenCalledTimes(1);
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('should throw an error if the updated config failed validation', async () => {
    validateConfigMock.mockResolvedValueOnce(null).mockResolvedValueOnce([]);

    await expect(updateConfigFile(updatedConfig)).rejects.toThrow();

    expect(readFile).toHaveBeenCalledWith(configFileLocation, 'utf-8');
    expect(validateConfig).toHaveBeenCalledTimes(2);
    expect(writeFile).not.toHaveBeenCalled();
  });
});
