import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
  MyArgv,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .example('$0 test', 'Run "test" script')
    .example(
      '$0 create-command <command-name>',
      'Run "create-command" script and pass <command-name> as an argument to it',
    )
    .example('$0 run typecheck --watch', 'Run typecheck in watch mode')
    .positional('script', {
      describe: 'The name of the script to run',
      type: 'string',
    });
};

const shouldFallbackToInstall = (argv: MyArgv<typeof builder>) => {
  return !argv.script && !argv._.find(v => v.toString().match(/run(-script)?/));
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    if (shouldFallbackToInstall(argv)) {
      return {
        positionals: [
          {
            order: 1,
            value: 'install',
          },
        ],
        options: [],
      };
    }

    const args = argv._.filter(v => !v.toString().match(/run(-script)?/)).map(
      (arg, i) => ({
        order: i + 4,
        value: arg.toString(),
      }),
    );

    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'run',
        },
        {
          order: 2,
          value: argv.script,
        },
        {
          order: 3,
          value: '--',
          condition: args.length !== 0,
        },
        ...args,
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.YARN]: argv => {
    if (shouldFallbackToInstall(argv)) {
      return {
        positionals: [
          {
            order: 1,
            value: 'install',
          },
        ],
        options: [],
      };
    }

    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'run',
        },
        {
          order: 2,
          value: argv.script,
        },
        ...argv._.filter(v => !v.toString().match(/run(-script)?/)).map(
          (arg, i) => ({
            order: i + 3,
            value: arg.toString(),
          }),
        ),
      ],
      options: [],
    };

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    if (shouldFallbackToInstall(argv)) {
      return {
        positionals: [
          {
            order: 1,
            value: 'install',
          },
        ],
        options: [],
      };
    }

    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'run',
        },
        {
          order: 2,
          value: argv.script,
        },
        ...argv._.filter(v => !v.toString().match(/run(-script)?/)).map(
          (arg, i) => ({
            order: i + 3,
            value: arg.toString(),
          }),
        ),
      ],
      options: [],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'run [script]',
  aliases: ['run-script', '$0'],
  describe: 'Run a script',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
