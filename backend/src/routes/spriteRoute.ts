import { Router, Request, Response } from 'express';
import HTTP_STATUS from '../utils/http';
import SpriteService from '../services/sprite.service';

const router = Router();
const spriteService = new SpriteService();

// Main character route
router.get('/main-character', async (req: Request, res: Response) => {
  try {
    const mainCharacter = await spriteService.getMainCharacter();
    res.setHeader('Content-Type', 'image/png');
    res.send(mainCharacter.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/background', async (req: Request, res: Response) => {
  try {
    const background = await spriteService.getBackground();
    res.setHeader('Content-Type', 'image/png');
    res.send(background.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/mystery-block', async (req: Request, res: Response) => {
  try {
    const background = await spriteService.getMysteryBlock();
    res.setHeader('Content-Type', 'image/gif');
    res.send(background.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/background', (req: Request, res: Response) => {
  console.log('background fetched');
  res.sendStatus(HTTP_STATUS.SUCCESS);
});

export default router;
