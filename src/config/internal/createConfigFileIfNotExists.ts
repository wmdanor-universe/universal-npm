import { UnpmConfig } from '../types';
import { doesConfigFileExist } from './doesConfigFileExist';
import { createConfigFile } from './createConfigFile';

export async function createConfigFileIfNotExists(init?: Partial<UnpmConfig>): Promise<UnpmConfig | null> {
  if (!await doesConfigFileExist()) {
    return createConfigFile(init);
  }

  return null;
}
