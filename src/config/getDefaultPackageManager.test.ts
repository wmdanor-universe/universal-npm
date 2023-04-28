import { getDefaultPackageManager } from './getDefaultPackageManager';
import { getConfig } from './getConfig';
import { PackageManager } from "../packageManager/packageManager";
import { UnpmConfig } from './types';

jest.mock('./getConfig');

const getConfigMock = jest.mocked(getConfig);

describe('config/getDefaultPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return PackageManager.NPM if defaultPm is "npm"', async () => {
    const mockConfig = {
      defaultPm: 'npm',
    } as unknown as UnpmConfig;

    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getDefaultPackageManager();

    expect(result).toBe(PackageManager.NPM);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.YARN if defaultPm is "yarn"', async () => {
    const mockConfig = {
      defaultPm: 'yarn',
    } as unknown as UnpmConfig;
    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getDefaultPackageManager();

    expect(result).toBe(PackageManager.YARN);
    expect(getConfigMock).toHaveBeenCalled();
  });

  it('should return PackageManager.PNPM if defaultPm is "pnpm"', async () => {
    const mockConfig = {
      defaultPm: 'pnpm',
    } as unknown as UnpmConfig;
    getConfigMock.mockResolvedValue(mockConfig);

    const result = await getDefaultPackageManager();

    expect(result).toBe(PackageManager.PNPM);
    expect(getConfigMock).toHaveBeenCalled();
  });
});
