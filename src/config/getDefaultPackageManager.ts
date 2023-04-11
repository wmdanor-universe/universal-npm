import { PackageManager } from "../enums";
import { getConfig } from "./getConfig";

export async function getDefaultPackageManager(): Promise<PackageManager> {
  const config = await getConfig();

  switch (config.defaultPm) {
    case 'npm':
      return PackageManager.NPM;
    case 'yarn':
      return PackageManager.YARN;
    case 'pnpm':
      return PackageManager.PNPM;
  }
}
