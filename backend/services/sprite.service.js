class SpriteService {
  async getMainCharacter() {
    return 'Hey, this test for the main character is working!';
  }

  async getBackground() {
    return 'getBackground service is working';
  }

  async getMysteryBlock() {
    return 'getMysteryBlock service is working';
  }
}

module.exports = { SpriteService };
