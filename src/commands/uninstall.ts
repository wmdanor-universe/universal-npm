import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../types';
import { PackageManager } from "../enums";
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../utils/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .positional('packages', {
      describe: 'Packages to remove',
      type: 'string',
      array: true,
      demandOption: true,
    })
    .option('global', {
      alias: ['g'],
      describe: 'Remove a global package',
      type: 'boolean',
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'uninstall',
        },
        {
          order: 2,
          value: argv.packages,
        }
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
          value: 'remove',
        },
        {
          order: 2,
          value: argv.packages,
        }
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.PNPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'remove',
        },
        {
          order: 2,
          value: argv.packages,
        }
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
  command: 'uninstall <packages..>',
  aliases: ['remove', 'rm', 'r', 'un'],
  describe: 'Remove a package',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
