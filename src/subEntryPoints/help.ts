import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { printText } from '../io/printText';

export default async function run(): Promise<void> {
  try {
    const helpFileLocation = resolve(
      __dirname,
      '..',
      '..',
      'generated',
      'help.txt',
    );
    const helpText = await readFile(helpFileLocation, 'utf-8');

    printText(helpText);
  } catch {
    throw new Error('Unable to read help information');
  }
}
