import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'run',
  testCases: [
    {
      input: 'unpm',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn install',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm install',
        },
      },
    },
    {
      input: ['unpm run start', 'unpm run-script start', 'unpm start'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm run start',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn run start',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm run start',
        },
      },
    },
    {
      input: 'unpm test',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm run test',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn run test',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm run test',
        },
      },
    },
    {
      input: 'unpm cmd --optional positional --opt=2',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm run cmd -- --optional positional --opt=2',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn run cmd --optional positional --opt=2',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm run cmd --optional positional --opt=2',
        },
      },
    },
  ],
};

export default testSuite;
