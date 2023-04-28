import { isPackageManager } from './isPackageManager';
import { PackageManager } from './packageManager';

describe('packageManager/isPackageManager', () => {
  it('should return null for non-string input', () => {
    expect(isPackageManager(42)).toBeNull();
    expect(isPackageManager({})).toBeNull();
    expect(isPackageManager([])).toBeNull();
    expect(isPackageManager(undefined)).toBeNull();
  });

  it('should return correct PackageManager enum for valid input', () => {
    expect(isPackageManager('npm')).toBe(PackageManager.NPM);
    expect(isPackageManager('yarn')).toBe(PackageManager.YARN);
    expect(isPackageManager('pnpm')).toBe(PackageManager.PNPM);
  });

  it('should be case insensitive', () => {
    expect(isPackageManager('NPM')).toBe(PackageManager.NPM);
    expect(isPackageManager('Yarn')).toBe(PackageManager.YARN);
    expect(isPackageManager('PnPM')).toBe(PackageManager.PNPM);
  });

  it('should return null for invalid input', () => {
    expect(isPackageManager('invalid')).toBeNull();
    expect(isPackageManager('npmm')).toBeNull();
    expect(isPackageManager('yarnn')).toBeNull();
  });
});
