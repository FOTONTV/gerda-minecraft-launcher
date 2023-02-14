# Curseforge API

[![npm version](https://img.shields.io/npm/v/@gmcl/curseforge.svg)](https://www.npmjs.com/package/@gmcl/curseforge)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/curseforge.svg)](https://npmjs.com/@gmcl/curseforge)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/curseforge)](https://packagephobia.now.sh/result?p=@gmcl/curseforge)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/voxelum/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/voxelum/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

Provide the curseforge (twitch) API in https://twitchappapi.docs.apiary.io/

## Usage

### Find Curseforge Mods by search keyword

You can use keyword to search

```ts
    import { searchAddons, SearchOptions } from '@gmcl/curseforge'
    const searchOptions: SearchOptions = {
        categoryId: 6, // 6 is mod,
    };
    const addons: AddonInfo[] = await searchAddons(searchOptions);
```
