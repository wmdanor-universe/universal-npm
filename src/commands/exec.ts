import { MetaConstructors, MetaConstructorsCommandMeta, MyCommandModule } from '../commandHandler/types';
import { PackageManager } from "../packageManager/packageManager";
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .example('$0 exec nodemon', 'Run nodemon')
    .example('$0 exec tsc --watch', 'Run typescript compiler in watch mode');
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const args =  argv._.slice(1).map((arg, i) => ({
      order: i + 3,
      value: arg.toString(),
    }));

    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'exec'
        },
        {
          order: 2,
          value: '--',
          condition: args.length !== 0,
        },
        ...args,
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
          value: 'run'
        },
        ...argv._.slice(1).map((arg, i) => ({
          order: i + 2,
          value: arg.toString(),
        })),
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
          value: 'exec'
        },
        ...argv._.slice(1).map((arg, i) => ({
          order: i + 2,
          value: arg.toString(),
        })),
      ],
      options: [],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'exec',
  describe: 'Execute a shell command in scope of a project',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
