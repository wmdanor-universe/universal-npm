import { validateConfig } from './validateConfig';
import { UnpmConfig } from '../types';

describe('config/internal/validateConfig', () => {
  it('should return null if the config is valid', async () => {
    const validConfig: UnpmConfig = {
      defaultPm: 'yarn',
    };

    const result = await validateConfig(validConfig);

    expect(result).toBeNull();
  });

  it('should return an array of errors if the config is not valid', async () => {
    const invalidConfig = {
      defaultPm: 'invalidPm',
    } as unknown as UnpmConfig;

    const result = await validateConfig(invalidConfig);

    expect(result).toBeInstanceOf(Array);
    expect(result?.length).toBeGreaterThan(0);
  });

  it('should return an error if a required property is missing', async () => {
    const missingPropertyConfig = {} as unknown as UnpmConfig;

    const result = await validateConfig(missingPropertyConfig);

    expect(result).toBeInstanceOf(Array);
    expect(result?.length).toBeGreaterThan(0);
  });
});
