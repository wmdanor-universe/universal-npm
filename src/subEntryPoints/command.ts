import { readFile } from 'fs/promises';
import { resolve } from 'path';

export default async function run(
  requestedCommandName?: string,
): Promise<void> {
  const commandName = await getCommandName(requestedCommandName);

  const { runCommandModule } = await import('../utils/runCommandModule');

  await runCommandModule(commandName);
}

async function getCommandName(requestedCommandName = 'run'): Promise<string> {
  try {
    const commandsMapFileLocation = resolve(__dirname, '..', '..', 'generated', 'commandsMap.json');
    const commandsMapText = await readFile(commandsMapFileLocation, 'utf-8');
    const commandsMap = JSON.parse(commandsMapText);

    return commandsMap[requestedCommandName] ?? 'run';
  } catch {
    throw new Error(`Unable to read command list`);
  }
}
