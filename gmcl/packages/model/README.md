# Model Module

[![npm version](https://img.shields.io/npm/v/@gmcl/model.svg)](https://www.npmjs.com/package/@gmcl/model)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/model.svg)](https://npmjs.com/@gmcl/model)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/model)](https://packagephobia.now.sh/result?p=@gmcl/model)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/voxelum/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/voxelum/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)
[![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/emersion/stability-badges#experimental)

*This module can only used for browser environment*

## Usage

### Build THREE.js model for block and player

*Please read how to use [resourcepacks](https://github.com/GerdaMC/minecraft-launcher-core-node/tree/master/packages/resourcepack/README.md) before this*

Create THREE.js block model:

```ts
    import { BlockModelFactory } from "@gmcl/model";

    const textureRegistry: TextureRegistry;

    const factory = new BlockModelFactory(textureRegistry);
    const model: BlockModel.Resolved;
    const o3d: THREE.Object3D = factory.getObject(model);
    // add o3d to your three scene
```

Create THREE.js player model:

```ts
    import { PlayerModel } from "@gmcl/model";

    const player: PlayerModel = new PlayerModel();
    const isSlimSkin: boolean; // if this skin use alex model
    player.setSkin("http://your-skin-url", isSlimSkin);

    const o3d: THREE.Object3D = player.playerObject3d;
    // add o3d to your three scene
```