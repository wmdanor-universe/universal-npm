import { PackageManager } from '../packageManager/packageManager';
import { getConfig } from './getConfig';

export async function getGlobalPackageManager(): Promise<PackageManager | null> {
  const config = await getConfig();

  switch (config.globalPm) {
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
