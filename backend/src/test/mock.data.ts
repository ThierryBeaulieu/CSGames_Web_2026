import { SpriteResult } from '../utils/spriteGenerator';

class MockData {
  mainCharacter: SpriteResult;

  constructor() {
    this.mainCharacter = {
      id: 'something',
      buffer: Buffer.from('fake-png-data'),
      spritePath: '',
    };
  }
}

export default MockData;
