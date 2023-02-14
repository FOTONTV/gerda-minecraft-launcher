# Server Info Module

[![npm version](https://img.shields.io/npm/v/@gmcl/nbt.svg)](https://www.npmjs.com/package/@gmcl/nbt)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/nbt.svg)](https://npmjs.com/@gmcl/nbt)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/nbt)](https://packagephobia.now.sh/result?p=@gmcl/nbt)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/voxelum/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/voxelum/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

Provide function to parse server info (servers.dat)

## Usage

### Read and Write Server Info

```ts
import { readInfo, writeInfo, ServerInfo } from "@gmcl/server-info";

const seversDatBuffer: Buffer; // this is the servers.dat under .minecraft folder
const infos: ServerInfo[] = await readInfo(seversDatBuffer);
const info: ServerInfo = infos[0];

// info.ip -> server ip
// info.name -> server name
```
