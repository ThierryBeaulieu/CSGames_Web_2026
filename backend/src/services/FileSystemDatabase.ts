import path from 'node:path';
import { readFile } from 'node:fs/promises';
import IDatabase from './IDatabase';

export class FileSystemDatabase implements IDatabase {
  async getAsset(fileName: string): Promise<Buffer> {
    const imagePath = path.join(__dirname, '../database', `${fileName}.png`);
    return await readFile(imagePath);
  }
}
