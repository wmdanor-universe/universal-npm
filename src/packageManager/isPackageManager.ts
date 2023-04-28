import { PackageManager } from './packageManager';

export function isPackageManager(value: unknown): PackageManager | null {
  if (typeof value !== 'string') {
    return null;
  }

  switch (value.toLowerCase()) {
    case 'npm':
      return PackageManager.NPM;
    case 'yarn':
      return PackageManager.YARN;
    case 'pnpm':
      return PackageManager.PNPM;
    default:
      return null;
  }
}
