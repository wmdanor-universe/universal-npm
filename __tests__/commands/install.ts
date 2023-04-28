import { PackageManager } from '../../src/packageManager/packageManager';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'install',
  testCases: [
    {
      input: ['unpm install', 'unpm i'],
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
      input: ['unpm install express', 'unpm i express', 'unpm add express'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express',
        },
      },
    },
    {
      input: 'unpm install express cors helmet',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express cors helmet',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express cors helmet',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express cors helmet',
        },
      },
    },
    {
      input: ['unpm install express --save', 'unpm install express --save-prod', 'unpm install express -S'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --save',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --save-prod',
        },
      },
    },
    {
      input: ['unpm install express --save', 'unpm install express --save-prod', 'unpm install express -S'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --save',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --save-prod',
        },
      },
    },
    {
      input: ['unpm install express --save-dev', 'unpm install express --dev', 'unpm install express -D'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --save-dev',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express --dev',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --save-dev',
        },
      },
    },
    {
      input: [
        'unpm install express --save-exact',
        'unpm install express --exact',
        'unpm install express -E'
      ],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --save-exact',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express --exact',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --save-exact',
        },
      },
    },
    {
      input: [
        'unpm install express --save-optional',
        'unpm install express --optional',
        'unpm install express -O'
      ],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --save-optional',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express --optional',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --save-optional',
        },
      },
    },
    {
      input: [
        'unpm install express --save-peer',
        'unpm install express --peer',
        'unpm install express -P'
      ],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --save-peer',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn add express --peer',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --save-peer',
        },
      },
    },
    {
      input: [
        'unpm install express --global',
        'unpm install express -g',
      ],
      globalPm: true,
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm install express --global',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn global add express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm add express --global',
        },
      },
    },
  ],
};

export default testSuite;
