import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .positional('packages', {
      describe: 'Packages to update',
      type: 'string',
      array: true,
    })
    .option('global', {
      alias: ['g'],
      describe: 'Update packages globally',
      type: 'boolean',
    })
    .option('latest', {
      alias: ['L'],
      describe: 'Update to the latest version of the package',
      type: 'boolean',
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'update',
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
        {
          name: '--latest',
          value: argv.latest,
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
          value: 'upgrade',
        },
        {
          order: 2,
          value: argv.packages,
        },
      ],
      options: [
        {
          name: '--latest',
          value: argv.latest,
        },
      ],
    };

    if (argv.global) {
      meta.positionals.push({
        order: 0,
        value: 'global',
      });
    }

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'update',
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
        {
          name: '--latest',
          value: argv.latest,
        },
      ],
    };
    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'update [packages..]',
  aliases: ['up', 'upgrade'],
  describe: 'Update packages',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler.global(metaConstructors),
};

export default commandModule;
