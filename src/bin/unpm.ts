#!/usr/bin/env node
import runUnpmEntryPoint from '../entryPoints/unpm';
import { NotSupportedError } from '../errors/NotSupportedError';
import { printError } from '../io/printError';
import { exit } from '../process/exit';

export async function execute(argv: string[]) {
  await runUnpmEntryPoint(argv).catch(error => {
    if (error instanceof NotSupportedError) {
      printError(`${NotSupportedError.name}: ${error.message}`);
    } else {
      printError(`Error: ${error?.message ?? error}`);
    }

    exit('error');
  });
}

if (require.main === module) {
  execute(process.argv);
}
