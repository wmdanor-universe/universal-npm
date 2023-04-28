import type { CommandModule, CommandBuilder } from 'yargs';
import type { CommandMeta } from './generateCommand';
import type { PackageManager } from '../packageManager/packageManager';

// eslint-disable-next-line @typescript-eslint/ban-types
export type MyCommandBuilder<T = {}, U = {}> = Extract<
  CommandBuilder<T, U>,
  Function
>;
export type MyCommandModuleT<BuilderType extends MyCommandBuilder> =
  Parameters<BuilderType>[0];
export type MyCommandModuleU<BuilderType extends MyCommandBuilder> = Exclude<
  Awaited<ReturnType<BuilderType>>['argv'],
  Promise<unknown>
>;
export type MyCommandModule<BuilderType extends MyCommandBuilder> =
  CommandModule<MyCommandModuleT<BuilderType>, MyCommandModuleU<BuilderType>>;

export type MyArgv<BuilderType extends MyCommandBuilder> =
  MyCommandModuleU<BuilderType>;

export type MetaConstructorsCommandMeta = Omit<CommandMeta, 'packageManager'>;
export type MetaConstructors<
  BuilderType extends MyCommandBuilder = MyCommandBuilder,
> = Record<
  PackageManager,
  (argv: MyCommandModuleU<BuilderType>) => MetaConstructorsCommandMeta
>;
