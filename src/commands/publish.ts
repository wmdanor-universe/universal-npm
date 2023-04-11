import { CommandModule } from 'yargs';
import { RestrictedCommandError } from '../errors/RestrictedCommandError';

const commandModule: CommandModule = {
  command: 'publish',
  handler: () => {
    throw new RestrictedCommandError(commandModule.command as string);
  },
};

export default commandModule;
