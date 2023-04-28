import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'uninstall',
  testCases: [
    {
      input: 'unpm remove',
      expected: {
        [PackageManager.NPM]: {
          expectedErrorOutput: 'Not enough non-option arguments: got 0, need at least 1',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: 'Not enough non-option arguments: got 0, need at least 1',
        },
        [PackageManager.PNPM]: {
          expectedErrorOutput: 'Not enough non-option arguments: got 0, need at least 1',
        },
      },
    },
    {
      input: [
        'unpm uninstall express',
        'unpm remove express',
        'unpm rm express',
        'unpm r express',
        'unpm un express',
      ],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm uninstall express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn remove express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm remove express',
        },
      },
    },
    {
      input: 'unpm remove express cors helmet',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm uninstall express cors helmet',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn remove express cors helmet',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm remove express cors helmet',
        },
      },
    },
    {
      input: ['unpm remove ts-node --global', 'unpm remove ts-node -g'],
      globalPm: true,
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm uninstall ts-node --global',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn global remove ts-node',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm remove ts-node --global',
        },
      },
    },
  ],
};

export default testSuite;
