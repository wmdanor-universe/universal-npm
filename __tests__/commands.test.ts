import { getDefaultPackageManager } from '../src/config/getDefaultPackageManager';
import { getGlobalPackageManager } from '../src/config/getGlobalPackageManager';
import { executeCommand } from '../src/io/executeCommand';
import { execute as executeBin } from '../src/bin/unpm';
import {
  PackageManager,
  PackageManagers,
} from '../src/packageManager/packageManager';
import path from 'path';
import { CommandTestSuite, TestCaseOutcome } from './types';
import { readdirSync } from 'fs';
import { printError } from '../src/io/printError';
import { exit } from '../src/process/exit';

jest.mock('../src/config/getDefaultPackageManager');
jest.mock('../src/config/getGlobalPackageManager');
jest.mock('../src/io/executeCommand');
jest.mock('../src/io/printError');
jest.mock('../src/process/exit');

jest.mock('preferred-pm', () => () => Promise.resolve(undefined));

const getDefaultPackageManagerMock = jest.mocked(getDefaultPackageManager);
const getGlobalPackageManagerMock = jest.mocked(getGlobalPackageManager);
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
  const binFileLocation = path.resolve(
    __dirname,
    '..',
    'dist',
    'bin',
    'unpm.js',
  );
  const mockArgv = splitArgs(
    input.includes('unpm')
      ? input.replace('unpm', binFileLocation)
      : `${binFileLocation} ${input}`,
  );

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
      toMatchExtended(
        matcher: string | RegExp | ((value: string) => boolean),
      ): R;
    }
  }
}

expect.extend({
  toMatchExtended(
    this,
    actual: string | undefined,
    matcher: string | RegExp | ((value: string) => boolean),
  ) {
    if (typeof actual !== 'string') {
      return {
        pass: false,
        message: () =>
          `expected a string that matches the provided matcher ("${matcher}"), but received "${actual}"`,
      };
    }

    if (typeof matcher === 'string' || matcher instanceof RegExp) {
      if (actual.match(matcher)) {
        return {
          pass: true,
          message: () =>
            `expected a string that does not match the provided matcher ("${matcher}"), but received "${actual}"`,
        };
      }

      return {
        pass: false,
        message: () =>
          `expected a string that matches the provided matcher ("${matcher}"), but received "${actual}"`,
      };
    }

    if (matcher(actual)) {
      return {
        pass: true,
        message: () =>
          `expected a string that does not match the provided matcher predicate, but received "${actual}"`,
      };
    }

    return {
      pass: false,
      message: () =>
        `expected a string that matches the provided matcher predicate, but received "${actual}"`,
    };
  },
});

describe('commands', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const commandsTestSuitesFolderLocation = path.resolve(__dirname, 'commands');
  const commandsTestSuites: CommandTestSuite[] = readdirSync(
    commandsTestSuitesFolderLocation,
  )
    .filter(file => !file.startsWith('_'))
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    .map(file => require(`./commands/${file}`).default)
    .filter((testSuite: CommandTestSuite) => testSuite.testCases.length > 0);

  describe.each(commandsTestSuites)(
    '"$commandName" command',
    ({ testCases }) => {
      for (const { input: testCaseInput, expected, globalPm } of testCases) {
        type InputSuiteMeta = {
          input: string;
          globalPm: PackageManager | null;
          expected: Record<PackageManager, TestCaseOutcome>;
        };

        const inputs: InputSuiteMeta[] = Array.isArray(testCaseInput)
          ? testCaseInput.reduce((acc, input) => {
              if (globalPm) {
                acc.push(
                  ...[...PackageManagers].map(packageManager => ({
                    expected: [...PackageManagers].reduce((newExpected, i) => {
                      newExpected[i] = expected[packageManager];

                      return newExpected;
                    }, {} as Record<PackageManager, TestCaseOutcome>),
                    globalPm: packageManager,
                    input,
                  })),
                );
              }

              acc.push({
                expected,
                globalPm: null,
                input,
              });

              return acc;
            }, [] as InputSuiteMeta[])
          : globalPm
          ? [
              ...[...PackageManagers].map(packageManager => ({
                expected: [...PackageManagers].reduce((newExpected, i) => {
                  newExpected[i] = expected[packageManager];

                  return newExpected;
                }, {} as Record<PackageManager, TestCaseOutcome>),
                globalPm: packageManager,
                input: testCaseInput,
              })),
              {
                expected,
                globalPm: null,
                input: testCaseInput,
              },
            ]
          : [
              {
                expected,
                globalPm: null,
                input: testCaseInput,
              },
            ];

        const inputSuiteText = globalPm
          ? `input (globalPm: $globalPm): "$input"`
          : 'input: "$input"';

        describe.each(inputs)(inputSuiteText, testCase => {
          const testCases = [...PackageManagers].map(packageManager => ({
            packageManager,
            ...testCase,
            expected: testCase.expected[packageManager],
          }));
          it.each(testCases)(
            'package manager: "$packageManager" - $expected',
            async ({ packageManager }) => {
              getDefaultPackageManagerMock.mockResolvedValue(packageManager);
              getGlobalPackageManagerMock.mockResolvedValue(testCase.globalPm);
              const expected = testCase.expected[packageManager];

              const result = await emulateUnpmCall(testCase.input);

              if ('expectedGeneratedCommand' in expected) {
                const generatedCommand = executeCommandMock.mock.lastCall?.[0];

                {
                  const errorMessages = printErrorMock.mock.calls.map(
                    ([message]) => message,
                  );

                  if (errorMessages.length) {
                    console.error('Error messages present: ', errorMessages);
                  }
                }

                expect(result.status).toBe('ok');
                expect(executeCommandMock).toHaveBeenCalledTimes(1);
                expect(generatedCommand).toMatchExtended(
                  expected.expectedGeneratedCommand,
                );

                if (testCase.globalPm) {
                  expect(getGlobalPackageManagerMock).toHaveBeenCalledTimes(1);
                  expect(getDefaultPackageManagerMock).toHaveBeenCalledTimes(0);
                }
              } else {
                const errorMessages = printErrorMock.mock.calls.map(
                  ([message]) => message,
                );

                {
                  const generatedCommand =
                    executeCommandMock.mock.lastCall?.[0];

                  if (generatedCommand) {
                    console.error('Generated command present: ', errorMessages);
                  }
                }

                expect(result.status).toBe('error');
                expect(printErrorMock).toHaveBeenCalled();
                expect(errorMessages[0]).toMatchExtended(
                  expected.expectedErrorOutput,
                );
                expect(executeCommandMock).not.toHaveBeenCalled();
              }
            },
          );
        });
      }
    },
  );
});
