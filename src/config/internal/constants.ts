import { resolve } from 'path';
import { UnpmConfig } from '../types';

const homeDir =
  (process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME) ??
  '~';

export const configFileLocation = resolve(homeDir, '.unpmrc');

export const defaultConfig: Readonly<UnpmConfig> = {
  defaultPm: 'npm',
};
