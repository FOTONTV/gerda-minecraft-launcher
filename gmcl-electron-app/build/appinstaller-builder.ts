import { writeFile } from 'fs-extra'

function getAppInstallerContent(version: string, publisher: string) {
  const result = `<?xml version="1.0" encoding="utf-8"?>
  <AppInstaller
      xmlns="http://schemas.microsoft.com/appx/appinstaller/2018"
      Version="${version}.0"
      Uri="https://gmcl.blob.core.windows.net/releases/gmcl.appinstaller" >
      <MainPackage
          Name="GMCL"
          Publisher="${publisher}"
          Version="${version}.0"
          ProcessorArchitecture="x64"
          Uri="https://gmcl-release-ms.azureedge.net/releases/gmcl-${version}.appx" />
      <UpdateSettings>
          <OnLaunch HoursBetweenUpdateChecks="0"/>
      </UpdateSettings>
  </AppInstaller>`
  return result.padEnd(1024, ' ')
}

export async function buildAppInstaller(version: string, destination: string, publisher: string) {
  await writeFile(destination, getAppInstallerContent(version, publisher))
}
