const { createCanvas } = require('canvas');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class SpriteGenerator {
  constructor({ pixelSize = 16, tmpDir = 'tmp', spriteDir = 'sprites' } = {}) {
    this.pixelSize = pixelSize;
    this.tmpDir = tmpDir;
    this.spriteDir = spriteDir;

    this.ensureDir(tmpDir);
    this.ensureDir(spriteDir);
  }

  ensureDir(dir) {
    const fsSync = require('fs');
    if (!fsSync.existsSync(dir)) {
      fsSync.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * @param {Array<Array<string|null>>} pixels
   */
  async generate(pixels) {
    const height = pixels.length;
    const width = pixels[0].length;

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
    const base64 = buffer.toString('base64');

    // Unique sprite id
    const id = crypto.randomUUID();
    const fileName = `${id}.png`;

    const tmpPath = path.join(this.tmpDir, fileName);
    const spritePath = path.join(this.spriteDir, fileName);

    // Async write to tmp
    await fs.writeFile(tmpPath, buffer);

    // Async copy to sprites
    await fs.copyFile(tmpPath, spritePath);

    return {
      id,
      base64: `data:image/png;base64,${base64}`,
      tmpPath,
      spritePath,
    };
  }
}

module.exports = SpriteGenerator;
