import { createConfigFileIfNotExists } from './internal/createConfigFileIfNotExists';
import { readConfigFile } from './internal/readConfigFile';
import { UnpmConfig } from './types';

export async function getConfig(): Promise<UnpmConfig> {
  return await createConfigFileIfNotExists() ?? await readConfigFile();
}
