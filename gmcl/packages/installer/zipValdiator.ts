import { ValidationError, Validator } from './http/validator';
import { FileHandle } from 'fs/promises';
import { open } from '@gmcl/unzip'

export class ZipValidator implements Validator {
  async validate(fd: FileHandle, destination: string, url: string): Promise<void> {
    try {
      const file = await open(fd.fd, { autoClose: false, lazyEntries: true })
      file.close();
    } catch (e) {
      throw new ValidationError("InvalidZipError", (e as any).message)
    }
  }
}