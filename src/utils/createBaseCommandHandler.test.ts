import { createBaseCommandHandler } from './createBaseCommandHandler';
import { MetaConstructors } from '../types';
import { PackageManager } from "../enums";
import { executeCommand } from './executeCommand';
import { CommandMetaOption, CommandMetaPositional, generateCommand } from './generateCommand';
import { getPackageManager } from './getPackageManager';

jest.mock('./executeCommand');
jest.mock('./generateCommand');
jest.mock('./getPackageManager');

const executeCommandMock = jest.mocked(executeCommand);
const generateCommandMock = jest.mocked(generateCommand);
const getPackageManagerMock = jest.mocked(getPackageManager);

describe('utils/createBaseCommandHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create and execute a command with the correct package manager and meta', async () => {
    const packageManager = PackageManager.NPM;
    const metaPositionals: CommandMetaPositional[] = [
      { order: 1, value: 'positional1' },
    ];
    const metaOptions: CommandMetaOption[] = [
      { name: 'option1', value: 'value1' },
    ];

    getPackageManagerMock.mockResolvedValue(packageManager);
    generateCommandMock.mockReturnValue('generated-command');

    const metaConstructors = {
      [PackageManager.NPM]: () => ({ positionals: metaPositionals, options: metaOptions }),
    } as unknown as MetaConstructors;

    const baseCommandHandler = createBaseCommandHandler(metaConstructors);
    await baseCommandHandler({ '$0': '', _: [] });

    expect(getPackageManagerMock).toHaveBeenCalledTimes(1);
    expect(generateCommandMock).toHaveBeenCalledTimes(1);
    expect(generateCommandMock).toHaveBeenCalledWith({ packageManager, positionals: metaPositionals, options: metaOptions });
    expect(executeCommandMock).toHaveBeenCalledTimes(1);
    expect(executeCommandMock).toHaveBeenCalledWith('generated-command');
  });
});
