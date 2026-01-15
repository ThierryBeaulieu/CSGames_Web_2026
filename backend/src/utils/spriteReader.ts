import path from 'node:path';
import { SpriteResult } from './spriteResult';
import { readFile } from 'node:fs/promises';

export class SpriteReader {
  async readPNG(fileName: string): Promise<SpriteResult> {
    const imagePath = path.join(__dirname, '../database', `${fileName}.png`);
    const result = await readFile(imagePath);
    return {
      buffer: result,
    };
  }
}
