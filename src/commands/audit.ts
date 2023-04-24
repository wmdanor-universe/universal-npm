import { MetaConstructors, MyCommandModule, MetaConstructorsCommandMeta } from '../commandHandler/types';
import { PackageManager } from "../packageManager/packageManager";
import { Argv } from 'yargs';
import { NotSupportedError } from '../errors/NotSupportedError';
import { createBaseCommandHandler } from '../commandHandler/createBaseCommandHandler';

const builder = (yargs: Argv) => {
  return yargs
    .option('production', {
      alias: ['prod', 'P'],
      describe: 'Only audit dependencies from dependencies (skip devDependencies)',
      type: 'boolean',
    })
    .option('development', {
      alias: ['dev', 'D'],
      describe: 'Only audit dependencies from devDependencies (skip dependencies)',
      type: 'boolean',
    })
    .option('fix', {
      describe: 'Try to automatically fix vulnerabilities by updating/adding packages',
      type: 'boolean',
    })
    .option('audit-level', {
      describe: 'Only print advisories with severity greater than or equal to severity',
      type: 'string',
      choices: ['low', 'moderate', 'high', 'critical'],
    });
};

const metaConstructors: MetaConstructors<typeof builder> = {
  [PackageManager.NPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'audit',
        },
        {
          order: 2,
          value: 'fix',
          condition: argv.fix === true,
        },
      ],
      options: [
        {
          name: '--audit-level',
          value: argv.auditLevel,
        },
      ],
    };

    if (argv.production) {
      meta.options.push({
        name: '--only',
        value: 'prod',
      })
    }

    if (argv.development) {
      meta.options.push({
        name: '--only',
        value: 'dev',
      })
    }

    return meta;
  },
  [PackageManager.YARN]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'audit',
        },
      ],
      options: [
        {
          name: '--level',
          value: argv.auditLevel,
        },
      ],
    };

    if (argv.fix) {
      throw new NotSupportedError('audit --fix', PackageManager.YARN);
    }

    if (argv.production || argv.development) {
      const groups = [];

      if (argv.production) groups.push('dependencies');
      if (argv.development) groups.push('devDependencies');
      
      meta.options.push({
        name: '--groups',
        value: `"${groups.join(' ')}"`
      })
    }

    return meta;
  },
  [PackageManager.PNPM]: (argv) => {
    const meta: MetaConstructorsCommandMeta = {
      positionals: [
        {
          order: 1,
          value: 'audit',
        },
      ],
      options: [
        {
          name: '--prod',
          value: argv.production,
        },
        {
          name: '--dev',
          value: argv.development,
        },
        {
          name: '--fix',
          value: argv.fix,
        },
      ],
    };

    return meta;
  },
};

const commandModule: MyCommandModule<typeof builder> = {
  command: 'audit',
  describe: 'Run a security audit',
  // See README.md ## FAQ
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  builder,
  handler: createBaseCommandHandler(metaConstructors),
};

export default commandModule;
