import { getDefaultPackageManager } from './getDefaultPackageManager';
import { getConfig } from './getConfig';
import { PackageManager } from '../enums';
import { UnpmConfig } from './types';

jest.mock('./getConfig');

const getConfigMock = jest.mocked(getConfig);

describe('config/getDefaultPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return PackageManager.NPM if defaultPm is "npm"', async () => {
    const mockConfig: UnpmConfig = {
      defaultPm: 'npm',
    };

    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getDefaultPackageManager();

    expect(result).toBe(PackageManager.NPM);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.YARN if defaultPm is "yarn"', async () => {
    const mockConfig: UnpmConfig = {
      defaultPm: 'yarn',
    };
    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getDefaultPackageManager();

    expect(result).toBe(PackageManager.YARN);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.PNPM if defaultPm is "pnpm"', async () => {
    const mockConfig: UnpmConfig = {
      defaultPm: 'pnpm',
    };
    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getDefaultPackageManager();

    expect(result).toBe(PackageManager.PNPM);
    expect(getConfigMock).toHaveBeenCalled();
  });
});
