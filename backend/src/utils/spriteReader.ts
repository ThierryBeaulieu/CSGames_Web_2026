import path from 'node:path';
import { SpriteResult } from './spriteGenerator';
import { readFile } from 'node:fs/promises';

export class SpriteREader {
  async readPNG(fileName: string): Promise<SpriteResult> {
    const imagePath = path.join(__dirname, '../database', `${fileName}.png`);
    const result = await readFile(imagePath);
    return {
      buffer: result,
    };
  }

  async readGIF(fileName: string): Promise<SpriteResult> {
    const imagePath = path.join(__dirname, '../database', `${fileName}.gif`);
    const result = await readFile(imagePath);
    return {
      buffer: result,
    };
  }
}
