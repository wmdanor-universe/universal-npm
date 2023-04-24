import { PackageManager } from "../packageManager/packageManager";
import { updateConfig } from "./updateConfig";

export async function setDefaultPackageManager(packageManager: PackageManager): Promise<void> {
  await updateConfig({ defaultPm: packageManager })
}
