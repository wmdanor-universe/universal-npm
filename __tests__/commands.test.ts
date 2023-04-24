import { getDefaultPackageManager } from '../src/config/getDefaultPackageManager';
import { executeCommand } from '../src/io/executeCommand';
import { execute as executeBin } from '../src/bin/unpm';
import { PackageManager } from '../src/packageManager/packageManager';
import * as path from 'path'
import { CommandTestSuite } from './types';
import { readdirSync } from 'fs';
import { printError } from '../src/io/printError';
import { exit } from '../src/process/exit';

jest.mock('../src/config/getDefaultPackageManager');
jest.mock('../src/io/executeCommand');
jest.mock('../src/io/printError');
jest.mock('../src/process/exit');

jest.mock('preferred-pm', () => () => Promise.resolve(undefined));

const getDefaultPackageManagerMock = jest.mocked(getDefaultPackageManager);
const executeCommandMock = jest.mocked(executeCommand).mockResolvedValue();
const printErrorMock = jest.mocked(printError);
const exitMock = jest.mocked(exit);

function splitArgs(input: string): string[] {
  const args: string[] = [];
  let current = '';
  let quoted = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const prevChar = input[i - 1];
    const nextChar = input[i + 1];

    if (char === ' ' && !quoted) {
      if (current !== '') {
        args.push(current);
        current = '';
      }
    } else if (char === '"' && prevChar !== '\\') {
      quoted = !quoted;
    } else if (char === '\\' && nextChar === '"') {
      current += '"';
      i++;
    } else {
      current += char;
    }
  }

  if (current !== '') {
    args.push(current);
  }

  return args;
}

interface ExecutionResult {
  status: 'ok' | 'error';
}
async function emulateUnpmCall(input: string): Promise<ExecutionResult> {
  const binFileLocation = path.resolve(__dirname, '..', 'dist', 'bin', 'unpm.js');
  const mockArgv = splitArgs(input.includes('unpm') ?
    input.replace('unpm', binFileLocation) :
    `${binFileLocation} ${input}`);

  await executeBin([process.argv0, ...mockArgv]);

  const result: ExecutionResult = {
    status: exitMock.mock.lastCall?.[0] ?? 'ok',
  };

  exitMock.mockReset();

  return result;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchExtended(matcher: string | RegExp | ((value: string) => boolean)): R;
    }
  }
}

expect.extend({
  toMatchExtended(
    this,
    actual: string,
    matcher: string | RegExp | ((value: string) => boolean)
  ) {
    if (typeof matcher === 'string' || matcher instanceof RegExp) {
      if (actual.match(matcher)) {
        return {
          pass: true,
          message: () => `expected a string that does not match the provided matcher ("${matcher}"), but received "${actual}"`,
        };
      }

      return {
        pass: false,
        message: () => `expected a string that matches the provided matcher ("${matcher}"), but received "${actual}"`,
      };
    }
  
    if (matcher(actual)) {
      return {
        pass: true,
        message: () => `expected a string that does not match the provided matcher predicate, but received "${actual}"`,
      };
    }

    return {
      pass: false,
      message: () => `expected a string that matches the provided matcher predicate, but received "${actual}"`,
    };
  }
});

describe('commands', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const commandsTestSuitesFolderLocation = path.resolve(__dirname, 'commands');
  const commandsTestSuites: CommandTestSuite[] = readdirSync(commandsTestSuitesFolderLocation)
    .filter(file => !file.startsWith('_'))
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .map(file => require(`./commands/${file}`).default)
    .filter((testSuite: CommandTestSuite) => testSuite.testCases.length > 0);
  
  describe.each(commandsTestSuites)('"$commandName" command', ({ testCases }) => {
    for (const testCase of testCases) {
      const inputs = Array.isArray(testCase.input) ? testCase.input.map(input => ({
        input,
        expected: testCase.expected,
      })) : [{
        input: testCase.input,
        expected: testCase.expected,
      }];

      describe.each(inputs)('input: "$input"', (testCase) => {
        it.each([PackageManager.NPM, PackageManager.YARN, PackageManager.PNPM])('package manager: "%s"', async (packageManager) => {
          getDefaultPackageManagerMock.mockResolvedValue(packageManager);
          const expected = testCase.expected[packageManager];

          const result = await emulateUnpmCall(testCase.input);

          if ('expectedGeneratedCommand' in expected) {
            const generatedCommand = executeCommandMock.mock.calls[0]?.[0];

            expect(generatedCommand).toMatchExtended(expected.expectedGeneratedCommand);
            expect(result.status).toBe('ok');
            expect(executeCommandMock).toHaveBeenCalled();
          } else {
            const errorMessages = printErrorMock.mock.calls.map(([message]) => typeof message === 'string' ? message : String(message));

            expect(errorMessages[0]).toMatchExtended(expected.expectedErrorOutput);
            expect(result.status).toBe('error');
            expect(executeCommandMock).not.toHaveBeenCalled();
          }
        });
      });
    }
  });
})
