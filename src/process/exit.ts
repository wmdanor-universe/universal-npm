import { printError } from "../io/printError";
import { printText } from "../io/printText";

export function exit(status: 'ok' | 'error' = 'ok', reason?: string): never {
  const code = status === 'ok' ? 0 : 1;

  if (reason) {
    const printer = status === 'ok' ? printText : printError;
    
    printer(reason);
  }

  process.exit(code);
}
