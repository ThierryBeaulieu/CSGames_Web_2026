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
  buffer: Buffer;
  spritePath: string;
}

export class SpriteGenerator {
  private pixelSize: number;
  private spriteDir: string;

  constructor({
    pixelSize = 16,
    tmpDir = 'tmp',
    spriteDir = 'sprites',
  }: SpriteGeneratorOptions = {}) {
    this.pixelSize = pixelSize;
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

    const canvas = createCanvas(width * this.pixelSize, height * this.pixelSize);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = pixels[y][x];
        if (!color) continue;

        ctx.fillStyle = color;
        ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
      }
    }

    const buffer = canvas.toBuffer('image/png');

    const id = crypto.randomUUID();
    const fileName = `${id}.png`;
    const spritePath = path.join(this.spriteDir, fileName);

    // Optional: save to disk
    await fsPromises.writeFile(spritePath, buffer);

    return {
      id,
      buffer,
      spritePath,
    };
  }
}
