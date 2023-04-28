import { PackageManager } from './packageManager';
import getPreferredPackageManager__Lib from 'preferred-pm';

export async function getPreferredPackageManager(): Promise<PackageManager | null> {
  // returns `undefined`, if pm was not used before in `process.cwd()`
  const preferredPackageManager = await getPreferredPackageManager__Lib(
    process.cwd(),
  );

  switch (preferredPackageManager?.name) {
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
