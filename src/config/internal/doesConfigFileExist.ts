import { access } from 'fs/promises';
import { configFileLocation } from './constants';

export function doesConfigFileExist(): Promise<boolean> {
  return new Promise(resolve =>
    access(configFileLocation)
      .then(() => resolve(true))
      .catch(() => resolve(false)),
  );
}
