import {
  MetaConstructors,
  MetaConstructorsCommandMeta,
  MyCommandModule,
} from '../commandHandler/types';
import { PackageManager } from '../packageManager/packageManager';
import { Argv } from 'yargs';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .positional('positional', {
      describe: 'Description',
      type: 'string',
    })
    .option('option', {
      alias: ['opt'],
      describe: 'Description',
      type: 'boolean',
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [],
      options: [
        {
          name: 'option',
          value: argv.option,
        },
      ],
    };

    return meta;
  },
  [PackageManager.YARN]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [],
      options: [
        {
          name: 'option',
          value: argv.option,
        },
      ],
    };

    return meta;
  },
  [PackageManager.PNPM]: argv => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [],
      options: [
        {
          name: 'option',
          value: argv.option,
        },
      ],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: '{{command}} <positional>',
  aliases: [],
  describe: 'Description',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
