import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../commandHandler/types';
import { PackageManager } from "../packageManager/packageManager";
import { Argv } from 'yargs';
import { NotSupportedError } from '../errors/NotSupportedError';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs;
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: () => {
    throw new NotSupportedError('licenses', PackageManager.NPM);
  },
  [PackageManager.YARN]: () => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'licenses list',
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
          value: 'licenses list',
        },
      ],
      options: [],
    };

    return meta;
  },
};


const commandModule: MyCommandModule<typeof builder> = {
  command: 'licenses',
  describe: 'Display license information for installed packages',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
