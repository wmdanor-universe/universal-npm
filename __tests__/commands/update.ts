import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from '../types';

const testSuite: CommandTestSuite = {
  commandName: 'update',
  testCases: [
    {
      input: 'unpm update',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm update',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn upgrade',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm update',
        },
      },
    },
    {
      input: ['unpm update express', 'unpm upgrade express', 'unpm up express'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm update express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn upgrade express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm update express',
        },
      },
    },
    {
      input: 'unpm update express cors helmet',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm update express cors helmet',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn upgrade express cors helmet',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm update express cors helmet',
        },
      },
    },
    {
      input: ['unpm update ts-node --latest', 'unpm update ts-node -L'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm update ts-node --latest',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn upgrade ts-node --latest',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm update ts-node --latest',
        },
      },
    },
    {
      input: ['unpm update ts-node --global', 'unpm update ts-node -g'],
      globalPm: true,
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm update ts-node --global',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn global upgrade ts-node',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm update ts-node --global',
        },
      },
    },
  ],
};

export default testSuite;
