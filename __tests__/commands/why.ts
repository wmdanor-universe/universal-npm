import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from '../types';

const testSuite: CommandTestSuite = {
  commandName: 'why',
  testCases: [
    {
      input: 'unpm why',
      expected: {
        [PackageManager.NPM]: {
          expectedErrorOutput:
            'Not enough non-option arguments: got 0, need at least 1',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput:
            'Not enough non-option arguments: got 0, need at least 1',
        },
        [PackageManager.PNPM]: {
          expectedErrorOutput:
            'Not enough non-option arguments: got 0, need at least 1',
        },
      },
    },
    {
      input: 'unpm why express',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm explain express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn why express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm why express',
        },
      },
    },
  ],
};

export default testSuite;
