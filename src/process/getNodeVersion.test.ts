import { getNodeVersion } from './getNodeVersion';

describe('process/getNodeVersion', () => {
  it('returns "process.version" value', () => {
    expect(getNodeVersion()).toBe(process.version);
  });
});
