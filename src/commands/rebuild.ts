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
  return yargs.positional('package', {
    describe: 'Package to rebuild',
    type: 'string',
    array: true,
  });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'rebuild',
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
  [PackageManager.YARN]: () => {
    throw new NotSupportedError('rebuild', PackageManager.YARN);
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'rebuild',
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
  command: 'rebuild [package]',
  aliases: [],
  describe: 'Rebuild a package',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
