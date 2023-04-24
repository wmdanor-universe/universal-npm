import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'outdated',
  testCases: [
    {
      input: 'unpm outdated',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm outdated',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn outdated',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm outdated',
        },
      },
    },
    {
      input: 'unpm outdated express',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm outdated express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn outdated express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm outdated express',
        },
      },
    },
    {
      input: 'unpm outdated express cors',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm outdated express cors',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn outdated express cors',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm outdated express cors',
        },
      },
    },
    {
      input: ['unpm outdated --global', 'unpm outdated -g'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm outdated --global',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: '"outdated --global" is not supported by yarn',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm outdated --global',
        },
      },
    },
  ],
};

export default testSuite;
