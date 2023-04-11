import { PackageManager } from '../../src/enums';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: '{{command}}',
  testCases: [
    {
      input: '',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: '',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: '',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: '',
        },
      },
    },
  ],
};

export default testSuite;
