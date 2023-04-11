import { getConfig } from '../config/getConfig';
import { UnpmConfig } from '../config/types';
import { updateConfig } from '../config/updateConfig';
import { MyCommandModule } from '../types';
import { PackageManager } from "../enums";
import { isPackageManager } from "../utils/isPackageManager";
import { Argv } from 'yargs';
import { setDefaultPackageManager } from "../config/setDefaultPackageManager";

const builder = (yargs: Argv) => {
  return yargs
    .positional('name', {
      describe: 'Option name',
      type: 'string',
      demandOption: true,
      choices: ['defaultPm'],
    })
    .positional('value', {
      describe: 'Value to set',
      type: 'string',
    })
};

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
      const config = await getConfig();

      const value = config[name];

      console.log(`${name} = ${value}`);

      return;
    }

    if (name === 'defaultPm') {
      const value = isPackageManager(argv.value);

      if (!value) {
        throw new Error(`"defaultPm" option must be one of [${Object.values(PackageManager).join(', ')}]`);
      }

      await setDefaultPackageManager(value);

      return;
    }

    await updateConfig({ [name]: argv.value });
  },
};

export default commandModule;
