import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from '../types';

const errorMessage =
  '"publish" command is not implemented by unpm, ' +
  'please use your package manager directly for it';

const testSuite: CommandTestSuite = {
  commandName: 'publish',
  testCases: [
    {
      input: 'unpm publish',
      expected: {
        [PackageManager.NPM]: {
          expectedErrorOutput: errorMessage,
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: errorMessage,
        },
        [PackageManager.PNPM]: {
          expectedErrorOutput: errorMessage,
        },
      },
    },
  ],
};

export default testSuite;
