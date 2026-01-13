const SpriteGenerator = require('../utils/spriteGenerator');
const { marioPixels } = require('./sprite.service.helper');

class SpriteService {
  spriteGenerator = new SpriteGenerator({
    pixelSize: 20,
    tmpDir: 'tmp',
    spriteDir: 'sprites',
  });

  async getMainCharacter() {
    const result = await this.spriteGenerator.generate(marioPixels);
    return result;
  }

  async getBackground() {
    return 'getBackground service is working';
  }

  async getMysteryBlock() {
    return 'getMysteryBlock service is working';
  }
}

module.exports = { SpriteService };
