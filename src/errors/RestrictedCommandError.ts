export class RestrictedCommandError extends Error {
  constructor(commandName: string, reason?: string) {
    const addition = reason ? `, reason: "${reason}"` : '';

    super(`"${commandName}" command is not implemented by unpm, please use your package manager directly for it${addition}`);
  }
}
