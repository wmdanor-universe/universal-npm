import { PackageManager } from "../packageManager/packageManager";

export interface CommandMeta {
  packageManager: PackageManager;
  positionals: CommandMetaPositional[];
  options: CommandMetaOption[];
}

export interface CommandMetaPositional {
  order: number;
  value: string | string[] | undefined;
  condition?: boolean;
}

export interface CommandMetaOption {
  name: string;
  value: boolean | string | number | undefined | null;
}

interface SortedPositional {
  order: number;
  value: string | string[];
}

export function generateCommand(meta: CommandMeta): string {
  const commandParts: string[] = [`${meta.packageManager}`];

  const predicate = (v: CommandMetaPositional): v is SortedPositional => {
    if (v.condition === false) return false;
    if (v.value === undefined) return false;
    if (v.value.length === 0) return false;

    return true;
  }

  const sortedPositionals = meta.positionals
    .slice()
    .filter(predicate)
    .sort((a, b) => a.order - b.order)

  for (const { value } of sortedPositionals) {
    if (Array.isArray(value)) {
      commandParts.push(...value);
    } else {
      commandParts.push(value);
    }
  }

  for (const { name, value } of meta.options) {
    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'boolean' && value) {
      commandParts.push(name);

      continue;
    }

    commandParts.push(`${name}=${value}`);
  }

  return commandParts.join(' ');
}
