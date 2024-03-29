import { contextBridge, ipcRenderer } from 'electron'
import { Bootstrap } from '@gmcl/runtime-api'

const bootstrap: Bootstrap = {
  preset() {
    return ipcRenderer.invoke('preset')
  },
  bootstrap(...preset: any[]) {
    return ipcRenderer.invoke('bootstrap', ...preset)
  },
}

contextBridge.exposeInMainWorld('bootstrap', bootstrap)
