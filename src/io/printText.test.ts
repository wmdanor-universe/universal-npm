import { printText } from './printText';

describe('io/printText', () => {
  it('should call console.log with passed error', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      /* */
    });
    const text = 'Text';

    printText(text);

    expect(consoleLogSpy).toHaveBeenCalledWith(text);
  });
});
