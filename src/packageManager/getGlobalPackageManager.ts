import { getGlobalPackageManager as getConfigGlobalPackageManager } from '../config/getGlobalPackageManager';
import { PackageManager } from './packageManager';

export async function getGlobalPackageManager(): Promise<PackageManager> {
  const globalPackageManager = await getConfigGlobalPackageManager();

  return (
    globalPackageManager ??
    import('../config/getDefaultPackageManager').then(m =>
      m.getDefaultPackageManager(),
    )
  );
}
