import { defaultConfig } from './internal/constants';
import { UnpmConfig } from './types';
import { updateConfig } from './updateConfig';
import { updateConfigFile } from './internal/updateConfigFile';

import { createConfigFileIfNotExists } from './internal/createConfigFileIfNotExists';

jest.mock('./internal/createConfigFileIfNotExists');
jest.mock('./internal/updateConfigFile');

const createConfigFileIfNotExistsMock = jest.mocked(createConfigFileIfNotExists);
const updateConfigFileMock = jest.mocked(updateConfigFile);

describe('config/updateConfig', () => {
  const mockInit: Partial<UnpmConfig> = {
    defaultPm: 'yarn',
  };

  const mockConfig: UnpmConfig = {
    ...defaultConfig,
    ...mockInit,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call createConfigFileIfNotExists and return its result if it is not nullish', async () => {
    createConfigFileIfNotExistsMock.mockResolvedValue(mockConfig);

    const result = await updateConfig(mockInit);

    expect(result).toBe(mockConfig);
    expect(createConfigFileIfNotExistsMock).toHaveBeenCalled();
    expect(updateConfigFileMock).not.toHaveBeenCalled();
  });



  it('should call updateConfigFile and return its result if createConfigFileIfNotExists returns nullish', async () => {
    createConfigFileIfNotExistsMock.mockResolvedValue(null);
    updateConfigFileMock.mockResolvedValue(mockConfig);

    const result = await updateConfig(mockInit);

    expect(result).toBe(mockConfig);
    expect(createConfigFileIfNotExistsMock).toHaveBeenCalled();
    expect(updateConfigFileMock).toHaveBeenCalled();
  });
});
