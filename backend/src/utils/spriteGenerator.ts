const { createCanvas } = require('canvas');
import { promises as fsPromises, existsSync, mkdirSync } from 'fs';
const path = require('path');
const crypto = require('crypto');

interface SpriteGeneratorOptions {
  pixelSize?: number;
  tmpDir?: string;
  spriteDir?: string;
}

export interface SpriteResult {
  id: string;
  base64: string;
  tmpPath: string;
  spritePath: string;
}

export class SpriteGenerator {
  private pixelSize: number;
  private tmpDir: string;
  private spriteDir: string;

  constructor({
    pixelSize = 16,
    tmpDir = 'tmp',
    spriteDir = 'sprites',
  }: SpriteGeneratorOptions = {}) {
    this.pixelSize = pixelSize;
    this.tmpDir = tmpDir;
    this.spriteDir = spriteDir;

    this.ensureDir(tmpDir);
    this.ensureDir(spriteDir);
  }

  private ensureDir(dir: string) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Generate a sprite from a 2D pixel array
   * @param pixels 2D array of colors (strings like "#ff0000") or null
   */
  async generate(pixels: (string | null)[][]): Promise<SpriteResult> {
    const height = pixels.length;
    const width = pixels[0]!.length;

    const canvas: any = createCanvas(width * this.pixelSize, height * this.pixelSize);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = pixels![y]![x];
        if (!color) continue;

        ctx.fillStyle = color;
        ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
      }
    }

    const buffer = canvas.toBuffer('image/png');
    const base64 = buffer.toString('base64');

    // Unique sprite id
    const id = crypto.randomUUID();
    const fileName = `${id}.png`;

    const tmpPath = path.join(this.tmpDir, fileName);
    const spritePath = path.join(this.spriteDir, fileName);

    // Async write to tmp
    await fsPromises.writeFile(tmpPath, buffer);

    // Async copy to sprites
    await fsPromises.copyFile(tmpPath, spritePath);

    return {
      id,
      base64: `data:image/png;base64,${base64}`,
      tmpPath,
      spritePath,
    };
  }
}
