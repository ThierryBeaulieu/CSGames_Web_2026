const { HTTP_STATUS } = require('../utils/http');
const router = require('express').Router();
const { SpriteService } = require('../services/sprite.service');
const spriteService = new SpriteService();

router.get('/main-character', async (req, res) => {
  try {
    const mainCharacter = await spriteService.getMainCharacter();
    response.status(HTTP_STATUS.SUCCESS).json(mainCharacter);
    console.log('main character fetched');
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/mystery-block', (req, res) => {
  console.log('main character fetched');
});

router.get('/background', (req, res) => {
  console.log('main character fetched');
});

module.exports = { router };
