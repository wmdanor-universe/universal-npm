import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';
import { MetaConstructors } from './types';
import { PackageManager } from "../packageManager/packageManager";
import { executeCommand } from '../io/executeCommand';
import { CommandMetaOption, CommandMetaPositional, generateCommand } from '../commandHandler/generateCommand';
import { getPackageManager } from '../packageManager/getPackageManager';
import { getGlobalPackageManager } from '../packageManager/getGlobalPackageManager';

jest.mock('../io/executeCommand');
jest.mock('./generateCommand');
jest.mock('../packageManager/getPackageManager');
jest.mock('../packageManager/getGlobalPackageManager');

const executeCommandMock = jest.mocked(executeCommand);
const generateCommandMock = jest.mocked(generateCommand);
const getPackageManagerMock = jest.mocked(getPackageManager);
const getGlobalPackageManagerMock = jest.mocked(getGlobalPackageManager);

describe('commandHandler/createBaseCommandHandler', () => {
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

describe('commandHandler/createBaseCommandHandler/global', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('no global flag', () => {
    it('should create and execute a command with the correct package manager and meta', async () => {
      const packageManager = PackageManager.NPM;
      const metaPositionals: CommandMetaPositional[] = [
        { order: 1, value: 'positional1' },
      ];
      const metaOptions: CommandMetaOption[] = [
        { name: 'option1', value: 'value1' },
      ];
  
      getPackageManagerMock.mockResolvedValue(packageManager);
      getGlobalPackageManagerMock.mockResolvedValue(packageManager);
      generateCommandMock.mockReturnValue('generated-command');
  
      const metaConstructors = {
        [PackageManager.NPM]: () => ({ positionals: metaPositionals, options: metaOptions }),
      } as unknown as MetaConstructors;
  
      const baseCommandHandler = createBaseCommandHandler.global(metaConstructors);
      await baseCommandHandler({ '$0': '', _: [] });
  
      expect(getPackageManagerMock).toHaveBeenCalledTimes(1);
      expect(getGlobalPackageManager).toHaveBeenCalledTimes(0);
      expect(generateCommandMock).toHaveBeenCalledTimes(1);
      expect(generateCommandMock).toHaveBeenCalledWith({ packageManager, positionals: metaPositionals, options: metaOptions });
      expect(executeCommandMock).toHaveBeenCalledTimes(1);
      expect(executeCommandMock).toHaveBeenCalledWith('generated-command');
    });
  });

  describe('global flag present', () => {
    it('should create and execute a command with the correct package manager and meta', async () => {
      const packageManager = PackageManager.NPM;
      const metaPositionals: CommandMetaPositional[] = [
        { order: 1, value: 'positional1' },
      ];
      const metaOptions: CommandMetaOption[] = [
        { name: 'option1', value: 'value1' },
      ];
  
      getPackageManagerMock.mockResolvedValue(packageManager);
      getGlobalPackageManagerMock.mockResolvedValue(packageManager);
      generateCommandMock.mockReturnValue('generated-command');
  
      const metaConstructors = {
        [PackageManager.NPM]: () => ({ positionals: metaPositionals, options: metaOptions }),
      } as unknown as MetaConstructors;
  
      const baseCommandHandler = createBaseCommandHandler.global(metaConstructors);
      await baseCommandHandler({ '$0': '', _: [], global: true });
  
      expect(getPackageManagerMock).toHaveBeenCalledTimes(0);
      expect(getGlobalPackageManager).toHaveBeenCalledTimes(1);
      expect(generateCommandMock).toHaveBeenCalledTimes(1);
      expect(generateCommandMock).toHaveBeenCalledWith({ packageManager, positionals: metaPositionals, options: metaOptions });
      expect(executeCommandMock).toHaveBeenCalledTimes(1);
      expect(executeCommandMock).toHaveBeenCalledWith('generated-command');
    });
  });
});
