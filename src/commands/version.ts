import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../commandHandler/types';
import { PackageManager } from "../packageManager/packageManager";
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const versionOptionYarnMapping: Record<string, string> = {
  major: '--major',
  minor: '--minor',
  patch: '--patch',
  premajor: '--premajor',
  preminor: '--preminor',
  prepatch: '--prepatch',
  prerelease: '--prerelease'
}

const builder = (yargs: Argv) => {
  return yargs
    .positional('newversion', {
      describe: `The new version to set [<newversion> | ${Object.keys(versionOptionYarnMapping).join(' | ')}]`,
      type: 'string',
    })
    .option('commit-hooks', {
      describe: 'Run git commit hooks when using the "version" command.',
      type: 'boolean',
      default: true,
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'version'
        },
        {
          order: 2,
          value: argv.newversion,
        }
      ],
      options: [
        {
          name: '--commit-hooks',
          value: argv.commitHooks === false ? 'false' : undefined,
        }
      ],
    };

    return meta;
  },
  [PackageManager.YARN]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'version'
        }
      ],
      options: [],
    };

    const versionOption = versionOptionYarnMapping[argv.newversion ?? ''];

    if (versionOption) {
      meta.options.push({
        name: versionOption,
        value: true,
      });
    } else {
      meta.options.push({
        name: '--new-version',
        value: argv.newversion,
      });
    }

    return meta;
  },
  [PackageManager.PNPM]: (argv) => {
    return metaConstructors[PackageManager.NPM](argv);
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'version [newversion]',
  aliases: ['verison'],
  describe: 'Bump a package version',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
