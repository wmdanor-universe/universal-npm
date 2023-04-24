import { getNodeVersion } from '../process/getNodeVersion';

export default function run(argv: string[]): Promise<void> {
  const [major = 0, minor = 0] = getNodeVersion().slice(1).split('.').map(Number);

  if (major < 14 || major == 14 && minor < 6) {
    throw new Error(`This version of unpm requires at least Node.js v14.6\nThe current version of Node.js is ${process.version}`);
  }

  const argv2 = argv[2];

  if (argv2?.match(/^-?-?h(elp)?$/i)) {
    return import('../subEntryPoints/help').then(m => m.default());
  }

  if (argv2?.match(/^--?v(ersion)?$/i)) {
    return import('../subEntryPoints/version').then(m => m.default());
  }

  if (argv2?.startsWith('-')) {
    throw new Error('Second argument must be: "--help", "--version" or command to invoke (or none if just called as "unpm" to install all packages)');
  }

  return import('../subEntryPoints/command').then(m => m.default(argv, argv2));
}
