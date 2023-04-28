import { MetaConstructors, MyCommandBuilder, MyCommandModuleU } from './types';
import { executeCommand } from '../io/executeCommand';
import { CommandMeta, generateCommand } from './generateCommand';

export function createBaseCommandHandler<BuilderType extends MyCommandBuilder>(
  metaConstructors: MetaConstructors<BuilderType>,
) {
  return async function baseCommandHandler(
    argv: MyCommandModuleU<BuilderType>,
  ) {
    const { getPackageManager } = await import(
      '../packageManager/getPackageManager'
    );
    const packageManager = await getPackageManager();
    const meta: CommandMeta = {
      packageManager,
      ...metaConstructors[packageManager](argv),
    };

    const generatedCommand = generateCommand(meta);

    await executeCommand(generatedCommand);
  };
}

createBaseCommandHandler.global = function createBaseCommandHandlerGlobal<
  BuilderType extends MyCommandBuilder<unknown, { global?: boolean }>,
>(metaConstructors: MetaConstructors<BuilderType>) {
  return async function baseCommandHandler(
    argv: MyCommandModuleU<BuilderType>,
  ) {
    const getPackageManager = argv.global
      ? await import('../packageManager/getGlobalPackageManager').then(
          m => m.getGlobalPackageManager,
        )
      : await import('../packageManager/getPackageManager').then(
          m => m.getPackageManager,
        );
    const packageManager = await getPackageManager();
    const meta: CommandMeta = {
      packageManager,
      ...metaConstructors[packageManager](argv),
    };

    const generatedCommand = generateCommand(meta);

    await executeCommand(generatedCommand);
  };
};
