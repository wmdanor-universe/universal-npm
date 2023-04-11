import { getNodeVersion } from "./getNodeVersion";

describe('utils/getNodeVersion', () => {
  it('returns "process.version" value', () => {
    expect(getNodeVersion()).toBe(process.version);
  })
});
