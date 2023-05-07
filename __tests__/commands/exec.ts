import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from '../types';

const testSuite: CommandTestSuite = {
  commandName: 'exec',
  testCases: [
    {
      input: 'unpm exec ts-node',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm exec -- ts-node',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn run ts-node',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm exec ts-node',
        },
      },
    },
    {
      input: 'unpm exec cmd --option positional --opt=3',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand:
            'npm exec -- cmd --option positional --opt=3',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn run cmd --option positional --opt=3',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm exec cmd --option positional --opt=3',
        },
      },
    },
  ],
};

export default testSuite;
