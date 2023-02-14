import { Configuration } from 'electron-builder'
import { config as dotenv } from 'dotenv'

dotenv()

export const config = {
  productName: 'Gerda Minecraft Launcher',
  appId: 'gmcl',
  directories: {
    output: 'build/output',
    buildResources: 'build',
    app: '.',
  },
  protocols: {
    name: 'GMCL',
    schemes: ['gmcl'],
  },
  // assign publish for auto-updater
  // set this to your own repo!
  publish: [{
    provider: 'github',
    owner: 'GerdaMC',
    repo: 'gerda-minecraft-launcher',
  }],
  files: [
    'dist/**/*',
  ],
  asarUnpack: [
    '**/assets/**/*.cs',
    '**/assets/**/*.node',
    '**/assets/**/*.lib',
    '**/assets/**/*.so',
    '**/assets/**/*.dll',
    '**/assets/**/*.vbs',
    '**/*.worker.js',
  ],
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: 'gmcl-${version}-${platform}-${arch}.${ext}',
  appx: {
    // eslint-disable-next-line no-template-curly-in-string
    artifactName: 'gmcl-${version}.${ext}',
    displayName: 'Gerda Minecraft Launcher',
    applicationId: 'FOTONTV.GMCL',
    identityName: 'GMCL',
    backgroundColor: 'transparent',
    publisher: process.env.APPX_PUBLISHER ? Buffer.from(process.env.APPX_PUBLISHER!, 'base64').toString('utf8') : undefined,
    publisherDisplayName: 'FOTONTV',
    setBuildNumber: true,
    languages: ['en-US', 'zh-CN', 'ru'],
  },
  dmg: {
    // eslint-disable-next-line no-template-curly-in-string
    artifactName: 'gmcl-${version}.${ext}',
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  mac: {
    icon: 'icons/dark.icns',
    darkModeSupport: true,
    target: [
      {
        target: 'zip',
      },
      {
        target: 'dmg',
      },
    ],
  },
  win: {
    extraFiles: {
      from: './build/extra',
      to: '.',
      filter: '*.dll',
    },
    certificateFile: undefined as string | undefined,
    artifactName: process.env.BUILD_TARGET === 'appx'
      // eslint-disable-next-line no-template-curly-in-string
      ? 'gmcl-${version}.${ext}'
      // eslint-disable-next-line no-template-curly-in-string
      : 'gmcl-${version}-${platform}-${arch}.${ext}',
    icon: 'icons/dark.ico',
    files: [
      '**/*.cs',
      '**/*.worker.js',
    ],
    target: [
      process.env.BUILD_TARGET === 'appx'
        ? 'appx'
        : {
          target: 'zip',
          arch: [
            'x64',
            'ia32',
          ],
        },
    ],
  },
  linux: {
    desktop: {
      MimeType: 'x-scheme-handler/gmcl',
    },
    category: 'Game',
    icon: 'icons/dark@256x256.png',
    // eslint-disable-next-line no-template-curly-in-string
    artifactName: 'gmcl-${version}-${arch}.${ext}',
    target: process.env.BUILD_TARGET === 'appimage'
      ? 'AppImage'
      : [
        'deb',
        'rpm',
        'zip',
        'tar.xz',
      ],
  },
  snap: {
    publish: [
      'github',
    ],
  },
} satisfies Configuration

