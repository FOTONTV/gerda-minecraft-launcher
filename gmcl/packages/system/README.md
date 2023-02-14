# Common Module

[![npm version](https://img.shields.io/npm/v/@gmcl/system.svg)](https://www.npmjs.com/package/@gmcl/system)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/system.svg)](https://npmjs.com/@gmcl/system)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/system)](https://packagephobia.now.sh/result?p=@gmcl/system)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/voxelum/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/voxelum/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

A unified API to read directory or zip.

Support both nodejs and browser.

You can do read operations for zip or directory in same API:

```ts
import { openFileSystem } from "@gmcl/system";

let filePath = "/path/to/dir/"
const fs = await openFileSystem(filePath);
fs.readFile("a.txt"); // read /path/to/dir/a.txt

let zipPath = "/path/to/file.zip"
const fs = await openFileSystem(zipPath);
fs.readFile("a.txt"); // read a.txt in the file.zip!
```


