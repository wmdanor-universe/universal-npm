import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (args: Argv) => {
  return args
    .positional('packages', {
      describe: 'Packages to install',
      type: 'string',
      array: true,
    })
    .option('save', {
      alias: ['S', 'save-prod'],
      describe: 'Install the specified packages as regular `dependencies`',
      type: 'boolean',
    })
    .option('save-dev', {
      alias: ['D', 'dev'],
      describe: 'Install the specified packages as `devDependencies`',
      type: 'boolean',
    })
    .option('save-exact', {
      alias: ['E', 'exact'],
      describe:
        'Saved dependencies will be configured with an exact version rather than using default semver range operator',
      type: 'boolean',
    })
    .option('save-optional', {
      alias: ['O', 'optional'],
      describe: 'Install the specified packages as `optionalDependencies`',
      type: 'boolean',
    })
    .option('save-peer', {
      alias: ['P', 'peer'],
      describe: 'Install the specified packages as `peerDependencies`',
      type: 'boolean',
    })
    .option('global', {
      alias: ['g'],
      describe: 'Install a package globally',
      type: 'boolean',
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'install',
        },
        {
          order: 2,
          value: argv.packages,
        },
      ],
      options: [
        {
          name: '--save',
          value: argv.save,
        },
        {
          name: '--save-dev',
          value: argv.saveDev,
        },
        {
          name: '--save-exact',
          value: argv.saveExact,
        },
        {
          name: '--save-optional',
          value: argv.saveOptional,
        },
        {
          name: '--save-peer',
          value: argv.savePeer,
        },
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
          order: 0,
          value: 'global',
          condition: !!argv.global,
        },
        {
          order: 1,
          value: argv.packages && argv.packages.length > 0 ? 'add' : 'install',
        },
        {
          order: 2,
          value: argv.packages,
        },
      ],
      options: [
        {
          name: '--dev',
          value: argv.saveDev,
        },
        {
          name: '--exact',
          value: argv.saveExact,
        },
        {
          name: '--optional',
          value: argv.saveOptional,
        },
        {
          name: '--optional',
          value: argv.saveOptional,
        },
        {
          name: '--peer',
          value: argv.savePeer,
        },
      ],
    };

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: argv.packages && argv.packages.length > 0 ? 'add' : 'install',
        },
        {
          order: 2,
          value: argv.packages,
        },
      ],
      options: [
        {
          name: '--save-prod',
          value: argv.save,
        },
        {
          name: '--save-dev',
          value: argv.saveDev,
        },
        {
          name: '--save-exact',
          value: argv.saveExact,
        },
        {
          name: '--save-optional',
          value: argv.saveOptional,
        },
        {
          name: '--save-peer',
          value: argv.savePeer,
        },
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
  command: 'install [packages..]',
  aliases: ['i', 'add'],
  describe: 'Install a package',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler.global(metaConstructors),
};

export default commandModule;
