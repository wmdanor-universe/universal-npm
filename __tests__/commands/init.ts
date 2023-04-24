import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'init',
  testCases: [
    {
      input: 'unpm init',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm init',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn init',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm init',
        },
      },
    },
  ],
};

export default testSuite;
