import { createConfigFileIfNotExists } from './internal/createConfigFileIfNotExists';
import { updateConfigFile } from './internal/updateConfigFile';
import { UnpmConfig } from './types';

export async function updateConfig(
  init: Partial<UnpmConfig>,
): Promise<UnpmConfig> {
  return (
    (await createConfigFileIfNotExists(init)) ?? (await updateConfigFile(init))
  );
}
