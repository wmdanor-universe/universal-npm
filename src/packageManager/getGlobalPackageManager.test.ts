import { PackageManager } from './packageManager';
import { getGlobalPackageManager as getConfigGlobalPackageManager } from '../config/getGlobalPackageManager';
import { getDefaultPackageManager } from '../config/getDefaultPackageManager';
import { getGlobalPackageManager } from './getGlobalPackageManager';

jest.mock('../config/getGlobalPackageManager');
jest.mock('../config/getDefaultPackageManager');

const getConfigGlobalPackageManagerMock = jest.mocked(
  getConfigGlobalPackageManager,
);
const getDefaultPackageManagerMock = jest.mocked(getDefaultPackageManager);

describe('packageManager/getGlobalPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the default package manager if the global package manager is not available', async () => {
    getConfigGlobalPackageManagerMock.mockResolvedValue(null);
    getDefaultPackageManagerMock.mockResolvedValue(PackageManager.PNPM);

    const packageManager = await getGlobalPackageManager();
    expect(packageManager).toBe(PackageManager.PNPM);
  });

  it('returns PackageManager.NPM when global package manager is npm', async () => {
    getConfigGlobalPackageManagerMock.mockResolvedValue(PackageManager.NPM);

    const packageManager = await getGlobalPackageManager();
    expect(packageManager).toBe(PackageManager.NPM);
  });

  it('returns PackageManager.YARN when global package manager is yarn', async () => {
    getConfigGlobalPackageManagerMock.mockResolvedValue(PackageManager.YARN);

    const packageManager = await getGlobalPackageManager();
    expect(packageManager).toBe(PackageManager.YARN);
  });

  it('returns PackageManager.PNPM when global package manager is pnpm', async () => {
    getConfigGlobalPackageManagerMock.mockResolvedValue(PackageManager.PNPM);

    const packageManager = await getGlobalPackageManager();
    expect(packageManager).toBe(PackageManager.PNPM);
  });
});
