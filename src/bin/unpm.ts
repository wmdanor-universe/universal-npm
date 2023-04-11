#!/usr/bin/env node
import runUnpmEntryPoint from '../entryPoints/unpm';
import { NotSupportedError } from '../errors/NotSupportedError';
import { printError } from '../utils/printError';

export async function execute() {
  await runUnpmEntryPoint().catch((error) => {
    if (error instanceof NotSupportedError) {
      printError(`${NotSupportedError.name}: ${error.message}`);
    } else {
      printError(`Error: ${error?.message ?? error}`);
    }
  
    process.exit(1);
  });
}

if (require.main === module) {
  execute();
}
