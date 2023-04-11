import { PackageManager } from '../../src/enums';
import { CommandTestSuite } from "../types";

const testSuite: CommandTestSuite = {
  commandName: 'list',
  testCases: [
    {
      input: ['unpm list', 'unpm ls'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm ls',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn list',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm list',
        },
      },
    },
    {
      input: 'unpm list express',
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm ls express',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn list --pattern=express',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm list express',
        },
      },
    },
    {
      input: ['unpm list --global', 'unpm list -g'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm ls --global',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn global list',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm list --global',
        },
      },
    },
    {
      input: ['unpm list --depth=2', 'unpm list -d=2', 'unpm list -d 2'],
      expected: {
        [PackageManager.NPM]: {
          expectedGeneratedCommand: 'npm ls --depth=2',
        },
        [PackageManager.YARN]: {
          expectedGeneratedCommand: 'yarn list --depth=2',
        },
        [PackageManager.PNPM]: {
          expectedGeneratedCommand: 'pnpm list --depth=2',
        },
      },
    },
  ],
};

export default testSuite;
