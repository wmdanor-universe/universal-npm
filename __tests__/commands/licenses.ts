import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from '../types';

const testSuite: CommandTestSuite = {
  commandName: 'licenses',
  testCases: [
    {
      input: 'unpm licenses',
      expected: {
        [PackageManager.NPM]: {
          expectedErrorOutput:
            /NotSupportedError: "licenses" is not supported by npm/i,
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn licenses list',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm licenses list',
        },
      },
    },
  ],
};

export default testSuite;
