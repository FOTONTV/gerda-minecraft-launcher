import { ReleaseInfo } from '@gmcl/runtime-api'
import { Task } from '@gmcl/task'

export interface LauncherAppUpdater {
  /**
   * Check update for the x-minecraft-launcher-core
   */
  checkUpdateTask(): Task<ReleaseInfo>

  /**
    * Download the update to the disk. You should first call `checkUpdate`
    */
  downloadUpdateTask(updateInfo: ReleaseInfo): Task<void>

  /**
    * Install update and quit the app.
    */
  installUpdateAndQuit(updateInfo: ReleaseInfo): Promise<void>
}
