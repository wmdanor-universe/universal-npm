import { printError } from './printError';

describe('io/printError', () => {
  it('should call console.error with passed error', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {
        /* */
      });
    const error = 'Error';

    printError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});
