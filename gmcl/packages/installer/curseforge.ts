import { MinecraftFolder, MinecraftLocation } from "@gmcl/core";
import { task, Task } from "@gmcl/task";
import { open, readAllEntries, readEntry } from "@gmcl/unzip";
import { basename, join } from "path";
import { Dispatcher, request } from 'undici';
import { Entry, ZipFile } from "yauzl";
import { DownloadTask } from "./downloadTask";
import { DownloadBaseOptions } from './http';
import { UnzipTask } from "./unzip";
import { errorToString, ParallelTaskOptions } from "./utils";

export interface CurseforgeOptions extends DownloadBaseOptions, ParallelTaskOptions {
    /**
     * The function to query a curseforge project downloadable url.
     */
    queryFileUrl?: CurseforgeURLQuery;
    /**
     * Should it replace the override files if the file is existed.
     */
    replaceExisted?: boolean;
    /**
     * Overload the manifest for this installation.
     * It will use this manifest instead of the read manifest from modpack zip to install.
     */
    manifest?: Manifest;
    /**
     * The function to resolve the file path from url and other.
     *
     * By default this will install all the file
     */
    filePathResolver?: FilePathResolver;
}

export interface InstallFileOptions extends DownloadBaseOptions {
    /**
     * The function to query a curseforge project downloadable url.
     */
    queryFileUrl?: CurseforgeURLQuery;
}

type InputType = string | Buffer | { zip: ZipFile; entries: Entry[] };

export interface Manifest {
    manifestType: string;
    manifestVersion: number;
    minecraft: {
        /**
         * Minecraft version
         */
        version: string;
        libraries?: string;
        /**
         * Can be forge
         */
        modLoaders: {
            id: string;
            primary: boolean;
        }[];
    };
    name: string;
    version: string;
    author: string;
    files: {
        projectID: number;
        fileID: number;
        required: boolean;
    }[];
    overrides: string;
}

export interface File {
    projectID: number;
    fileID: number;
}

export class BadCurseforgeModpackError extends Error {
    error = "BadCurseforgeModpack"

    constructor(public modpack: InputType,
        /**
         * What required entry is missing in modpack.
         */
        public entry: string) {
        super(`Missing entry ${entry} in curseforge modpack: ${modpack}`);
    }
}

/**
 * Read the manifest data from modpack
 * @throws {@link BadCurseforgeModpackError}
 */
export function readManifestTask(input: InputType): Task<Manifest> {
    return task("unpack", async () => {
        const zip = await normalizeInput(input);
        const manifestEntry = zip.entries.find((e) => e.fileName === "manifest.json");
        if (!manifestEntry) {
            throw new BadCurseforgeModpackError(input, "manifest.json");
        }
        const buffer = await readEntry(zip.zip, manifestEntry)
        const content: Manifest = JSON.parse(buffer.toString());
        return content;
    })
}

/**
 * Read the mainifest data from modpack
 * @throws {@link BadCurseforgeModpackError}
 */
export function readManifest(zip: InputType) {
    return readManifestTask(zip).startAndWait();
}

export type FilePathResolver = (projectId: number, fileId: number, minecraft: MinecraftFolder, url: string) => string | Promise<string>;
export type CurseforgeURLQuery = (projectId: number, fileId: number) => Promise<string>;
export type CurseforgeFileTypeQuery = (projectId: number) => Promise<"mods" | "resourcepacks">;

export function createDefaultCurseforgeQuery(dispatcher?: Dispatcher): CurseforgeURLQuery {
    return (projectId, fileId) => request(`https://addons-ecs.forgesvc.net/api/v2/addon/${projectId}/file/${fileId}/download-url`, { dispatcher }).then(r => r.body.json());
}
/**
 * Install curseforge modpack to a specific Minecraft location.
 *
 * @param zip The curseforge modpack zip buffer or file path
 * @param minecraft The minecraft location
 * @param options The options for query curseforge
 */
export function installCurseforgeModpack(zip: InputType, minecraft: MinecraftLocation, options?: CurseforgeOptions) {
    return installCurseforgeModpackTask(zip, minecraft, options).startAndWait();
}

async function normalizeInput(input: InputType): Promise<{ zip: ZipFile; entries: Entry[] }> {
    if (typeof input === "string" || input instanceof Buffer) {
        const zip = await open(input, { lazyEntries: true, autoClose: false });
        return { zip, entries: await readAllEntries(zip) }
    } else {
        return input;
    }
}

/**
 * Install curseforge modpack to a specific Minecraft location.
 *
 * This will NOT install the Minecraft version in the modpack, and will NOT install the forge or other modload listed in modpack!
 * Please resolve them by yourself.
 *
 * @param input The curseforge modpack zip buffer or file path
 * @param minecraft The minecraft location
 * @param options The options for query curseforge
 * @throws {@link BadCurseforgeModpackError}
 */
export function installCurseforgeModpackTask(input: InputType, minecraft: MinecraftLocation, options: CurseforgeOptions = {}) {
    return task("installCurseforgeModpack", async function () {
        const folder = MinecraftFolder.from(minecraft);
        const zip = await normalizeInput(input);
        const manifest = options?.manifest ?? (await this.yield(readManifestTask(zip)));
        const requestor = options?.queryFileUrl || createDefaultCurseforgeQuery();
        const resolver = options?.filePathResolver || ((p, f, m, u) => m.getMod(basename(u)));
        const tasks = await Promise.all(manifest.files.map(async (f) => {
            const from = await requestor(f.projectID, f.fileID);
            const to = await resolver(f.projectID, f.fileID, folder, from);

            return new DownloadTask({
                url: from,
                destination: to,
                agent: options.agent,
                headers: options.headers,
            }).setName("download");
        }));
        await this.all(tasks, {
            throwErrorImmediately: options.throwErrorImmediately ?? false,
            getErrorMessage: (errs) => `Fail to install curseforge modpack to ${folder.root}: ${errs.map(errorToString).join("\n")}`
        });
        await this.yield(new UnzipTask(
            zip.zip,
            zip.entries.filter((e) => !e.fileName.endsWith("/") && e.fileName.startsWith(manifest.overrides)),
            folder.root,
            (e) => e.fileName.substring(manifest.overrides.length)
        ).setName("unpack"));
        return manifest;
    });
}

/**
 * Install a curseforge xml file to a specific locations
 */
export function installCurseforgeFile(file: File, destination: string, options?: InstallFileOptions) {
    return installCurseforgeFileTask(file, destination, options).startAndWait();
}

/**
 * Install a curseforge xml file to a specific locations
 */
export function installCurseforgeFileTask(file: File, destination: string, options: InstallFileOptions = {}) {
    return task("installCurseforgeFile", async function () {
        const requestor = options.queryFileUrl || createDefaultCurseforgeQuery();
        const url = await requestor(file.projectID, file.fileID);
        await new DownloadTask({
            url,
            destination: join(destination, basename(url)),
            agent: options.agent,
            headers: options.headers,
        }).startAndWait(this.context, this.parent);
    });
}
