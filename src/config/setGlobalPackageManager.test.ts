import { updateConfig } from './updateConfig';
import { PackageManager } from '../packageManager/packageManager';
import { setGlobalPackageManager } from './setGlobalPackageManager';

jest.mock('./updateConfig');

const updateConfigMock = jest.mocked(updateConfig);

describe('config/setGlobalPackageManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call updateConfigFile with the correct argument', async () => {
    const mockPackageManager = PackageManager.YARN;

    await setGlobalPackageManager(mockPackageManager);

    expect(updateConfigMock).toHaveBeenCalledWith({
      globalPm: mockPackageManager,
    });
  });
});
