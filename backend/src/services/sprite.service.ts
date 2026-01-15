import { SpriteReader, SpriteResult } from '../utils/spriteReader';

class SpriteService {
  spriteReader = new SpriteReader();

  async getMainCharacter(): Promise<SpriteResult> {
    return await this.spriteReader.readPNG('main-character');
  }
}

export default SpriteService;
