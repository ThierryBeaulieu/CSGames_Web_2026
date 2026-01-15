import { SpriteGenerator, SpriteResult } from '../utils/spriteGenerator';
import playerPixels from '../database/sprite1';
import { SpriteREader } from '../utils/spriteReader';

class SpriteService {
  spriteGenerator = new SpriteGenerator({
    pixelSize: 20,
    tmpDir: 'src/tmp',
    spriteDir: 'src/sprites',
  });

  spriteReader = new SpriteREader();

  async getMainCharacter(): Promise<SpriteResult> {
    return await this.spriteGenerator.generate(playerPixels);
  }

  async getBackground(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('background');
  }

  async getMysteryBlock(): Promise<SpriteResult> {
    return await this.spriteReader.readGIF('mystery-block');
  }
}

export default SpriteService;
