import { SpriteGenerator, SpriteResult } from '../utils/spriteGenerator';
import marioPixels from '../database/sprite1';
import { SpriteREader } from '../utils/spriteReader';

class SpriteService {
  spriteGenerator = new SpriteGenerator({
    pixelSize: 20,
    tmpDir: 'src/tmp',
    spriteDir: 'src/sprites',
  });

  spriteReader = new SpriteREader();

  async getMainCharacter(): Promise<SpriteResult> {
    return await this.spriteGenerator.generate(marioPixels);
  }

  async getBackground(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('background');
  }

  async getGround() {
    return 'getGround service is working';
  }

  async getMysteryBlock() {
    return 'getMysteryBlock service is working';
  }
}

export default SpriteService;
