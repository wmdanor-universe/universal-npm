import { getConfig } from './getConfig';
import { PackageManager } from '../packageManager/packageManager';
import { UnpmConfig } from './types';
import { getGlobalPackageManager } from './getGlobalPackageManager';

jest.mock('./getConfig');

const getConfigMock = jest.mocked(getConfig);

describe('config/getGlobalPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return null if globalPm is null', async () => {
    const mockConfig = {
      globalPm: null,
    } as unknown as UnpmConfig;

    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getGlobalPackageManager();

    expect(result).toBe(null);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.NPM if globalPm is "npm"', async () => {
    const mockConfig = {
      globalPm: 'npm',
    } as unknown as UnpmConfig;

    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getGlobalPackageManager();

    expect(result).toBe(PackageManager.NPM);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.YARN if globalPm is "yarn"', async () => {
    const mockConfig = {
      globalPm: 'yarn',
    } as unknown as UnpmConfig;
    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getGlobalPackageManager();

    expect(result).toBe(PackageManager.YARN);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.PNPM if globalPm is "pnpm"', async () => {
    const mockConfig = {
      globalPm: 'pnpm',
    } as unknown as UnpmConfig;
    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getGlobalPackageManager();

    expect(result).toBe(PackageManager.PNPM);
    expect(getConfigMock).toHaveBeenCalled();
  });
});
