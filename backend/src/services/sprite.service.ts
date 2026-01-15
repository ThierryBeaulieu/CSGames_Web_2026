import { SpriteResult } from '../utils/spriteResult';
import { SpriteReader } from '../utils/spriteReader';

class SpriteService {
  spriteReader = new SpriteReader();

  async getMainCharacter(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('main-character');
  }

  async getGround(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('ground');
  }

  async getSky(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('sky');
  }

  async getBottles(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('bottles');
  }

  async getTrees(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('trees');
  }

  async getMysteryBlock(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('mystery-block');
  }

  async getMushroom(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('mushroom');
  }

  async getMonster(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('monster');
  }
}

export default SpriteService;
