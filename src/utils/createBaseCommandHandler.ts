import { MetaConstructors, MyCommandBuilder, MyCommandModuleU } from '../types';
import { executeCommand } from './executeCommand';
import { CommandMeta, generateCommand } from './generateCommand';
import { getPackageManager } from './getPackageManager';

export function createBaseCommandHandler<BuilderType extends MyCommandBuilder>(metaConstructors: MetaConstructors<BuilderType>) {
  return async function baseCommandHandler(argv: MyCommandModuleU<BuilderType>) {
    const packageManager = await getPackageManager();
    const meta: CommandMeta = {
      packageManager,
      ...metaConstructors[packageManager](argv),
    };

    const generatedCommand = generateCommand(meta);

    await executeCommand(generatedCommand);
  }
}
