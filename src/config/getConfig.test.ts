import { getConfig } from './getConfig';
import { defaultConfig } from './internal/constants';
import { createConfigFileIfNotExists } from './internal/createConfigFileIfNotExists';
import { readConfigFile } from './internal/readConfigFile';
import { UnpmConfig } from './types';

jest.mock('./internal/createConfigFileIfNotExists');
jest.mock('./internal/readConfigFile');

const createConfigFileIfNotExistsMock = jest.mocked(createConfigFileIfNotExists);
const readConfigFileMock = jest.mocked(readConfigFile);

describe('config/getConfig', () => {
  const mockConfig: UnpmConfig = {
    ...defaultConfig
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call createConfigFileIfNotExists and return its result if it is not nullish', async () => {
    createConfigFileIfNotExistsMock.mockResolvedValue(mockConfig);

    const result = await getConfig();

    expect(result).toBe(mockConfig);
    expect(createConfigFileIfNotExistsMock).toHaveBeenCalled();
    expect(readConfigFileMock).not.toHaveBeenCalled();
  });

  it('should call readConfigFile and return its result if createConfigFileIfNotExists returns nullish', async () => {
    createConfigFileIfNotExistsMock.mockResolvedValue(null);
    readConfigFileMock.mockResolvedValue(mockConfig);

    const result = await getConfig();

    expect(result).toBe(mockConfig);
    expect(createConfigFileIfNotExistsMock).toHaveBeenCalled();
    expect(readConfigFileMock).toHaveBeenCalled();
  });
});
