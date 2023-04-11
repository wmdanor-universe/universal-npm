import { doesConfigFileExist } from './doesConfigFileExist';
import { configFileLocation } from './constants';
import { access } from 'fs/promises';

jest.mock('fs/promises');

const accessMock = jest.mocked(access);

describe('config/internal/doesConfigFileExist', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return true if access succeeds', async () => {
    accessMock.mockResolvedValue(undefined);
    const result = await doesConfigFileExist();
    expect(result).toBe(true);
    expect(access).toHaveBeenCalledWith(configFileLocation);
  });

  it('should return false if access fails', async () => {
    accessMock.mockRejectedValue(undefined);
    const result = await doesConfigFileExist();
    expect(result).toBe(false);
    expect(access).toHaveBeenCalledWith(configFileLocation);
  });
});
