import { SpriteResult } from '../utils/spriteResult';

class MockData {
  mainCharacter: SpriteResult;

  constructor() {
    this.mainCharacter = {
      buffer: Buffer.from('fake-png-data'),
    };
  }
}

export default MockData;
