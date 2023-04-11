import { PackageManager } from "../../src/enums";
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'licenses',
  testCases: [
    {
      input: 'unpm licenses',
      expected: {
        [PackageManager.NPM]: {
          expectedErrorOutput: /NotSupportedError: "licenses" is not supported by npm/i,
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn licenses list',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm licenses',
        },
      },
    },

  ],
};

export default testSuite;
