import { PackageManager } from "../enums";
import getPreferredPackageManager from 'preferred-pm';
import { getDefaultPackageManager } from "../config/getDefaultPackageManager";

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
      return getDefaultPackageManager();
  }
}
