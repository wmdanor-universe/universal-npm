import { PackageManager } from './packageManager';
import getPreferredPackageManager__Lib from 'preferred-pm';
import { getPreferredPackageManager } from './getPreferredPackageManager';

jest.mock('preferred-pm');

const getPreferredPackageManagerMock = jest.mocked(
  getPreferredPackageManager__Lib,
);

describe('packageManager/getPreferredPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the null if the preferred package manager is not available', async () => {
    getPreferredPackageManagerMock.mockResolvedValue(undefined);

    const packageManager = await getPreferredPackageManager();
    expect(packageManager).toBe(null);
  });

  it('returns PackageManager.NPM when preferred package manager is npm', async () => {
    getPreferredPackageManagerMock.mockResolvedValue({
      name: 'npm',
      version: '',
    });

    const packageManager = await getPreferredPackageManager();
    expect(packageManager).toBe(PackageManager.NPM);
  });

  it('returns PackageManager.YARN when preferred package manager is yarn', async () => {
    getPreferredPackageManagerMock.mockResolvedValue({
      name: 'yarn',
      version: '',
    });

    const packageManager = await getPreferredPackageManager();
    expect(packageManager).toBe(PackageManager.YARN);
  });

  it('returns PackageManager.PNPM when preferred package manager is pnpm', async () => {
    getPreferredPackageManagerMock.mockResolvedValue({
      name: 'pnpm',
      version: '',
    });

    const packageManager = await getPreferredPackageManager();
    expect(packageManager).toBe(PackageManager.PNPM);
  });
});
