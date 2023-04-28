import { PackageManager } from './packageManager';
import { getPreferredPackageManager } from './getPreferredPackageManager';
import { getDefaultPackageManager } from '../config/getDefaultPackageManager';
import { getPackageManager } from './getPackageManager';

jest.mock('preferred-pm');
jest.mock('./getPreferredPackageManager');
jest.mock('../config/getDefaultPackageManager');

const getPreferredPackageManagerMock = jest.mocked(getPreferredPackageManager);
const getDefaultPackageManagerMock = jest.mocked(getDefaultPackageManager);

describe('packageManager/getPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the default package manager if the preferred package manager is not available', async () => {
    getPreferredPackageManagerMock.mockResolvedValue(null);
    getDefaultPackageManagerMock.mockResolvedValue(PackageManager.PNPM);

    const packageManager = await getPackageManager();
    expect(packageManager).toBe(PackageManager.PNPM);
  });

  it('returns PackageManager.NPM when preferred package manager is npm', async () => {
    getPreferredPackageManagerMock.mockResolvedValue(PackageManager.NPM);

    const packageManager = await getPackageManager();
    expect(packageManager).toBe(PackageManager.NPM);
  });

  it('returns PackageManager.YARN when preferred package manager is yarn', async () => {
    getPreferredPackageManagerMock.mockResolvedValue(PackageManager.YARN);

    const packageManager = await getPackageManager();
    expect(packageManager).toBe(PackageManager.YARN);
  });

  it('returns PackageManager.PNPM when preferred package manager is pnpm', async () => {
    getPreferredPackageManagerMock.mockResolvedValue(PackageManager.PNPM);

    const packageManager = await getPackageManager();
    expect(packageManager).toBe(PackageManager.PNPM);
  });
});
