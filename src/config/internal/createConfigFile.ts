import { writeFile } from 'fs/promises';
import { UnpmConfig } from '../types';
import { configFileLocation, defaultConfig } from './constants';
import { validateConfig } from './validateConfig';

export async function createConfigFile(init?: Partial<UnpmConfig>): Promise<UnpmConfig> {
  const newConfig = { ...defaultConfig, ...(init ?? {}) };

  const newConfigErrors = await validateConfig(newConfig);

  if (newConfigErrors) {
    throw new Error(`Initial config failed the validation, errors: ${JSON.stringify(newConfigErrors, null, 2)}`);
  }

  await writeFile(configFileLocation, JSON.stringify(newConfig, null, 2));

  return newConfig;
}
