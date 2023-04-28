import { NotSupportedError } from '../errors/NotSupportedError';
import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs.option('global', {
    alias: ['g'],
    describe: 'Print the location of the globally installed executables.',
    type: 'boolean',
  });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'bin',
        },
      ],
      options: [
        {
          name: '--global',
          value: argv.global,
        },
      ],
    };

    return meta;
  },
  [PackageManager.YARN]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'bin',
        },
      ],
      options: [],
    };

    if (argv.global) {
      throw new NotSupportedError('bin --global', PackageManager.YARN);
    }

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'bin',
        },
      ],
      options: [
        {
          name: '--global',
          value: argv.global,
        },
      ],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'bin',
  aliases: [],
  describe:
    'Prints the directory into which the executables of dependencies are linked',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler.global(metaConstructors),
};

export default commandModule;
