# World Module

[![npm version](https://img.shields.io/npm/v/@gmcl/world.svg)](https://www.npmjs.com/package/@gmcl/world)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/world.svg)](https://npmjs.com/@gmcl/world)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/world)](https://packagephobia.now.sh/result?p=@gmcl/world)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/voxelum/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/voxelum/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

Provides functions to parse Minecraft saves.

## Usage

### Save/World Data Loading

Read the level info from a buffer.

```ts
    import { WorldReader, LevelDataFrame } from '@gmcl/world'
    const worldSaveFolder: string;
    const reader: WorldReader = await WorldReader.create(worldSaveFolder);
    const levelData: LevelDataFrame = await reader.getLevelData();
```

***Preview*** Read the region data, this feature is not tested yet, but the api will look like this

```ts
    import { WorldReader, RegionDataFrame, RegionReader } from "@gmcl/world";
    const worldSaveFolder: string;
    const reader: WorldReader = await WorldReader.create(worldSaveFolder);
    const chunkX: number;
    const chunkZ: number;
    const region: RegionDataFrame = await reader.getRegionData(chunkX, chunkZ);
```

## Some Important Concepts

These concept might help you to understand how to use the API.

### Level

The metadata of one Minecraft save. It contains the info like `when the world is created`, `what is the name of it`, or other metadata.

In code, they are represented by `LevelDataFrame`.

### Region

The Minecraft blocks data are stored in region file (.mca). One region contains 16 sections. Each section contains 16x16x16 blockstates, biome, entities, tileentities and other data. 

For the Minecraft version < 1.13, the mca NBT data store the **global** blockstate ids in `Data` and `Blocks` fields.

For the Minecraft version >= 1.13, the mca NBT data store the **local** blockstate ids in `BlockStates` and a mapping to map the **local** blockstate ids to `BlockState` object.

#### In-Chunk Coord

One chunk (section) in region contains 4096 (16x16x16) blockstates, and they are indexed by [0, 4096). The mapping from x, y, z to index is `(x, y, z) -> y << 8 | z << 4 | x`.
