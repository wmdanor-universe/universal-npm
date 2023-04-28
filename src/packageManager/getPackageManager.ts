import { getPreferredPackageManager } from './getPreferredPackageManager';
import { PackageManager } from './packageManager';

export async function getPackageManager(): Promise<PackageManager> {
  const preferredPackageManager = await getPreferredPackageManager();

  return (
    preferredPackageManager ??
    import('../config/getDefaultPackageManager').then(m =>
      m.getDefaultPackageManager(),
    )
  );
}
