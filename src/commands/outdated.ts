import { NotSupportedError } from '../errors/NotSupportedError';
import {
  MyCommandModule,
  MetaConstructors,
  MetaConstructorsCommandMeta,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .positional('packages', {
      describe: 'Packages to check for being outdated',
      type: 'string',
      array: true,
    })
    .option('global', {
      alias: ['g'],
      describe: 'List outdated global packages',
      type: 'boolean',
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'outdated',
        },
        {
          order: 2,
          value: argv.packages,
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
          value: 'outdated',
        },
        {
          order: 2,
          value: argv.packages,
        },
      ],
      options: [],
    };

    if (argv.global) {
      throw new NotSupportedError('outdated --global', PackageManager.YARN);
    }

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'outdated',
        },
        {
          order: 2,
          value: argv.packages,
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
  command: 'outdated [packages..]',
  aliases: [],
  describe: 'Display outdated packages',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler.global(metaConstructors),
};

export default commandModule;
