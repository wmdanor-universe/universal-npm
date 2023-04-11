import { UnpmConfig } from '../types';
import { defaultConfig } from './constants';
import { createConfigFileIfNotExists } from './createConfigFileIfNotExists';
import { doesConfigFileExist } from './doesConfigFileExist';
import { createConfigFile } from './createConfigFile';

jest.mock('./doesConfigFileExist');
jest.mock('./createConfigFile');

const doesConfigFileExistMock = jest.mocked(doesConfigFileExist);
const createConfigFileMock = jest.mocked(createConfigFile);

describe('config/internal/createConfigFileIfNotExists', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call doesConfigFileExist and return null if the file exists', async () => {
    doesConfigFileExistMock.mockResolvedValue(true);

    const result = await createConfigFileIfNotExists();

    expect(result).toBeNull();
    expect(doesConfigFileExist).toHaveBeenCalled();
    expect(createConfigFile).not.toHaveBeenCalled();
  });

  it('should call createConfigFile and return the created config if the file does not exist', async () => {
    const mockConfig: UnpmConfig = { ...defaultConfig };
    doesConfigFileExistMock.mockResolvedValue(false);
    createConfigFileMock.mockResolvedValue(mockConfig);

    const result = await createConfigFileIfNotExists(mockConfig);

    expect(result).toBe(mockConfig);
    expect(doesConfigFileExist).toHaveBeenCalled();
    expect(createConfigFile).toHaveBeenCalledWith(mockConfig);
  });
});
