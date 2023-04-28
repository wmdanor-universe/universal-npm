import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs;
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: () => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'init',
        },
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.YARN]: () => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'init',
        },
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.PNPM]: () => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'init',
        },
      ],
      options: [],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'init',
  describe: 'Create a package.json file',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
