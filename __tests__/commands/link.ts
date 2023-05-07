import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from '../types';

const testSuite: CommandTestSuite = {
  commandName: 'link',
  testCases: [
    {
      input: 'unpm link',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm link',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn link',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm link',
        },
      },
    },
    {
      input: 'unpm link express',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm link express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn link express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm link express',
        },
      },
    },
  ],
};

export default testSuite;
