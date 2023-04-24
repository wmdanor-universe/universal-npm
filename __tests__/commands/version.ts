import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'version',
  testCases: [
    {
      input: ['unpm version', 'unpm verison'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version',
        },
      },
    },
    {
      input: 'unpm version --commit-hooks=false',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version --commit-hooks=false',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version --commit-hooks=false',
        },
      },
    },
    {
      input: 'unpm version major',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version major',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --major',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version major',
        },
      },
    },
    {
      input: 'unpm version major',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version major',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --major',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version major',
        },
      },
    },
    {
      input: 'unpm version major',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version major',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --major',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version major',
        },
      },
    },
    {
      input: 'unpm version minor',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version minor',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --minor',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version minor',
        },
      },
    },
    {
      input: 'unpm version patch',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version patch',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --patch',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version patch',
        },
      },
    },
    {
      input: 'unpm version premajor',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version premajor',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --premajor',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version premajor',
        },
      },
    },
    {
      input: 'unpm version preminor',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version preminor',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --preminor',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version preminor',
        },
      },
    },
    {
      input: 'unpm version prepatch',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version prepatch',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --prepatch',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version prepatch',
        },
      },
    },
    {
      input: 'unpm version prerelease',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version prerelease',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --prerelease',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version prerelease',
        },
      },
    },
    {
      input: 'unpm version 1.1.0',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm version 1.1.0',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn version --new-version=1.1.0',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm version 1.1.0',
        },
      },
    },
  ],
};

export default testSuite;
