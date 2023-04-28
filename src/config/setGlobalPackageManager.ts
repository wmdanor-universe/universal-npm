import { PackageManager } from '../packageManager/packageManager';
import { updateConfig } from './updateConfig';

export async function setGlobalPackageManager(
  packageManager: PackageManager | null,
): Promise<void> {
  await updateConfig({ globalPm: packageManager });
}
