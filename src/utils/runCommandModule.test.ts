import { Argv, CommandModule } from 'yargs';
import { runCommandModule } from './runCommandModule';

let yargsInstanceMock: Argv;

jest.mock('yargs/yargs', () => () => {
  const yargsMock = {
    scriptName: jest.fn().mockReturnThis(),
    parserConfiguration: jest.fn().mockReturnThis(),
    command: jest.fn().mockReturnThis(),
    version: jest.fn().mockReturnThis(),
    help: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    parseAsync: jest.fn().mockResolvedValue(undefined),
  };

  yargsInstanceMock = yargsMock as unknown as Argv;

  return yargsMock;
});

jest.mock('../commands/install', () => {
  const commandModule: CommandModule<unknown, unknown> = {
    command: 'test',
    describe: 'A test command',
    handler: async () => { /* */ },
  };
  return { default: commandModule };
});

describe('utils/runCommandModule', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should run a valid command module', async () => {
    await runCommandModule('install');

    expect(yargsInstanceMock.scriptName).toHaveBeenCalledWith('unpm');
    expect(yargsInstanceMock.parserConfiguration).toHaveBeenCalledWith({ 'unknown-options-as-args': true });
    expect(yargsInstanceMock.command).toHaveBeenCalled();
    expect(yargsInstanceMock.version).toHaveBeenCalledWith(false);
    expect(yargsInstanceMock.help).toHaveBeenCalled();
    expect(yargsInstanceMock.fail).toHaveBeenCalled();
    expect(yargsInstanceMock.parseAsync).toHaveBeenCalled();
  });

  it('should reject when command module is not found', async () => {
    await expect(runCommandModule('non-existent-module')).rejects.toThrow(
      'Failed to load command module for "non-existent-module" command',
    );
  });
});
