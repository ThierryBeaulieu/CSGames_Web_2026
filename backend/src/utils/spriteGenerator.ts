const { createCanvas } = require('canvas');

interface SpriteGeneratorOptions {
  pixelSize?: number;
  tmpDir?: string;
  spriteDir?: string;
}

export interface SpriteResult {
  buffer: Buffer;
}

export class SpriteGenerator {
  private pixelSize: number;

  constructor({ pixelSize = 16 }: SpriteGeneratorOptions = {}) {
    this.pixelSize = pixelSize;
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

    return {
      buffer,
    };
  }
}
