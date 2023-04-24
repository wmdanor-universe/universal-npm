import { NotSupportedError } from './NotSupportedError';
import { PackageManager } from "../packageManager/packageManager";

describe('errors/NotSupportedError', () => {
  it('should construct a valid error message with one package manager', () => {
    const subject = 'foo';
    const packageManager = PackageManager.NPM;

    const error = new NotSupportedError(subject, packageManager);

    expect(error.message).toBe(`"${subject}" is not supported by ${packageManager}`);
    expect(error.subject).toBe(subject);
    expect(error.packageManagers).toEqual([packageManager]);
  });

  it('should construct a valid error message with multiple package managers', () => {
    const subject = 'bar';
    const packageManagers = [PackageManager.YARN, PackageManager.PNPM];

    const error = new NotSupportedError(subject, packageManagers);

    expect(error.message).toBe(`"${subject}" is not supported by ${packageManagers.join(', ')}`);
    expect(error.subject).toBe(subject);
    expect(error.packageManagers).toEqual(packageManagers);
  });
});
