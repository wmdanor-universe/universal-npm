import { readFile } from 'fs/promises';
import { UnpmConfig } from '../types';
import { configFileLocation, defaultConfig } from './constants';
import { validateConfig } from './validateConfig';
import { printError } from '../../utils/printError';

export async function readConfigFile(): Promise<UnpmConfig> {
  const config = await readFile(configFileLocation, 'utf-8').then(JSON.parse);

  const validationErrors = await validateConfig(config);

  if (validationErrors) {
    printError(`Error: config file is broken, using fallback to the default config, errors: ${JSON.stringify(validationErrors, null, 2)}`);

    return defaultConfig;
  }

  return {
    ...defaultConfig,
    ...config,
  };
}
