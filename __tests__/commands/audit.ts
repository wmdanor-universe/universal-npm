import { PackageManager } from '../../src/enums';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'audit',
  testCases: [
    {
      input: 'unpm audit',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm audit',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn audit',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm audit',
        },
      },
    },
    {
      input: ['unpm audit --production', 'unpm audit --prod', 'unpm audit -P'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm audit --only=prod',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn audit --groups="dependencies"',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm audit --prod',
        },
      },
    },
    {
      input: ['unpm audit --development', 'unpm audit --dev', 'unpm audit -D'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm audit --only=dev',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn audit --groups="devDependencies"',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm audit --dev',
        },
      },
    },
    {
      input: 'unpm audit --production --development',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm audit --only=prod --only=dev',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn audit --groups="dependencies devDependencies"',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm audit --prod --dev',
        },
      },
    },
    {
      input: 'unpm audit --fix',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm audit fix',
        },
        [PackageManager.YARN]: {
          expectedErrorOutput: 'NotSupportedError',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm audit --fix',
        },
      },
    },
  ],
};

export default testSuite;
