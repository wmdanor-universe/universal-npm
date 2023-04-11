import Ajv, { JSONSchemaType } from 'ajv';
import { UnpmConfig } from '../types';

const configSchema: JSONSchemaType<UnpmConfig> = {
  type: 'object',
  properties: {
    defaultPm: {
      type: 'string',
      enum: ['npm', 'yarn', 'pnpm'],
    },
  },
  required: ['defaultPm'],
}

export async function validateConfig(config: UnpmConfig) {
  const ajv = new Ajv();
  const validate = ajv.compile(configSchema);

  const isValid = validate(config);

  if (isValid) {
    return null;
  }

  return validate.errors ?? [];
}
