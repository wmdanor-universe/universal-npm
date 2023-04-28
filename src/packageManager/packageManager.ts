export enum PackageManager {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

export const PackageManagers: ReadonlySet<PackageManager> = new Set([
  PackageManager.NPM,
  PackageManager.YARN,
  PackageManager.PNPM,
]);
