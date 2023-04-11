import { PackageManager } from "../enums";

export class NotSupportedError extends Error {
  public readonly subject: string;
  public readonly packageManagers: ReadonlyArray<PackageManager>;

  constructor(subject: string, packageManager: PackageManager | PackageManager[]) {
    const packageManagers = Array.isArray(packageManager) ? packageManager : [packageManager];
    
    super(`"${subject}" is not supported by ${packageManagers.join(', ')}`);

    this.subject = subject;
    this.packageManagers = packageManagers;
  }
}
