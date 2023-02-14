# Client Module

[![npm version](https://img.shields.io/npm/v/@gmcl/client.svg)](https://www.npmjs.com/package/@gmcl/client)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/client.svg)](https://npmjs.com/@gmcl/client)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/client)](https://packagephobia.now.sh/result?p=@gmcl/client)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/GerdaMC/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

Provide some functions to query Minecraft server status.

## Usage

### Ping Minecraft Server  

Read sever info (server ip, port) and fetch its status (ping, server motd):

```ts
    import { queryStatus, Status, QueryOptions } from '@gmcl/client'
    const serverInfo = {
        host: 'your host',
        port: 25565, // be default
    };
    const options: QueryOptions = {
        /**
         * see http://wiki.vg/Protocol_version_numbers
         */
        protocol: 203,
    };
    const rawStatusJson: Status = await fetchStatus(info, options);
```
