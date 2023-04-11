import { PackageManager } from '../../src/enums';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'pack',
  testCases: [
    {
      input: 'unpm pack',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm pack',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn pack',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm pack',
        },
      },
    },
    {
      input: [
        'unpm pack --pack-destination path/to/something',
        'unpm pack --dir=path/to/something',
        'unpm pack -d path/to/something',
      ],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm pack --pack-destination=path/to/something',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: '"pack --pack-destination <dir>" is not supported by yarn',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm pack --pack-destination=path/to/something',
        },
      },
    },
  ],
};

export default testSuite;
