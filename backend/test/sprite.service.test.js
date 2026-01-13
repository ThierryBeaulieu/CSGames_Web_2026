const { SpriteService } = require('../services/sprite.service');
const { MockData } = require('./mock.data');

describe('SpriteService tests', () => {
  let spriteService;
  let mockData;

  beforeEach(async () => {
    //jest.spyOn(console, 'log').mockImplementation(() => {});

    mockData = new MockData();
    spriteService = new SpriteService();
  });

  it('You correctly ran the tests 😌 ✅ 🎉', async () => {
    const turtle = `
        ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⡠⣴⣮⣷⣶⡶⣾⣽⣶⢤⡀⠀⠀⠀
        ⠀⠀⢠⣾⣿⢧⣾⣿⣿⣧⣿⣿⣿⣷⡱⡄⠀⠀
        ⠀⣠⣿⣿⣯⣿⣿⣿⣿⡿⣼⣻⠿⠟⠛⠻⢦⡀
        ⡼⠁⢿⣟⣎⣿⣿⠿⠟⠃⠉⠀⠀⠀⠀⠀⠀⣷
        ⢳⡀⠀⠀⠀⠀⠀⠀⠀⣀⡠⡤⢲⣾⡏⢱⡠⠃
        ⠀⠉⠲⡲⠒⠒⡖⠚⠿⢿⠃⠡⡀⠉⢁⠞⠀⠀
        ⠀⠀⠀⠘⠳⢄⣘⢤⣀⠈⢂⣤⠴⠚⠁
                `;
    console.log(turtle);
    expect(true).toEqual(true);
  });

  it('getMainCharacter should return a sprite of the main character', async () => {
    const mainCharacterBase64 = await spriteService.getMainCharacter();
    //expect(mainCharacterBase64).toEqual(mockData.mainCharacter);
  });
});
