import { readFile } from 'fs/promises';
import { resolve } from 'path';
import run from './help';
import { printText } from '../io/printText';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('../io/printText');

const readFileMock = jest.mocked(readFile);
const printTextMock = jest.mocked(printText);

describe('subEntryPoints/help', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should read help information and print it to console', async () => {
    const sampleHelpText = 'Sample help information.';
    const helpFileLocation = resolve(
      __dirname,
      '..',
      '..',
      'generated',
      'help.txt',
    );

    readFileMock.mockResolvedValueOnce(sampleHelpText);

    await run();

    expect(readFileMock).toHaveBeenCalledWith(helpFileLocation, 'utf-8');
    expect(printTextMock).toHaveBeenCalledWith(sampleHelpText);
  });

  it('should throw an error if unable to read help information', async () => {
    readFileMock.mockRejectedValueOnce(new Error('File not found'));

    await expect(run()).rejects.toThrow('Unable to read help information');
  });
});
