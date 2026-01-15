import path from 'node:path';
import { readFile } from 'node:fs/promises';

export interface SpriteResult {
  buffer: Buffer;
}

export class SpriteReader {
  async readPNG(fileName: string): Promise<SpriteResult> {
    const imagePath = path.join(__dirname, '../database', `${fileName}.png`);
    const result = await readFile(imagePath);
    return {
      buffer: result,
    };
  }
}
