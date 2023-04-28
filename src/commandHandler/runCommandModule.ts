import yargsFactory from 'yargs/yargs';
import { type CommandModule } from 'yargs';

export async function runCommandModule(argv: string[], commandName: string): Promise<void> {
  const commandModule = await importCommandModule(commandName);

  await yargsFactory(argv.slice(2))
    .scriptName('unpm')
    .parserConfiguration({ 'unknown-options-as-args': true })
    .command(commandModule)
    .version(false)
    .help('h')
    .alias('help', 'h')
    .fail((message, error) => {
      throw error ?? new Error(message);
    })
    .parseAsync();
}

async function importCommandModule(commandName: string): Promise<CommandModule<unknown, unknown>> {
  try {
    return await import(`../commands/${commandName}`).then(m => m.default);
  } catch {
    throw new Error(`Failed to load command module for "${commandName}" command`);
  }
}
