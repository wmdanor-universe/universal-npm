import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'rebuild',
  testCases: [
    {
      input: 'unpm rebuild',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm rebuild',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: '"rebuild" is not supported by yarn',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm rebuild',
        },
      },
    },
    {
      input: 'unpm rebuild express',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm rebuild express',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: '"rebuild" is not supported by yarn',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm rebuild express',
        },
      },
    },
  ],
};

export default testSuite;
