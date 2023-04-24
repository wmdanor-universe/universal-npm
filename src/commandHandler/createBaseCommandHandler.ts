import { MetaConstructors, MyCommandBuilder, MyCommandModuleU } from './types';
import { executeCommand } from '../io/executeCommand';
import { CommandMeta, generateCommand } from './generateCommand';

export function createBaseCommandHandler<BuilderType extends MyCommandBuilder>(metaConstructors: MetaConstructors<BuilderType>) {
  return async function baseCommandHandler(argv: MyCommandModuleU<BuilderType>) {
    const { getPackageManager } = await import('../packageManager/getPackageManager');
    const packageManager = await getPackageManager();
    const meta: CommandMeta = {
      packageManager,
      ...metaConstructors[packageManager](argv),
    };

    const generatedCommand = generateCommand(meta);

    await executeCommand(generatedCommand);
  }
}
