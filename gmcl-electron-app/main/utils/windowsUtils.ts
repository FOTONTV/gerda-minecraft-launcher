import ElectronLauncherApp from '@/ElectronLauncherApp'

export function getWindowsUtils(app: ElectronLauncherApp) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const utils = require('@gmcl/windows-utils')
    app.log('Success to load windows utils!')
    return utils as typeof import('@gmcl/windows-utils')
  } catch (e) {
    app.warn('Fail to load windows utils!')
    return undefined
  }
}
