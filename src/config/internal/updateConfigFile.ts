import { writeFile, readFile } from 'fs/promises';
import { UnpmConfig } from '../types';
import { configFileLocation } from './constants';
import { validateConfig } from './validateConfig';

export async function updateConfigFile(init: Partial<UnpmConfig>): Promise<UnpmConfig> {
  const currentConfig = await readFile(configFileLocation, 'utf-8').then(JSON.parse);

  const currentConfigErrors = await validateConfig(currentConfig);

  if (currentConfigErrors) {
    throw new Error(`Config file is broken, updating impossible, errors: ${JSON.stringify(currentConfigErrors, null, 2)}`);
  }

  const newConfig = { ...currentConfig, ...init };

  const newConfigErrors = await validateConfig(newConfig);

  if (newConfigErrors) {
    throw new Error(`Updated config failed the validation, errors: ${JSON.stringify(newConfigErrors, null, 2)}`);
  }

  await writeFile(configFileLocation, JSON.stringify(newConfig, null, 2));

  return newConfig;
}
