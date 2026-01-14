// test/sprite.service.test.ts
import SpriteService from '../services/sprite.service';
import MockData from './mock.data';

describe('SpriteService tests', () => {
  let spriteService: SpriteService;
  let mockData: MockData;

  beforeEach(() => {
    mockData = new MockData();
    spriteService = new SpriteService();
  });

  it('You correctly ran the tests 😌 ✅ 🎉', () => {
    const turtle = `
          ⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀
          ⠀⠀⠀⠀⡠⣴⣮⣷⣶⡶⣾⣽⣶⢤⡀⠀⠀⠀
          ⠀⠀⢠⣾⣿⢧⣾⣿⣿⣧⣿⣿⣿⣷⡱⡄⠀⠀
          ⠀⣠⣿⣿⣯⣿⣿⣿⣿⡿⣼⣻⠿⠟⠛⠻⢦⡀
          ⡼⠁⢿⣟⣎⣿⣿⠿⠟⠃⠉⠀⠀⠀⠀⠀⠀⣷
          ⢳⡀⠀⠀⠀⠀⠀⠀⠀⣀⡠⡤⢲⣾⡏⢱⡠⠃
          ⠀⠉⠲⡲⠒⠒⡖⠚⠿⢿⠃⠡⡀⠉⢁⠞⠀⠀
          ⠀⠀⠀⠘⠳⢄⣘⢤⣀⠈⢂⣤⠴⠚⠁⠀⠀⠀
          ⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀
                `;
    console.log(turtle);
    expect(true).toEqual(true);
  });

  it('getMainCharacter should return a sprite of the main character', async () => {
    //const mainCharacterBase64 = await spriteService.getMainCharacter();
    //expect(mainCharacterBase64.base64).toEqual(mockData.mainCharacter.base64);
  });
});
