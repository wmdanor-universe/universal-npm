import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../commandHandler/types';
import { PackageManager } from "../packageManager/packageManager";
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .positional('name', {
      describe: 'Filter packages by name pattern',
      type: 'string',
    })
    .option('global', {
      alias: 'g',
      describe: 'List packages installed globally',
      type: 'boolean',
    })
    .option('depth', {
      alias: 'd',
      describe: 'Max display depth of the dependency tree',
      type: 'number',
    })
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'ls',
        },
        {
          order: 2,
          value: argv.name,
        },
      ],
      options: [
        {
          name: '--global',
          value: argv.global,
        },
        {
          name: '--depth',
          value: argv.depth,
        },
      ],
    };

    return meta;
  },
  [PackageManager.YARN]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 0,
          value: 'global',
          condition: !!argv.global,
        },
        {
          order: 1,
          value: 'list',
        },
      ],
      options: [
        {
          name: '--depth',
          value: argv.depth,
        },
        {
          name: '--pattern',
          value: argv.name,
        }
      ],
    };

    return meta;
  },
  [PackageManager.PNPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'list',
        },
        {
          order: 2,
          value: argv.name,
        },
      ],
      options: [
        {
          name: '--global',
          value: argv.global,
        },
        {
          name: '--depth',
          value: argv.depth,
        },
      ],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'list [name]',
  aliases: ['ls'],
  describe: 'List installed packages',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler.global(metaConstructors),
};

export default commandModule;
