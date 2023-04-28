import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { printText } from '../io/printText';

export default async function run(): Promise<void> {
  try {
    const versionFileLocation = resolve(
      __dirname,
      '..',
      '..',
      'generated',
      'version.txt',
    );
    const versionText = await readFile(versionFileLocation, 'utf-8');

    printText(versionText);
  } catch {
    throw new Error('Unable to read version information');
  }
}
