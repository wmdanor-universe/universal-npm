import { exit } from './exit';
import { printError } from '../io/printError';
import { printText } from '../io/printText';

jest.mock('../io/printError');
jest.mock('../io/printText');

describe('process/exit', () => {
  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('Process exited');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call process.exit with code 0 when status is "ok"', () => {
    expect(() => exit('ok')).toThrow('Process exited');
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should call process.exit with code 1 when status is "error"', () => {
    expect(() => exit('error')).toThrow('Process exited');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should call printText with reason when status is "ok" and reason is provided', () => {
    expect(() => exit('ok', 'Successful exit')).toThrow('Process exited');
    expect(printText).toHaveBeenCalledWith('Successful exit');
  });

  it('should call printError with reason when status is "error" and reason is provided', () => {
    expect(() => exit('error', 'Error exit')).toThrow('Process exited');
    expect(printError).toHaveBeenCalledWith('Error exit');
  });
});
