const SpriteGenerator = require('../utils/spriteGenerator');
const { marioPixels } = require('./sprite.service.helper');

class SpriteService {
  spriteGenerator = new SpriteGenerator({
    pixelSize: 20,
    tmpDir: 'tmp',
    spriteDir: 'sprites',
  });

  async getMainCharacter() {
    console.log('This is called');
    const result = await this.spriteGenerator.generate(marioPixels);
    console.log('Base64 length:', result.base64.length);
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
