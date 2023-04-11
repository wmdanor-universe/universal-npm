import { NotSupportedError } from '../errors/NotSupportedError';
import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../types';
import { PackageManager } from "../enums";
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../utils/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .option('pack-destination', {
      alias: ['dir', 'd'],
      describe: 'Output directory for the tarball',
      type: 'string',
    });
};


const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'pack',
        },
      ],
      options: [
        {
          name: '--pack-destination',
          value: argv.packDestination,
        },
      ],
    };

    return meta;
  },
  [PackageManager.YARN]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'pack',
        },
      ],
      options: [],
    };

    if (argv.packDestination) {
      throw new NotSupportedError('pack --pack-destination <dir>', PackageManager.YARN);
    }

    return meta;
  },
  [PackageManager.PNPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'pack',
        },
      ],
      options: [
        {
          name: '--pack-destination',
          value: argv.packDestination,
        },
      ],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'pack',
  aliases: [],
  describe: 'Create a tarball from a package',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
