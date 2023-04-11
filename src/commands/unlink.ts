import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../types';
import { PackageManager } from "../enums";
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../utils/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .positional('package', {
      describe: 'The package to unlink',
      type: 'string',
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'unlink',
        },
        {
          order: 2,
          value: argv.package,
        },
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.YARN]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'unlink',
        },
        {
          order: 2,
          value: argv.package,
        },
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
          value: 'unlink',
        },
        {
          order: 2,
          value: argv.package,
        },
      ],
      options: [],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'unlink [package]',
  aliases: [],
  describe: 'Unlink a package',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
