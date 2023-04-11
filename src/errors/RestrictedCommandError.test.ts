import { RestrictedCommandError } from './RestrictedCommandError';

describe('errors/RestrictedCommandError', () => {
  it('should construct a valid error message with a command name but no reason', () => {
    const commandName = 'install';

    const error = new RestrictedCommandError(commandName);

    expect(error.message).toBe(`"${commandName}" command is not implemented by unpm, please use your package manager directly for it`);
  });

  it('should construct a valid error message with a command name and a reason', () => {
    const commandName = 'publish';
    const reason = 'Security concerns';

    const error = new RestrictedCommandError(commandName, reason);

    expect(error.message).toBe(`"${commandName}" command is not implemented by unpm, please use your package manager directly for it, reason: "${reason}"`);
  });
});
