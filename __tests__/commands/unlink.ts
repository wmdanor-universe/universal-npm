import { PackageManager } from '../../src/enums';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'unlink',
  testCases: [
    {
      input: 'unpm unlink',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm unlink',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn unlink',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm unlink',
        },
      },
    },
    {
      input: 'unpm unlink express',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm unlink express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn unlink express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm unlink express',
        },
      },
    },
  ],
};

export default testSuite;
