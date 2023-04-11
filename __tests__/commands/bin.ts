import { PackageManager } from '../../src/enums';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'bin',
  testCases: [
    {
      input: 'unpm bin',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm bin',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn bin',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm bin',
        },
      },
    },
    {
      input: ['unpm bin --global', 'unpm bin -g'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm bin --global',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: '"bin --global" is not supported by yarn',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm bin --global',
        },
      },
    },
  ],
};

export default testSuite;
