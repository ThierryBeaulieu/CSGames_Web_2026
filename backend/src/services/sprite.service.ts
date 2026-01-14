import { SpriteGenerator, SpriteResult } from '../utils/spriteGenerator';
import marioPixels from './sprite.service.helper';

class SpriteService {
  spriteGenerator = new SpriteGenerator({
    pixelSize: 20,
    tmpDir: 'src/tmp',
    spriteDir: 'src/sprites',
  });

  async getMainCharacter(): Promise<SpriteResult> {
    return await this.spriteGenerator.generate(marioPixels);
  }

  async getGround() {
    return 'getGround service is working';
  }

  async getBackground() {
    return 'getBackground service is working';
  }

  async getMysteryBlock() {
    return 'getMysteryBlock service is working';
  }
}

export default SpriteService;
