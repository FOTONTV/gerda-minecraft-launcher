import ElectronLauncherApp from '@/ElectronLauncherApp'
import { download } from '@gmcl/installer'
import { BaseTask } from '@gmcl/task'
import { app, shell } from 'electron'
import { join } from 'path'
import { setTimeout } from 'timers/promises'

export type AppxUpdateType = '' | 'Unknown' | 'NoUpdates' | 'Available' | 'Required' | 'Error'

export class DownloadAppInstallerTask extends BaseTask<void> {
  constructor(readonly app: ElectronLauncherApp) {
    super()
  }

  protected async runTask(): Promise<void> {
    const destination = join(app.getPath('downloads'), 'Gerda Minecraft Launcher.appinstaller')
    await download({
      url: 'https://fmcl.fun/releases/gmcl.appinstaller',
      destination: destination,
    })
    shell.showItemInFolder(destination)
    await setTimeout(1000)
    await shell.openPath(destination)
    this.app.exit()
  }

  protected async cancelTask(): Promise<void> {
  }

  protected async pauseTask(): Promise<void> {
  }

  protected async resumeTask(): Promise<void> {
  }
}
