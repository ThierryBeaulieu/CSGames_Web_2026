import { SpriteGenerator, SpriteResult } from '../utils/spriteGenerator';
import marioPixels from './sprite.service.helper';

class SpriteService {
  spriteGenerator = new SpriteGenerator({
    pixelSize: 20,
    tmpDir: 'tmp',
    spriteDir: 'sprites',
  });

  async getMainCharacter() {
    const result: SpriteResult = await this.spriteGenerator.generate(marioPixels);
    return result;
  }

  async getBackground() {
    return 'getBackground service is working';
  }

  async getMysteryBlock() {
    return 'getMysteryBlock service is working';
  }
}

export default SpriteService;
