# Gamesetting Module

[![npm version](https://img.shields.io/npm/v/@gmcl/gamesetting.svg)](https://www.npmjs.com/package/@gmcl/gamesetting)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/gamesetting.svg)](https://npmjs.com/@gmcl/gamesetting)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/gamesetting)](https://packagephobia.now.sh/result?p=@gmcl/gamesetting)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/voxelum/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/voxelum/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

Provide function to parse Minecraft game settings

## Usage 

### Parse GameSetting (options.txt)

Serialize/Deserialize the minecraft game setting string.

```ts
    import { GameSetting } from '@gmcl/gamesetting'
    const settingString;
    const setting: GameSetting = GameSetting.parse(settingString);
    const string: string = GameSetting.stringify(setting);
```
