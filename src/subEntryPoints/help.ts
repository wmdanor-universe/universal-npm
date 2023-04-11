import { readFile } from "fs/promises";
import { resolve } from "path";

export default async function run(): Promise<void> {
  try {
    const helpFileLocation = resolve(__dirname, '..', '..', 'generated', 'help.txt');
    const helpText = await readFile(helpFileLocation, 'utf-8');

    console.log(helpText);
  } catch {
    throw new Error('Unable to read help information');
  }
}
