# ASM Module

[![npm version](https://img.shields.io/npm/v/@gmcl/asm.svg)](https://www.npmjs.com/package/@gmcl/asm)
[![Downloads](https://img.shields.io/npm/dm/@gmcl/asm.svg)](https://npmjs.com/@gmcl/asm)
[![Install size](https://packagephobia.now.sh/badge?p=@gmcl/asm)](https://packagephobia.now.sh/result?p=@gmcl/asm)
[![npm](https://img.shields.io/npm/l/@gmcl/minecraft-launcher-core.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/blob/master/LICENSE)
[![Build Status](https://github.com/GerdaMC/minecraft-launcher-core-node/workflows/Build/badge.svg)](https://github.com/GerdaMC/minecraft-launcher-core-node/actions?query=workflow%3ABuild)

Provide some functions to query Minecraft server status.

## Usage

### Visit java class in jar file

The usage is just like asm library in java:

```ts
    import { AnnotationVisitor, ClassReader, ClassVisitor, MethodVisitor, Opcodes } from '@gmcl/asm'


    class CustomClassVisitor extends ClassVisitor {
        public constructor() {
            super(Opcodes.ASM5);
        }

        // visit the class 
        visit(version: number, access: number, name: string, signature: string, superName: string, interfaces: string[]): void {
        }

        // visit method
        public visitMethod(access: number, name: string, desc: string, signature: string, exceptions: string[]) {
            return null;
        }

        // visit field
        public visitField(access: number, name: string, desc: string, signature: string, value: any) {
            return null;
        }
    }

    const visitor = new CustomClassVisitor();
    const classData: Buffer = await fs.readFile("path/to/some.class");
    new ClassReader(classData).accept(visitor);
```
