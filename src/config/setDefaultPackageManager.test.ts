import { setDefaultPackageManager } from './setDefaultPackageManager';
import { updateConfig } from './updateConfig';
import { PackageManager } from '../packageManager/packageManager';

jest.mock('./updateConfig');

const updateConfigMock = jest.mocked(updateConfig);

describe('config/setDefaultPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call updateConfigFile with the correct argument', async () => {
    const mockPackageManager = PackageManager.YARN;

    await setDefaultPackageManager(mockPackageManager);

    expect(updateConfigMock).toHaveBeenCalledWith({
      defaultPm: mockPackageManager,
    });
  });
});
