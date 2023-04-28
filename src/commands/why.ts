import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs.positional('dependency', {
    describe: 'Dependency to explain',
    type: 'string',
    demandOption: true,
  });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'explain',
        },
        {
          order: 2,
          value: argv.dependency,
        },
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.YARN]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'why',
        },
        {
          order: 2,
          value: argv.dependency,
        },
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'why',
        },
        {
          order: 2,
          value: argv.dependency,
        },
      ],
      options: [],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'why <dependency>',
  describe: 'Shows all packages that depend on the specified package',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
