import { readFile } from 'fs/promises';
import run from './command';
import { runCommandModule } from '../commandHandler/runCommandModule';

jest.mock('fs/promises');
jest.mock('../commandHandler/runCommandModule');

const readFileMock = jest.mocked(readFile);
const runCommandModuleMock = jest.mocked(runCommandModule);

describe('subEntryPoints/command', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call runCommandModule with the correct command name for a valid requested command name', async () => {
    readFileMock.mockResolvedValue(JSON.stringify({ custom: 'customCommand' }));
    runCommandModuleMock.mockResolvedValue();

    await run(process.argv, 'custom');

    expect(runCommandModuleMock).toHaveBeenCalledWith(
      process.argv,
      'customCommand',
    );
  });

  it('should call runCommandModule with the default command name when requested command name is not provided', async () => {
    readFileMock.mockResolvedValue(JSON.stringify({}));
    runCommandModuleMock.mockResolvedValue();

    await run(process.argv);

    expect(runCommandModuleMock).toHaveBeenCalledWith(process.argv, 'run');
  });

  it('should call runCommandModule with the default command name when requested command name is not found', async () => {
    readFileMock.mockResolvedValue(JSON.stringify({}));
    runCommandModuleMock.mockResolvedValue();

    await run(process.argv, 'nonexistent');

    expect(runCommandModuleMock).toHaveBeenCalledWith(process.argv, 'run');
  });

  it('should throw an error when unable to read commandsMap.json', async () => {
    readFileMock.mockRejectedValue(new Error('Unable to read file'));

    await expect(() => run(process.argv)).rejects.toThrow(
      'Unable to read command list',
    );
  });
});
