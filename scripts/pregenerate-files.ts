import yargs from 'yargs';
import { readdir, writeFile, access, mkdir, readFile } from 'fs/promises';
import { resolve } from 'path';

export async function execute() {
  // help.txt && commandsMap.json

  let yargsLocal = yargs
    .scriptName('unpm')
    .parserConfiguration({ 'unknown-options-as-args': true })

  const commandsLocations = resolve(__dirname, '../dist/commands');
  const commandsFiles = await readdir(commandsLocations);

  const commandsMap: Record<string, string> = {};

  for (const commandFile of commandsFiles) {
    const commandName = commandFile.replace(/\..*/, '');
    
    const commandModule = await import(`../dist/commands/${commandFile}`).then(m => m.default)

    commandsMap[commandName] = commandName;

    for (const commandAlias of commandModule.aliases ?? []) {
      commandsMap[commandAlias] = commandName;
    }

    if (!['publish', 'dlx'].includes(commandName)) {
      yargsLocal = yargsLocal.command(commandModule);
    }
  }

  const generatedFolderLocation = resolve(__dirname, '../generated');
  await access(generatedFolderLocation).catch(() => mkdir(generatedFolderLocation));

  const helpFileLocation = resolve(generatedFolderLocation, 'help.txt');
  const helpText = await yargsLocal.getHelp();
  await writeFile(helpFileLocation, helpText);

  const commandsMapFileLocation = resolve(
    generatedFolderLocation,
    'commandsMap.json',
  )
  await writeFile(commandsMapFileLocation, JSON.stringify(commandsMap));

  // version.txt

  const packageJsonFileLocation = resolve(__dirname, '../package.json');
  const packageJsonData = await readFile(packageJsonFileLocation, 'utf-8');
  const packageJsonParsed = JSON.parse(packageJsonData);

  const versionFileLocation = resolve(generatedFolderLocation, 'version.txt');
  const versionText = packageJsonParsed.version;
  await writeFile(versionFileLocation, versionText);
}

if (require.main === module) {
  execute().catch(console.error);
}
