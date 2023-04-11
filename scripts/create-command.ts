export async function execute(): Promise<void> {
  const commandName = await getCommandName();

  await createCommandFile(commandName);

  process.stdout.write('Successfully created "' + commandName + '.ts"');
}

async function getCommandName(): Promise<string> {
  const arg = process.argv.at(2)?.trim();

  if (arg) {
    return arg;
  }

  const { createInterface } = await import('readline');

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const prompt = (query: string) => new Promise<string>(resolve => rl.question(query, resolve));

  while (true) {
    const commandName = await prompt('Enter the command name: ').then(s => s.trim());

    if (commandName?.length > 0) {
      rl.close();

      return commandName;
    }

    console.log('Command name has to be a non-empty string');
  }
}

export async function createCommandFile(commandName: string): Promise<void> {
  if (typeof commandName !== 'string') {
    throw new TypeError('"commandName" has to be a type of "string"');
  }

  commandName = commandName.trim();
  if (commandName.length === 0) {
    throw new RangeError('"commandName" has to be a non-empty string');
  }

  const { resolve } = await import('path');
  const { readFile, writeFile } = await import('fs/promises');

  const commandsFolderLocation = resolve(__dirname, '../src/commands');

  const templateFileLocation = resolve(commandsFolderLocation, '_template.ts');
  const templateFileContent = await readFile(templateFileLocation, 'utf-8');

  const commandFileLocation = resolve(commandsFolderLocation, commandName + '.ts');
  const commandFileContent = templateFileContent.replace('{{command}}', commandName);
  await writeFile(commandFileLocation, commandFileContent, 'utf-8');
}

if (require.main === module) {
  execute().catch(console.error);
}
