import { getConfig } from '../config/getConfig';
import { UnpmConfig } from '../config/types';
import { updateConfig } from '../config/updateConfig';
import { MyCommandModule } from '../commandHandler/types';
import { PackageManager } from "../packageManager/packageManager";
import { isPackageManager } from "../packageManager/isPackageManager";
import { Argv } from 'yargs';
import { setDefaultPackageManager } from "../config/setDefaultPackageManager";
import { setGlobalPackageManager } from '../config/setGlobalPackageManager';
import { printText } from '../io/printText';

const builder = (yargs: Argv) => {
  return yargs
    .positional('name', {
      describe: 'Option name',
      type: 'string',
      demandOption: true,
      choices: ['defaultPm', 'globalPm'],
    })
    .positional('value', {
      describe: 'Value to set',
      type: 'string',
    })
};

async function printConfigProperty(key: keyof UnpmConfig) {
  const config = await getConfig();

  const value = config[key];

  printText(`${key} = ${value}`);
}

const commandModule: MyCommandModule<typeof builder> = {
  command: 'config <name> [value]',
  aliases: ['c'],
  describe: 'Manage the configuration (unpm config, not the config of package managers), config file located at "~/.unpmrc"',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: async (argv) => {
    // Evil hack, but it is fine, because we validate this argument before it reaches this place
    const name = argv.name as keyof UnpmConfig;

    if (!argv.value) {
      printConfigProperty(name);

      return;
    }

    if (name === 'defaultPm') {
      const value = isPackageManager(argv.value);

      if (!value) {
        throw new Error(`"defaultPm" option must be one of [${Object.values(PackageManager).join(', ')}]`);
      }

      await setDefaultPackageManager(value);
    } else if (name === 'globalPm') {
      const value = isPackageManager(argv.value);

      if (argv.value !== 'null' && !value) {
        throw new Error(`"defaultPm" option must be one of [${[...Object.values(PackageManager), 'null'].join(', ')}]`);
      }

      await setGlobalPackageManager(value);
    } else {
      await updateConfig({ [name]: argv.value });
    }

    printConfigProperty(name);
  },
};

export default commandModule;
