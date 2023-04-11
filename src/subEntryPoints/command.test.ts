import { readFile } from 'fs/promises';
import run from './command';
import * as runCommandModuleUtils from '../utils/runCommandModule';

jest.mock('fs/promises');
jest.mock('../utils/runCommandModule');

const readFileMock = jest.mocked(readFile);
const { runCommandModule } = runCommandModuleUtils as jest.Mocked<typeof runCommandModuleUtils>;

describe('subEntryPoints/command', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call runCommandModule with the correct command name for a valid requested command name', async () => {
    readFileMock.mockResolvedValue(JSON.stringify({ custom: 'customCommand' }));
    runCommandModule.mockResolvedValue();

    await run('custom');

    expect(runCommandModule).toHaveBeenCalledWith('customCommand');
  });

  it('should call runCommandModule with the default command name when requested command name is not provided', async () => {
    readFileMock.mockResolvedValue(JSON.stringify({}));
    runCommandModule.mockResolvedValue();

    await run();

    expect(runCommandModule).toHaveBeenCalledWith('run');
  });

  it('should call runCommandModule with the default command name when requested command name is not found', async () => {
    readFileMock.mockResolvedValue(JSON.stringify({}));
    runCommandModule.mockResolvedValue();

    await run('nonexistent');

    expect(runCommandModule).toHaveBeenCalledWith('run');
  });

  it('should throw an error when unable to read commandsMap.json', async () => {
    readFileMock.mockRejectedValue(new Error('Unable to read file'));

    await expect(run()).rejects.toThrow('Unable to read command list');
  });
});
