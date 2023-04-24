import { PackageManager } from "./packageManager";
import getPreferredPackageManager from 'preferred-pm';

export async function getPackageManager(): Promise<PackageManager> {
   // returns `undefined`, if pm was not used before in `process.cwd()`
  const preferredPackageManager = await getPreferredPackageManager(process.cwd());

  switch (preferredPackageManager?.name) {
    case 'npm':
      return PackageManager.NPM;
    case 'yarn':
      return PackageManager.YARN;
    case 'pnpm':
      return PackageManager.PNPM;
    default:
      return import('../config/getDefaultPackageManager').then(m => m.getDefaultPackageManager());
  }
}
